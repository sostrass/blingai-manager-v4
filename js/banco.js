// ARQUIVO: js/banco.js
// Responsável por centralizar os dados, plataformas e regras matemáticas do PIM.

const f2 = n => parseFloat(n||0).toFixed(2);

// 1. Ícones das Plataformas (As 8 Plataformas Integradas)
const PSVG = {
    shopee: '<span class="text-rose-500 font-black text-[12px]">Sh</span>',
    mercadolivre: '<i class="fas fa-handshake text-yellow-500 text-[12px]"></i>',
    tiktok: '<i class="fab fa-tiktok text-slate-800 text-[12px]"></i>',
    shein: '<span class="text-slate-800 font-black text-[10px]">SH</span>',
    amazon: '<i class="fab fa-amazon text-amber-500 text-[12px]"></i>',
    magalu: '<span class="text-blue-500 font-black text-[12px]">M</span>',
    americanas: '<span class="text-red-500 font-black text-[12px]">A</span>',
    nuvemshop: '<i class="fas fa-cloud text-indigo-500 text-[12px]"></i>'
};

const getSvg = (id, sz=24) => `<div style="width:${sz}px;height:${sz}px;flex-shrink:0;" class="bg-white rounded border border-slate-200 shadow-sm flex items-center justify-center">${PSVG[id] || ''}</div>`;

// 2. Taxas e Regras de Negócio (As 8 Plataformas)
const PLATS = [
    { id: 'shopee', name: 'Shopee', color: 'rose', fees: [{k:'com',l:'Comissão (%)',d:20},{k:'txs',l:'Tx Serviço Fixo (R$)',d:3},{k:'txd',l:'Tx Frete (R$)',d:0}] },
    { id: 'mercadolivre', name: 'Mercado Livre', color: 'yellow', fees: [{k:'com_menor',l:'Com < R$79 (%)',d:12},{k:'com_maior',l:'Com > R$79 (%)',d:16},{k:'frete',l:'Frete Fixo (R$)',d:0}] },
    { id: 'tiktok', name: 'TikTok Shop', color: 'cyan', fees: [{k:'com',l:'Comissão (%)',d:5},{k:'fix',l:'Tx Fixa (R$)',d:0}] },
    { id: 'shein', name: 'Shein', color: 'purple', fees: [{k:'com',l:'Comissão (%)',d:18},{k:'log',l:'Logística (R$)',d:0}] },
    { id: 'amazon', name: 'Amazon', color: 'amber', fees: [{k:'com',l:'Comissão (%)',d:15},{k:'fix',l:'Tx Fixa (R$)',d:0}] },
    { id: 'magalu', name: 'Magalu', color: 'blue', fees: [{k:'com',l:'Comissão (%)',d:16},{k:'fix',l:'Tx Fixa (R$)',d:0}] },
    { id: 'americanas', name: 'Americanas', color: 'red', fees: [{k:'com',l:'Comissão (%)',d:16},{k:'fix',l:'Tx Fixa (R$)',d:0}] },
    { id: 'nuvemshop', name: 'Nuvemshop', color: 'indigo', fees: [{k:'gate',l:'Gateway (%)',d:2},{k:'fix',l:'Custo Fixo (R$)',d:0}] }
];

// 3. Inicialização do Banco de Dados (LocalStorage)
let globalCosts = JSON.parse(localStorage.getItem('sostrass_gc')) || { imposto: 6, cartao: 2.5, embalagem: 3, ganho: 30 }; 

let products = JSON.parse(localStorage.getItem('sostrass_prods')) || [
    { id: 1, sku: 'CX-ORG-30', code: '40028922', ean: '7891234567890', marca: 'Sóstrass', cond: 'Novo', formato: 'Simples', name: 'Kit 30 Caixas Organizadoras', price: 89.90, cost: 45.00, stock: 145, cat: 'Organização', hist:[], platforms:['shopee','mercadolivre'], desc:'', descComp:'', descData:{}, log:{peso: 0.5, alt: 20, lar: 19, pro: 10, embExtra: 0, freteExtra:0}, fisc:{ncm:'3923.10.90', cest: '10.001.00', origem:'0', cfop:'5102', icms:0}, pendenteBling: true, mktPrices: { shopee: 110.00, mercadolivre: 95.00 } },
    { id: 2, sku: 'PER-6MM-BR', code: '40028923', ean: '', marca: 'Sóstrass', cond: 'Novo', formato: 'Simples', name: 'Pérola Branca 6mm ABS (500g)', price: 35.00, cost: 18.00, stock: 12, cat: 'Pedrarias', hist:[], platforms:['shopee', 'nuvemshop'], desc:'', descComp:'', descData:{}, log:{peso: 0.5, alt: 10, lar: 10, pro: 10, embExtra: 0, freteExtra:0}, fisc:{ncm:'3926.90.90', cest:'', origem:'1', cfop:'5102', icms:0}, pendenteBling: false, mktPrices: {} }
];

let mpRates = JSON.parse(localStorage.getItem('sostrass_rates')) || {};
let systemEvents = JSON.parse(localStorage.getItem('sostrass_events')) || [{ time: 'Agora', msg: 'Sistema PIM inicializado.', type: 'sys' }];

// Configurações de API
let API_BASE = localStorage.getItem('sostrass_apibase') || 'https://api-bling-dajp.up.railway.app';
let MODELO_IA = localStorage.getItem('sostrass_model') || 'gemini-2.5-flash';

// 4. Fórmulas Matemáticas Mestre
// Custo Base = Custo Fornecedor + Custo Global Embalagem + Embalagem Extra SKU + Frete Extra SKU
const getBase = p => (parseFloat(p.cost)||0) + (parseFloat(globalCosts.embalagem)) + (parseFloat(p.log?.embExtra)||0) + (parseFloat(p.log?.freteExtra)||0);

// Margem Líquida %
const calcMargin = (p, c) => p > 0 ? ((p - c)/p)*100 : 0;

// O Motor de Precificação Reverso (Calcula Preço Marketplace)
const calcMkt = (custoBaseProd, platId, prodId) => {
    const rates = (mpRates[prodId] && mpRates[prodId][platId]) ? mpRates[prodId][platId] : {};
    const pl = PLATS.find(x => x.id === platId);
    
    // Imposto% + Cartão% + Margem Alvo% (O que você quer garantir no bolso)
    const taxasGloPct = (parseFloat(globalCosts.ganho) + parseFloat(globalCosts.imposto) + parseFloat(globalCosts.cartao));

    if(!pl) return 0;

    if(platId === 'mercadolivre') {
        const comMenor = parseFloat(rates['com_menor'] ?? pl.fees[0].d); 
        const comMaior = parseFloat(rates['com_maior'] ?? pl.fees[1].d); 
        const frete = parseFloat(rates['frete'] ?? pl.fees[2].d);
        
        let dMenor = 1 - ((taxasGloPct + comMenor)/100); 
        let pMenor = dMenor > 0 ? (custoBaseProd + frete) / dMenor : 0;
        
        if(pMenor > 0 && pMenor <= 79) return pMenor;
        
        let dMaior = 1 - ((taxasGloPct + comMaior)/100); 
        return dMaior > 0 ? (custoBaseProd + frete) / dMaior : 0;
    }
    
    let pct=0, fix=0; 
    pl.fees.forEach(f => { 
        const v = parseFloat(rates[f.k] ?? f.d)||0; 
        if(f.l.includes('%')) pct+=v; else fix+=v; 
    });
    
    const totalCustoFixo = custoBaseProd + fix; 
    const div = 1 - ((taxasGloPct + pct)/100);
    return div > 0 ? totalCustoFixo / div : totalCustoFixo * 2;
};
