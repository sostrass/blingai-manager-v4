// ARQUIVO: js/catalogo-logic.js
// Motor 100% amarrado para o Front-End do Terminal

const f2 = n => parseFloat(n||0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Banco de Dados de Mock Avançado
const dbAnuncios = [
    { sku: 'CX-ORG-30', name: 'Kit 30 Caixas Organizadoras', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=150', estoque: 145, estoqueMax: 200, preco: 89.90, precoMercado: 85.00, views: 1240, viewsVar: 12, sales: 145, salesVar: 5, conv: 11.6, seo: 95, sync: true },
    { sku: 'PER-6MM-BR', name: 'Pérola Branca 6mm ABS (500g)', img: 'https://images.unsplash.com/photo-1596751303254-e69fb2fc7d23?auto=format&fit=crop&q=80&w=150', estoque: 12, estoqueMax: 500, preco: 35.00, precoMercado: 38.00, views: 11, viewsVar: -63.6, sales: 1, salesVar: -50, conv: 9.0, seo: 60, sync: false },
    { sku: 'TES-ROSE', name: 'Tesoura Vintage Rose Gold', img: 'https://images.unsplash.com/photo-1617325247661-675ab03407bd?auto=format&fit=crop&q=80&w=150', estoque: 50, estoqueMax: 100, preco: 45.00, precoMercado: 45.00, views: 890, viewsVar: 5, sales: 45, salesVar: 2, conv: 5.0, seo: 85, sync: true },
    { sku: 'FIO-SIL-10M', name: 'Fio de Silicone 10m Transparente', img: 'https://images.unsplash.com/photo-1584820927498-cafe8c117769?auto=format&fit=crop&q=80&w=150', estoque: 8, estoqueMax: 300, preco: 12.50, precoMercado: 10.00, views: 340, viewsVar: -10, sales: 20, salesVar: -5, conv: 5.8, seo: 45, sync: true }
];

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

// O Input text chama essa função
function renderTerminal(texto) {
    estadoAtual.filtroTexto = texto;
    renderTable();
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
