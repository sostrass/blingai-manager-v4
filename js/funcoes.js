// ARQUIVO: js/funcoes.js
// Responsável pela interface comum (Alertas e Logs)

// Alertas na Tela (Toast)
function toast(msg, isIA = false) {
    const c = document.getElementById('toast-container'); 
    if(!c) return;
    const t = document.createElement('div');
    
    let baseColor = isIA ? 'border-rose-500/50 shadow-rose-500/20' : 'border-slate-700 shadow-xl';
    t.className = `bg-slate-900 border ${baseColor} text-white px-5 py-4 rounded-xl font-bold text-xs flex items-center gap-3 relative overflow-hidden z-[9999] mb-3`;
    
    let icon = isIA ? '<i class="fas fa-wand-magic-sparkles text-rose-400 text-lg"></i>' : '<i class="fas fa-check-circle text-emerald-400 text-lg"></i>';
    let bar = isIA ? 'bg-gradient-to-b from-rose-400 to-indigo-500' : 'bg-emerald-500';
    
    t.innerHTML = `<div class="absolute left-0 top-0 bottom-0 w-1.5 ${bar}"></div>${icon} ${msg}`; 
    c.appendChild(t); 
    
    setTimeout(() => { t.style.opacity='0'; setTimeout(()=>t.remove(),300); }, 3500);
}

// Registro no Activity Feed / Logs
function addEvent(msg, type='edit') {
    const now = new Date(); 
    const tStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    
    systemEvents.unshift({ time: tStr, msg, type }); 
    
    if(systemEvents.length > 50) systemEvents.pop(); // Mantém apenas os últimos 50 eventos
    localStorage.setItem('sostrass_events', JSON.stringify(systemEvents));
    
    // Se a função renderActivityFeed existir na tela atual (como no dashboard), chame-a
    if (typeof renderActivityFeed === "function") {
        renderActivityFeed();
    }
}
