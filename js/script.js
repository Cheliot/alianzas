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

// NEXia - Assistent Virtual
let nexiaTimeout;

function initializeNexia() {
    const messagesContainer = document.getElementById('nexiaMessages');
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

function sendNexiaMessage() {
    const input = document.getElementById('nexiaInput');
    const message = input.value.trim();
    if (!message) return;

    addNexiaMessage(message, 'user');
    input.value = '';

    clearTimeout(nexiaTimeout);
    nexiaTimeout = setTimeout(() => {
        const response = getNexiaResponse(message.toLowerCase());
        addNexiaMessage(response, 'bot');
    }, 300);
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
    messageDiv.className = `nexia-message ${type}`;
    messageDiv.innerHTML = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getNexiaResponse(message) {
    // Respuestas sobre la reunión
    if (message.includes('reuni') || message.includes('quan') || message.includes('cuando') || message.includes('fecha') || message.includes('29')) {
        return '📅 La propera reunió de coordinació està <strong>confirmada</strong> per al:<br><br><strong>Miércoles, 29 de octubre de 2025</strong><br>⏰ Hora: <strong>2:00 PM (Hora CDMX)</strong><br><br>És una reunió clau per coordinar el Encuentro del Quetzal que tindrà lloc a <strong>gener o principis de febrer de 2026</strong> a Sisbichén. ✨';
    }

    // Respuestas sobre delegados
    if (message.includes('delegat') || message.includes('representant') || message.includes('16') || message.includes('quants') || message.includes('cuantos')) {
        return '👥 Segons la carta del Abuelo Chief Phil, a la Reunió del Quetzal es seleccionaran:<br><br><strong>16 delegats</strong> (8 homes i 8 dones)<br><br>Aquests delegats representaran la biorregió (Mèxic, Centreamèrica i Panamà) a la Quarta Reunió de la Unió al Canadà en març/abril de 2026.<br><br>El procés de selecció serà <strong>no partidista i no polític</strong>, garantint igualtat i equilibri de gènere. 🌟';
    }

    // Respuestas sobre asistencia
    if (message.includes('assist') || message.includes('confirmat') || message.includes('qui ve') || message.includes('quien viene')) {
        return '✅ <strong>Confirmats:</strong><br>• Nana Mima<br>• Adriana Alvarez<br>• Cecilia Pagkalinawan<br>• Rodrigo Martínez Romero<br><br>⏳ <strong>Pendent de resposta:</strong><br>• Kate Kaur | Conexión Dharma<br>• Ab Antonio Oxté León<br>• Abuelo Antonio<br>• CARMEN XUTUYMA<br>• Dr Miguel Ceballos<br>• Nahii<br>• Silvio<br>• Neto Lubcke (Regresa a Mérida el 26/Oct)';
    }

    // Respuestas sobre la carta
    if (message.includes('carta') || message.includes('chief phil') || message.includes('phil') || message.includes('letter')) {
        return '📜 La <strong>Carta del Abuelo Chief Phil</strong> és el document base amb la visió i propòsit central del Encuentro del Quetzal.<br><br><strong>Punts clau:</strong><br>• Selecció de 16 delegats (8 homes, 8 dones)<br>• Reunió a Sisbichén (gener/febrer 2026)<br>• Coordinat per: abuelo Antonio, Adriana, Nana Mima, CONODEPOA<br>• La Reunió Final al Canadà serà entre el 18-22 de març o 18-22 d\'abril de 2026<br><br>Pots llegir la carta completa a la secció de Documentos de la pàgina. 📖✨';
    }

    // Respuestas sobre agenda
    if (message.includes('agenda') || message.includes('temes') || message.includes('punts') || message.includes('qué se tratará')) {
        return '📋 <strong>Agenda per a la Reunió del 29/Oct:</strong><br><br><strong>1. Analizar la Carta del Abuelo Chief Phil</strong><br>• Seleccionar 16 delegats<br>• Confirmar cronograma (gener/febrer 2026)<br>• Alinear equip de coordinació<br><br><strong>2. Nuestra Conexión con el Terreno</strong><br>• Revisar idees de Neto sobre sostenibilitat<br><br><strong>3. Puntos Adicionales</strong><br>• Coordinar espai per Nana Mima i abuelo Antonio';
    }

    // Respuestas sobre ubicación
    if (message.includes('on') || message.includes('lloc') || message.includes('lugar') || message.includes('sisbich') || message.includes('donde')) {
        return '📍 <strong>Ubicació:</strong><br><br>La Reunió del Quetzal tindrà lloc a:<br><strong>Sisbichén, Yucatán, Mèxic</strong><br><br>És la terra de l\'abuelo Antonio, on es va celebrar l\'última reunió en un entorn molt bonic. Aquest lloc sagrat acollirà la trobada de gener o principis de febrer de 2026. 🌿';
    }

    // Respuestas sobre coordinadores
    if (message.includes('coordina') || message.includes('responsable') || message.includes('antonio') || message.includes('adriana') || message.includes('mima')) {
        return '👤 <strong>Equip de Coordinació:</strong><br><br>La Reunió del Quetzal serà coordinada per:<br>• <strong>Abuelo Antonio</strong> (amfitrió a Sisbichén)<br>• <strong>Adriana</strong><br>• <strong>Nana Mima</strong><br>• <strong>CONODEPOA</strong><br><br>I altres persones que decideixin convidar. Representen tot Mèxic, Centreamèrica i Panamà. 🙏';
    }

    // Respuestas sobre viaje/rutas
    if (message.includes('viatj') || message.includes('volar') || message.includes('vuelo') || message.includes('canad') || message.includes('bc')) {
        return '✈️ La carta del Chief Phil detalla <strong>rutes de viatge que eviten Estats Units</strong> per arribar al Canadà:<br><br><strong>Opció 1:</strong> Vols directes Mèxic → Vancouver<br>• Des de CDMX, Cancún, Guadalajara, etc.<br><br><strong>Opció 2:</strong> Llatinoamèrica → Toronto → Vancouver<br>• Des de Bogotà, Lima, etc.<br><br>Això permet viatjar directament al Canadà sense passar pels EUA. 🌎';
    }

    // Respuestas sobre ayuda general
    if (message.includes('ajuda') || message.includes('help') || message.includes('ayuda') || message.includes('què pots') || message.includes('que puedes')) {
        return '💫 Puc ajudar-te amb informació sobre:<br><br>✨ <strong>La propera reunió</strong> (data, hora, lloc)<br>✨ <strong>Delegats</strong> a seleccionar<br>✨ <strong>Assistència</strong> (confirmats i pendents)<br>✨ <strong>Agenda</strong> de la reunió<br>✨ <strong>Carta del Chief Phil</strong><br>✨ <strong>Coordinadors</strong> de l\'esdeveniment<br>✨ <strong>Viatges</strong> i rutes<br><br>Què vols saber? 🌟';
    }

    // Respuesta por defecto
    return '🌙 Gràcies per la teva pregunta. Puc ajudar-te amb informació sobre:<br><br>• La <strong>reunió del 29 d\'octubre</strong><br>• Els <strong>16 delegats</strong> a seleccionar<br>• L\'<strong>assistència</strong> confirmada<br>• L\'<strong>agenda</strong> de la reunió<br>• La <strong>Carta del Chief Phil</strong><br><br>Reformula la teva consulta o fes clic en els suggeriments! ✨';
}

// Inicializar NEXia cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // NEXia se inicializará cuando se abra por primera vez
    console.log('NEXia lista para ayudar ✨');
});
