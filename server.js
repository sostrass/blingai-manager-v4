require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
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

// 2. RADAR MULTI-CONCORRENTES (Axios + Cheerio)
app.post('/api/scraper/precos-multiplos', async (req, res) => {
    const { urls } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ erro: "Nenhuma URL fornecida." });
    }

    const resultados = [];

    // Roda um "Loop" para cada link que você colou
    for (const url of urls) {
        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                },
                timeout: 10000 
            });

            const $ = cheerio.load(response.data);
            let precoExtraido = null;

            $('script[type="application/ld+json"]').each((i, el) => {
                try {
                    const jsonData = JSON.parse($(el).html());
                    if (jsonData.offers && jsonData.offers.price) precoExtraido = jsonData.offers.price;
                    else if (Array.isArray(jsonData)) {
                        const produto = jsonData.find(item => item['@type'] === 'Product' || item.offers);
                        if (produto && produto.offers && produto.offers.price) precoExtraido = produto.offers.price;
                    }
                } catch (e) {}
            });

            if (!precoExtraido) {
                precoExtraido = $('meta[itemprop="price"]').attr('content') || 
                                $('meta[property="product:price:amount"]').attr('content') ||
                                $('.ui-pdp-price__second-line .andes-money-amount__fraction').first().text(); 
            }

            if (precoExtraido && precoExtraido.toString().trim() !== '') {
                const precoLimpo = precoExtraido.toString().replace(/[^0-9.,]/g, '').trim();
                resultados.push({ url, sucesso: true, preco: precoLimpo });
            } else {
                resultados.push({ url, sucesso: false, erro: "Preço não encontrado." });
            }

        } catch (erro) {
            resultados.push({ url, sucesso: false, erro: "Bloqueado ou fora do ar." });
        }
        
        // Pausa de 1 segundo entre cada site para não ser bloqueado por "ataque"
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    res.json({ sucesso: true, resultados });
});

// 3. MOTOR DE I.A.
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
