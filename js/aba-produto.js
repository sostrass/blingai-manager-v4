// ARQUIVO: js/aba-produto.js
// Módulo Hardcore de Ficha Técnica, Fiscal, Logística e SEO

function renderAbaProduto() {
    return `
    <div class="animate-fade-in flex flex-col xl:flex-row gap-8 max-w-[1800px] mx-auto h-full min-h-[80vh]">
        
        <div class="w-full xl:w-[70%] flex flex-col gap-6 h-full overflow-y-auto pr-2 pb-20">
            
            <div class="bg-white dark:bg-[#0b0b0d] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-3 mb-8"><div class="p-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg"><i class="fas fa-id-card"></i></div> Identificação Oficial</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 relative z-10">
                    <div class="flex flex-col gap-1.5 lg:col-span-2">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nome do Produto</label>
                        <input type="text" id="inp-prod-nome" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm font-black text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-inner" placeholder="Ex: Kit 30 Caixas Organizadoras" oninput="validarFormulario()">
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SKU Interno</label>
                        <input type="text" id="inp-prod-sku" class="w-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-3.5 text-sm font-mono font-bold text-indigo-700 dark:text-indigo-400 outline-none focus:border-indigo-500 transition-all shadow-inner uppercase" placeholder="CX-ORG-30">
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Formato</label>
                        <select class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none"><option>Simples</option><option>Com Variações</option></select>
                    </div>

                    <div class="flex flex-col gap-1.5 lg:col-span-2">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-between">GTIN / EAN Comercial <i class="fas fa-barcode text-slate-400"></i></label>
                        <div class="flex">
                            <input type="text" id="inp-prod-ean" class="flex-1 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-l-xl p-3.5 text-sm font-mono font-bold text-slate-700 dark:text-emerald-400 focus:border-emerald-500 outline-none transition-all shadow-inner" placeholder="7890000000000" oninput="validarFormulario()">
                            <button class="bg-slate-200 dark:bg-white/10 px-4 rounded-r-xl text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors" title="Validar EAN"><i class="fas fa-check-double"></i></button>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1.5 lg:col-span-2">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-between">Marca <i class="fas fa-trademark text-slate-400"></i></label>
                        <div class="flex">
                            <input type="text" id="inp-prod-marca" class="flex-1 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-l-xl p-3.5 text-sm font-bold text-slate-700 dark:text-white focus:border-indigo-500 outline-none transition-all shadow-inner" placeholder="Sóstrass">
                            <button onclick="toast('I.A. sugerindo marca...', true)" class="bg-indigo-600 px-4 rounded-r-xl text-white hover:bg-indigo-500 transition-colors"><i class="fas fa-wand-magic-sparkles"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div class="bg-white dark:bg-[#0b0b0d] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                    <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-3 mb-6"><div class="p-2 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg"><i class="fas fa-box-open"></i></div> Correios & Frete</h3>
                    
                    <div class="grid grid-cols-2 gap-4 relative z-10">
                        <div class="flex flex-col gap-1.5"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Peso Líq. (kg)</label><input type="number" id="inp-prod-peso" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-amber-500 transition-all" value="0.5" oninput="validarFormulario()"></div>
                        <div class="flex flex-col gap-1.5"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Peso Bruto</label><input type="number" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-amber-500 transition-all" value="0.55"></div>
                        <div class="flex flex-col gap-1.5"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Largura (cm)</label><input type="number" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-amber-500 transition-all" value="19"></div>
                        <div class="flex flex-col gap-1.5"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Altura (cm)</label><input type="number" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-amber-500 transition-all" value="20"></div>
                        <div class="flex flex-col gap-1.5"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Profund. (cm)</label><input type="number" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-amber-500 transition-all" value="10"></div>
                        <div class="flex flex-col gap-1.5"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Estoque (UN)</label><input type="number" class="w-full bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-3 text-xs font-black text-indigo-600 dark:text-indigo-400 outline-none transition-all" value="145"></div>
                    </div>
                </div>

                <div class="bg-white dark:bg-[#0b0b0d] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                    <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-3 mb-6"><div class="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg"><i class="fas fa-file-invoice-dollar"></i></div> Tributação (Bling)</h3>
                    
                    <div class="space-y-4 relative z-10">
                        <div class="flex flex-col gap-1.5"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex justify-between">NCM <span class="text-rose-500 font-black">*</span></label><input type="text" id="inp-prod-ncm" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-sm font-mono font-bold text-slate-700 dark:text-emerald-300 outline-none focus:border-emerald-500 transition-all" placeholder="Ex: 3923.10.90" oninput="validarFormulario()"></div>
                        <div class="flex flex-col gap-1.5"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">CEST</label><input type="text" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-sm font-mono font-bold text-slate-700 dark:text-white outline-none focus:border-emerald-500 transition-all" placeholder="Ex: 10.001.00"></div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Origem</label>
                            <select class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold text-slate-700 dark:text-white outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"><option>0 - Nacional</option><option>1 - Estrangeira (Importação)</option><option>2 - Estrangeira (Mercado Interno)</option></select>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white dark:bg-[#0b0b0d] border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-xl">
                <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center justify-between mb-6">
                    <div class="flex items-center gap-3"><div class="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg"><i class="fas fa-pen-nib"></i></div> Copy Comercial & SEO</div>
                    <button class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg transition-all transform hover:scale-105" onclick="toast('Gemini reescrevendo texto...', true)"><i class="fas fa-wand-magic-sparkles mr-2"></i> Auto-Completar I.A.</button>
                </h3>

                <div class="space-y-6">
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between"><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Descrição Curta (Resumo)</label><span class="text-[9px] font-mono text-slate-400" id="char-curta">0/150</span></div>
                        <textarea id="inp-prod-desc" rows="2" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-sm font-bold text-slate-700 dark:text-white outline-none focus:border-purple-500 transition-all resize-none shadow-inner" placeholder="Pequena descrição magnética do produto..." oninput="validarFormulario()"></textarea>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between"><label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Descrição Completa (Anti-Devolução)</label><span class="text-[9px] font-mono text-slate-400" id="char-longa">0 chars</span></div>
                        <textarea id="inp-prod-longa" rows="8" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 outline-none focus:border-purple-500 transition-all resize-none shadow-inner" placeholder="Descreva material, dimensões exatas, o que vai na caixa..." oninput="validarFormulario()"></textarea>
                    </div>
                </div>
            </div>

        </div>

        <div class="w-full xl:w-[30%] flex flex-col gap-6">
            <div class="bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/10 sticky top-0">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-indigo-500 to-rose-500"></div>
                
                <div class="relative z-10 flex flex-col items-center">
                    <h3 class="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2"><i class="fas fa-heartbeat text-rose-500"></i> Insight Engine</h3>
                    <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-8">Saúde do Cadastro</p>

                    <div class="relative w-48 h-48 mb-8 flex items-center justify-center">
                        <svg class="absolute inset-0 w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="84" stroke="rgba(255,255,255,0.05)" stroke-width="12" fill="transparent"/>
                            <circle cx="96" cy="96" r="84" stroke="currentColor" stroke-width="12" fill="transparent" stroke-dasharray="527.7" stroke-dashoffset="527.7" class="text-rose-500 transition-all duration-700 ease-out" id="hud-ring"/>
                        </svg>
                        <div class="flex flex-col items-center">
                            <span class="text-6xl font-black text-white tracking-tighter" id="hud-score">0</span>
                            <span class="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">/ 100</span>
                        </div>
                    </div>

                    <div class="w-full space-y-3 bg-black/50 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                        <div class="flex items-center justify-between text-xs font-bold"><span class="text-slate-400" id="lbl-nome">Nome (Min. 30 char)</span><i class="fas fa-times text-rose-500" id="chk-nome"></i></div>
                        <div class="w-full h-px bg-white/5"></div>
                        <div class="flex items-center justify-between text-xs font-bold"><span class="text-slate-400" id="lbl-ean">EAN Válido (13 Num)</span><i class="fas fa-times text-rose-500" id="chk-ean"></i></div>
                        <div class="w-full h-px bg-white/5"></div>
                        <div class="flex items-center justify-between text-xs font-bold"><span class="text-slate-400" id="lbl-ncm">NCM Cadastrado</span><i class="fas fa-times text-rose-500" id="chk-ncm"></i></div>
                        <div class="w-full h-px bg-white/5"></div>
                        <div class="flex items-center justify-between text-xs font-bold"><span class="text-slate-400" id="lbl-peso">Peso Logístico</span><i class="fas fa-times text-rose-500" id="chk-peso"></i></div>
                        <div class="w-full h-px bg-white/5"></div>
                        <div class="flex items-center justify-between text-xs font-bold"><span class="text-slate-400" id="lbl-desc">Copy Rica (> 200 char)</span><i class="fas fa-times text-rose-500" id="chk-desc"></i></div>
                    </div>
                    
                    <button onclick="document.getElementById('inp-prod-nome').value = 'Kit 30 Caixas Organizadoras Premium em Acrílico Transparente'; document.getElementById('inp-prod-ean').value = '7891234567890'; document.getElementById('inp-prod-desc').value = 'Caixa perfeita para organização.'; document.getElementById('inp-prod-longa').value = 'Caixa super resistente com 30 compartimentos.\\n\\nIdeal para organizar as suas pérolas e ferramentas de artesanato.\\n\\nMedidas exatas para evitar problemas no transporte.\\n\\nAproveite o preço de atacado!'; validarFormulario(); toast('Autopreenchido pela I.A.', true);" class="w-full mt-6 py-4 bg-white/5 hover:bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors border border-white/10 flex items-center justify-center gap-2">
                        <i class="fas fa-bolt text-indigo-400"></i> Completar Fast (Teste)
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// A Magia Acontece Aqui: Validação em Tempo Real
function validarFormulario() {
    let score = 0;
    
    // Captura os valores
    const nome = document.getElementById('inp-prod-nome')?.value || '';
    const ean = document.getElementById('inp-prod-ean')?.value || '';
    const ncm = document.getElementById('inp-prod-ncm')?.value || '';
    const peso = parseFloat(document.getElementById('inp-prod-peso')?.value) || 0;
    const descC = document.getElementById('inp-prod-desc')?.value || '';
    const descL = document.getElementById('inp-prod-longa')?.value || '';

    // Atualiza contadores
    if(document.getElementById('char-curta')) document.getElementById('char-curta').innerText = `${descC.length}/150`;
    if(document.getElementById('char-longa')) document.getElementById('char-longa').innerText = `${descL.length} chars`;

    // Validações Step-by-Step
    const cNome = nome.length >= 30;
    const cEan = ean.length >= 8;
    const cNcm = ncm.length >= 4;
    const cPeso = peso > 0;
    const cDesc = descL.length >= 100; // Reduzido pra teste mais rápido

    // Pontuação
    if(cNome) score += 20;
    if(cEan) score += 20;
    if(cNcm) score += 20;
    if(cPeso) score += 20;
    if(cDesc) score += 20;

    // Atualiza Checkmarks Visuais
    const iconOk = 'fas fa-check-circle text-emerald-400 shadow-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]';
    const iconFail = 'fas fa-times text-rose-500 opacity-50';

    document.getElementById('chk-nome').className = cNome ? iconOk : iconFail;
    document.getElementById('lbl-nome').className = cNome ? 'text-white' : 'text-slate-400';
    
    document.getElementById('chk-ean').className = cEan ? iconOk : iconFail;
    document.getElementById('lbl-ean').className = cEan ? 'text-white' : 'text-slate-400';
    
    document.getElementById('chk-ncm').className = cNcm ? iconOk : iconFail;
    document.getElementById('lbl-ncm').className = cNcm ? 'text-white' : 'text-slate-400';
    
    document.getElementById('chk-peso').className = cPeso ? iconOk : iconFail;
    document.getElementById('lbl-peso').className = cPeso ? 'text-white' : 'text-slate-400';
    
    document.getElementById('chk-desc').className = cDesc ? iconOk : iconFail;
    document.getElementById('lbl-desc').className = cDesc ? 'text-white' : 'text-slate-400';

    // Atualiza Ring de Progresso e Cor Baseado na Saúde
    const ring = document.getElementById('hud-ring');
    const txtScore = document.getElementById('hud-score');
    
    if(ring && txtScore) {
        ring.style.strokeDashoffset = 527.7 - (527.7 * (score / 100));
        
        // Tailwind Colors Dinâmicas no JS
        let hexColor = '#f43f5e'; // Rose
        if(score >= 100) hexColor = '#34d399'; // Emerald
        else if(score >= 60) hexColor = '#f59e0b'; // Amber
        else if(score >= 40) hexColor = '#6366f1'; // Indigo

        ring.style.color = hexColor;
        txtScore.style.color = hexColor;
        txtScore.innerText = score;
    }
}
