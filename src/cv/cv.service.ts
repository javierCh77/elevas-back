import { Injectable } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';
import OpenAI from 'openai';
import * as Tesseract from 'tesseract.js';
import { spawn } from 'child_process';
import { writeFile, unlink } from 'fs/promises';
import { randomUUID } from 'crypto';
import { join } from 'path';

@Injectable()
export class CvService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async procesarCV(file: Express.Multer.File) {
    // Paso 1: intento con pdf-parse
    const pdf = await pdfParse(file.buffer);
    let text = pdf.text?.trim();

    // Paso 2: si no hay texto, hacemos OCR
    if (!text || text.length < 20) {
      console.log('📷 PDF sin texto, usando OCR...');

      const imgPath = await this.convertPdfToPng(file.buffer);
      text = await this.extractTextWithOCR(imgPath);
      await unlink(imgPath); // limpiar imagen temporal
    }

    if (!text || text.length < 20) {
      throw new Error('No se pudo extraer texto del CV ni con OCR');
    }

const prompt = `
Sos un sistema experto que analiza CVs en texto plano. Tu tarea es devolver SOLO un JSON válido con los siguientes campos.

⚠️ Instrucciones clave:
- El nombre completo es la primera línea o la más destacada. NO confundas el título profesional o el cargo con el nombre.
- Si un campo no aparece, devolvé null en ese campo.
- No incluyas comentarios ni texto extra. SOLO el JSON.
- Los idiomas deben ser un array de objetos con "idioma" y "nivel".

📄 Campos requeridos:
{
  "dni": string | null,
  "nombreCompleto": string | null,
  "email": string | null,
  "telefono": string | null,
  "ubicacion": string | null,
  "nivelEstudios": string | null,
  "tituloObtenido": string | null,
  "institucion": string | null,
  "habilidades": string[] | [],
  "idiomas": { "idioma": string, "nivel": string }[] | [],
  "experiencia": {
    "empresa": string,
    "cargo": string,
    "desde": string,
    "hasta": string,
    "tareas": string[]
  }[] | [],
  "pretensionSalarial": string | null,
  "disponibilidad": string | null,
  "linkedin": string | null,
  "observaciones": string | null
}

Ahora analizá el siguiente CV:

========================
${text}
========================
`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Sos un experto en análisis de CVs y estructuración de datos.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const raw = completion.choices[0].message?.content;
    console.log('🧠 Respuesta de GPT:', raw);

    try {
      return {
  mensaje: 'CV analizado correctamente',
  candidato: JSON.parse(raw || '{}'),
};
    } catch (err) {
      console.error('❌ Error al parsear la respuesta:', raw);
      throw new Error('No se pudo parsear la respuesta de OpenAI como JSON');
    }
  }

  private async convertPdfToPng(buffer: Buffer): Promise<string> {
    const tempName = randomUUID();
    const pdfPath = join(__dirname, `${tempName}.pdf`);
    const imgPath = join(__dirname, `${tempName}.png`);

    await writeFile(pdfPath, buffer);

    return new Promise((resolve, reject) => {
      const child = spawn('pdftoppm', ['-png', '-f', '1', '-singlefile', pdfPath, pdfPath.replace('.pdf', '')]);

      child.on('exit', async (code) => {
        await unlink(pdfPath);
        if (code === 0) resolve(imgPath);
        else reject(new Error('Error al convertir PDF a imagen'));
      });
    });
  }

  private async extractTextWithOCR(imagePath: string): Promise<string> {
    const result = await Tesseract.recognize(imagePath, 'spa', {
      logger: (m) => console.log(m),
    });
    return result.data.text;
  }
}
