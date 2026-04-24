// ARQUIVO: js/aba-precificacao.js
// Motor Financeiro Multi-Canal com Markup Reverso Absoluto

function renderAbaPrecificacao() {
    return `
    <div class="animate-fade-up flex flex-col gap-8 max-w-[1800px] mx-auto h-full pb-20">
        
        <div class="glass-card rounded-3xl p-8 relative overflow-hidden group border-t-4 border-indigo-500">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 z-0 pointer-events-none"></div>
            
            <div class="relative z-10 flex flex-col xl:flex-row gap-10 items-center">
                
                <div class="w-full xl:w-1/3">
                    <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3 flex items-center gap-3">
                        <div class="p-2.5 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl shadow-inner"><i class="fas fa-balance-scale"></i></div> 
                        Custo Base Operacional
                    </h3>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Estes são os custos físicos do produto. O motor aplicará a sua Margem Alvo (30%) e as Taxas do Canal sobre o <b>Preço Final</b> (Markup Reverso) para que você não tenha prejuízo de 1 centavo.</p>
                </div>
                
                <div class="hidden xl:block w-px h-24 bg-slate-200 dark:bg-white/5"></div>
                
                <div class="w-full xl:flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="flex flex-col gap-2">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fornecedor (R$)</label>
                        <div class="flex items-center bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all px-4 py-3.5 shadow-inner">
                            <span class="text-slate-400 font-bold text-xs mr-2">R$</span>
                            <input type="number" id="calc-custo" value="45.00" class="bg-transparent outline-none text-slate-800 dark:text-white font-black w-full" oninput="simularPrecosMaster()">
                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Emb. Extra (R$)</label>
                        <div class="flex items-center bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all px-4 py-3.5 shadow-inner">
                            <span class="text-slate-400 font-bold text-xs mr-2">R$</span>
                            <input type="number" id="calc-embex" value="0.00" class="bg-transparent outline-none text-slate-800 dark:text-white font-black w-full" oninput="simularPrecosMaster()">
                        </div>
                    </div>

                    <div class="bg-slate-100 dark:bg-black/40 rounded-2xl p-4 flex flex-col items-center justify-center border border-slate-200 dark:border-white/5 shadow-inner">
                        <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Custo Físico Total</span>
                        <span class="text-2xl font-black text-rose-500" id="lbl-custo-total">R$ 45,00</span>
                    </div>
                    
                    <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 flex flex-col items-center justify-center border border-indigo-200 dark:border-indigo-500/20 shadow-inner">
                        <span class="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Margem Líquida Alvo</span>
                        <span class="text-2xl font-black text-indigo-600 dark:text-indigo-400">30%</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4 my-2 px-4">
            <span class="w-12 h-px bg-slate-300 dark:bg-white/10"></span>
            <h3 class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest"><i class="fas fa-satellite-dish text-indigo-400 mr-2"></i> Precisão Multi-Canal (Preço de Capa)</h3>
            <span class="flex-1 h-px bg-slate-300 dark:bg-white/10"></span>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6" id="mkt-container">
            </div>

    </div>
    `;
}

// LÓGICA CORE DE PRECIFICAÇÃO (MARKUP REVERSO CORRETO)
function simularPrecosMaster() {
    // 1. Variáveis Base Locais
    const custoForn = parseFloat(document.getElementById('calc-custo')?.value) || 0;
    const custoEmbEx = parseFloat(document.getElementById('calc-embex')?.value) || 0;
    
    // 2. Variáveis Globais da sua Operação (Do seu banco.js)
    const gEmb = 3; 
    const gImposto = 6; 
    const gCartao = 2.5; 
    const gMargem = 30; // O que você quer que sobre líquido em %
    
    // Custo físico puro (Mercadoria + Caixas/Fitas)
    const custoTotalSaida = custoForn + gEmb + custoEmbEx;
    const lblCusto = document.getElementById('lbl-custo-total');
    if(lblCusto) lblCusto.innerText = `R$ ${f2(custoTotalSaida)}`;
    
    const container = document.getElementById('mkt-container'); 
    if(!container) return;
    container.innerHTML = '';
    
    // 3. Processamento individual de cada Plataforma
    if(typeof PLATS !== 'undefined') {
        PLATS.forEach(pl => {
            let pSugerido = 0; 
            let pDivisor = 0; 
            let taxaPercAplicada = 0;
            let taxaFixAplicada = 0;

            // FÓRMULA SAGRADA (ML tem regras de Faixa)
            if(pl.id === 'mercadolivre') {
                let tMenor = pl.fees[0].d; let tMaior = pl.fees[1].d; let tFix = pl.fees[2].d;
                
                // Tenta calcular primeiro para produtos < R$ 79
                let divMenor = 1 - ((gImposto + gCartao + gMargem + tMenor)/100);
                let pMenor = divMenor > 0 ? (custoTotalSaida + tFix) / divMenor : 0;
                
                if(pMenor > 0 && pMenor <= 79) { 
                    pSugerido = pMenor; pDivisor = divMenor; taxaPercAplicada = tMenor; taxaFixAplicada = tFix;
                } else { 
                    // Passou de R$79, usa a taxa maior
                    let divMaior = 1 - ((gImposto + gCartao + gMargem + tMaior)/100); 
                    pSugerido = divMaior > 0 ? (custoTotalSaida + tFix) / divMaior : 0; 
                    pDivisor = divMaior; taxaPercAplicada = tMaior; taxaFixAplicada = tFix;
                }
            } else {
                // Outros Marketplaces
                pl.fees.forEach(f => { if(f.l.includes('%')) taxaPercAplicada += f.d; else taxaFixAplicada += f.d; });
                pDivisor = 1 - ((gImposto + gCartao + gMargem + taxaPercAplicada)/100);
                pSugerido = pDivisor > 0 ? (custoTotalSaida + taxaFixAplicada) / pDivisor : 0;
            }

            // 4. "RAIO-X" DA MARGEM (A Prova Real)
            // Mostra em Reais (R$) o quanto o marketplace está cobrando do preço FINAL.
            const valorMktMorde = (pSugerido * (taxaPercAplicada / 100)) + taxaFixAplicada;
            const valorImpostos = pSugerido * ((gImposto + gCartao) / 100);
            const valorLucroReal = pSugerido * (gMargem / 100); // Tem que ser exatamente a sua margem

            // Cor Dinâmica da Plataforma
            let borderColor = 'border-slate-200 dark:border-white/5';
            if(pl.id === 'mercadolivre') borderColor = 'border-yellow-500/30';
            else if(pl.id === 'shopee') borderColor = 'border-rose-500/30';
            else if(pl.id === 'shein') borderColor = 'border-slate-800/30';

            // 5. Componente Visual Hardcore (Grid + Glass)
            container.innerHTML += `
                <div class="bg-white dark:bg-[#0b0b0d] border ${borderColor} rounded-3xl p-6 flex flex-col gap-6 shadow-lg group hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300">
                    
                    <div class="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-4">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-slate-200 dark:border-transparent">
                                ${typeof getSvg === 'function' ? getSvg(pl.id, '100%').replace(/class=".*"/, '') : '<i class="fas fa-store text-slate-500"></i>'}
                            </div>
                            <div>
                                <h4 class="font-black text-slate-800 dark:text-white text-base tracking-tight">${pl.name}</h4>
                                <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-black/40 px-2 py-0.5 rounded border border-slate-200 dark:border-white/5">Taxa de Venda: ${taxaPercAplicada}% + R$${taxaFixAplicada}</span>
                            </div>
                        </div>
                        <button onclick="toast('R$ ${f2(pSugerido)} salvo para o ${pl.name} no Bling!')" class="bg-indigo-50 hover:bg-indigo-600 dark:bg-indigo-500/10 dark:hover:bg-indigo-600 text-indigo-600 hover:text-white dark:text-indigo-400 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-indigo-200 dark:border-indigo-500/30 shadow-sm flex items-center gap-2">
                            Acatar Valor <i class="fas fa-check-circle"></i>
                        </button>
                    </div>

                    <div class="flex gap-4 items-center bg-slate-50 dark:bg-black/40 p-4 rounded-2xl shadow-inner border border-slate-100 dark:border-white/5">
                        <div class="flex-1 space-y-3">
                            <div class="flex justify-between items-center text-xs">
                                <span class="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[9px]"><i class="fas fa-hand-holding-usd text-rose-400 mr-1"></i> Taxa do Canal (R$)</span>
                                <span class="font-black text-rose-500">- R$ ${f2(valorMktMorde)}</span>
                            </div>
                            <div class="w-full h-px bg-slate-200 dark:bg-white/5"></div>
                            <div class="flex justify-between items-center text-xs">
                                <span class="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[9px]"><i class="fas fa-receipt text-amber-400 mr-1"></i> Impostos/Cartão (R$)</span>
                                <span class="font-black text-amber-500">- R$ ${f2(valorImpostos)}</span>
                            </div>
                            <div class="w-full h-px bg-slate-200 dark:bg-white/5"></div>
                            <div class="flex justify-between items-center text-xs bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                                <span class="font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest text-[9px]"><i class="fas fa-piggy-bank mr-1"></i> Seu Lucro Livre</span>
                                <span class="font-black text-emerald-500">+ R$ ${f2(valorLucroReal)}</span>
                            </div>
                        </div>

                        <div class="w-px h-24 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>

                        <div class="w-full sm:w-[40%] text-center pl-0 sm:pl-4">
                            <p class="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1.5 flex justify-center gap-1.5"><i class="fas fa-shield-alt text-emerald-400 mt-0.5"></i> Preço de Venda Final</p>
                            <p class="text-4xl font-black text-slate-800 dark:text-emerald-400 tracking-tighter drop-shadow-sm">R$ ${f2(pSugerido)}</p>
                        </div>
                    </div>
                </div>`;
        });
    } else {
        container.innerHTML = '<p class="text-white">Banco de dados (PLATS) não carregado. Recarregue a página.</p>';
    }
}
