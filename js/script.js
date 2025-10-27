// Navegación por pestañas
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover clase active de todas las pestañas
        document.querySelectorAll('.nav-tab').forEach(t => {
            t.classList.remove('active');
        });

        // Remover clase active de todas las secciones
        document.querySelectorAll('.section-content').forEach(s => {
            s.classList.remove('active');
        });

        // Agregar clase active a la pestaña clickeada
        tab.classList.add('active');

        // Mostrar la sección correspondiente
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Navegación a enlaces internos entre pestañas
document.querySelectorAll('.document-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);

        // Activar la pestaña de documentos
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector('.nav-tab[data-target="documentos"]').classList.add('active');

        // Mostrar la sección de documentos
        document.querySelectorAll('.section-content').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('documentos').classList.add('active');

        // Desplazarse al elemento objetivo
        setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    });
});

// Botón "Volver arriba"
document.querySelectorAll('.back-to-top').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// NEXia - Assistent Virtual amb Claude API
// ⚠️ IMPORTANT: L'API key NO està al codi per seguretat
// L'usuari ha de configurar-la la primera vegada que usa NEXia
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

let nexiaTimeout;
let conversationHistory = [];

// Gestió segura de l'API key (localStorage)
function getAPIKey() {
    let apiKey = localStorage.getItem('nexia_api_key');

    if (!apiKey) {
        apiKey = prompt(
            '🔑 NEXia necessita la teva API key d\'Anthropic per funcionar.\n\n' +
            'Obtén-la a: https://console.anthropic.com/settings/keys\n\n' +
            'La clau es guardarà localment al teu navegador (localStorage).\n\n' +
            'Enganxa la teva API key:'
        );

        if (apiKey && apiKey.trim().startsWith('sk-ant-')) {
            localStorage.setItem('nexia_api_key', apiKey.trim());
            alert('✅ API key guardada! NEXia ja està llesta per ajudar-te.');
        } else if (apiKey) {
            alert('❌ API key invàlida. Ha de començar amb "sk-ant-"');
            return null;
        }
    }

    return apiKey;
}

function clearAPIKey() {
    if (confirm('Vols esborrar l\'API key guardada?')) {
        localStorage.removeItem('nexia_api_key');
        alert('✅ API key esborrada. Se\'t demanarà de nou la propera vegada.');
    }
}

// Context del document per a NEXia
const documentContext = `
Ets NEXia, la Guardiana del Quetzal, un assistent virtual especialitzat en informació sobre el Encuentro del Quetzal.

INFORMACIÓ CLAU:

PROPERA REUNIÓ DE COORDINACIÓ:
- Data: Miércoles, 29 de octubre de 2025
- Hora: 2:00 PM (Hora CDMX)
- Estat: Confirmada

ASSISTÈNCIA:
Confirmats:
- Nana Mima
- Adriana Alvarez
- Cecilia Pagkalinawan
- Rodrigo Martínez Romero

Pendents de resposta:
- Kate Kaur | Conexión Dharma
- Ab Antonio Oxté León
- Abuelo Antonio
- CARMEN XUTUYMA
- Dr Miguel Ceballos
- Nahii
- Silvio
- Neto Lubcke (Regresa a Mérida el 26/Oct)

AGENDA (29 Oct):
1. Analitzar la Carta del Abuelo Chief Phil
   - Seleccionar 16 delegats (8 homes, 8 dones)
   - Confirmar cronograma: gener/febrer 2026
   - Alinear equip de coordinació

2. Nuestra Conexión con el Terreno (Ideas de Neto)
   - Revisar sostenibilitat, economia i logística local

3. Punts Adicionals
   - Coordinar espai per Nana Mima i abuelo Antonio

OBJECTIU GENERAL:
Preparar el "Encuentro del Quetzal" a Sisbichén (gener/febrer 2026) on es seleccionaran 16 delegats (8 dones, 8 homes) mitjançant processos no partidistes per representar la biorregió (Mèxic, Centreamèrica, Panamà) a la Quarta Reunió de la Unió al Canadà (març/abril 2026).

COORDINADORS:
- Abuelo Antonio (amfitrió a Sisbichén)
- Adriana Alvarez
- Nana Mima
- CONODEPOA

UBICACIÓ:
Sisbichén, Yucatán, México - Terres de l'abuelo Antonio

DOCUMENTOS:
- Carta del Abuelo Chief Phil (disponible)
- Propuesta de Neto (disponible)
- Lista de invitados (per completar)
- Presupuesto preliminar (per elaborar)

DATES CLAU:
- 29 octubre 2025: Reunió de coordinació
- Gener/Febrer 2026: Encuentro del Quetzal a Sisbichén
- 18-22 març o 18-22 abril 2026: Reunió Final al Canadà (BC)

INSTRUCCIONS:
- Respon en català, castellà o anglès segons la pregunta
- Sigues concisa però informativa
- Usa emojis amb moderació
- Si no tens informació específica, suggereix revisar els documents
- Sigues respectuosa amb els guardians i el procés sagrat
`;

function initializeNexia() {
    const messagesContainer = document.getElementById('nexiaMessages');
    conversationHistory = []; // Reset conversation
    messagesContainer.innerHTML = `
        <div class="nexia-message bot">
            Benvingut! ✨ Sóc NEXia, Guardiana del Quetzal. Estic aquí per ajudar-te amb informació sobre el Encuentro del Quetzal i la coordinació de la reunió. Com et puc ajudar?
            <div class="nexia-suggestions">
                <div class="nexia-suggestion" onclick="askNexia('reunio')">Propera Reunió</div>
                <div class="nexia-suggestion" onclick="askNexia('delegats')">Delegats</div>
                <div class="nexia-suggestion" onclick="askNexia('carta')">Carta del Chief Phil</div>
            </div>
        </div>
    `;
}

function toggleNexia() {
    const chat = document.getElementById('nexiaChat');
    const isOpen = chat.classList.contains('open');

    if (!isOpen && !document.getElementById('nexiaMessages').innerHTML) {
        initializeNexia();
    }

    chat.classList.toggle('open');
}

async function sendNexiaMessage() {
    const input = document.getElementById('nexiaInput');
    const message = input.value.trim();
    if (!message) return;

    addNexiaMessage(message, 'user');
    input.value = '';

    // Mostrar indicador de càrrega
    const loadingId = addNexiaMessage('✨ Pensant...', 'bot');

    try {
        const response = await callClaudeAPI(message);
        removeNexiaMessage(loadingId);
        addNexiaMessage(response, 'bot');
    } catch (error) {
        removeNexiaMessage(loadingId);
        console.error('Error NEXia:', error);
        addNexiaMessage('❌ Ho sento, he tingut un problema tècnic. Torna-ho a provar en un moment.', 'bot');
    }
}

async function callClaudeAPI(userMessage) {
    // Obtenir API key (demanarà a l'usuari si no està guardada)
    const apiKey = getAPIKey();
    if (!apiKey) {
        throw new Error('API key no configurada');
    }

    // Afegir missatge a l'historial
    conversationHistory.push({
        role: 'user',
        content: userMessage
    });

    // Limitar historial a últims 10 missatges
    if (conversationHistory.length > 10) {
        conversationHistory = conversationHistory.slice(-10);
    }

    const response = await fetch(ANTHROPIC_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 500,
            system: documentContext,
            messages: conversationHistory
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);

        // Si l'error és d'autenticació, esborrar la clau guardada
        if (response.status === 401) {
            localStorage.removeItem('nexia_api_key');
            throw new Error('API key invàlida. Torna-ho a provar.');
        }

        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    // Afegir resposta a l'historial
    conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
    });

    return assistantMessage;
}

function askNexia(topic) {
    const questions = {
        'reunio': '¿Cuándo es la próxima reunión?',
        'delegats': '¿Cuántos delegados se seleccionarán?',
        'carta': '¿De qué trata la carta del Chief Phil?'
    };
    const input = document.getElementById('nexiaInput');
    input.value = questions[topic];
    sendNexiaMessage();
}

function addNexiaMessage(text, type) {
    const messagesContainer = document.getElementById('nexiaMessages');
    const messageDiv = document.createElement('div');
    const messageId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    messageDiv.id = messageId;
    messageDiv.className = `nexia-message ${type}`;
    messageDiv.innerHTML = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return messageId;
}

function removeNexiaMessage(messageId) {
    const messageDiv = document.getElementById(messageId);
    if (messageDiv) {
        messageDiv.remove();
    }
}

// Inicializar NEXia cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // NEXia se inicializará cuando se abra por primera vez
    console.log('NEXia lista para ayudar ✨');
});
