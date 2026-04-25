// ARQUIVO: js/catalogo-logic.js
// Motor 100% amarrado para o Front-End do Terminal

// ARQUIVO: js/catalogo-logic.js

const f2 = n => parseFloat(n||0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Banco de Dados Mockado (Incluindo a métrica de queda de 63,6% que você pediu)
const dbAnuncios = [
    { 
        sku: 'CX-ORG-30', name: 'Kit 30 Caixas Organizadoras (30 Div)', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=150', 
        estoque: 145, max: 200, price: 89.90, mkt: 85.00, 
        views: 1240, vVar: 25.0, sales: 145, sVar: 12.0, conv: '11,6%',
        seo: 95, sync: true 
    },
    { 
        sku: 'PER-6MM-BR', name: 'Pérola Branca 6mm ABS (500g)', img: 'https://images.unsplash.com/photo-1596751303254-e69fb2fc7d23?auto=format&fit=crop&q=80&w=150', 
        estoque: 12, max: 500, price: 35.00, mkt: 38.00, 
        views: 11, vVar: -63.6, sales: 1, sVar: -50.0, conv: '9,0%', // A métrica da sua imagem!
        seo: 60, sync: false 
    },
    { 
        sku: 'TES-ROSE', name: 'Tesoura Vintage Rose Gold', img: 'https://images.unsplash.com/photo-1617325247661-675ab03407bd?auto=format&fit=crop&q=80&w=150', 
        estoque: 50, max: 100, price: 45.00, mkt: 45.00, 
        views: 890, vVar: 5.4, sales: 45, sVar: 2.1, conv: '5,0%',
        seo: 85, sync: true 
    }
];

let estadoFiltro = { texto: '', btn: 'todos' };

// Sistema de Notificação
function toast(msg) {
    const c = document.getElementById('toast-container'); const t = document.createElement('div');
    t.className = `bg-[#0B0B0C] border border-emerald-500/50 text-white px-6 py-4 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-3 animate-fade-up`;
    t.innerHTML = `<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-l-xl"></div><i class="fas fa-check-circle text-emerald-400 text-xl"></i> ${msg}`; 
    c.appendChild(t); setTimeout(() => { t.style.opacity='0'; setTimeout(()=>t.remove(),300); }, 3000);
}

// Ações Globais do Header
function comandoAcaoGlobal(acao, btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Processando...`;
    setTimeout(() => {
        btn.innerHTML = orig;
        if(acao === 'exportar') toast("Planilha XLSX gerada com as variações D-7.");
        if(acao === 'sync') toast("Preços e Estoques sincronizados com o Bling.");
    }, 1500);
}

// Gestor de Filtros
function aplicarFiltro(tipo, btnElement) {
    estadoFiltro.btn = tipo;
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.className = "filter-btn px-4 py-2 bg-white/5 text-slate-400 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition border border-white/5 flex items-center gap-1.5";
    });
    btnElement.className = "filter-btn active px-4 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition shadow-md flex items-center gap-1.5";
    renderTable();
}

// Formatador da Seta do Mercado Livre
const formataVar = (val) => {
    if(val > 0) return `<span class="text-emerald-500 font-black"><i class="fas fa-caret-up mr-0.5"></i>${val}%</span>`;
    if(val < 0) return `<span class="text-rose-500 font-black"><i class="fas fa-caret-down mr-0.5"></i>${Math.abs(val)}%</span>`;
    return `<span class="text-slate-500 font-black">-%</span>`;
};

// Renderização Master da Tabela
function renderTable(buscaTexto = null) {
    if(buscaTexto !== null) estadoFiltro.texto = buscaTexto;
    const root = document.getElementById('terminal-body');
    let html = '';

    // Filtragem
    let filtrados = dbAnuncios.filter(p => p.sku.toLowerCase().includes(estadoFiltro.texto.toLowerCase()) || p.name.toLowerCase().includes(estadoFiltro.texto.toLowerCase()));
    if (estadoFiltro.btn === 'estoque') filtrados = filtrados.filter(p => p.estoque <= 20);
    if (estadoFiltro.btn === 'vendas') filtrados = filtrados.filter(p => p.sales > 50);

    if (filtrados.length === 0) {
        root.innerHTML = `<tr><td colspan="6" class="px-6 py-10 text-center text-slate-500 text-xs font-mono">NENHUM ANÚNCIO CORRESPONDE AOS CRITÉRIOS.</td></tr>`; return;
    }

    filtrados.forEach((p) => {
        const percEst = (p.estoque / p.max) * 100;
        const corEst = p.estoque <= 20 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-indigo-500';
        const txtEst = p.estoque <= 20 ? 'text-rose-400 animate-pulse' : 'text-slate-300';
        const seoCor = p.seo > 80 ? 'text-emerald-400' : 'text-rose-400';
        
        let buybox = p.price > p.mkt 
            ? `<span class="text-rose-500 text-[9px] font-black uppercase bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 mt-1">Caro (+R$${f2(p.price - p.mkt)})</span>` 
            : `<span class="text-emerald-500 text-[9px] font-black uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 mt-1">Competitivo</span>`;

        html += `
        <tr class="hover:bg-white/[0.03] transition-colors group">
            <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                    <img src="${p.img}" class="w-10 h-10 rounded-lg object-cover border border-white/10 opacity-80 group-hover:opacity-100">
                    <div class="flex flex-col">
                        <span class="text-sm font-black text-white tracking-tight">${p.sku}</span>
                        <span class="text-[10px] font-bold text-slate-500 truncate w-48">${p.name}</span>
                    </div>
                </div>
            </td>
            
            <td class="px-6 py-4 pr-8">
                <div class="flex justify-between text-[10px] font-mono mb-1.5"><span class="font-black ${txtEst}">${p.estoque} UN</span><span class="text-slate-600">Max ${p.max}</span></div>
                <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden"><div class="h-full ${corEst}" style="width: ${percEst}%"></div></div>
            </td>

            <td class="px-6 py-4">
                <div class="flex flex-col items-start">
                    <span class="text-sm font-black text-white">R$ ${f2(p.price)}</span>
                    ${buybox}
                </div>
            </td>

            <td class="px-6 py-4 bg-white/[0.01]">
                <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px]">
                    <div class="flex justify-between items-center border-b border-white/5 pb-1">
                        <span class="text-slate-400 font-bold"><i class="fas fa-eye w-4"></i> Visitas</span>
                        <div class="flex gap-3"><span class="text-white font-black">${p.views}</span> ${formataVar(p.vVar)}</div>
                    </div>
                    <div class="flex justify-between items-center border-b border-white/5 pb-1">
                        <span class="text-slate-400 font-bold"><i class="fas fa-shopping-cart w-4"></i> Vendas</span>
                        <div class="flex gap-3"><span class="text-white font-black">${p.sales}</span> ${formataVar(p.sVar)}</div>
                    </div>
                    <div class="flex justify-between items-center col-span-2">
                        <span class="text-slate-400 font-bold"><i class="fas fa-chart-line w-4"></i> Conversão</span>
                        <span class="text-indigo-400 font-black">${p.conv}</span>
                    </div>
                </div>
            </td>

            <td class="px-6 py-4 text-center">
                <div class="inline-flex w-8 h-8 rounded-full border-2 border-current ${seoCor} items-center justify-center text-[9px] font-black">${p.seo}</div>
            </td>

            <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                    <button onclick="copiarSKU('${p.sku}')" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-emerald-500 text-slate-300 hover:text-white transition flex items-center justify-center" title="Copiar SKU"><i class="fas fa-copy text-xs"></i></button>
                    <button onclick="window.open('https://www.mercadolivre.com.br/','_blank')" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-yellow-500 text-slate-300 hover:text-white transition flex items-center justify-center" title="Ver no ML"><i class="fas fa-external-link-alt text-xs"></i></button>
                    <button onclick="window.location.href='produto-editor.html?id=${p.sku}'" class="px-3 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[9px] uppercase tracking-widest transition flex items-center gap-1.5"><i class="fas fa-edit"></i> Editar</button>
                </div>
            </td>
        </tr>`;
    });
    root.innerHTML = html;
}

// Comando de Copiar (Isolado)
window.copiarSKU = function(sku) {
    navigator.clipboard.writeText(sku);
    toast(`SKU ${sku} copiado!`);
};

// Start
window.onload = () => renderTable();

// Estado Global da Tela
let estadoAtual = { filtroTexto: '', filtroBotao: 'todos' };

function toast(msg) {
    const c = document.getElementById('toast-container'); const t = document.createElement('div');
    t.className = `bg-[#0B0B0C] border border-emerald-500/50 text-white px-6 py-4 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-3`;
    t.innerHTML = `<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div><i class="fas fa-check-circle text-emerald-400 text-xl"></i> ${msg}`; 
    c.appendChild(t); setTimeout(() => { t.style.opacity='0'; setTimeout(()=>t.remove(),300); }, 3000);
}

// === INTERAÇÕES DE BOTÕES SUPERIORES ===
function exportarPlanilha(btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-circle-notch fa-spin text-emerald-500"></i> <span>Processando...</span>`;
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        toast("Arquivo Sóstrass_Catalogo.xlsx baixado com sucesso!");
    }, 1500);
}

function sincronizarCanaisGlobais(btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-sync-alt fa-spin"></i> <span>Sincronizando...</span>`;
    btn.classList.replace('bg-indigo-600', 'bg-indigo-800');
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.replace('bg-indigo-800', 'bg-indigo-600');
        btn.disabled = false;
        toast("Sincronização com Bling, ML e Shopee concluída.");
        // Zera as pendências visualmente
        dbAnuncios.forEach(p => p.sync = true);
        renderTable();
    }, 2000);
}

// === LÓGICA DE FILTROS ===
function aplicarFiltro(tipo, btnElement) {
    // Atualiza estado global
    estadoAtual.filtroBotao = tipo;
    
    // UI: Reseta todos os botões
    const botoes = document.querySelectorAll('.filter-btn');
    botoes.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-md', 'active');
        b.classList.add('bg-white/5', 'text-slate-400');
    });

    // UI: Ativa o botão clicado
    btnElement.classList.remove('bg-white/5', 'text-slate-400');
    btnElement.classList.add('bg-indigo-600', 'text-white', 'shadow-md', 'active');

    renderTable(); // Chama o render que vai ler o estadoAtual
}

// Substitua a função renderTerminal no seu js/catalogo-logic.js por esta versão com os Comandos Hardcore:

function renderTerminal(filtro = '') {
    const root = document.getElementById('terminal-body');
    const prods = typeof products !== 'undefined' ? products : [];
    
    const items = [
        { sku: 'CX-ORG-30', name: 'Kit 30 Caixas Organizadoras', price: 89.90, mkt: 85.00, views: 1240, vVar: 12, sales: 145, sVar: 5, estoque: 145, max: 200, seo: 95, plats: ['mercadolivre', 'shopee', 'amazon', 'nuvemshop'] },
        { sku: 'PER-6MM-BR', name: 'Pérola Branca 6mm ABS (500g)', price: 35.00, mkt: 38.00, views: 85, vVar: -63, sales: 1, sVar: -50, estoque: 12, max: 500, seo: 45, plats: ['shopee', 'shein', 'tiktok'] },
        { sku: 'TES-ROSE', name: 'Tesoura Vintage Rose Gold', price: 45.00, mkt: 45.00, views: 890, vVar: 5, sales: 45, sVar: 2, estoque: 50, max: 100, seo: 82, plats: ['mercadolivre', 'magalu', 'americanas'] }
    ];

    root.innerHTML = items.filter(i => i.sku.includes(filtro.toUpperCase()) || i.name.toUpperCase().includes(filtro.toUpperCase())).map(p => {
        const pVar = p.price > p.mkt ? `<span class="text-rose-500 text-[9px] font-black">ALTO (+R$${(p.price - p.mkt).toFixed(2)})</span>` : `<span class="text-emerald-500 text-[9px] font-black">COMPETITIVO</span>`;
        const estPerc = (p.estoque / p.max) * 100;
        
        return `
        <tr class="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer" onclick="window.location.href='produto-editor.html?id=${p.sku}'">
            <td class="px-6 py-5">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:border-indigo-500 transition-colors"><i class="fas fa-box text-xl"></i></div>
                    <div>
                        <p class="text-sm font-black text-slate-800 dark:text-white tracking-tight">${p.sku}</p>
                        <p class="text-[10px] font-bold text-slate-500 truncate w-48">${p.name}</p>
                    </div>
                </div>
            </td>
            
            <td class="px-6 py-5">
                <div class="flex flex-col gap-2">
                    <div class="flex gap-1.5">
                        ${PLATS_CONFIG.map(pl => {
                            const ativo = p.plats.includes(pl.id);
                            return `<div class="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black border ${ativo ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-500' : 'bg-slate-100 dark:bg-white/5 border-transparent text-slate-300 dark:text-slate-700'}" title="${pl.name}">${pl.name.substring(0,2)}</div>`;
                        }).join('')}
                    </div>
                    <div class="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full ${p.estoque < 20 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse' : 'bg-indigo-500'} transition-all duration-1000" style="width: ${estPerc}%"></div>
                    </div>
                </div>
            </td>
            
            <td class="px-6 py-5">
                <div class="flex flex-col">
                    <span class="text-sm font-black text-slate-800 dark:text-white">R$ ${p.price.toFixed(2)}</span>
                    ${pVar}
                </div>
            </td>
            
            <td class="px-6 py-5 text-xs font-bold">
                <div class="grid grid-cols-2 gap-x-4">
                    <div class="flex flex-col"><span class="text-[8px] text-slate-400 uppercase tracking-widest">Visitas</span><span class="${p.vVar < 0 ? 'text-rose-500' : 'text-emerald-500'}">${p.views} <i class="fas fa-caret-${p.vVar < 0 ? 'down' : 'up'}"></i></span></div>
                    <div class="flex flex-col"><span class="text-[8px] text-slate-400 uppercase tracking-widest">Vendas</span><span>${p.sales}</span></div>
                </div>
            </td>
            
            <td class="px-6 py-5 text-center">
                <div class="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 ${p.seo < 50 ? 'border-rose-500 text-rose-500' : 'border-emerald-500 text-emerald-500'} text-[10px] font-black shadow-lg">
                    ${p.seo}
                </div>
            </td>
            
            <td class="px-6 py-5 text-right">
                <div class="flex items-center justify-end gap-2">
                    
                    <button onclick="comandoCopiar(event, '${p.sku}')" class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center group/btn" title="Copiar SKU">
                        <i class="fas fa-copy text-xs group-hover/btn:scale-110 transition-transform"></i>
                    </button>

                    <button onclick="comandoAbrirML(event, '${p.sku}')" class="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-yellow-500 hover:text-white hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all flex items-center justify-center group/btn" title="Ver no Mercado Livre">
                        <i class="fas fa-external-link-alt text-xs group-hover/btn:scale-110 transition-transform"></i>
                    </button>

                    <button onclick="comandoEditar(event, '${p.sku}')" class="px-4 h-9 rounded-xl bg-slate-100 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all border border-transparent hover:border-indigo-400 flex items-center justify-center gap-2 font-black text-[9px] uppercase tracking-widest group/btn" title="Abrir Editor">
                        <i class="fas fa-edit text-xs group-hover/btn:-translate-y-0.5 transition-transform"></i> Editar
                    </button>
                    
                </div>
            </td>
        </tr>
        `;
    }).join('');
}

// ==========================================
// FUNÇÕES DOS COMANDOS (Ações dos Botões)
// ==========================================

function comandoCopiar(evento, sku) {
    evento.stopPropagation(); // Impede que o clique abra o editor da linha inteira
    navigator.clipboard.writeText(sku);
    
    // Usa o Toast já existente no seu sistema
    if(typeof toast === 'function') {
        toast(`SKU ${sku} copiado!`);
    } else {
        alert(`SKU ${sku} copiado!`);
    }
}

function comandoAbrirML(evento, sku) {
    evento.stopPropagation(); 
    // Simula abrir o link real do produto no ML
    window.open('https://www.mercadolivre.com.br/anuncios/lista?search=' + sku, '_blank');
}

function comandoEditar(evento, sku) {
    evento.stopPropagation();
    window.location.href = 'produto-editor.html?id=' + sku;
}

// === O MOTOR DE RENDERIZAÇÃO ===
function renderTable() {
    const root = document.getElementById('terminal-body');
    let html = '';

    // 1. Aplica Filtros Cruzados (Texto + Botão)
    let filtrados = dbAnuncios.filter(p => p.sku.toLowerCase().includes(estadoAtual.filtroTexto.toLowerCase()) || p.name.toLowerCase().includes(estadoAtual.filtroTexto.toLowerCase()));

    if (estadoAtual.filtroBotao === 'estoque') filtrados = filtrados.filter(p => p.estoque <= 20);
    if (estadoAtual.filtroBotao === 'buybox') filtrados = filtrados.filter(p => p.preco > p.precoMercado);
    if (estadoAtual.filtroBotao === 'seo') filtrados = filtrados.filter(p => p.seo < 80);

    if (filtrados.length === 0) {
        root.innerHTML = `<tr><td colspan="6" class="px-6 py-12 text-center"><div class="flex flex-col items-center justify-center text-slate-500"><i class="fas fa-ghost text-4xl mb-3 opacity-50"></i><p class="text-xs font-mono uppercase tracking-widest">Nenhum ativo corresponde aos filtros atuais.</p></div></td></tr>`;
        return;
    }

    // 2. Monta o HTML
    filtrados.forEach((p) => {
        const percEstoque = (p.estoque / p.estoqueMax) * 100;
        const estColor = p.estoque <= 20 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]' : (percEstoque < 50 ? 'bg-amber-500' : 'bg-indigo-500');
        const estText = p.estoque <= 20 ? 'text-rose-400 font-black animate-pulse' : 'text-slate-300';
        
        let marketBadge = '';
        if(p.preco > p.precoMercado) marketBadge = `<span class="bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest"><i class="fas fa-arrow-up"></i> Alto (+R$${f2(p.preco - p.precoMercado)})</span>`;
        else if(p.preco < p.precoMercado) marketBadge = `<span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest"><i class="fas fa-trophy"></i> Competitivo</span>`;
        else marketBadge = `<span class="bg-slate-500/10 text-slate-400 border border-slate-500/20 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">Na Média</span>`;

        const formatVar = (v) => {
            if(v > 0) return `<span class="text-emerald-400 text-[10px] font-black ml-1"><i class="fas fa-caret-up"></i> ${v}%</span>`;
            if(v < 0) return `<span class="text-rose-500 text-[10px] font-black ml-1"><i class="fas fa-caret-down"></i> ${Math.abs(v)}%</span>`;
            return `<span class="text-slate-500 text-[10px] font-black ml-1">-</span>`;
        };

        const seoColor = p.seo >= 80 ? 'text-emerald-400' : (p.seo >= 50 ? 'text-amber-400' : 'text-rose-500');
        const syncIcon = p.sync ? '<i class="fas fa-check text-emerald-500"></i>' : '<i class="fas fa-sync-alt fa-spin text-amber-500"></i>';

        html += `
            <tr class="hover:bg-white/[0.02] transition-colors group cursor-pointer" onclick="window.location.href='produto-editor.html?id=${p.sku}'">
                <td class="px-6 py-5">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-black overflow-hidden shrink-0 border border-white/10 group-hover:border-indigo-500/50 transition shadow-inner"><img src="${p.img}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"></div>
                        <div class="flex flex-col"><span class="text-sm font-black text-white tracking-tight group-hover:text-indigo-400 transition">${p.sku}</span><span class="text-[10px] font-bold text-slate-500 truncate w-56">${p.name}</span></div>
                    </div>
                </td>
                <td class="px-6 py-5">
                    <div class="flex flex-col gap-1.5 w-full pr-8">
                        <div class="flex justify-between text-[10px] font-mono"><span class="${estText}">${p.estoque} un.</span><span class="text-slate-600">/ ${p.estoqueMax}</span></div>
                        <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner"><div class="h-full ${estColor} progress-fill" style="width: ${percEstoque}%"></div></div>
                    </div>
                </td>
                <td class="px-6 py-5">
                    <div class="flex flex-col items-start gap-1"><span class="text-sm font-black text-white">R$ ${f2(p.preco)}</span>${marketBadge}</div>
                </td>
                <td class="px-6 py-5 text-xs font-bold">
                    <div class="grid grid-cols-2 gap-x-6 gap-y-1">
                        <div class="flex flex-col"><span class="text-[9px] font-black text-slate-600 uppercase tracking-widest">Visitas</span><div class="flex items-baseline"><span class="text-xs font-black text-slate-200">${p.views}</span> ${formatVar(p.viewsVar)}</div></div>
                        <div class="flex flex-col"><span class="text-[9px] font-black text-slate-600 uppercase tracking-widest">Conversão</span><span class="text-xs font-black text-indigo-400">${p.conv}%</span></div>
                    </div>
                </td>
                <td class="px-6 py-5 text-center">
                    <div class="flex flex-col items-center justify-center gap-2">
                        <div class="relative w-10 h-10 flex items-center justify-center"><svg class="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-md"><circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="3"></circle><circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="${100 - p.seo}" class="${seoColor}"></circle></svg><span class="text-[9px] font-black ${seoColor}">${p.seo}</span></div>
                        <div class="bg-black/50 p-1.5 rounded-lg border border-white/5 shadow-inner" title="${p.sync ? 'Sincronizado' : 'Aguardando API'}">${syncIcon}</div>
                    </div>
                </td>
                <td class="px-6 py-5 text-right">
                    <div class="flex items-center justify-end gap-2">
                        <button onclick="event.stopPropagation(); window.location.href='produto-editor.html?id=${p.sku}'" class="px-4 py-2 bg-white/5 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 hover:border-indigo-500 shadow-sm flex items-center gap-2"><i class="fas fa-edit"></i> Editar</button>
                    </div>
                </td>
            </tr>
        `;
    });

    root.innerHTML = html;
}

// Boot inicial
window.onload = () => { setTimeout(() => renderTable(), 100); };
