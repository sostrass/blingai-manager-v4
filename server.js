require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio'); // Para o Scraper do Radar

const app = express();

// Libera o acesso para o seu painel frontend
app.use(cors({ origin: '*' }));
app.use(express.json());

// Chaves de Segurança (Ficam escondidas no Railway)
const BLING_TOKEN = process.env.BLING_TOKEN;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

// ---------------------------------------------------------
// 1. ROTA DE STATUS (Health Check)
// ---------------------------------------------------------
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Proxy Online', version: '6.0' });
});

// ---------------------------------------------------------
// 2. ROTAS DO GEMINI (Inteligência Artificial)
// ---------------------------------------------------------

// Rota genérica (Usada pela aba Descrição & I.A)
app.post('/api/ia/gerar', async (req, res) => {
    try {
        const { prompt, model } = req.body;
        const targetModel = model || 'gemini-2.5-flash-preview-05-14';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${GEMINI_KEY}`;
        
        const response = await axios.post(url, {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Erro Gemini:", error.message);
        res.status(500).json({ erro: error.message });
    }
});

// Rota de SAC (Modo Ateliê)
app.post('/api/ia/sac', async (req, res) => {
    try {
        const { cliente, produto, relato } = req.body;
        const prompt = `Atue como Consultor Parceiro da Sóstrass. Cliente: ${cliente}. Produto: ${produto}. Relato: "${relato}". 
        Crie uma resposta humana, amigável (clima de ateliê), focando na qualidade do produto. Máximo 480 caracteres. Sem markdown (asteriscos).`;
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_KEY}`;
        const response = await axios.post(url, { contents: [{ parts: [{ text: prompt }] }] });
        
        const texto = response.data.candidates[0].content.parts[0].text.replace(/\*/g, '');
        res.json({ sucesso: true, resposta: texto });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao processar SAC' });
    }
});

// Rota de Descrição Blindada (Com HTML Jurídico)
app.post('/api/ia/descricao-blindada', async (req, res) => {
    try {
        const { produto } = req.body;
        const prompt = `Crie uma ficha técnica detalhada para o e-commerce vendendo: ${produto}. Foco extremo em medidas para zerar devoluções. Sem markdown.`;
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_KEY}`;
        const response = await axios.post(url, { contents: [{ parts: [{ text: prompt }] }] });
        
        const texto = response.data.candidates[0].content.parts[0].text.replace(/\*/g, '');
        const htmlBlindagem = `\n\n<hr>\n<div style="background-color: #f8f9fa; border-left: 4px solid #dc3545; padding: 15px; margin-top: 20px;">\n    <h4 style="color: #333; margin-top: 0;">⚠️ AVISO LEGAL DE DIREITOS AUTORAIS</h4>\n    <p style="font-size: 13px; color: #555; line-height: 1.5;">\n        As imagens e o layout deste anúncio são de propriedade exclusiva da <strong>DAJP / Sóstrass Acessórios e Pedrarias</strong>. Temos registro de autoria e possuímos os arquivos RAW originais de estúdio.\n        <br><br>\n        <strong>É estritamente proibida</strong> a cópia ou reprodução. Infratores estão sujeitos à denúncia imediata na plataforma (BPP/PPPI).\n    </p>\n</div>`;
        
        res.json({ sucesso: true, descricao: texto + htmlBlindagem });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao gerar blindagem' });
    }
});

// ---------------------------------------------------------
// 3. ROTA DO RADAR ESPIÃO (Scraper)
// ---------------------------------------------------------
app.post('/api/scraper/precos-multiplos', async (req, res) => {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls)) return res.status(400).json({ erro: "URLs inválidas." });

    let resultados = [];
    
    for (const link of urls) {
        try {
            // Finge ser um navegador real para evitar bloqueio básico
            const { data } = await axios.get(link, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                timeout: 5000
            });
            const $ = cheerio.load(data);
            
            // Busca o preço nas tags universais (Funciona para ML, Nuvemshop, Shopify)
            let preco = $('meta[property="product:price:amount"]').attr('content') || 
                        $('meta[property="og:price:amount"]').attr('content');
            
            if (!preco) {
                // Tenta achar no JSON-LD (Script usado por grandes varejistas)
                $('script[type="application/ld+json"]').each((i, el) => {
                    try {
                        const json = JSON.parse($(el).html());
                        if (json.offers && json.offers.price) preco = json.offers.price;
                        else if (Array.isArray(json) && json[0].offers) preco = json[0].offers.price;
                    } catch(e) {}
                });
            }

            if (preco) {
                resultados.push({ url: link, sucesso: true, preco: parseFloat(preco).toFixed(2) });
            } else {
                resultados.push({ url: link, sucesso: false, erro: "Preço oculto" });
            }
        } catch (error) {
            resultados.push({ url: link, sucesso: false, erro: "Bloqueado pelo site" });
        }
    }
    res.json({ sucesso: true, resultados });
});

// ---------------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// ---------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Skynet Proxy rodando na porta ${PORT}`);
});
