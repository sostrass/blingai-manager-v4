// ARQUIVO: js/aba-produto.js
// Módulo de Cadastro Bling e Copywriting SEO

function renderAbaProduto() {
    return `
    <div class="animate-fade-up flex flex-col xl:flex-row gap-8 max-w-[1800px] mx-auto h-full pb-20">
        
        <div class="w-full xl:w-[70%] flex flex-col gap-8 h-full">
            
            <div class="glass-card rounded-3xl p-8 relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px] group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none"></div>
                <h3 class="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3 mb-8"><div class="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl shadow-inner"><i class="fas fa-id-card"></i></div> Identificação Oficial (Bling)</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 relative z-10">
                    <div class="flex flex-col gap-2 xl:col-span-2">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">Nome do Produto <span class="text-indigo-400 opacity-0 group-focus-within:opacity-100 transition-opacity"><i class="fas fa-pen"></i></span></label>
                        <input type="text" id="inp-prod-nome" value="Kit 30 Caixas Organizadoras (30 Divisórias)" class="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-black text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-inner placeholder:text-slate-600" oninput="validarFormulario(); document.getElementById('hdr-nome').value = this.value;">
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">SKU Interno</label>
                        <input type="text" id="inp-prod-sku" value="CX-ORG-30" class="w-full bg-indigo-900/10 border border-indigo-500/30 rounded-xl p-4 text-sm font-mono font-bold text-indigo-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-inner uppercase" oninput="document.getElementById('lbl-sku').innerText = this.value || '---';">
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Formato</label>
                        <select class="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-bold text-slate-300 outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none shadow-inner"><option>Simples (Padrão)</option><option>Com Variações</option></select>
                    </div>

                    <div class="flex flex-col gap-2 xl:col-span-2">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Código GTIN/EAN</label>
                        <div class="flex items-stretch bg-black/40 border border-white/10 rounded-xl overflow-hidden focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all shadow-inner">
                            <div class="px-4 flex items-center justify-center text-slate-500 border-r border-white/10"><i class="fas fa-barcode"></i></div>
                            <input type="text" id="inp-prod-ean" value="7890000000000" class="flex-1 bg-transparent px-4 py-4 text-sm font-mono font-bold text-emerald-400 outline-none" oninput="validarFormulario()">
                            <button onclick="if(typeof toast==='function') toast('EAN validado com sucesso na base nacional.')" class="px-5 bg-white/5 text-slate-400 hover:text-emerald-400 hover:bg-white/10 border-l border-white/10 transition-colors font-bold text-[10px] uppercase tracking-widest" title="Validar EAN">Check</button>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2 xl:col-span-2">
                        <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Marca Oficial</label>
                        <div class="flex items-stretch bg-black/40 border border-white/10 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all shadow-inner">
                            <input type="text" id="inp-prod-marca" value="Sóstrass" class="flex-1 bg-transparent px-4 py-4 text-sm font-bold text-white outline-none">
                            <button onclick="if(typeof chamarIA==='function') chamarIA('inp-prod-marca')" class="px-5 bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest"><i class="fas fa-wand-magic-sparkles"></i> I.A.</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="glass-card rounded-3xl p-8 relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500 opacity-50"></div>
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3"><div class="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl shadow-inner"><i class="fas fa-pen-nib"></i></div> Copy Comercial & SEO</h3>
                    <button class="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg transition-all flex items-center gap-2"><i class="fas fa-robot text-purple-400"></i> Auto-Preencher IA</button>
                </div>

                <div class="space-y-6">
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between items-end"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Descrição Curta (Resumo)</label><span class="text-[10px] font-mono font-bold text-slate-500 bg-black/40 px-2 py-1 rounded" id="char-curta">0/150</span></div>
                        <div class="relative">
                            <textarea id="inp-prod-desc" rows="2" class="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-bold text-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none shadow-inner" placeholder="Pequena descrição magnética..." oninput="validarFormulario()">Caixa perfeita para organização de miçangas e pérolas.</textarea>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between items-end"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Descrição Longa (Detalhes e Medidas)</label><span class="text-[10px] font-mono font-bold text-slate-500 bg-black/40 px-2 py-1 rounded" id="char-longa">0 chars</span></div>
                        <textarea id="inp-prod-longa" rows="8" class="w-full bg-black/40 border border-white/10 rounded-xl p-5 text-[13px] leading-relaxed font-medium text-slate-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none shadow-inner" placeholder="Especifique materiais, medidas exatas, o que vai na caixa..." oninput="validarFormulario()">Material: Acrílico de alta resistência (não quebra fácil).
Possui 30 compartimentos ajustáveis para organização avançada.
Tampas com trava dupla de segurança anti-queda.

Medidas Oficiais:
- Largura: 20cm
- Altura: 19cm
- Profundidade: 10cm</textarea>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div class="glass-card rounded-3xl p-8 border-t-4 border-emerald-500 group hover:bg-[rgba(24,24,27,0.6)] transition-colors">
                    <h3 class="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3"><div class="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><i class="fas fa-file-invoice-dollar"></i></div> Tributação</h3>
                    <div class="space-y-5">
                        <div class="flex flex-col gap-2"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">NCM (Obrigatório) <span class="text-rose-500">*</span></label><input type="text" id="inp-prod-ncm" value="3923.10.90" class="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-mono font-black text-emerald-300 focus:border-emerald-500 outline-none transition-all shadow-inner text-center tracking-[0.2em]" oninput="validarFormulario()"></div>
                        <div class="flex flex-col gap-2"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">CEST</label><input type="text" class="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-mono font-bold text-slate-300 focus:border-emerald-500 outline-none transition-all text-center tracking-[0.1em]" placeholder="00.000.00"></div>
                        <div class="flex flex-col gap-2"><label class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Origem</label><select class="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-bold text-slate-300 outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"><option>0 - Nacional</option><option>1 - Estrangeira (Imp. Direta)</option></select></div>
                    </div>
                </div>

                <div class="glass-card rounded-3xl p-8 border-t-4 border-amber-500 group hover:bg-[rgba(24,24,27,0.6)] transition-colors">
                    <h3 class="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3"><div class="p-2 bg-amber-500/20 text-amber-400 rounded-lg"><i class="fas fa-box"></i></div> Correios & Frete</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex flex-col gap-2"><label class="text-[9px] font-black text-slate-500 uppercase tracking-widest">Peso Líq. (kg) <span class="text-rose-500">*</span></label><input type="number" id="inp-prod-peso" value="0.5" class="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-sm font-black text-amber-400 focus:border-amber-500 outline-none transition-all shadow-inner text-center" oninput="validarFormulario()"></div>
                        <div class="flex flex-col gap-2"><label class="text-[9px] font-black text-slate-500 uppercase tracking-widest">Peso Bru. (kg)</label><input type="number" class="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-sm font-black text-slate-300 focus:border-amber-500 outline-none transition-all shadow-inner text-center" value="0.55"></div>
                        
                        <div class="flex flex-col gap-2"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Largura (cm)</label><input type="number" class="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs font-bold text-slate-300 focus:border-amber-500 outline-none transition-all text-center" value="20"></div>
                        <div class="flex flex-col gap-2"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Altura (cm)</label><input type="number" class="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs font-bold text-slate-300 focus:border-amber-500 outline-none transition-all text-center" value="19"></div>
                        <div class="flex flex-col gap-2 col-span-2"><label class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Profundidade (cm)</label><input type="number" class="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs font-bold text-slate-300 focus:border-amber-500 outline-none transition-all text-center" value="10"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full xl:w-[30%]">
            <div class="glass-card rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/10 sticky top-0">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-indigo-500 to-rose-500"></div>
                
                <div class="relative z-10 flex flex-col items-center">
                    <h3 class="text-xs font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2"><i class="fas fa-heartbeat text-rose-500"></i> Insight Engine</h3>
                    <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-8">Saúde do Cadastro Geral</p>

                    <div class="relative w-48 h-48 mb-8 flex items-center justify-center">
                        <svg class="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-xl">
                            <circle cx="96" cy="96" r="84" stroke="rgba(255,255,255,0.05)" stroke-width="16" fill="transparent"/>
                            <circle cx="96" cy="96" r="84" stroke="currentColor" stroke-width="16" fill="transparent" stroke-dasharray="527.7" stroke-dashoffset="527.7" class="circle-progress text-rose-500" id="hud-ring"/>
                        </svg>
                        <div class="flex flex-col items-center bg-black/40 w-32 h-32 rounded-full border border-white/5 shadow-inner justify-center backdrop-blur-sm">
                            <span class="text-5xl font-black text-white tracking-tighter" id="hud-score">0</span>
                            <span class="text-[9px] font-black text-slate-500 mt-1 uppercase tracking-widest">Score</span>
                        </div>
                    </div>

                    <div class="w-full bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md shadow-inner">
                        <h4 class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Verificação de Requisitos</h4>
                        <div class="space-y-3.5">
                            <div class="flex items-center justify-between text-[11px] font-bold"><span class="text-slate-400 transition-colors" id="lbl-nome">Título (+30 char)</span><i class="fas fa-times text-rose-500 transition-colors" id="chk-nome"></i></div>
                            <div class="flex items-center justify-between text-[11px] font-bold"><span class="text-slate-400 transition-colors" id="lbl-ean">EAN Comercial Válido</span><i class="fas fa-times text-rose-500 transition-colors" id="chk-ean"></i></div>
                            <div class="flex items-center justify-between text-[11px] font-bold"><span class="text-slate-400 transition-colors" id="lbl-ncm">NCM Faturável</span><i class="fas fa-times text-rose-500 transition-colors" id="chk-ncm"></i></div>
                            <div class="flex items-center justify-between text-[11px] font-bold"><span class="text-slate-400 transition-colors" id="lbl-peso">Peso Logístico</span><i class="fas fa-times text-rose-500 transition-colors" id="chk-peso"></i></div>
                            <div class="flex items-center justify-between text-[11px] font-bold"><span class="text-slate-400 transition-colors" id="lbl-desc">Copy Rica (+100 char)</span><i class="fas fa-times text-rose-500 transition-colors" id="chk-desc"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    `;
}

// === LÓGICA DE VALIDAÇÃO GAMIFICADA (Em Tempo Real) ===
function validarFormulario() {
    let score = 0;
    
    // Captura os valores digitados na hora
    const nome = document.getElementById('inp-prod-nome')?.value || '';
    const ean = document.getElementById('inp-prod-ean')?.value || '';
    const ncm = document.getElementById('inp-prod-ncm')?.value || '';
    const peso = parseFloat(document.getElementById('inp-prod-peso')?.value) || 0;
    const descC = document.getElementById('inp-prod-desc')?.value || '';
    const descL = document.getElementById('inp-prod-longa')?.value || '';

    // Atualiza mini contadores
    if(document.getElementById('char-curta')) document.getElementById('char-curta').innerText = `${descC.length}/150`;
    if(document.getElementById('char-longa')) document.getElementById('char-longa').innerText = `${descL.length} chars`;

    // Regras de Negócio (Hardcore)
    const cNome = nome.length >= 30;
    const cEan = ean.length >= 8; // Mínimo para não quebrar API
    const cNcm = ncm.length >= 4;
    const cPeso = peso > 0;
    const cDesc = descL.length >= 100;

    // Pontuação Ponderada
    if(cNome) score += 20;
    if(cEan) score += 20;
    if(cNcm) score += 20;
    if(cPeso) score += 20;
    if(cDesc) score += 20;

    // Classes Visuais do Tailwind para os ícones
    const iconOk = 'fas fa-check-circle text-emerald-400 shadow-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] transform scale-110 transition-all';
    const iconFail = 'fas fa-times text-rose-500 opacity-50 transition-all';
    const textOk = 'text-white';
    const textFail = 'text-slate-500';

    // Aplica as classes dinamicamente
    const setStatus = (id, isValid) => {
        const chk = document.getElementById(`chk-${id}`);
        const lbl = document.getElementById(`lbl-${id}`);
        if(chk) chk.className = isValid ? iconOk : iconFail;
        if(lbl) lbl.className = `text-[11px] font-bold transition-colors ${isValid ? textOk : textFail}`;
    };

    setStatus('nome', cNome);
    setStatus('ean', cEan);
    setStatus('ncm', cNcm);
    setStatus('peso', cPeso);
    setStatus('desc', cDesc);

    // Gira o Anel de Progresso SVG
    const ring = document.getElementById('hud-ring');
    const txtScore = document.getElementById('hud-score');
    
    if(ring && txtScore) {
        // 2 * pi * r (84) = ~527.7
        const offset = 527.7 - (527.7 * (score / 100));
        ring.style.strokeDashoffset = offset;
        
        // Cores Dinâmicas no JS (Tailwind Hex Equivalents)
        let hexColor = '#f43f5e'; // Rose 500
        if(score >= 100) hexColor = '#34d399'; // Emerald 400
        else if(score >= 60) hexColor = '#f59e0b'; // Amber 500
        else if(score >= 40) hexColor = '#818cf8'; // Indigo 400

        ring.style.color = hexColor;
        txtScore.style.color = hexColor;
        txtScore.innerText = score;
    }
}
