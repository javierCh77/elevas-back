import { Injectable } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';
import OpenAI from 'openai';

@Injectable()
export class CvService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async procesarCV(file: Express.Multer.File) {
    const pdf = await pdfParse(file.buffer);
    const text = pdf.text;

    const prompt = `
Extraé del siguiente CV los siguientes campos y devolveme un JSON válido:

- nombreCompleto
- email
- telefono
- experiencia
- educacion
- habilidades (si las hubiera)

Solo devolveme el JSON. Nada más.

Texto del CV:
${text}
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

    try {
      return JSON.parse(raw || '{}');
    } catch (err) {
      throw new Error('No se pudo parsear la respuesta de OpenAI como JSON');
    }
  }
}
