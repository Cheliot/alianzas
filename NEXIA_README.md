# NEXia - Assistent Virtual del Quetzal 🤖✨

NEXia és un assistent virtual intel·ligent integrat a la pàgina de coordinació del Encuentro del Quetzal, powered by Claude AI.

## ✨ Característiques

- **Respostes Intel·ligents**: Usa Claude 3.5 Sonnet per respondre preguntes sobre la reunió
- **Context Complet**: Té accés a tota la informació del document
- **Multiidioma**: Respon en català, castellà o anglès
- **Historial de Conversa**: Manté el context de fins a 10 missatges
- **Interfície Elegant**: Disseny adaptat als colors del Quetzal
- **✅ Seguretat**: API key guardada localment, NO al repositori

## 🎯 Què pot fer NEXia?

NEXia pot ajudar amb informació sobre:

- 📅 La reunió del 29 d'octubre (data, hora, estat)
- 👥 Els 16 delegats a seleccionar
- ✅ Assistència confirmada i pendent
- 📋 Agenda de la reunió
- 📜 Carta del Abuelo Chief Phil
- 👤 Coordinadors de l'esdeveniment
- 📍 Ubicació (Sisbichén, Yucatán)
- ✈️ Informació sobre viatges al Canadà
- 🎯 Objectius i cronograma

## 🔒 Configuració Segura de l'API Key

### ✅ Sistema Implementat

NEXia usa un **sistema segur de configuració** que:
- ✅ NO guarda l'API key al codi font
- ✅ NO puja l'API key al repositori GitHub
- ✅ Demana l'API key a l'usuari la primera vegada
- ✅ Guarda la clau localment al navegador (localStorage)
- ✅ Permet esborrar/canviar la clau fàcilment

### 📝 Com Configurar NEXia

**Primera Vegada:**
1. Obre `index.html` al navegador
2. Fes clic al botó ✨ (NEXia)
3. Se't demanarà l'API key d'Anthropic
4. Obté-la a: https://console.anthropic.com/settings/keys
5. Enganxa-la al prompt
6. La clau es guardarà localment

**Per Canviar/Esborrar la Clau:**
1. Obre NEXia
2. Fes clic al botó ⚙️ (configuració)
3. Confirma que vols esborrar la clau
4. La propera vegada se't demanarà de nou

### 🛡️ Per a Producció (Recomanat)

**OPCIÓ 1: Backend amb Node.js/Express** (Recomanat)

Crear un servidor backend que:
1. Mantingui l'API key segura al servidor
2. Exposi un endpoint per a NEXia
3. Faci les peticions a l'API de manera segura

Exemple bàsic:

```javascript
// backend/server.js
const express = require('express');
const app = express();

app.post('/api/nexia', async (req, res) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY, // API key segura al servidor
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000);
```

**OPCIÓ 2: Netlify/Vercel Functions** (Més fàcil)

Usar funcions serverless gratuïtes:

```javascript
// netlify/functions/nexia.js
exports.handler = async (event) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: event.body
  });

  return {
    statusCode: 200,
    body: JSON.stringify(await response.json())
  };
};
```

**OPCIÓ 3: Restriccions d'API** (Temporal)

Si has de mantenir l'API key al client temporalment:

1. Activa restriccions de domini a la consola d'Anthropic
2. Estableix límits de quotes
3. Monitoritza l'ús regularment
4. Regenera l'API key periòdicament

## 🚀 Ús

1. Obre `index.html` al navegador
2. Fes clic al botó ✨ a la part inferior dreta
3. Escriu la teva pregunta
4. NEXia respondrà amb informació contextual

## 📊 Costos Estimats

Claude 3.5 Sonnet costa aproximadament:
- **Input**: $3 per milió de tokens (~750.000 paraules)
- **Output**: $15 per milió de tokens (~750.000 paraules)

Una conversa típica amb NEXia (10 missatges):
- ~0.001$ - 0.01$ per conversa

**Important**: Monitoritza l'ús a la consola d'Anthropic!

## 🔧 Configuració Tècnica

- **Model**: claude-3-5-sonnet-20241022
- **Max Tokens**: 500 per resposta
- **Context**: Informació completa del document
- **Historial**: Últims 10 missatges

## 📝 Notes

- Les respostes es generen en temps real
- El historial es manté durant la sessió
- Tanca i obre NEXia per reiniciar la conversa
- Les respostes són contextuals i intel·ligents

## 🛡️ ACCIÓ IMMEDIATA RECOMANADA

1. **NO publicar aquest projecte a internet públic** fins que s'implementi un backend
2. **Regenerar l'API key** si el repositori és públic
3. **Implementar una de les solucions segures** esmentades més amunt
4. **Afegir `.env` al `.gitignore`** i usar variables d'entorn

---

**Data d'integració**: Octubre 2025
**Powered by**: Claude AI (Anthropic)
**Desenvolupat per**: Claude Code
