// /app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export async function POST(req: Request) {
  const {
    message,
    system_message = "You are a friendly Chatbot.",
    max_tokens = 512,
    temperature = 0.7,
    top_p = 0.95,
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
