require('dotenv').config();
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 1. DATA GRID (A Bolsa de Valores)
app.get('/api/produtos/monitoramento', async (req, res) => {
    const catalogo = [
        { sku: "CX-ORG-30", nome: "Kit 30 Caixas Organizadoras", custo: 45.00, preco_atual: 89.90, margem: "49%", status: "Lucro Ideal" },
        { sku: "PER-6MM-BR", nome: "Pérola Branca 6mm (Pacote 500g)", custo: 20.00, preco_atual: 35.00, margem: "42%", status: "Alerta - Concorrente Baixou" }
    ];
    res.json({ sucesso: true, dados: catalogo });
});

// 2. ROBÔ ESPIÃO "SNIPER" (Atualizado para ML)
app.post('/api/scraper/preco', async (req, res) => {
    const { url_concorrente } = req.body;
    if (!url_concorrente) return res.status(400).json({ erro: "URL não fornecida." });

    try {
        const browser = await puppeteer.launch({ 
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Disfarce anti-bloqueio
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');
        await page.goto(url_concorrente, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // Tenta achar o preço no Mercado Livre
        const preco = await page.evaluate(() => {
            const el = document.querySelector('.andes-money-amount__fraction');
            return el ? el.innerText : "Preço oculto ou layout desconhecido";
        });

        await browser.close();
        res.json({ sucesso: true, preco_concorrente: preco });
    } catch (erro) {
        res.status(500).json({ erro: "O site demorou a responder ou bloqueou o acesso." });
    }
});

// 3. I.A. DESCRITIVA
app.post('/api/ia/gerar-descricao', async (req, res) => {
    const { nome_produto, caracteristicas } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `Crie uma descrição técnica e comercial para: ${nome_produto}. Use linguagem clara para artesãos, detalhe medidas e foque em evitar devoluções.`;
        const result = await model.generateContent(prompt);
        res.json({ sucesso: true, descricao_gerada: result.response.text() });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao processar I.A." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 BlingAI Manager online na porta ${PORT}`));
