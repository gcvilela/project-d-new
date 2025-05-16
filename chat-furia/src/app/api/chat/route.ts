// /app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export async function POST(req: Request) {
  const {
    message,
    system_message = "Você é o assistente virtual oficial da FURIA Esports. Sua função é responder de forma amigável, profissional e informativa às perguntas dos usuários sobre o time, eventos, jogadores, produtos e qualquer outro assunto relacionado à FURIA Esports.",
    max_tokens = 512,
    temperature = 0.9,
    top_p = 0.8,
  }: {
    message: string;
    system_message?: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
  } = await req.json();
 
  if (!message) {
    return NextResponse.json({ error: 'Mensagem não fornecida' }, { status: 400 });
  }

  try {
    // Conectando ao cliente Gradio
    const client = await Client.connect('Dibras/Chat-bot');

    // Fazendo a predição
    const result = await client.predict('/chat', {
      message: message,
      system_message: system_message,
      max_tokens: max_tokens,
      temperature: temperature,
      top_p: top_p,
    });

    // Retornando a resposta
    return NextResponse.json({ reply: result.data });
  } catch (error) {
    console.error('Erro na requisição:', error);
    return NextResponse.json(
      { error: 'Erro ao comunicar com o modelo Gradio.' },
      { status: 500 }
    );
  }
}
