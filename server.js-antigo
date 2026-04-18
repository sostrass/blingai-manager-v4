require('dotenv').config();
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Serve a página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Inicializa a I.A. com a chave que você vai configurar no Railway
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ============================================================================
// 1. DASHBOARD "ESTILO BOLSA DE VALORES"
// ============================================================================
app.get('/api/produtos/monitoramento', async (req, res) => {
    // Dados simulados baseados no seu catálogo real (Ex: Sóstrass)
    const catalogo = [
        { 
            sku: "CX-ORG-30", 
            nome: "Kit 30 Caixas Organizadoras", 
            custo: 45.00, 
            preco_atual: 89.90, 
            margem: "49%",
            status: "Lucro Ideal",
            tendencia: "estavel"
        },
        { 
            sku: "PER-6MM-BR", 
            nome: "Pérola Branca 6mm (Pacote 500g)", 
            custo: 20.00, 
            preco_atual: 35.00, 
            margem: "42%",
            status: "Alerta - Concorrente Baixou",
            tendencia: "queda"
        }
    ];
    
    res.json({ sucesso: true, dados: catalogo });
});

// ============================================================================
// 2. MOTOR DE VARREDURA (SCRAPER) - MONITOR DE CONCORRENTES
// ============================================================================
app.post('/api/scraper/preco', async (req, res) => {
    const { url_concorrente, seletor_html } = req.body;

    if (!url_concorrente) return res.status(400).json({ erro: "URL não fornecida." });

    try {
        const browser = await puppeteer.launch({ 
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Importante para rodar no Railway
        });
        const page = await browser.newPage();
        await page.goto(url_concorrente, { waitUntil: 'domcontentloaded' });

        const preco_extraido = await page.evaluate((seletor) => {
            const elemento = document.querySelector(seletor);
            return elemento ? elemento.innerText : null;
        }, seletor_html || '.price-tag-fraction'); 

        await browser.close();
        res.json({ sucesso: true, preco_concorrente: preco_extraido });
    } catch (erro) {
        res.status(500).json({ erro: "Falha na varredura." });
    }
});

// ============================================================================
// 3. MOTOR DE I.A. - DESCRITIVOS TÉCNICOS E BLINDAGEM
// ============================================================================
app.post('/api/ia/gerar-descricao', async (req, res) => {
    const { nome_produto, caracteristicas } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        const prompt = `
        Crie uma descrição técnica e comercial "mega ultra detalhada" para o produto: ${nome_produto}.
        Características básicas: ${caracteristicas}.
        
        REGRAS DE OURO:
        - Use linguagem clara para artesãos, mas com autoridade técnica.
        - Detalhe medidas (ex: se for 6mm, reforce que é o tamanho exato para evitar erros).
        - Explique a vantagem real (não resseca, facilidade de organizar por cor).
        - Sem asteriscos ou negritos exagerados.
        - Foco em evitar devoluções por falta de informação.
        `;

        const result = await model.generateContent(prompt);
        const texto = result.response.text();

        res.json({ sucesso: true, descricao_gerada: texto });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao processar I.A." });
    }
});

// Porta dinâmica para o Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 BlingAI Manager v4 online na porta ${PORT}`);
});
