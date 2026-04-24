// ARQUIVO: js/aba-precificacao.js
// Motor de Markup Reverso por Marketplace

function renderAbaPrecificacao() {
    return `
    <div class="animate-fade-in max-w-[1400px] mx-auto pb-20 space-y-8">
        
        <div class="bg-white dark:bg-[#0b0b0d] border border-slate-200 dark:border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 z-0 pointer-events-none"></div>
            
            <div class="relative z-10 flex flex-col lg:flex-row gap-10 items-center">
                
                <div class="w-full lg:w-1/3">
                    <h3 class="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-3 flex items-center gap-3"><div class="p-2.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg"><i class="fas fa-balance-scale"></i></div> Motor Reverso</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Informe o Custo do Fornecedor e o sistema irá calcular de baixo para cima o valor de venda exato para cada marketplace, garantindo a sua margem líquida alvo.</p>
                </div>
                
                <div class="hidden lg:block w-px h-32 bg-slate-200 dark:bg-white/10"></div>
                
                <div class="w-full lg:flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="flex flex-col gap-2">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Custo Fornecedor</label>
                        <div class="flex items-center bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all px-4 py-3 shadow-inner">
                            <span class="text-slate-400 font-bold text-sm mr-2">R$</span>
                            <input type="number" id="calc-custo" value="45.00" class="bg-transparent outline-none text-slate-800 dark:text-white font-black w-full" oninput="dispararCalculadora()">
                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Emb. Adicional</label>
                        <div class="flex items-center bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl focus-within:border-emerald-500 transition-all px-4 py-3 shadow-inner">
                            <span class="text-slate-400 font-bold text-sm mr-2">R$</span>
                            <input type="number" id="calc-embex" value="0.00" class="bg-transparent outline-none text-slate-800 dark:text-white font-black w-full" oninput="dispararCalculadora()">
                        </div>
                    </div>

                    <div class="bg-slate-100 dark:bg-black/60 rounded-2xl p-4 flex flex-col items-center justify-center border border-slate-200 dark:border-white/5 shadow-inner">
                        <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Custo Saída Total</span>
                        <span class="text-2xl font-black text-rose-500" id="lbl-custo-total">R$ 45,00</span>
                    </div>
                    
                    <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 flex flex-col items-center justify-center border border-indigo-200 dark:border-indigo-500/20 shadow-inner">
                        <span class="text-[9px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-1">Margem Líq. Alvo</span>
                        <span class="text-2xl font-black text-indigo-600 dark:text-indigo-300">30%</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4 my-8 px-4">
            <span class="w-12 h-px bg-slate-300 dark:bg-white/10"></span>
            <h3 class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Painel Multi-Canais (8 Marketplaces)</h3>
            <span class="flex-1 h-px bg-slate-300 dark:bg-white/10"></span>
        </div>

        <div class="grid grid-cols-1 gap-6" id="mkt-container"></div>
    </div>
    `;
}

function dispararCalculadora() {
    const custoForn = parseFloat(document.getElementById('calc-custo')?.value) || 0;
    const custoEmbEx = parseFloat(document.getElementById('calc-embex')?.value) || 0;
    
    // Simula as variáveis globais que viriam do seu banco.js real (Menu Custos Globais)
    const gEmb = 3; const gImposto = 6; const gCartao = 2.5; const gMargem = 30; 
    
    const custoTotalSaida = custoForn + gEmb + custoEmbEx;
    const divLabel = document.getElementById('lbl-custo-total');
    if(divLabel) divLabel.innerText = `R$ ${f2(custoTotalSaida)}`;
    
    const divGeralBase = 1 - ((gImposto + gCartao + gMargem)/100);
    const container = document.getElementById('mkt-container'); 
    
    if(!container) return;
    container.innerHTML = '';
    
    // Renderiza cada Card (Mapeia a constante PLATS importada do banco.js)
    if(typeof PLATS !== 'undefined') {
        PLATS.forEach(pl => {
            let sug = 0; let divisorA = 0; let taxasStr = '';

            // Regra ML vs Outros
            if(pl.id === 'mercadolivre') {
                let tMenor = pl.fees[0].d; let tMaior = pl.fees[1].d; let tFix = pl.fees[2].d;
                let dMenor = divGeralBase - (tMenor/100);
                let pMenor = dMenor > 0 ? (custoTotalSaida + tFix) / dMenor : 0;
                
                if(pMenor > 0 && pMenor <= 79) { sug = pMenor; divisorA = dMenor; }
                else { let dMaior = divGeralBase - (tMaior/100); sug = dMaior > 0 ? (custoTotalSaida + tFix) / dMaior : 0; divisorA = dMaior; }
                taxasStr = `${tMenor}% a ${tMaior}%`;
            } else {
                let tPerc = 0; let tFixo = 0;
                pl.fees.forEach(f => { if(f.l.includes('%')) tPerc += f.d; else tFixo += f.d; });
                divisorA = divGeralBase - (tPerc/100);
                sug = divisorA > 0 ? (custoTotalSaida + tFixo) / divisorA : 0;
                taxasStr = `${tPerc}% + R$${tFixo}`;
            }

            // Componente de UI para cada Marketplace
            container.innerHTML += `
                <div class="bg-white dark:bg-[rgba(15,15,17,0.5)] border border-slate-200 dark:border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 group hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-colors duration-500 shadow-md">
                    
                    <div class="flex items-center gap-5 w-full lg:w-[30%]">
                        <div class="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center shadow-inner text-3xl border border-slate-100 dark:border-transparent">
                            ${typeof getSvg === 'function' ? getSvg(pl.id, '100%').replace(/class=".*"/, '') : '<i class="fas fa-store"></i>'}
                        </div>
                        <div>
                            <h4 class="font-black text-slate-800 dark:text-white text-lg tracking-tight">${pl.name}</h4>
                            <span class="inline-block mt-1 bg-slate-100 dark:bg-black/50 text-slate-500 px-3 py-1 rounded border border-slate-200 dark:border-white/10 text-[9px] font-bold uppercase tracking-widest">Taxas: ${taxasStr}</span>
                        </div>
                    </div>
                    
                    <div class="w-full lg:w-1/4 bg-slate-50 dark:bg-black/40 p-5 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center shadow-inner relative">
                        <span class="absolute -top-2.5 bg-slate-800 text-white px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-md">Preço Atual Bling</span>
                        <p class="text-2xl font-black text-slate-400 mt-2">R$ 0,00</p>
                    </div>

                    <div class="hidden lg:flex w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 items-center justify-center text-slate-400 border border-slate-200 dark:border-white/10 shadow-sm"><i class="fas fa-arrow-right"></i></div>

                    <div class="w-full lg:w-1/4 text-center">
                        <p class="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mb-1.5 flex justify-center gap-2"><i class="fas fa-shield-alt text-emerald-400"></i> Preço Seguro</p>
                        <p class="text-5xl font-black text-emerald-500 tracking-tighter drop-shadow-sm">R$ ${f2(sug)}</p>
                        <p class="text-[9px] font-mono font-bold text-slate-400 mt-3 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 inline-block px-3 py-1 rounded-lg">Divisor Real: ${divisorA.toFixed(4)}</p>
                    </div>

                    <div class="w-full lg:w-auto lg:min-w-[180px] text-right">
                        <button onclick="toast('O valor de R$ ${f2(sug)} foi acatado para a ${pl.name} no Bling!')" class="w-full py-4 lg:py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition shadow-lg shadow-indigo-600/30 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                            Acatar Valor <i class="fas fa-check"></i>
                        </button>
                    </div>

                </div>`;
        });
    } else {
        container.innerHTML = '<p class="text-white">Banco de dados (PLATS) não carregado.</p>';
    }
}
