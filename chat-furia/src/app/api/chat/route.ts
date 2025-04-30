import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message }: { message: string } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'Mensagem não fornecida' }, { status: 400 });
  }

  try {
    // Enviar mensagem para a API do Hugging Face
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Configure a chave no .env.local
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: message }),
    });

    const data = await response.json();

    // A API do Hugging Face retorna a resposta diretamente no campo "generated_text"
    const reply = data.generated_text ;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Erro ao conectar com a API do Hugging Face:', error);
    return NextResponse.json(
      { reply: 'Desculpe, algo deu errado. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}