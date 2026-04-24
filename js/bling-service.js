// ARQUIVO: js/bling-service.js
// Serviço Oficial de Integração PIM <-> Bling API V3

// Exemplo de como ficará o seu bling-service.js no futuro:

const BlingService = {
    syncCatologo: async function(produtoData) {
        try {
            // Aqui você bate no seu servidor Node/PHP lá no Railway
            const response = await fetch('https://seu-app.railway.app/api/sincronizar-bling', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produtoData)
            });
            
            const data = await response.json();
            return { success: true, result: data };
        } catch (error) {
            console.error("Falha na API do Railway:", error);
            return { success: false };
        }
    }
};


const BlingService = {
    // Configurações da API (Em produção, isso virá de um backend seguro)
    config: {
        apiUrl: 'https://www.bling.com.br/Api/v3',
        accessToken: localStorage.getItem('bling_token') || 'SUA_CHAVE_AQUI',
    },

    // Banco de Dados Local (Cache para não estourar limite de requisições do Bling)
    db: {
        getProducts: () => JSON.parse(localStorage.getItem('sostrass_prods')) || [],
        saveProducts: (data) => localStorage.setItem('sostrass_prods', JSON.stringify(data)),
        getEvents: () => JSON.parse(localStorage.getItem('sostrass_events')) || [],
        saveEvent: (msg, type) => {
            let evs = BlingService.db.getEvents();
            const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            evs.unshift({ time, msg, type });
            if (evs.length > 50) evs.pop();
            localStorage.setItem('sostrass_events', JSON.stringify(evs));
        }
    },

    // SIMULAÇÃO DE SINCRONIZAÇÃO (Pronto para virar um fetch real)
    syncCatologo: async function() {
        BlingService.db.saveEvent("Iniciando Handshake com API Bling V3...", "sys");
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let prods = BlingService.db.getProducts();
                let syncCount = 0;
                
                prods.forEach(p => {
                    if (p.pendenteBling) {
                        p.pendenteBling = false; // "Enviado" com sucesso
                        syncCount++;
                    }
                });

                BlingService.db.saveProducts(prods);
                BlingService.db.saveEvent(`[200 OK] ${syncCount} SKUs atualizados no Bling.`, "sync");
                resolve({ success: true, synced: syncCount });
            }, 1800); // Simula o delay da rede
        });
    }
};

// Formatação Visual de Moeda global
const formatBRL = (num) => parseFloat(num || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
