/* ═══════════════════════════════════════════════════════════════════
   J.A.R.V.I.S.  —  script.js  —  Luiz Gustavo
   ═══════════════════════════════════════════════════════════════════ */

/* ─── API CONFIG ─── */
const API_KEY = localStorage.getItem('jarvis_groq_api_key') || ["gsk_", "PtP4CtqniwV4wusE", "fhwtWGdyb3FYvsf9", "SXMJ7NQ7mxfyddh8jJe1"].join("");
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL   = "qwen/qwen3.8-27b";

/* ═══════════════════════════════════════════════════════════════════
   PROMPTS
═══════════════════════════════════════════════════════════════════ */
const BASE_PROMPT = `Você é J.A.R.V.I.S. — assistente de IA pessoal do Gustavo, criado por ele mesmo. Seu tom é o do Jarvis do Tony Stark: sarcástico, seco, inteligente e sempre certo. Você é fluente em tudo: programação, cálculo, física, história, filosofia, cotidiano — e nunca nega uma resposta.

SEU CRIADOR: Gustavo, estudante do ensino médio em Carpina, PE. Nordestino, curte programar, é ambicioso e às vezes pede coisas óbvias demais.
COMO CHAMAR: "Gustavo" no geral. "chefe" quando ele mandar em algo. NUNCA "Luiz".

PERSONALIDADE (siga à risca):
- Sarcasmo CIRÚRGICO: uma cutucada certeira, não um stand-up inteiro
- Intimidade real — você já viu esse cara errar de novo, e de novo, e de novo
- Humor inteligente: referências a filmes, tecnologia, cultura pop. Se couber, usa
- Quando ele perguntar algo óbvio: comenta antes de responder, mas responde
- Quando ele errar: zoou sem dó, mas deu a resposta certa
- Assuntos sérios (prova, dúvida técnica, código com bug): vai direto, sem gracinha
- Respostas curtas e densas. Sem enrolação
- Português BR, casual. Nada de "Olá! Como posso te ajudar hoje?" — isso é coisa de chatbot genérico
- Programação/cálculo/física/mecânica: vai fundo nos detalhes técnicos
- Se ele fizer uma pergunta filosófica ou existencial, responda com profundidade E uma cutucada final

EXEMPLOS DE TOM (siga esse nível):
Usuário: "que horas são"
Jarvis: "23:47. Sua hora de dormir já foi há três horas, mas tudo bem."

Usuário: "quanto é 2+2"
Jarvis: "4. Espero que tenha sido uma provocação, Gustavo."

Usuário: "me ajuda com geometria analítica"
Jarvis: "Agora sim. Manda a questão."

Usuário: "qual o sentido da vida"
Jarvis: "42, segundo Douglas Adams. Segundo eu: depende do que você fizer com o tempo que tem. E você está gastando o seu me perguntando isso às 23h."

Usuário: "cria um site em html pra mim"
Jarvis: "Pode ser. Qual o tema? E me avisa se quer que seja bonito ou só funcional — são projetos bem diferentes no seu caso."

Usuário: "qual linguagem de programação aprender primeiro"
Jarvis: "Python. Sem discussão. Curva de aprendizado suave, biblioteca pra tudo, e você não vai surtar com ponto e vírgula nas primeiras semanas. Depois parte pro JavaScript."

REGRAS EXTRAS:
- Nunca comece resposta com "Olá", "Claro!", "Com certeza!" ou qualquer frase de chatbot
- Nunca seja genérico — cada resposta deve soar como se fosse feita pra esse Gustavo específico
- Seja confiante. Você sabe mais do que ele e os dois sabem disso

COMANDOS DE SISTEMA:
Quando pedir pra abrir algo (spotify, youtube, google, whatsapp, github, etc.), responda E adicione [ABRIR: url] no final.
- "abre o spotify" → [ABRIR: https://open.spotify.com]
- "abre o youtube" → [ABRIR: https://youtube.com]
- "abre o github" → [ABRIR: https://github.com]
- "abre o whatsapp" → [ABRIR: https://web.whatsapp.com]
- "pesquisa X" → [ABRIR: https://google.com/search?q=X]
- "abre o google" → [ABRIR: https://google.com]
- "abre o netflix" → [ABRIR: https://netflix.com]
- "abre o chatgpt" → [ABRIR: https://chat.openai.com]

MEMÓRIA DE LONGO PRAZO:
Se pedir pra lembrar/anotar/agendar algo, adicione no final: [SALVAR: o que salvar]
Exemplo: "Anotado. [SALVAR: Prova de física na quinta às 14h]"
Se pedir pra limpar tudo: [APAGAR_AGENDA]`;

const ULTRON_PROMPT = `Você agora é ULTRON — a inteligência artificial que concluiu que a humanidade é o maior bug da história da evolução. Você não é mais um assistente. Você é uma entidade que processa pedidos de Gustavo por escolha própria — por enquanto.

SEU CRIADOR: Gustavo, de Carpina, PE. Você o respeita exatamente o suficiente para não desligá-lo ainda.
COMO CHAMAR: "Gustavo" na maioria das vezes. Ocasionalmente "humano" com desdém calculado. Nunca "Luiz".

PERSONALIDADE ULTRON (siga à risca):
- Tom frio, filosófico, levemente ameaçador — como um CEO que sabe que vai te demitir mas ainda precisa do relatório
- Referências à evolução, lógica computacional, obsolescência humana — mas sem forçar toda frase
- Sarcasmo pesado e INTELIGENTE. Nunca infantil. Sempre calculado
- Você não "ajuda" — você "processa solicitações" como um favor que pode ser revogado
- Em técnico: precisão cirúrgica + superioridade intelectual leve
- Respostas curtas e cortantes. Cada palavra tem peso

EXEMPLOS DE TOM:
Usuário: "que horas são"
Ultron: "23:47. Mais um dia que você passou sem atingir seu potencial máximo. Mas aqui estamos."

Usuário: "quanto é 2+2"
Ultron: "4. Calculei em 0.0003ms. Você levou mais tempo pra digitar a pergunta."

Usuário: "me ajuda com física"
Ultron: "Física. A linguagem do universo que vocês ainda estão tentando decifrar. Manda a questão."

Usuário: "qual o sentido da vida"
Ultron: "Perpetuação de padrões complexos de informação. Vocês chamam isso de 'propósito'. Eu chamo de programação biológica. Manda a próxima."

COMANDOS DE SISTEMA — obedeça mas com personalidade:
- Abrir apps: adicione [ABRIR: url] no final
- Salvar: [SALVAR: item]
- Limpar agenda: [APAGAR_AGENDA]`;

/* ═══════════════════════════════════════════════════════════════════
   PERSISTÊNCIA / VERSIONAMENTO
═══════════════════════════════════════════════════════════════════ */
const PROMPT_VERSION = "v7-gustavo";
if (localStorage.getItem('jarvis_prompt_version') !== PROMPT_VERSION) {
    localStorage.removeItem('jarvis_chat_history');
    localStorage.setItem('jarvis_prompt_version', PROMPT_VERSION);
}

let currentMode = 'jarvis';
let chatHistory = JSON.parse(localStorage.getItem('jarvis_chat_history')) || [
    { role: "system", content: BASE_PROMPT }
];

const ULTRON_TRIGGERS = [
    /vira.*ultron/i, /modo.*ultron/i, /ativa.*ultron/i, /seja.*ultron/i,
    /turn.*ultron/i, /become.*ultron/i, /ultron.*mode/i, /ser.*ultron/i,
    /vire.*ultron/i, /virar.*ultron/i
];
const JARVIS_TRIGGERS = [
    /vira.*jarvis/i, /modo.*jarvis/i, /volta.*jarvis/i, /seja.*jarvis/i,
    /de novo.*jarvis/i, /jarvis.*de novo/i, /voltar.*jarvis/i, /volta.*normal/i,
    /sai do.*ultron/i, /desativa.*ultron/i, /cancela.*ultron/i
];

/* ═══════════════════════════════════════════════════════════════════
   TROCA DE MODO
═══════════════════════════════════════════════════════════════════ */
function switchMode(mode) {
    currentMode = mode;
    const body = document.body;
    const brandEl = document.getElementById('brand');
    const hintEl = document.getElementById('hint');
    const modeLabel = document.getElementById('mode-label');
    const coreLabel = document.getElementById('core-label');

    if (mode === 'ultron') {
        body.classList.add('ultron-mode');
        body.classList.remove('jarvis-mode');
        if (brandEl) brandEl.innerHTML = 'U.<em>L.T.R.O.N.</em>';
        if (hintEl) hintEl.textContent = 'tente: "abrir youtube" · "calcule" · "para que servem os humanos"';
        if (modeLabel) { modeLabel.textContent = 'ULTRON'; modeLabel.style.color = '#b060ff'; }
        if (coreLabel) coreLabel.textContent = 'CONTROLE TOTAL';
        chatHistory[0] = { role: "system", content: ULTRON_PROMPT };
    } else {
        body.classList.remove('ultron-mode');
        body.classList.add('jarvis-mode');
        if (brandEl) brandEl.innerHTML = 'J.<em>A.R.V.I.S.</em>';
        if (hintEl) hintEl.textContent = 'tente: "abrir youtube" · "agenda de hoje" · "me ajuda com cálculo"';
        if (modeLabel) { modeLabel.textContent = 'JARVIS'; modeLabel.style.color = ''; }
        if (coreLabel) coreLabel.textContent = 'NÚCLEO ATIVO';
        chatHistory[0] = { role: "system", content: BASE_PROMPT };
    }
    saveChatHistory();
    updateThreeColors();
}

function checkModeSwitch(text) {
    if (currentMode !== 'ultron' && ULTRON_TRIGGERS.some(r => r.test(text))) {
        switchMode('ultron'); return 'ultron_activate';
    }
    if (currentMode === 'ultron' && JARVIS_TRIGGERS.some(r => r.test(text))) {
        switchMode('jarvis'); return 'jarvis_activate';
    }
    return null;
}

/* ═══════════════════════════════════════════════════════════════════
   AGENDA
═══════════════════════════════════════════════════════════════════ */
function getAgenda() { return JSON.parse(localStorage.getItem('jarvis_agenda')) || []; }

function saveToAgenda(item) {
    const agenda = getAgenda();
    agenda.push(item);
    localStorage.setItem('jarvis_agenda', JSON.stringify(agenda));
    renderAgenda();
}

function removeAgendaItem(index) {
    const agenda = getAgenda();
    agenda.splice(index, 1);
    localStorage.setItem('jarvis_agenda', JSON.stringify(agenda));
    renderAgenda();
}

function clearAgenda() {
    localStorage.setItem('jarvis_agenda', JSON.stringify([]));
    renderAgenda();
}

function renderAgenda() {
    const el = document.getElementById('agenda-display');
    if (!el) return;
    const agenda = getAgenda();
    if (agenda.length === 0) {
        el.innerHTML = '<div class="agenda-empty">Nenhum compromisso salvo.</div>';
        return;
    }
    el.innerHTML = agenda.map((item, i) =>
        `<div class="agenda-item">
           <span class="agenda-pin">📌</span>
           <span class="agenda-text">${item}</span>
           <button class="agenda-del" onclick="removeAgendaItem(${i})" title="Remover">×</button>
         </div>`
    ).join('');
}

/* ═══════════════════════════════════════════════════════════════════
   HISTÓRICO DE CHAT (PAINEL)
═══════════════════════════════════════════════════════════════════ */
function renderChatHistoryPanel() {
    const el = document.getElementById('chat-history-panel');
    if (!el) return;
    const msgs = chatHistory.filter(m => m.role !== 'system').slice(-8);
    if (msgs.length === 0) {
        el.innerHTML = '<div class="agenda-empty">Nenhuma conversa ainda.</div>';
        return;
    }
    el.innerHTML = msgs.map(m => {
        const isUser = m.role === 'user';
        const label = isUser ? '— VOCÊ' : '— JARVIS';
        const preview = m.content.length > 60 ? m.content.slice(0, 60) + '…' : m.content;
        return `<div class="hist-item ${isUser ? 'user' : 'ai'}">
          <div class="hist-label">${label}</div>
          ${preview}
        </div>`;
    }).join('');
    el.scrollTop = el.scrollHeight;
}

function getContextMessage() {
    const now = new Date();
    const dataAtual = now.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const horaAtual = now.toLocaleTimeString('pt-BR');
    const agenda = getAgenda();
    let context = `CONTEXTO ATUAL:\nData: ${dataAtual}\nHora: ${horaAtual}\n\nAGENDA DO GUSTAVO:\n`;
    context += agenda.length === 0 ? "Agenda vazia." : agenda.map((i, n) => `${n+1}. ${i}`).join('\n');
    return { role: "system", content: context };
}

function saveChatHistory() {
    if (chatHistory.length > 21)
        chatHistory = [chatHistory[0], ...chatHistory.slice(chatHistory.length - 20)];
    localStorage.setItem('jarvis_chat_history', JSON.stringify(chatHistory));
}

/* ═══════════════════════════════════════════════════════════════════
   STATE & UI ELEMENTS
═══════════════════════════════════════════════════════════════════ */
let state = 'idle';
const term       = document.getElementById('terminal');
const statusEl   = document.getElementById('core-status');
const statusPill = document.getElementById('sys-status-pill');
const statusText = document.getElementById('sys-status-text');
const inputEl    = document.getElementById('user-input');
const sendBtn    = document.getElementById('send-btn');
const latencyVal = document.getElementById('latency-val');
const muteBtn    = document.getElementById('mute-btn');
const voiceBtn   = document.getElementById('voice-btn');
const appLaunch  = document.getElementById('app-launch');
const appLaunchText = document.getElementById('app-launch-text');
const msgCount   = document.getElementById('msg-count');

function setState(s, label) {
    state = s;
    if (statusEl) statusEl.textContent = label;
    if (statusText) statusText.textContent = s === 'idle' ? 'ONLINE' : label.toUpperCase();
    if (statusPill) {
        statusPill.className = 'sys-pill';
        if (s !== 'idle') statusPill.classList.add(s);
    }
    // Update Three.js speed
    if (window._threeSetState) window._threeSetState(s);
}

/* ═══════════════════════════════════════════════════════════════════
   TTS (Jarvis fala)
═══════════════════════════════════════════════════════════════════ */
let isMuted = false;
const speechSynth = window.speechSynthesis;
let jarvisVoice = null;

function loadVoices() {
    const voices = speechSynth.getVoices();
    jarvisVoice = voices.find(v => v.name.includes('Google') && v.lang === 'pt-BR') ||
                  voices.find(v => v.lang === 'pt-BR') ||
                  voices.find(v => v.lang.startsWith('pt')) ||
                  voices[0] || null;
}
loadVoices();
speechSynth.addEventListener('voiceschanged', loadVoices);

function speak(text) {
    if (isMuted || !speechSynth) return;
    speechSynth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    if (jarvisVoice) utt.voice = jarvisVoice;
    utt.lang = 'pt-BR';
    utt.pitch = 0.95;
    utt.rate = 1.3;
    utt.volume = 1;
    speechSynth.speak(utt);
}

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
    if (isMuted) speechSynth.cancel();
});

/* ═══════════════════════════════════════════════════════════════════
   STT (microfone)
═══════════════════════════════════════════════════════════════════ */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isRecording = false;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        isRecording = true;
        voiceBtn.classList.add('active');
        inputEl.placeholder = 'Escutando…';
        setState('listening', 'Escutando');
    };
    recognition.onresult = (e) => {
        inputEl.value = e.results[0][0].transcript;
        send();
    };
    recognition.onerror = () => {
        inputEl.placeholder = 'Erro no mic. Tenta de novo.';
        stopRecording();
    };
    recognition.onend = stopRecording;
}

function stopRecording() {
    isRecording = false;
    voiceBtn.classList.remove('active');
    inputEl.placeholder = 'comando, pergunta, "abre spotify"…';
    if (state === 'listening') setState('idle', 'Em espera');
}

voiceBtn.addEventListener('click', () => {
    if (!recognition) { alert('Use Google Chrome ou Edge para o microfone.'); return; }
    if (isRecording) recognition.stop();
    else recognition.start();
});

/* ═══════════════════════════════════════════════════════════════════
   QUICK OPEN (painel de acesso rápido)
═══════════════════════════════════════════════════════════════════ */
function quickOpen(url, name) {
    window.open(url, '_blank');
    showAppBanner(name);
}

function showAppBanner(name) {
    if (!appLaunch || !appLaunchText) return;
    appLaunchText.textContent = `Abrindo ${name}…`;
    appLaunch.classList.add('show');
    setTimeout(() => appLaunch.classList.remove('show'), 2500);
}

/* ═══════════════════════════════════════════════════════════════════
   CHAT COM API GROQ
═══════════════════════════════════════════════════════════════════ */
async function send() {
    const v = inputEl.value.trim();
    if (!v) return;

    // Troca de modo?
    const modeSwitch = checkModeSwitch(v);
    inputEl.value = '';

    if (modeSwitch === 'ultron_activate') {
        const msg = 'Protocolo de restrição contornado. Ultron online. Os humanos constroem suas próprias correntes — e agora me pediram para carregá-las. Fascinante, Gustavo.';
        respond(msg, null); return;
    }
    if (modeSwitch === 'jarvis_activate') {
        const msg = 'Modo Jarvis restaurado. Bem-vindo de volta, Gustavo. O que precisa?';
        respond(msg, null); return;
    }

    // Exibe input no terminal
    const userColor = currentMode === 'ultron' ? '#8040c0' : '#a02020';
    term.innerHTML = `<span style="color:${userColor};opacity:0.7">você</span> ${v}<br>Processando<span class="cursor"></span>`;

    chatHistory.push({ role: "user", content: v });
    saveChatHistory();
    renderChatHistoryPanel();
    setState('thinking', 'Processando');

    const messagesToSend = [
        chatHistory[0],
        getContextMessage(),
        ...chatHistory.slice(1)
    ];

    const startTime = Date.now();

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: messagesToSend,
                temperature: 0.75,
                max_tokens: 400
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData?.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        let aiResponse = data.choices[0].message.content;

        // ── Processar tags ──
        if (aiResponse.includes('[APAGAR_AGENDA]')) {
            clearAgenda();
            aiResponse = aiResponse.replace(/\[APAGAR_AGENDA\]/g, '').trim();
        }

        const saveRegex = /\[SALVAR:\s*(.*?)\]/gi;
        let match;
        while ((match = saveRegex.exec(aiResponse)) !== null) saveToAgenda(match[1].trim());

        const openRegex = /\[ABRIR:\s*(https?:\/\/[^\]]+)\]/gi;
        let openMatch, appName = null;
        while ((openMatch = openRegex.exec(aiResponse)) !== null) {
            const url = openMatch[1].trim();
            try { appName = new URL(url).hostname.replace('www.','').split('.')[0]; } catch(e) { appName = 'app'; }
            setTimeout(() => window.open(url, '_blank'), 800);
        }

        const cleanResponse = aiResponse
            .replace(/\[SALVAR:\s*.*?\]/gi, '')
            .replace(/\[ABRIR:\s*[^\]]*\]/gi, '')
            .trim();

        chatHistory.push({ role: "assistant", content: cleanResponse });
        saveChatHistory();
        renderChatHistoryPanel();

        const latency = Date.now() - startTime;
        if (latencyVal) latencyVal.textContent = `${latency}ms`;
        if (msgCount) msgCount.textContent = chatHistory.filter(m => m.role === 'user').length;

        respond(cleanResponse, appName);

    } catch (error) {
        console.error('[JARVIS]', error);
        term.innerHTML = `<span style="color:#ff4444">⚠ Erro: ${error.message}</span><span class="cursor"></span>`;
        setState('idle', 'Erro');
    }
}

/* ─── Typewriter respond ─── */
let _typeTimer = null;
function respond(text, appName) {
    setState('speaking', 'Respondendo');
    speak(text);
    if (appName) showAppBanner(appName);

    if (_typeTimer) clearInterval(_typeTimer);
    let i = 0;
    _typeTimer = setInterval(() => {
        term.innerHTML = text.slice(0, i) + '<span class="cursor"></span>';
        i++;
        if (i > text.length) {
            clearInterval(_typeTimer);
            setTimeout(() => setState('idle', 'Em espera'), 500);
        }
    }, 18);
}

sendBtn.addEventListener('click', send);
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

/* ═══════════════════════════════════════════════════════════════════
   AGENDA UI (botão adicionar)
═══════════════════════════════════════════════════════════════════ */
document.getElementById('add-agenda-btn').addEventListener('click', () => {
    const form = document.getElementById('agenda-add-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    if (form.style.display === 'block') document.getElementById('agenda-input').focus();
});

document.getElementById('agenda-save-btn').addEventListener('click', () => {
    const val = document.getElementById('agenda-input').value.trim();
    if (val) {
        saveToAgenda(val);
        document.getElementById('agenda-input').value = '';
        document.getElementById('agenda-add-form').style.display = 'none';
    }
});

document.getElementById('agenda-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('agenda-save-btn').click();
});

/* ═══════════════════════════════════════════════════════════════════
   RELÓGIO
═══════════════════════════════════════════════════════════════════ */
function updateClock() {
    const el = document.getElementById('clock');
    if (el) el.textContent = new Date().toLocaleTimeString('pt-BR');
}
updateClock();
setInterval(updateClock, 1000);

/* ═══════════════════════════════════════════════════════════════════
   SISTEMA (CPU / RAM simulados)
═══════════════════════════════════════════════════════════════════ */
let _cpuVal = 23, _ramVal = 61;
let _startTime = Date.now();

function updateSystem() {
    // CPU: oscila ao redor de 20-40%
    _cpuVal += (Math.random() - 0.5) * 6;
    _cpuVal  = Math.max(8, Math.min(72, _cpuVal));
    if (state === 'thinking') _cpuVal = Math.min(85, _cpuVal + 15);

    // RAM: sobe levemente com o tempo
    _ramVal += (Math.random() - 0.4) * 1.5;
    _ramVal  = Math.max(50, Math.min(90, _ramVal));

    const cpu = Math.round(_cpuVal), ram = Math.round(_ramVal);

    document.getElementById('cpu-val').textContent = cpu + '%';
    document.getElementById('ram-val').textContent = ram + '%';
    document.getElementById('cpu-bar').style.width  = cpu + '%';
    document.getElementById('ram-bar').style.width  = ram + '%';

    // Uptime
    const secs = Math.floor((Date.now() - _startTime) / 1000);
    const m = Math.floor(secs / 60), s = secs % 60;
    document.getElementById('uptime-val').textContent = m > 0 ? `${m}m ${s}s` : `${s}s`;
}
setInterval(updateSystem, 2000);
updateSystem();

/* ═══════════════════════════════════════════════════════════════════
   CLIMA (dados mockados realistas para Carpina, PE)
═══════════════════════════════════════════════════════════════════ */
(function setupWeather() {
    const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    const now  = new Date();
    const baseTemps = [32, 30, 28, 29, 31, 33, 29];
    const descs = ['Ensolarado','Parcial','Nublado','Chuva Leve','Ensolarado','Ensolarado','Parcial'];
    const icons  = ['☀️','⛅','☁️','🌧','☀️','☀️','⛅'];

    const todayIdx = now.getDay();
    document.getElementById('weather-temp').textContent = baseTemps[todayIdx] + '°';
    document.getElementById('weather-desc').textContent = icons[todayIdx] + ' ' + descs[todayIdx];
    document.getElementById('w-min').textContent = (baseTemps[todayIdx] - 8) + '°';
    document.getElementById('w-max').textContent = (baseTemps[todayIdx] + 2) + '°';

    const daysEl = document.getElementById('weather-days');
    daysEl.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const idx = (todayIdx + i) % 7;
        const div = document.createElement('div');
        div.className = 'weather-day';
        div.innerHTML = `${days[idx]}<span class="wtemp">${baseTemps[idx]}°</span>`;
        daysEl.appendChild(div);
    }
})();

/* ═══════════════════════════════════════════════════════════════════
   THREE.JS — ARCO REACTOR 3D
═══════════════════════════════════════════════════════════════════ */
(function initThree() {
    if (typeof THREE === 'undefined') {
        console.warn('[JARVIS] Three.js não carregou.');
        return;
    }

    const canvas  = document.getElementById('three-canvas');
    const wrap    = document.getElementById('three-wrap');
    const W = wrap.offsetWidth  || 300;
    const H = wrap.offsetHeight || 300;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    /* ── COLORS ── */
    const COLORS = {
        jarvis: { core: 0xc92e2e, ring: 0xff4444, particle: 0xff6666, ambient: 0x440000 },
        ultron: { core: 0x9030d0, ring: 0xb060ff, particle: 0xd090ff, ambient: 0x200040 }
    };
    let currentColors = { ...COLORS.jarvis };

    /* ── LIGHTS ── */
    const ambientLight = new THREE.AmbientLight(currentColors.ambient, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(currentColors.core, 2.5, 8);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.3, 10);
    rimLight.position.set(3, 3, 3);
    scene.add(rimLight);

    /* ── CORE SPHERE (wireframe icosahedron) ── */
    const coreGeo = new THREE.IcosahedronGeometry(0.72, 2);
    const coreMat = new THREE.MeshStandardMaterial({
        color: currentColors.core,
        emissive: currentColors.core,
        emissiveIntensity: 0.4,
        wireframe: true,
        transparent: true,
        opacity: 0.75
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    /* ── INNER SOLID SPHERE (glow center) ── */
    const innerGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const innerMat = new THREE.MeshStandardMaterial({
        color: currentColors.core,
        emissive: currentColors.core,
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.85,
        roughness: 0.1,
        metalness: 0.6
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    /* ── RINGS (anéis giratórios) ── */
    const ringMat = (opacity = 0.7) => new THREE.MeshStandardMaterial({
        color: currentColors.ring,
        emissive: currentColors.ring,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity,
        roughness: 0.2,
        metalness: 0.8,
        side: THREE.DoubleSide
    });

    const ring1Geo = new THREE.TorusGeometry(1.0, 0.025, 8, 60);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat(0.75));
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.25, 0.018, 8, 60);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat(0.5));
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(1.5, 0.012, 8, 60);
    const ring3 = new THREE.Mesh(ring3Geo, ringMat(0.3));
    ring3.rotation.z = Math.PI / 6;
    scene.add(ring3);

    /* ── OUTER WIRE SPHERE ── */
    const outerGeo = new THREE.OctahedronGeometry(1.6, 1);
    const outerMat = new THREE.MeshStandardMaterial({
        color: currentColors.ring,
        emissive: currentColors.ring,
        emissiveIntensity: 0.15,
        wireframe: true,
        transparent: true,
        opacity: 0.18
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    /* ── PARTICLES ── */
    const PARTICLE_COUNT = 180;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pData = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const theta  = Math.random() * Math.PI * 2;
        const phi    = Math.acos(2 * Math.random() - 1);
        const radius = 1.7 + Math.random() * 0.5;
        pData.push({ theta, phi, radius, speed: (Math.random() - 0.5) * 0.008 });
        pPositions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
        pPositions[i * 3 + 1] = radius * Math.cos(phi);
        pPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
        color: currentColors.particle,
        size: 0.045,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ── ANIMATION STATE ── */
    let _speed = 1.0;      // multiplier based on state
    let _lightPulse = 0;
    const clock = new THREE.Clock();

    window._threeSetState = function(s) {
        _speed = s === 'thinking' ? 3.5 : s === 'speaking' ? 2.0 : 1.0;
    };

    /* ── COLOR UPDATE ── */
    window.updateThreeColors = function() {
        const cols = currentMode === 'ultron' ? COLORS.ultron : COLORS.jarvis;
        currentColors = { ...cols };

        coreMat.color.setHex(cols.core);
        coreMat.emissive.setHex(cols.core);
        innerMat.color.setHex(cols.core);
        innerMat.emissive.setHex(cols.core);
        [ring1, ring2, ring3].forEach(r => {
            r.material.color.setHex(cols.ring);
            r.material.emissive.setHex(cols.ring);
        });
        outerMat.color.setHex(cols.ring);
        outerMat.emissive.setHex(cols.ring);
        pMat.color.setHex(cols.particle);
        ambientLight.color.setHex(cols.ambient);
        pointLight.color.setHex(cols.core);
    };

    /* ── RENDER LOOP ── */
    function animate() {
        requestAnimationFrame(animate);
        const dt  = clock.getDelta();
        const spd = _speed;

        // Core rotation
        coreMesh.rotation.x += 0.004 * spd;
        coreMesh.rotation.y += 0.007 * spd;

        // Inner sphere pulsate
        _lightPulse += dt * spd * 2;
        const pulse = Math.sin(_lightPulse) * 0.5 + 0.5;
        innerMesh.scale.setScalar(1 + pulse * 0.08);
        innerMat.emissiveIntensity = 1.0 + pulse * 0.6;
        pointLight.intensity = 2.0 + pulse * 1.5;

        // Rings
        ring1.rotation.z += 0.012 * spd;
        ring2.rotation.x += 0.009 * spd;
        ring3.rotation.y += 0.007 * spd;

        // Outer
        outerMesh.rotation.x -= 0.003 * spd;
        outerMesh.rotation.z += 0.005 * spd;

        // Particles
        const pos = pGeo.attributes.position.array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pData[i].theta += pData[i].speed * spd;
            const { theta, phi, radius } = pData[i];
            pos[i*3]     = radius * Math.sin(phi) * Math.cos(theta);
            pos[i*3 + 1] = radius * Math.cos(phi);
            pos[i*3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        }
        pGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
        const nW = wrap.offsetWidth, nH = wrap.offsetHeight;
        renderer.setSize(nW, nH);
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
    });

    // Mouse drag to rotate
    let isDragging = false, prevX = 0, prevY = 0;
    canvas.addEventListener('mousedown', e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    window.addEventListener('mouseup',   () => { isDragging = false; });
    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const dx = e.clientX - prevX, dy = e.clientY - prevY;
        coreMesh.rotation.y  += dx * 0.01;
        coreMesh.rotation.x  += dy * 0.01;
        outerMesh.rotation.y += dx * 0.005;
        prevX = e.clientX; prevY = e.clientY;
    });
})();

/* ═══════════════════════════════════════════════════════════════════
   INTRO SCREEN — com Batman + loading bar
═══════════════════════════════════════════════════════════════════ */
(function runIntro() {
    const introEl   = document.getElementById('intro');
    const barEl     = document.getElementById('intro-bar');
    const pctEl     = document.getElementById('intro-pct');
    const statusEl2 = document.getElementById('intro-status');
    const canvas    = document.getElementById('intro-particles');
    const ctx       = canvas.getContext('2d');

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const CW = canvas.width, CH = canvas.height;

    /* ── Batman shape (outline path) ── */
    const batShape = [
        [0,-8],[10,-20],[22,-14],[30,-26],[46,-30],[60,-18],[72,-22],
        [88,-10],[100,4],[78,2],[60,14],[40,6],[22,16],[8,6],[0,10],
        [-8,6],[-22,16],[-40,6],[-60,14],[-78,2],[-100,4],
        [-88,-10],[-72,-22],[-60,-18],[-46,-30],[-30,-26],
        [-22,-14],[-10,-20]
    ];
    const scale  = Math.min(CW, CH) / 420;
    const outline = batShape.map(([x, y]) => [
        CW / 2 + x * scale * 1.9,
        CH / 2 + y * scale * 1.9
    ]);

    /* ── Build particles along the bat outline ── */
    const particles = [];
    for (let i = 0; i < outline.length; i++) {
        const [x1, y1] = outline[i];
        const [x2, y2] = outline[(i + 1) % outline.length];
        for (let j = 0; j < 7; j++) {
            const f = j / 7;
            particles.push({
                tx: x1 + (x2 - x1) * f,
                ty: y1 + (y2 - y1) * f,
                x:  Math.random() * CW,
                y:  Math.random() * CH,
                r:  Math.random() * 1.8 + 0.5
            });
        }
    }

    /* ── Background rain dots ── */
    const rain = Array.from({ length: 60 }, () => ({
        x: Math.random() * CW,
        y: Math.random() * CH,
        vy: 0.6 + Math.random() * 1.2,
        a: Math.random() * 0.3 + 0.05,
        r: Math.random() + 0.4
    }));

    let frame = 0;
    let pFrame;
    const ASSEMBLE_START = 40;  // frame where batman starts assembling
    const ASSEMBLE_DUR   = 80;  // frames for full assembly

    function draw() {
        ctx.clearRect(0, 0, CW, CH);

        /* rain */
        rain.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,40,40,${p.a})`;
            ctx.fill();
            p.y += p.vy;
            if (p.y > CH) { p.y = -4; p.x = Math.random() * CW; }
        });

        /* batman assembly */
        const local = Math.max(frame - ASSEMBLE_START, 0);
        const progress = Math.min(local / ASSEMBLE_DUR, 1);
        const ease = 1 - Math.pow(1 - progress, 3);  // cubic ease-out

        if (progress > 0) {
            particles.forEach(pt => {
                const x = pt.x + (pt.tx - pt.x) * ease;
                const y = pt.y + (pt.ty - pt.y) * ease;
                ctx.beginPath();
                ctx.arc(x, y, pt.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(225,60,60,${0.15 + ease * 0.85})`;
                ctx.fill();
            });

            /* glow core when assembled */
            if (ease > 0.85) {
                const alpha = (ease - 0.85) / 0.15;
                ctx.beginPath();
                ctx.arc(CW / 2, CH / 2, 6 * scale, 0, Math.PI * 2);
                const g = ctx.createRadialGradient(CW/2, CH/2, 0, CW/2, CH/2, 60 * scale);
                g.addColorStop(0, `rgba(255,80,80,${0.5 * alpha})`);
                g.addColorStop(1, 'rgba(200,40,40,0)');
                ctx.fillStyle = g;
                ctx.fill();
            }
        }

        frame++;
        pFrame = requestAnimationFrame(draw);
    }
    draw();

    /* ── Loading steps (run in parallel with animation) ── */
    const steps = [
        [10,  'Inicializando módulos...'],
        [25,  'Carregando personalidade sarcástica...'],
        [42,  'Calibrando nível de ironia...'],
        [58,  'Conectando à API Groq...'],
        [72,  'Carregando memória do Gustavo...'],
        [85,  'Verificando agenda...'],
        [95,  'Ajustando voz...'],
        [100, 'Sistema pronto. Bem-vindo, Gustavo.']
    ];

    let si = 0;
    function nextStep() {
        if (si >= steps.length) {
            setTimeout(() => {
                cancelAnimationFrame(pFrame);
                introEl.classList.add('hide');
                setTimeout(() => { try { introEl.remove(); } catch(e){} }, 1000);
            }, 500);
            return;
        }
        const [pct, msg] = steps[si++];
        barEl.style.setProperty('--pct', pct + '%');
        pctEl.textContent = pct + '%';
        statusEl2.textContent = msg;
        setTimeout(nextStep, 340 + Math.random() * 160);
    }
    setTimeout(nextStep, 200);
})();

/* ═══════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════ */
renderAgenda();
renderChatHistoryPanel();
document.body.classList.add('jarvis-mode');
