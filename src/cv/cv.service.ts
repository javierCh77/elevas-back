import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as pdfParse from 'pdf-parse';
import * as Tesseract from 'tesseract.js';
import * as fs from 'fs';
import * as path from 'path';
import * as pdfPoppler from 'pdf-poppler';

import { tmpdir } from 'os';
import OpenAI from 'openai';
import { randomUUID } from 'crypto';

@Injectable()
export class CvService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY no está definida.');
    }

    this.openai = new OpenAI({ apiKey });
  }

  async procesarCV(file: Express.Multer.File) {
    try {
      let text: string;

      // 1. Intentar extraer texto con pdf-parse
      const pdf = await pdfParse(file.buffer);
      text = pdf.text;
      console.log('📄 Texto extraído con pdf-parse:\n', text || '[VACÍO]');

      // 2. Si está vacío, usar OCR como fallback
      if (!text || text.trim().length < 30) {
        console.log('⚠️ Texto vacío. Procesando con OCR...');

        const imagePath = await this.convertirPdfAPng(file.buffer);
        text = await this.ocrImagen(imagePath);
        fs.unlinkSync(imagePath); // limpiar imagen temporal

        console.log('📸 Texto extraído con OCR:\n', text || '[VACÍO]');
      }

      // 3. Validar texto final
      if (!text || text.trim().length < 30) {
        throw new BadRequestException('El texto extraído del CV está vacío o es ilegible.');
      }

      // 4. Preparar prompt para OpenAI
      const prompt = `
Extraé del siguiente CV los siguientes campos y devolveme un JSON válido:

- nombreCompleto
- dni
- email
- telefono
- experiencia (en texto)
- educacion o titulo (en texto)
- habilidades (array si las hubiera)

Solo devolveme el JSON. Nada más.

Texto del CV:
${text}
      `.trim();

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'Sos un experto en análisis de CVs. Siempre devolvés un JSON válido con los campos solicitados.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.2,
      });

      const raw = completion.choices[0]?.message?.content || '';
      console.log('📦 Respuesta cruda de OpenAI:\n', raw);

      // 5. Limpiar el JSON usando regex
      const jsonMatch = raw.match(/```json([\s\S]*?)```/);
      let jsonSolo = '';

      if (jsonMatch) {
        jsonSolo = jsonMatch[1].trim();
      } else {
        const fallbackMatch = raw.match(/{[\s\S]*}/);
        if (fallbackMatch) {
          jsonSolo = fallbackMatch[0];
        }
      }

      // 6. Parsear JSON limpio
      let datos: any;
      try {
        datos = JSON.parse(jsonSolo);
      } catch (err) {
        console.error('❌ JSON mal formado:', err);
        throw new InternalServerErrorException('La respuesta de OpenAI no fue un JSON válido.');
      }

      // 7. Validar campos obligatorios
      const camposRequeridos = ['nombreCompleto', 'email', 'telefono', 'experiencia'];
      for (const campo of camposRequeridos) {
        if (!datos[campo] || typeof datos[campo] !== 'string') {
          throw new BadRequestException(`Falta el campo obligatorio: ${campo}`);
        }
      }

      if (datos.habilidades && !Array.isArray(datos.habilidades)) {
        throw new BadRequestException('El campo habilidades debe ser un array.');
      }

      return datos;
    } catch (err) {
      console.error('❌ Error al procesar CV:', err);
      throw err;
    }
  }

  private async convertirPdfAPng(buffer: Buffer): Promise<string> {
    const tempPdfPath = path.join(tmpdir(), `${randomUUID()}.pdf`);
    fs.writeFileSync(tempPdfPath, buffer);
  
    const outputPath = tempPdfPath.replace('.pdf', '');
    const outDir = path.dirname(tempPdfPath);
    const outPrefix = path.basename(outputPath);
  
    await pdfPoppler.convert(tempPdfPath, {
      format: 'png',
      out_dir: outDir,
      out_prefix: outPrefix,
      page: 1,
    });
  
    fs.unlinkSync(tempPdfPath);
    return path.join(outDir, `${outPrefix}-1.png`);
  }
  

  private async ocrImagen(rutaImagen: string): Promise<string> {
    const result = await Tesseract.recognize(rutaImagen, 'spa', {
      logger: (m) =>
        console.log(`🔍 OCR: ${m.status} (${Math.round(m.progress * 100)}%)`),
    });

    return result.data.text;
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
