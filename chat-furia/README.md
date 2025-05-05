# Chat FURIA Esports

Este projeto implementa um assistente virtual oficial da FURIA Esports, projetado para responder de forma amigável, profissional e informativa às perguntas dos usuários sobre o time, eventos, jogadores, produtos e outros assuntos relacionados à FURIA Esports.

---

## 📋 Funcionalidades

- **Chat flutuante**: Um botão flutuante que abre uma interface de chat para interação com o assistente virtual.
- **Respostas automáticas**: O assistente responde às mensagens dos usuários utilizando um modelo de IA conectado via API.
- **Scroll automático**: O chat sempre exibe a última mensagem ao ser aberto ou ao enviar/receber mensagens.
- **Mensagens em tempo real**: Exibição de mensagens do usuário e respostas do bot, com um indicador de "Digitando..." enquanto o bot processa a resposta.
- **Configuração de parâmetros**: Personalização de parâmetros como `max_tokens`, `temperature` e `top_p` para ajustar o comportamento do modelo de IA.

---

## 🛠️ Estrutura do Projeto

### Diretórios principais:

- **`src/app/components`**: Contém o componente `FloatingChat.tsx`, responsável pela interface do chat.
- **`src/app/api/chat`**: Contém a rota `route.ts`, que gerencia a comunicação com o modelo de IA.

---

## 📂 Arquivos principais

### `FloatingChat.tsx`

Este arquivo implementa o componente de chat flutuante. Ele inclui:

- **Botão flutuante**: Um botão que abre/fecha o chat.
- **Caixa de chat**: Exibe as mensagens do usuário e do bot.
- **Envio de mensagens**: Permite enviar mensagens ao pressionar "Enter" ou clicando no botão "Enviar".
- **Scroll automático**: Garante que a última mensagem seja exibida ao abrir o chat ou ao enviar/receber mensagens.

### `route.ts`

Este arquivo implementa a API que conecta o frontend ao modelo de IA. Ele:

- Recebe mensagens do usuário.
- Envia as mensagens para o modelo de IA via cliente Gradio.
- Retorna a resposta do modelo para o frontend.

---

## ⚙️ Configuração de Parâmetros

Os seguintes parâmetros podem ser ajustados no arquivo `route.ts`:

- **`max_tokens`**: Define o número máximo de tokens na resposta do modelo. (Padrão: `512`)
- **`temperature`**: Controla a criatividade das respostas. Valores mais altos resultam em respostas mais criativas. (Padrão: `0.9`)
- **`top_p`**: Controla a probabilidade cumulativa para limitar as respostas. (Padrão: `0.8`)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js instalado.
- Gerenciador de pacotes (npm ou yarn).
- Ambiente configurado para Next.js.

### Passos

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/chat-furia.git
   cd chat-furia
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

4. **Acesse o projeto no navegador**:
   Abra [http://localhost:3000](http://localhost:3000).

---

## 📂 Código da API (`route.ts`)

O arquivo `route.ts` é responsável por gerenciar a comunicação entre o frontend e o modelo de IA. Ele utiliza o cliente Gradio para enviar mensagens e receber respostas.

### Código completo:

```typescript
// /app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';

export async function POST(req: Request) {
  const {
    message,
    system_message = 'Você é o assistente virtual oficial da FURIA Esports. Sua função é responder de forma amigável, profissional e informativa às perguntas dos usuários sobre o time, eventos, jogadores, produtos e qualquer outro assunto relacionado à FURIA Esports.',
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
    return NextResponse.json(
      { error: 'Mensagem não fornecida' },
      { status: 400 }
    );
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
```

### Explicação do Código:

1. **Importações**:

   - `NextResponse`: Utilizado para retornar respostas HTTP no Next.js.
   - `Client` do `@gradio/client`: Conecta ao modelo de IA hospedado no Gradio.

2. **Função `POST`**:

   - Recebe uma requisição contendo a mensagem do usuário e parâmetros opcionais (`system_message`, `max_tokens`, `temperature`, `top_p`).
   - Valida se a mensagem foi fornecida. Caso contrário, retorna um erro HTTP 400.

3. **Conexão com o Gradio**:

   - Conecta ao modelo de IA utilizando o cliente Gradio.
   - Envia a mensagem e os parâmetros para o endpoint `/chat`.

4. **Tratamento de Erros**:

   - Caso ocorra um erro na comunicação com o modelo, retorna um erro HTTP 500 com uma mensagem amigável.

5. **Parâmetros Configuráveis**:
   - **`system_message`**: Define o comportamento do assistente virtual.
   - **`max_tokens`**: Limita o tamanho da resposta gerada.
   - **`temperature`**: Controla a criatividade das respostas.
   - **`top_p`**: Define a probabilidade cumulativa para limitar as respostas.

---

## 🧪 Testes

### Testes Unitários

- Adicione testes para o componente `FloatingChat` e para a API `route.ts` utilizando frameworks como Jest ou React Testing Library.

### Exemplos de Testes:

- **Componente de chat**:
  - Verificar se o botão flutuante abre/fecha o chat.
  - Garantir que a última mensagem seja exibida ao abrir o chat.
- **API**:
  - Testar se a API retorna respostas válidas para mensagens enviadas.
  - Verificar o comportamento em caso de erro na comunicação com o modelo.

---

## 📚 Tecnologias Utilizadas

- **Next.js**: Framework para construção do frontend e backend.
- **React**: Biblioteca para construção de interfaces de usuário.
- **Gradio**: Cliente para comunicação com o modelo de IA.
- **Tailwind CSS**: Framework CSS para estilização.

---

## 🖤 Sobre a FURIA Esports

A FURIA Esports é uma organização brasileira de esportes eletrônicos que busca inspirar e entreter fãs ao redor do mundo. Este assistente virtual foi criado para melhorar a experiência dos fãs, fornecendo informações rápidas e precisas sobre a organização.

---
