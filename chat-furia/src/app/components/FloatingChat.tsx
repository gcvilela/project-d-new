'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { user: string; bot: string | null }[]
  >([]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  // Scroll automático para o final da última mensagem
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Enviar mensagem para a API
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { user: userMessage, bot: null }]);
    setInput('');

    // Garantir que o scroll vá para o final após o envio da mensagem do usuário
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);

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

  // Enviar mensagem ao pressionar Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
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
          className='fixed bottom-20 right-6 w-80 bg-white border border-zinc-300 rounded-xl shadow-lg z-50 animate-fade-in'
        >
          <div className='p-4 border-b font-semibold text-zinc-800'>
            Fale com a gente!
          </div>
          <div className='p-4 h-64 overflow-y-auto text-sm text-zinc-700'>
            {messages.map((msg, index) => (
              <div key={index} className='mb-6 flex flex-col gap-4'>
                {/* Mensagem do usuário */}
                {msg.user && (
                  <div
                    className={`self-end text-black bg-blue-100 p-2 rounded-lg max-w-[70%] break-words`}
                  >
                    <strong>Você:</strong> {msg.user}
                  </div>
                )}
                {/* Resposta do bot */}
                {msg.bot !== null && (
                  <div
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    className={`self-start text-black bg-gray-100 p-2 rounded-lg max-w-[70%] break-words`}
                  >
                    <strong>Bot:</strong> {msg.bot}
                  </div>
                )}
                {/* Placeholder enquanto o bot está pensando */}
                {msg.bot === null && index === messages.length - 1 && (
                  <div
                    ref={lastMessageRef}
                    className='self-start text-black italic'
                  >
                    <span className='animate-typing'>Digitando...</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='p-2 border-t flex gap-2'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
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
