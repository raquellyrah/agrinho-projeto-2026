/**
 * Arquivo: main.js
 * Descrição: Lógica interativa para o site Agrinho 2026 (Estilo Natureza Sustentável)
 * Funcionalidades: Menu Hambúrguer, Modo Claro/Escuro e Calculadora Ecológica
 */

document.addEventListener("DOMContentLoaded", () => {
    // === 1. GERENCIAMENTO DO MENU HAMBÚRGUER ===
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            // Altera o ícone do menu para dar feedback visual (opcional)
            menuToggle.classList.toggle("open");
        });

        // Fecha o menu ao clicar em qualquer link (melhor experiência em mobile)
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("open");
            });
        });
    }

    // === 2. MODO CLARO / ESCURO (THEME TOGGLE) ===
    const themeToggleBtn = document.getElementById("themeToggle");
    
    // Verifica se o usuário já tinha uma preferência salva no navegador
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️ Modo Claro";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            // Verifica qual modo está ativo para atualizar o texto do botão e salvar a preferência
            if (document.body.classList.contains("dark-mode")) {
                themeToggleBtn.textContent = "☀️ Modo Claro";
                localStorage.setItem("theme", "dark");
            } else {
                themeToggleBtn.textContent = "🌙 Modo Escuro";
                localStorage.setItem("theme", "light");
            }
        });
    }

    // === 3. CALCULADORA ECOLÓGICA ===
    const calcForm = document.getElementById("calcForm");
    const calcResult = document.getElementById("calcResult");

    if (calcForm && calcResult) {
        calcForm.addEventListener("submit", (event) => {
            // Evita que a página recarregue ao enviar o formulário
            event.preventDefault();

            // Captura os valores inseridos pelo usuário nos campos de input
            const agua = parseFloat(document.getElementById("inputAgua").value) || 0;
            const energia = parseFloat(document.getElementById("inputEnergia").value) || 0;
            const residuos = parseFloat(document.getElementById("inputResiduos").value) || 0;

            // Fatores de emissão fictícios baseados em médias de sustentabilidade:
            // - Cada litro de água tratada/desperdiçada consome energia indireta (~0.0003 kg CO2)
            // - Cada kWh de energia da rede elétrica gera pegada de carbono (~0.09 kg CO2)
            // - Cada kg de resíduo orgânico/comum enviado a aterros gera metano (~0.5 kg CO2e)
            const pegadaAgua = agua * 0.0003;
            const pegadaEnergia = energia * 0.09;
            const pegadaResiduos = residuos * 0.5;

            // Total da pegada de CO2 mensal em kg
            const pegadaTotal = pegadaAgua + pegadaEnergia + pegadaResiduos;

            // Calcula quantos metros quadrados de floresta nativa seriam necessários para compensar esse impacto
            // (Estimativa: 1m² de floresta jovem absorve aproximadamente 1kg de CO2 por ano, ou ~0.083kg por mês)
            const areaCompensacao = pegadaTotal / 0.083;

            // Exibe o resultado na tela formatando os números para 2 casas decimais
            calcResult.innerHTML = `
                <div class="resultado-box">
                    <h3>📊 Seu Impacto Estimado:</h3>
                    <p>Sua pegada de carbono mensal é de <strong>${pegadaTotal.toFixed(2)} kg de CO2</strong>.</p>
                    <p>🌳 Para compensar esse impacto, você precisaria manter cerca de <strong>${areaCompensacao.toFixed(1)} m²</strong> de áreas verdes ou florestas preservadas.</p>
                    <small>*Cálculo baseado em fatores médios de emissão agrícola e residencial para fins educativos.</small>
                </div>
            `;
            
            // Aplica um efeito suave para rolar até o resultado em telas menores
            calcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // === 4. ANIMAÇÃO DE SCROLL PARA A LINHA DO TEMPO ===
    // Faz com que os itens da linha do tempo apareçam suavemente conforme o usuário rola a página
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (timelineItems.length > 0) {
        const checkVisibility = () => {
            const triggerBottom