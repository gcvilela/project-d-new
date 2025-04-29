import Image from 'next/image';
import Link from 'next/link';
import FloatingChat from './components/FloatingChat';

export default function Home() {
  return (
    <>
      <div className='min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 px-6 py-10'>
        <header className='mb-10 text-center'>
          <div className='flex items-center justify-center gap-4 mb-2'>
            <Image
              src='/furia-icon.png'
              alt='FURIA logo'
              width={60} // aumente conforme desejar
              height={60}
              className='rounded-full'
            />
            <h1 className='text-4xl font-bold'>FURIA Notícias</h1>
          </div>
          <p className='text-zinc-500 dark:text-zinc-400'>
            Acompanhe tudo sobre o time de CS da FURIA
          </p>
        </header>

        <main className='grid gap-12 max-w-4xl mx-auto'>
          {/* Seção: Últimos Jogos */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>Últimos Jogos</h2>
            <ul className='grid gap-4'>
              <li className='bg-white dark:bg-zinc-800 p-4 rounded shadow'>
                FURIA 16 x 12 NAVI – IEM Katowice 2025 (27/04)
              </li>
              <li className='bg-white dark:bg-zinc-800 p-4 rounded shadow'>
                FURIA 14 x 16 G2 – IEM Katowice 2025 (25/04)
              </li>
            </ul>
          </section>

          {/* Seção: Próximos Jogos */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>Próximos Jogos</h2>
            <ul className='grid gap-4'>
              <li className='bg-white dark:bg-zinc-800 p-4 rounded shadow'>
                FURIA vs Vitality – ESL Pro League (30/04 - 18:00h)
              </li>
              <li className='bg-white dark:bg-zinc-800 p-4 rounded shadow'>
                FURIA vs FaZe – ESL Pro League (02/05 - 21:00h)
              </li>
            </ul>
          </section>

          {/* Seção: Notícias Recentes */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>Notícias Recentes</h2>
            <ul className='grid gap-4'>
              <li className='bg-white dark:bg-zinc-800 p-4 rounded shadow'>
                <strong>FURIA vence NAVI em jogo histórico na Katowice!</strong>
                <p className='text-sm text-zinc-500'>Publicado em 27/04/2025</p>
              </li>
              <li className='bg-white dark:bg-zinc-800 p-4 rounded shadow'>
                <strong>
                  Nova lineup da FURIA estreia com vitória esmagadora
                </strong>
                <p className='text-sm text-zinc-500'>Publicado em 24/04/2025</p>
              </li>
            </ul>
          </section>

          {/* Link para loja de roupas */}
          <section className='text-center mt-8'>
            <Link
              href='https://www.furia.gg'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow transition'
            >
              Visite a loja oficial da FURIA 🛒
            </Link>
          </section>
        </main>
      </div>

      {/* Chat flutuante */}
      <FloatingChat />
    </>
  );
}
