'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Fechar o chat ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.fixed.bottom-6.right-6')
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Enviar mensagem para a API
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { user: userMessage, bot: '...' }]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: data.reply } : msg
        )
      );
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? {
                ...msg,
                bot: 'Desculpe, algo deu errado. Tente novamente mais tarde.',
              }
            : msg
        )
      );
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(!open)}
        className='fixed bottom-6 right-6 z-50 dark:bg-zinc-900 text-white border border-white p-4 rounded-full shadow-lg transition-all hover:bg-zinc-800'
        aria-label='Abrir chat'
      >
        <MessageCircle size={24} />
      </button>

      {/* Caixa de chat flutuante */}
      {open && (
        <div
          ref={chatRef}
          className='fixed bottom-20 right-6 w-80 bg-white border border-zinc-300 rounded-xl shadow-lg z-50'
        >
          <div className='p-4 border-b font-semibold text-zinc-800'>
            Fale com a gente!
          </div>
          <div className='p-4 h-64 overflow-y-auto text-sm text-zinc-700'>
            {messages.map((msg, index) => (
              <div key={index} className='mb-2'>
                <div className='bg-zinc-100 p-2 rounded mb-1'>
                  <strong>Você:</strong> {msg.user}
                </div>
                <div className='bg-zinc-200 p-2 rounded'>
                  <strong>Bot:</strong> {msg.bot}
                </div>
              </div>
            ))}
          </div>
          <div className='p-2 border-t flex gap-2'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Digite sua mensagem...'
              className='flex-1 px-3 py-2 border rounded text-sm text-zinc-700'
            />
            <button
              onClick={handleSendMessage}
              className='dark:bg-zinc-900 hover:bg-zinc-700 text-white border-white px-3 py-2 rounded text-sm'
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
