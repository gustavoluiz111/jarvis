# J.A.R.V.I.S. — Assistente Pessoal Inteligente

Assistente pessoal desenvolvido por **Gustavo** (Carpina, PE), inspirado no Jarvis do Tony Stark.
Possui interface visual futurista com Orb 3D procedural, integração com LLM rápida via Groq, síntese/reconhecimento de voz em tempo real e memória na nuvem com Firebase.

---

## 🚀 Funcionalidades

- **Orb 3D Procedural (Three.js + GLSL):** Núcleo holográfico em tempo real deformado por Simplex Noise, anéis giratórios com elétrons orbitando e casca de partículas. Reage dinamicamente à voz e aos estados do sistema.
- **Inteligência Artificial (Groq API):** Alimentado pelo modelo `Qwen 3.8 27B`, com respostas rápidas, sarcasmo inteligente e conhecimento técnico aprofundado em programação, matemática, física e estudos.
- **Execução de Tarefas & Comandos:**
  - `[TODO]`: Criação de to-do lists interativas para provas e matérias com salvamento automático.
  - `[LINK]`: Recomendações e cartões de links úteis.
  - `[WHATSAPP]`: Geração de mensagens prontas para envio no WhatsApp Web.
  - `[TIMER]`: Temporizadores e alarmes executados no navegador.
  - `[EVENTO]`: Agendamento de provas e compromissos com data e hora.
  - `[ABRIR]`: Abertura rápida de sites e ferramentas (YouTube, Spotify, GitHub, Google, etc.).
- **Voz Natural Calibrada:** Síntese de fala sem leitura de caracteres de markdown ou códigos brutos, com seletor de vozes naturais brasileiras (Edge Natural / Google pt-BR).
- **Memória em Nuvem (Firebase Firestore):** Persistência de agenda e histórico de conversas entre sessões.
- **Agenda Completa:** Calendário semanal visual e checklist sincronizado (`agenda.html`).
- **Modos Jarvis & Ultron:** Troca de personalidade e tema visual (vermelho neon / roxo ameaçador) por voz ou comando de texto.

---

## 🛠️ Tecnologias

- **Front-end:** HTML5, CSS3 Glassmorphism, JavaScript Moderno (Vanilla ES6+)
- **3D & Gráficos:** Three.js (r128), GLSL Shaders (Vertex & Fragment Simplex Noise)
- **APIs:** Groq Cloud API, Web Speech API (SpeechSynthesis & SpeechRecognition)
- **Banco de Dados:** Firebase Firestore (Compat SDK)

---

## 💻 Como Rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/gustavoluiz111/jarvis.git
   cd jarvis
   ```
2. Inicie um servidor HTTP local:
   ```bash
   python -m http.server 3000
   ```
3. Abra no navegador:
   ```text
   http://localhost:3000
   ```
   Para a agenda completa:
   ```text
   http://localhost:3000/agenda.html
   ```
