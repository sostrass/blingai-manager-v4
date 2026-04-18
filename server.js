require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio'); // O novo espião ultraleve
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/produtos/monitoramento', async (req, res) => {
    const catalogo = [
        { sku: "CX-ORG-30", nome: "Kit 30 Caixas Organizadoras", custo: 45.00, preco_atual: 89.90, margem: "49%", status: "Lucro Ideal" },
        { sku: "PER-6MM-BR", nome: "Pérola Branca 6mm (Pacote 500g)", custo: 20.00, preco_atual: 35.00, margem: "42%", status: "Alerta - Concorrente Baixou" }
    ];
    res.json({ sucesso: true, dados: catalogo });
});

// MOTOR ESPIÃO FANTASMA (AXIOS + CHEERIO)
app.post('/api/scraper/preco', async (req, res) => {
    const { url_concorrente } = req.body;
    if (!url_concorrente) return res.status(400).json({ erro: "URL não fornecida." });

    try {
        // Disfarce máximo para parecer um humano no Chrome
        const response = await axios.get(url_concorrente, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
            },
            timeout: 15000 // Desiste se demorar mais de 15 segundos
        });

        // Carrega o site na memória do servidor
        const $ = cheerio.load(response.data);
        let precoExtraido = null;

        // LÓGICA MULTI-SITE: Procura o preço dependendo do site
        if (url_concorrente.includes('mercadolivre.com')) {
            // Pega os centavos e os reais separados e junta, ou tenta a meta tag oficial
            precoExtraido = $('meta[itemprop="price"]').attr('content') || $('.andes-money-amount__fraction').first().text();
        } 
        else {
            // Varredura Genérica (Nuvemshop, Tray, Lojas Independentes)
            precoExtraido = $('meta[property="product:price:amount"]').attr('content') || 
                            $('[itemprop="price"]').attr('content') || 
                            $('.price').first().text() || 
                            $('.preco-por').first().text();
        }

        if (precoExtraido && precoExtraido.trim() !== '') {
            res.json({ sucesso: true, preco_concorrente: precoExtraido.trim() });
        } else {
            res.json({ sucesso: false, erro: "Preço oculto no código deste site." });
        }

    } catch (erro) {
        // Agora sabemos se o erro foi bloqueio real do site
        res.status(500).json({ erro: "O site bloqueou o servidor ou demorou a responder." });
    }
});

// MOTOR DE I.A.
app.post('/api/ia/gerar-descricao', async (req, res) => {
    const { nome_produto, caracteristicas } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `Crie uma descrição técnica para: ${nome_produto}. Foco em artesanato e medidas exatas.`;
        const result = await model.generateContent(prompt);
        res.json({ sucesso: true, descricao_gerada: result.response.text() });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao processar I.A." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 BlingAI Manager online na porta ${PORT}`));
