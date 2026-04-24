// ARQUIVO: js/aba-estudio.js
// Módulo de Mídia e I.A. Generativa (Renderizado dinamicamente)

function renderAbaEstudio() {
    return `
    <div class="animate-fade-in flex flex-col xl:flex-row gap-8 max-w-[1600px] mx-auto h-full min-h-[75vh]">
        
        <div class="w-full xl:w-[40%] bg-white dark:bg-[rgba(15,15,17,0.7)] dark:backdrop-blur-2xl border border-slate-200 dark:border-white/5 rounded-3xl p-8 flex flex-col shadow-xl">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h3 class="text-base font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2"><i class="fas fa-images text-indigo-500"></i> Galeria do Bling</h3>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Gerencie os anexos que irão para os marketplaces.</p>
                </div>
                <span class="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 dark:bg-black/40 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">2 Anexos</span>
            </div>

            <div class="grid grid-cols-2 gap-4 flex-1 overflow-y-auto content-start pr-2">
                <div class="aspect-square bg-slate-50 dark:bg-white/5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/20 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all cursor-pointer group">
                    <div class="w-12 h-12 bg-white dark:bg-black/40 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 mb-3">
                        <i class="fas fa-cloud-upload-alt text-xl"></i>
                    </div>
                    <span class="text-[10px] font-black uppercase tracking-widest">Upload Mídia</span>
                </div>

                <div class="aspect-square rounded-2xl border border-slate-200 dark:border-white/10 relative group overflow-hidden shadow-md bg-slate-100 dark:bg-black/80">
                    <img src="https://images.unsplash.com/photo-1617325247661-675ab03407bd?q=80&w=400&auto=format&fit=crop" class="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-50">
                    
                    <div class="absolute inset-0 bg-slate-900/40 dark:bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-sm p-4">
                        <span class="text-[9px] font-bold text-white bg-indigo-500 px-2 py-0.5 rounded uppercase tracking-widest absolute top-3 left-3">Principal</span>
                        <div class="flex gap-2 mt-4">
                            <button class="w-10 h-10 bg-white/20 dark:bg-white/10 text-white rounded-full hover:bg-indigo-500 transition shadow-lg backdrop-blur-md border border-white/20" title="Editar / Crop"><i class="fas fa-crop-alt"></i></button>
                            <button class="w-10 h-10 bg-white/20 dark:bg-white/10 text-white rounded-full hover:bg-rose-500 transition shadow-lg backdrop-blur-md border border-white/20" title="Excluir"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>

                <div class="aspect-square rounded-2xl border border-slate-200 dark:border-white/10 relative group overflow-hidden shadow-md bg-slate-100 dark:bg-black/80">
                    <img src="https://images.unsplash.com/photo-1584820927498-cafe8c117769?q=80&w=400&auto=format&fit=crop" class="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-50">
                    <div class="absolute inset-0 bg-slate-900/40 dark:bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                        <button class="px-3 py-1.5 bg-white/20 text-white rounded-lg text-[10px] font-bold hover:bg-indigo-500 transition border border-white/20">Definir Principal</button>
                        <button class="w-8 h-8 bg-white/20 text-white rounded-lg hover:bg-rose-500 transition border border-white/20"><i class="fas fa-trash text-xs"></i></button>
                    </div>
                </div>
            </div>

            <div class="mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
                <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">URL de Vídeo (YouTube)</label>
                <div class="relative flex items-center">
                    <i class="fab fa-youtube absolute left-4 text-rose-500 text-lg"></i>
                    <input type="text" class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-medium text-slate-800 dark:text-white outline-none focus:border-rose-500 transition shadow-inner" placeholder="Cole o link do vídeo de demonstração...">
                </div>
            </div>
        </div>

        <div class="w-full xl:w-[60%] flex flex-col gap-6">
            
            <div class="flex-1 bg-white dark:bg-[#0b0b0d] border border-rose-200 dark:border-rose-500/20 rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-2xl group">
                <div class="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-gradient-to-br from-rose-400/20 to-purple-500/20 rounded-full blur-[80px] pointer-events-none z-0 transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
                
                <div class="flex justify-between items-center mb-6 relative z-10">
                    <div>
                        <h3 class="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-3"><i class="fas fa-camera-retro text-rose-500"></i> Nano Banana 2</h3>
                        <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Image Gen / Scene Creator</p>
                    </div>
                    <span class="text-[10px] font-mono font-black text-rose-600 dark:text-rose-300 bg-rose-100 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 px-3 py-1.5 rounded-lg shadow-sm"><i class="fas fa-bolt text-[10px] mr-1"></i> Pro Tier Ativo</span>
                </div>
                
                <div class="relative z-10 flex flex-col lg:flex-row gap-6 h-full">
                    
                    <div class="w-full lg:w-[45%] flex flex-col gap-4">
                        
                        <div class="flex flex-col flex-1">
                            <label class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex justify-between">Prompt de Direção de Arte <i class="fas fa-magic text-indigo-400"></i></label>
                            <textarea id="estudio-prompt" class="w-full h-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-[13px] font-medium text-slate-700 dark:text-white outline-none focus:border-rose-500 transition shadow-inner resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600" placeholder="Descreva o ambiente perfeito. Ex: Produto centralizado em uma bancada de mármore claro, fundo com desfoque fotográfico (bokeh), iluminação suave de janela lateral, estilo comercial 8K..."></textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Estilo Render</label>
                                <select class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs font-bold text-slate-700 dark:text-white outline-none cursor-pointer appearance-none">
                                    <option>Fotorrealismo HQ</option>
                                    <option>Estúdio Minimalista</option>
                                    <option>3D Render (CGI)</option>
                                    <option>Lifestyle (Uso Real)</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Aspect Ratio</label>
                                <select class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs font-bold text-slate-700 dark:text-white outline-none cursor-pointer appearance-none">
                                    <option>1:1 (Quadrado)</option>
                                    <option>16:9 (Paisagem)</option>
                                    <option>9:16 (Stories/Reels)</option>
                                </select>
                            </div>
                        </div>

                        <button onclick="simularRenderEstudio()" class="w-full py-4 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white rounded-xl text-sm font-black uppercase tracking-widest transition shadow-xl shadow-rose-600/20 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                            <i class="fas fa-paint-brush"></i> Renderizar Imagem
                        </button>
                    </div>

                    <div class="w-full lg:w-[55%] border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-100 dark:bg-black/60 relative overflow-hidden flex flex-col items-center justify-center shadow-inner group" id="estudio-result">
                        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] dark:opacity-10 pointer-events-none"></div>
                        
                        <div id="estudio-placeholder" class="flex flex-col items-center text-center p-6 relative z-10 transition-all duration-500">
                            <div class="w-20 h-20 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                <i class="fas fa-image text-3xl text-slate-300 dark:text-slate-600"></i>
                            </div>
                            <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Aguardando Prompt</p>
                            <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-2 max-w-[200px]">A imagem gerada aparecerá aqui para ser avaliada e enviada ao Bling.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    `;
}

// LÓGICA DO ESTÚDIO IA (Apenas Interface, sem integração real de backend aqui)
function simularRenderEstudio() {
    const prompt = document.getElementById('estudio-prompt').value;
    const canvas = document.getElementById('estudio-result');
    
    if(!prompt) {
        alert("Por favor, digite um prompt de direção de arte primeiro.");
        return;
    }

    // Estado de Loading Hardcore
    canvas.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full w-full relative z-10">
            <svg class="w-16 h-16 animate-spin text-rose-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-[10px] font-black uppercase tracking-widest text-rose-500 animate-pulse">Renderizando Cena em Nuvem...</p>
            <div class="w-48 h-1 bg-slate-200 dark:bg-white/10 rounded-full mt-4 overflow-hidden"><div class="h-full bg-gradient-to-r from-rose-500 to-indigo-500 animate-[pulse_2s_ease-in-out_infinite] w-2/3"></div></div>
        </div>
    `;

    // Simula a resposta da API (3 segundos)
    setTimeout(() => {
        // Imagem mock fotorrealista (Você poderia substituir pela chamada da API Veo/Imagen depois)
        const mockImgUrl = "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800";
        
        canvas.innerHTML = `
            <div class="absolute inset-0 bg-cover bg-center rounded-2xl animate-fade-in" style="background-image: url('${mockImgUrl}')"></div>
            
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div class="flex items-center justify-between">
                    <div class="flex gap-2">
                        <button class="bg-white/20 hover:bg-indigo-600 text-white w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20 transition shadow-lg" title="Refazer"><i class="fas fa-redo-alt"></i></button>
                        <button class="bg-white/20 hover:bg-indigo-600 text-white w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20 transition shadow-lg" title="Upscale 4x"><i class="fas fa-expand-arrows-alt"></i></button>
                    </div>
                    <button class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest backdrop-blur-md border border-indigo-400/50 shadow-xl transition transform hover:scale-105 flex items-center gap-2"><i class="fas fa-cloud-upload-alt"></i> Usar no Bling</button>
                </div>
            </div>
        `;
    }, 3500);
}
