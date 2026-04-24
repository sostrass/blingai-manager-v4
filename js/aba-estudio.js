// ARQUIVO: js/aba-estudio.js
// Creative Hub Master: Integração Nano Banana 2 (Imagens) e Veo (Vídeos)

function renderAbaEstudio() {
    return `
    <div class="animate-fade-in flex flex-col xl:flex-row gap-8 max-w-[1800px] mx-auto h-full min-h-[80vh]">
        
        <div class="w-full xl:w-[45%] flex flex-col gap-6 h-full">
            
            <div class="glass-card rounded-2xl p-2 flex gap-2 shrink-0 border-b-4 border-indigo-500/50">
                <button onclick="toggleStudio('image')" id="btn-std-img" class="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"><i class="fas fa-camera-retro"></i> Nano Banana 2 (Imagens)</button>
                <button onclick="toggleStudio('video')" id="btn-std-vid" class="flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"><i class="fas fa-film"></i> Veo Engine (Vídeos)</button>
            </div>

            <div id="workspace-image" class="glass-card rounded-2xl p-8 flex-1 flex flex-col gap-6 overflow-y-auto block relative">
                <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none z-0"></div>
                
                <div class="relative z-10">
                    <h3 class="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2 mb-1"><i class="fas fa-magic text-indigo-500"></i> Direção de Arte</h3>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Crie fotos de estúdio a partir de texto ou use uma foto base para composição.</p>
                </div>

                <div class="relative z-10 space-y-5">
                    <div class="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 border-dashed hover:border-indigo-500 transition cursor-pointer group">
                        <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-500"><i class="fas fa-upload group-hover:-translate-y-1 transition-transform"></i></div>
                        <div>
                            <p class="text-xs font-bold text-slate-700 dark:text-white">Imagem Base (Opcional)</p>
                            <p class="text-[9px] text-slate-500">Faça upload de uma foto crua do produto para a I.A. aplicar estilo.</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div>
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between mb-1.5">Prompt Positivo <span class="text-indigo-400"><i class="fas fa-pen"></i></span></label>
                            <textarea id="prompt-img" class="w-full h-24 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-xs font-medium text-slate-700 dark:text-white outline-none focus:border-indigo-500 transition shadow-inner resize-none placeholder:text-slate-400" placeholder="Ex: Fotografia macro de uma tesoura vintage rose gold sobre uma mesa de madeira rústica, luz natural de janela..."></textarea>
                        </div>
                        <div>
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Prompt Negativo (Evitar)</label>
                            <input type="text" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-xs text-slate-700 dark:text-white outline-none focus:border-rose-500 transition shadow-inner placeholder:text-slate-400" value="borrado, distorcido, baixa resolução, texto, marca d'água">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Aspect Ratio</label>
                            <div class="flex bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg p-1 gap-1">
                                <button class="flex-1 py-1.5 bg-white dark:bg-white/10 rounded shadow text-[10px] font-bold text-slate-800 dark:text-white">1:1</button>
                                <button class="flex-1 py-1.5 rounded text-[10px] font-bold text-slate-500 hover:text-white">16:9</button>
                                <button class="flex-1 py-1.5 rounded text-[10px] font-bold text-slate-500 hover:text-white">9:16</button>
                            </div>
                        </div>
                        <div>
                            <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Iluminação</label>
                            <select class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-[11px] font-bold text-slate-700 dark:text-white outline-none cursor-pointer appearance-none">
                                <option>Estúdio Profissional</option><option>Cinemática (Volumétrica)</option><option>Luz Natural (Soft)</option><option>Neon/Cyberpunk</option>
                            </select>
                        </div>
                    </div>

                    <button onclick="renderizar('imagem')" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-black uppercase tracking-widest transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                        <i class="fas fa-bolt"></i> Gerar Fotorrealismo
                    </button>
                </div>
            </div>

            <div id="workspace-video" class="glass-card rounded-2xl p-8 flex-1 flex flex-col gap-6 overflow-y-auto hidden relative border-t-4 border-cyan-500">
                <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none z-0"></div>
                
                <div class="flex justify-between items-center relative z-10">
                    <div>
                        <h3 class="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2 mb-1"><i class="fas fa-video text-cyan-500"></i> Veo Model Engine</h3>
                        <p class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Gere vídeos de alta fidelidade com áudio nativo.</p>
                    </div>
                    <span class="text-[9px] font-mono font-bold text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">Quota: 3/Dia</span>
                </div>

                <div class="relative z-10 space-y-5">
                    <div class="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 border-dashed hover:border-cyan-500 transition cursor-pointer">
                        <div class="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-500"><i class="fas fa-image"></i></div>
                        <div><p class="text-xs font-bold text-slate-700 dark:text-white">Frame Inicial (Keyframe)</p><p class="text-[9px] text-slate-500">Faça upload da imagem que será o primeiro frame do vídeo.</p></div>
                    </div>

                    <div class="space-y-3">
                        <div>
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between mb-1.5">Ação Cinematográfica <span class="text-cyan-400"><i class="fas fa-film"></i></span></label>
                            <textarea id="prompt-vid" class="w-full h-20 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-xs font-medium text-slate-700 dark:text-white outline-none focus:border-cyan-500 transition shadow-inner resize-none placeholder:text-slate-400" placeholder="Ex: Câmera faz um pan 360 graus suave ao redor da caixa organizadora de acrílico, revelando as 30 pérolas ABS brilhando na luz..."></textarea>
                        </div>
                        <div>
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex justify-between">Cues de Áudio (Veo Audio) <span class="text-amber-400"><i class="fas fa-music"></i></span></label>
                            <input type="text" class="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-lg p-3 text-xs text-slate-700 dark:text-white outline-none focus:border-amber-500 transition shadow-inner placeholder:text-slate-400" placeholder="Ex: Som de pequenas pérolas de plástico caindo umas sobre as outras, música ambiente lo-fi suave.">
                        </div>
                    </div>

                    <button onclick="renderizar('video')" class="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-black uppercase tracking-widest transition shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                        <i class="fas fa-play-circle"></i> Gerar B-Roll (10s)
                    </button>
                </div>
            </div>

        </div>

        <div class="w-full xl:w-[55%] flex flex-col gap-6 h-full">
            
            <div class="glass-card rounded-2xl flex-1 flex flex-col relative overflow-hidden shadow-2xl border-white/5 bg-slate-100 dark:bg-[#070709] p-4 group" id="studio-canvas">
                
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                
                <div id="canvas-empty" class="flex-1 flex flex-col items-center justify-center text-center relative z-10 transition-all duration-500">
                    <div class="w-24 h-24 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 shadow-xl relative">
                        <div class="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-[ping_3s_infinite]"></div>
                        <i class="fas fa-eye text-4xl text-slate-300 dark:text-slate-600"></i>
                    </div>
                    <h2 class="text-lg font-black text-slate-700 dark:text-white tracking-widest uppercase mb-2">Painel de Renderização</h2>
                    <p class="text-xs text-slate-500 max-w-sm">Seus assets fotorrealistas e vídeos de alta fidelidade aparecerão aqui.</p>
                </div>

                </div>

            <div class="glass-card rounded-2xl p-4 shrink-0 h-32 flex items-center gap-4 overflow-x-auto border-t-4 border-indigo-500/50">
                <div class="h-full w-24 rounded-xl bg-slate-200 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center text-slate-400 shrink-0">
                    <i class="fas fa-history mb-1"></i><span class="text-[8px] font-black uppercase">Histórico</span>
                </div>
                <div class="h-full aspect-square rounded-xl bg-black overflow-hidden relative cursor-pointer opacity-50 hover:opacity-100 transition border border-white/10 shrink-0">
                    <img src="https://images.unsplash.com/photo-1596751303254-e69fb2fc7d23?q=80&w=200&auto=format&fit=crop" class="w-full h-full object-cover">
                </div>
                <div class="h-full aspect-square rounded-xl bg-black overflow-hidden relative cursor-pointer opacity-50 hover:opacity-100 transition border border-white/10 shrink-0">
                    <img src="https://images.unsplash.com/photo-1584820927498-cafe8c117769?q=80&w=200&auto=format&fit=crop" class="w-full h-full object-cover">
                </div>
            </div>

        </div>
    </div>
    `;
}

// LOGÍCA DE NAVEGAÇÃO INTERNA
function toggleStudio(type) {
    const btnImg = document.getElementById('btn-std-img');
    const btnVid = document.getElementById('btn-std-vid');
    const wsImg = document.getElementById('workspace-image');
    const wsVid = document.getElementById('workspace-video');

    if(type === 'image') {
        btnImg.className = "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2";
        btnVid.className = "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2";
        wsImg.classList.remove('hidden'); wsImg.classList.add('block', 'animate-fade-in');
        wsVid.classList.remove('block', 'animate-fade-in'); wsVid.classList.add('hidden');
    } else {
        btnVid.className = "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-cyan-600 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2";
        btnImg.className = "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2";
        wsVid.classList.remove('hidden'); wsVid.classList.add('block', 'animate-fade-in');
        wsImg.classList.remove('block', 'animate-fade-in'); wsImg.classList.add('hidden');
    }
}

// LÓGICA DE RENDERIZAÇÃO (SIMULAÇÃO HARDCORE)
function renderizar(tipo) {
    const prompt = tipo === 'imagem' ? document.getElementById('prompt-img').value : document.getElementById('prompt-vid').value;
    if(!prompt) {
        toast(`Descreva a cena para gerar o ${tipo}!`, true);
        return;
    }

    const canvas = document.getElementById('studio-canvas');
    const cor = tipo === 'imagem' ? 'indigo' : 'cyan';
    const icone = tipo === 'imagem' ? 'fa-camera-retro' : 'fa-film';
    const motor = tipo === 'imagem' ? 'Nano Banana 2' : 'Veo Model';

    // Tela de Carregamento Sci-Fi
    canvas.innerHTML = `
        <div class="absolute inset-0 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in rounded-xl border border-${cor}-500/30">
            <div class="relative w-32 h-32 mb-8 flex items-center justify-center">
                <svg class="absolute inset-0 w-full h-full animate-[spin_4s_linear_infinite] text-${cor}-500/20" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="20 10"></circle></svg>
                <svg class="absolute inset-0 w-full h-full animate-[spin_2s_linear_infinite_reverse] text-${cor}-500" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="80 150" stroke-linecap="round"></circle></svg>
                <i class="fas ${icone} text-4xl text-white"></i>
            </div>
            <h2 class="text-xl font-black text-white tracking-widest uppercase mb-2 animate-pulse">Iniciando ${motor}</h2>
            <p class="text-xs text-slate-400 font-mono" id="render-log">Calculando iluminação global...</p>
            
            <div class="w-64 h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden">
                <div class="h-full bg-${cor}-500 transition-all duration-[3000ms] ease-out" style="width: 0%" id="render-bar"></div>
            </div>
        </div>
    `;

    // Simula logs de renderização
    setTimeout(() => { document.getElementById('render-bar').style.width = '40%'; document.getElementById('render-log').innerText = 'Aplicando texturas fotorealistas...'; }, 1000);
    setTimeout(() => { document.getElementById('render-bar').style.width = '80%'; document.getElementById('render-log').innerText = 'Processando upscaling 8K...'; }, 2000);

    // Conclusão
    setTimeout(() => {
        if(tipo === 'imagem') {
            const mockImg = "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=100&w=1200"; // Mockup
            canvas.innerHTML = `
                <div class="absolute inset-0 rounded-xl overflow-hidden animate-fade-in group">
                    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none z-10 mix-blend-overlay"></div>
                    <img src="${mockImg}" class="w-full h-full object-cover">
                    
                    <div class="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[9px] font-mono border border-white/20 flex items-center gap-2"><i class="fas fa-compress"></i> 1024x1024 px</span>
                    </div>

                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pt-20 pb-6 px-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <div class="flex justify-between items-end">
                            <div class="flex gap-3">
                                <button class="w-12 h-12 bg-white/10 hover:bg-indigo-600 text-white rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 transition shadow-lg" title="Variações"><i class="fas fa-layer-group"></i></button>
                                <button class="w-12 h-12 bg-white/10 hover:bg-indigo-600 text-white rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 transition shadow-lg" title="Upscale"><i class="fas fa-expand-arrows-alt"></i></button>
                            </div>
                            
                            <div class="flex gap-3">
                                <button class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.3)] transition transform hover:scale-105 flex items-center gap-2" title="Recriar usando Nano Banana PRO">
                                    <i class="fas fa-crown"></i> Redo with Pro
                                </button>
                                <button class="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg border border-indigo-400/50 transition transform hover:scale-105 flex items-center gap-2">
                                    <i class="fas fa-check-circle"></i> Usar Foto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            toast("Imagem Renderizada com Sucesso!", true);
        } else {
            // Mockup Video Veo
            const mockVidImg = "https://images.unsplash.com/photo-1596751303254-e69fb2fc7d23?auto=format&fit=crop&q=80&w=1200";
            canvas.innerHTML = `
                <div class="absolute inset-0 rounded-xl overflow-hidden animate-fade-in group">
                    <img src="${mockVidImg}" class="w-full h-full object-cover filter brightness-75">
                    
                    <div class="absolute inset-0 flex items-center justify-center z-10">
                        <div class="w-20 h-20 bg-cyan-500/80 hover:bg-cyan-400 backdrop-blur-md rounded-full flex items-center justify-center text-white text-3xl cursor-pointer transition transform hover:scale-110 shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                            <i class="fas fa-play ml-1"></i>
                        </div>
                    </div>

                    <div class="absolute top-4 left-4 z-20">
                        <span class="bg-black/80 backdrop-blur-md text-cyan-400 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-cyan-500/30 flex items-center gap-2 shadow-lg"><i class="fas fa-video"></i> Veo Render • 10s • HQ Audio</span>
                    </div>

                    <div class="absolute bottom-6 right-6 z-20">
                        <button class="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg border border-cyan-400/50 transition transform hover:scale-105 flex items-center gap-2">
                            <i class="fas fa-cloud-download-alt"></i> Baixar B-Roll
                        </button>
                    </div>
                </div>
            `;
            toast("Vídeo Cinemático Veo Pronto!", true);
        }
    }, 3500);
}
