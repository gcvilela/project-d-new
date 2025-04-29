'use client';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

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
        <div className='fixed bottom-20 right-6 w-80 bg-white border border-zinc-300 rounded-xl shadow-lg z-50'>
          <div className='p-4 border-b font-semibold text-zinc-800'>
            Fale com a gente!
          </div>
          <div className='p-4 h-64 overflow-y-auto text-sm text-zinc-700'>
            <div className='mb-2 bg-zinc-100 p-2 rounded'>
              Fala, FURIOSO! Como posso te ajudar hoje?
            </div>
          </div>
          <div className='p-2 border-t flex gap-2'>
            <input
              type='text'
              placeholder='Digite sua mensagem...'
              className='flex-1 px-3 py-2 border rounded text-sm text-zinc-700'
            />
            <button className='dark:bg-zinc-900 hover:bg-zinc-700 text-white border-white px-3 py-2 rounded text-sm'>
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
