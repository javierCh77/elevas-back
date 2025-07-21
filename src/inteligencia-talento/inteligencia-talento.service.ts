// inteligencia-talento.service.ts
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ExplicacionComparativaDto } from './dto/explicacion-comparativa.dto';

@Injectable()
export class InteligenciaTalentoService {
  async compararCandidatos(dto: ExplicacionComparativaDto) {
    const {
      candidatos,
      puesto,
      formacionAcademica,
      experienciaLaboral,
      conocimientosEspecificos,
      idioma,
      ubicacion,
    } = dto;

    if (!candidatos || candidatos.length < 1 || candidatos.length > 3) {
      throw new Error('Debes enviar entre 1 y 3 candidatos para la comparación.');
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const candidatosTexto = candidatos
      .map(
        (c, index) => `
📌 Candidato ${index + 1}:
- Nombre: ${c.nombreCompleto}
- Ubicación: ${c.ubicacion}
- Formación: ${c.nivelEstudios} – ${c.tituloObtenido}
- Idiomas: ${(c.idiomas || []).map((i) => i.idioma).join(', ') || 'No especifica'}
`
      )
      .join('\n');

    const prompt = `
Sos TalentIA, un asistente experto en selección de personal. Tu tarea es analizar ${candidatos.length} perfiles en función del siguiente puesto: "${puesto || 'no especificado'}".

📋 Requisitos esperados:
- Formación académica: ${formacionAcademica || 'no especificada'}
- Experiencia: ${experienciaLaboral || 'no especificada'}
- Conocimientos clave: ${conocimientosEspecificos || 'no especificados'}
- Idioma: ${idioma || 'no especificado'}
- Ubicación: ${ubicacion || 'no especificada'}

📌 Perfiles a evaluar:
${candidatosTexto}

🔍 Indicá para cada candidato:
1. ✅ Fortalezas (formación, experiencia, idioma, etc.)
2. ⚠️ Debilidades o riesgos (gaps, ubicación, faltantes)
3. 🧾 Puntaje estimado (0 a 100)
4. 📌 Conclusión / recomendación (breve y clara)

Respondé de forma clara, profesional y orientada a selección de RRHH.
`.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const comparativa = response.choices[0]?.message?.content?.trim();
    return { comparativa };
  }
}
