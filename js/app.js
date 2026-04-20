// ==========================================
// ESTADOS GLOBAIS E BANCO DE DADOS
// ==========================================
let API_BASE = localStorage.getItem('sostrass_apibase') || 'http://localhost:3000';
let modeloIA = localStorage.getItem('sostrass_model') || 'gemini-2.5-flash';
let serverOnline = false;

let globalCosts = JSON.parse(localStorage.getItem('sostrass_gc')) || { imposto: 12, embalagem: 3, cartao: 2.5, frete: 0, ganho: 30 };
let mpRates = JSON.parse(localStorage.getItem('sostrass_rates')) || {};
let produtoAtual = null;

const PLATS = [
    { id: 'shopee', name: 'Shopee', color: 'text-rose-500', fees: [{ k: 'comissao', l: 'Comissão', u: '%', d: 14 }, { k: 'fixo', l: 'Fixo', u: 'R$', d: 3 }] },
    { id: 'mercadolivre', name: 'Mercado Livre', color: 'text-yellow-600', fees: [{ k: 'comissao', l: 'Comissão', u: '%', d: 16 }, { k: 'frete', l: 'Frete', u: 'R$', d: 0 }] },
    { id: 'nuvemshop', name: 'Nuvemshop', color: 'text-blue-600', fees: [{ k: 'gateway', l: 'Gateway', u: '%', d: 2 }] }
];

let products = [
    { id: 1, sku: 'CX-ORG-30', name: 'Kit 30 Caixas Organizadoras 20x19cm', price: 89.90, cost: 45.00, stock: 145, cat: 'Caixas', platforms: ['shopee','mercadolivre'], desc: '', descComp: '' },
    { id: 2, sku: 'PER-6MM-BR', name: 'Pérola Branca 6mm ABS (500g)', price: 35.00, cost: 18.00, stock: 430, cat: 'Pedrarias', platforms: ['shopee'], desc: '', descComp: '' }
];

// ==========================================
// FUNÇÕES MATEMÁTICAS NÚCLEO
// ==========================================
const f2 = n => parseFloat(n||0).toFixed(2);

function getBaseCost(prod) {
    const emb = parseFloat(prod.embExtra) > 0 ? parseFloat(prod.embExtra) : parseFloat(globalCosts.embalagem);
    const fre = parseFloat(prod.freteExtra) > 0 ? parseFloat(prod.freteExtra) : parseFloat(globalCosts.frete);
    return (parseFloat(prod.cost) || 0) + emb + fre;
}

function calcBlingPrice(prod) { 
    const b = getBaseCost(prod); 
    const d = 1 - (parseFloat(globalCosts.ganho) + parseFloat(globalCosts.imposto) + parseFloat(globalCosts.cartao)) / 100; 
    return d > 0 ? b / d : b * 3; 
}

function calcMktPrice(bp, platId, prodId) {
    const pl = PLATS.find(x => x.id === platId); if(!pl) return bp;
    const rates = (mpRates[prodId] && mpRates[prodId][platId]) ? mpRates[prodId][platId] : {};
    let pct = 0, fx = 0; pl.fees.forEach(f => { const v = parseFloat(rates[f.k] ?? f.d) || 0; if (f.u === '%') pct += v; else fx += v; });
    let p = bp + fx; return (pct > 0 && pct < 100) ? p / (1 - pct / 100) : p;
}

function calcMargin(price, tCost) { return price > 0 ? ((price - tCost) / price) * 100 : 0; }

// ==========================================
// NAVEGAÇÃO MODULAR (SPA)
// ==========================================
async function carregarView(viewName) {
    const contentArea = document.getElementById('app-content');
    contentArea.innerHTML = '<div class="flex items-center justify-center h-full text-indigo-400"><i class="fas fa-circle-notch fa-spin text-4xl"></i></div>';
    
    // Atualiza o Menu
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg'));
    document.getElementById(`nav-${viewName}`).classList.add('bg-indigo-600', 'text-white', 'shadow-lg');

    try {
        // Busca o arquivo HTML isolado da pasta views
        const response = await fetch(`views/${viewName}.html`);
        if (!response.ok) throw new Error("Página não encontrada.");
        
        const html = await response.text();
        contentArea.innerHTML = html;

        // Se a view carregada for o catálogo, dispara a renderização da tabela
        if(viewName === 'catalogo') {
            if(typeof inicializarCatalogo === 'function') inicializarCatalogo();
        }
    } catch (error) {
        contentArea.innerHTML = `<div class="text-center mt-20 text-rose-500 font-bold"><i class="fas fa-exclamation-triangle text-4xl mb-4"></i><p>Erro ao carregar o módulo: ${viewName}.html</p><p class="text-sm font-normal text-slate-500 mt-2">Crie o arquivo dentro da pasta /views/</p></div>`;
    }
}

// Inicializa a aplicação
window.onload = () => {
    carregarView('catalogo');
};
