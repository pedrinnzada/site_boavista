document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // MENU HAMBÚRGUER & NAVEGAÇÃO
  // ========================================
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav) nav.classList.remove('active');
    });
  });

  // ========================================
  // HEADER SCROLLED
  // ========================================
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // ========================================
  // VARIÁVEIS GLOBAIS DE PRODUTO
  // ========================================
  window.produtoSelecionado = {};
  window.quantidadeSelecionada = 1;
  window.imagensProduto = [];
  window.imgIndex = 0;

  // ========================================
  // TELA DE DETALHE DO PRODUTO (MODAL)
  // ========================================
  window.abrirProdutoTela = function(nome, preco, imagem, descricao, imagensExtras = []) {
    window.produtoSelecionado = { nome, preco };
    window.quantidadeSelecionada = 1;
    window.imagensProduto = [imagem, ...imagensExtras];
    window.imgIndex = 0;

    const imgEl = document.getElementById("produtoImagem");
    if (imgEl) imgEl.src = window.imagensProduto[window.imgIndex];
    
    document.getElementById("produtoNome").innerText = nome;
    document.getElementById("produtoPreco").innerText = `R$ ${preco.toFixed(2)}`;
    document.getElementById("produtoDescricao").innerText = descricao;
    document.getElementById("qtdProduto").innerText = window.quantidadeSelecionada;

    // Atualiza dots
    const dots = document.getElementById("imgDots");
    if (dots) {
      dots.innerHTML = "";
      window.imagensProduto.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "img-dot" + (i === 0 ? " active" : "");
        dot.onclick = () => { window.imgIndex = i; window.atualizarImagem(); };
        dots.appendChild(dot);
      });
    }

    // Whatsapp Link
    const msgWa = `Olá! Gostaria de pedir: ${nome} (R$ ${preco.toFixed(2)})`;
    const btnWa = document.getElementById("btnWhatsapp");
    if (btnWa) btnWa.href = `https://wa.me/5531993932063?text=${encodeURIComponent(msgWa)}`;

    const modal = document.getElementById("produtoTela");
    if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  };

  window.fecharProdutoTela = function() {
    const modal = document.getElementById("produtoTela");
    if (modal) modal.style.display = "none";
    document.body.style.overflow = "";
  };

  window.atualizarImagem = function() {
    document.getElementById("produtoImagem").src = window.imagensProduto[window.imgIndex];
    document.querySelectorAll(".img-dot").forEach((d, i) => {
      d.classList.toggle("active", i === window.imgIndex);
    });
  };

  window.imgProxima = function() {
    if (window.imagensProduto.length <= 1) return;
    window.imgIndex = (window.imgIndex + 1) % window.imagensProduto.length;
    window.atualizarImagem();
  };

  window.imgAnterior = function() {
    if (window.imagensProduto.length <= 1) return;
    window.imgIndex = (window.imgIndex - 1 + window.imagensProduto.length) % window.imagensProduto.length;
    window.atualizarImagem();
  };

  window.aumentarQtd = function() {
    window.quantidadeSelecionada++;
    document.getElementById("qtdProduto").innerText = window.quantidadeSelecionada;
  };

  window.diminuirQtd = function() {
    if (window.quantidadeSelecionada > 1) {
      window.quantidadeSelecionada--;
      document.getElementById("qtdProduto").innerText = window.quantidadeSelecionada;
    }
  };

  // ========================================
  // CARRINHO
  // ========================================
  window.carrinho = {};
  window.total = 0;
  window.totalItens = 0;

  window.addItem = function(nome, preco) {
    if (!window.carrinho[nome]) window.carrinho[nome] = 0;
    window.carrinho[nome]++;
    window.totalItens++;
    window.total += preco;
    const badge = document.getElementById("badge");
    if (badge) badge.innerText = window.totalItens;
  };

  window.adicionarAoCarrinho = function() {
    for (let i = 0; i < window.quantidadeSelecionada; i++) {
      window.addItem(window.produtoSelecionado.nome, window.produtoSelecionado.preco);
    }
    window.fecharProdutoTela();
    window.mostrarToast(`✅ ${window.produtoSelecionado.nome} adicionado!`);
  };

  window.abrirCarrinho = function() {
    window.atualizarCarrinho();
    const cModal = document.getElementById("carrinhoModal");
    if (cModal) cModal.style.display = "flex";
  };

  window.fecharCarrinho = function() {
    const cModal = document.getElementById("carrinhoModal");
    if (cModal) cModal.style.display = "none";
  };

  window.atualizarCarrinho = function() {
    let texto = "";
    for (let item in window.carrinho) {
      texto += `${item}: ${window.carrinho[item]} unidade(s)\n`;
    }
    const lista = document.getElementById("lista-carrinho");
    if (lista) lista.innerText = texto || "Carrinho vazio";
    const totEl = document.getElementById("total");
    if (totEl) totEl.innerText = `Total: R$ ${window.total.toFixed(2)}`;
  };

  window.finalizarCompra = function() {
    if (window.total === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    let mensagem = "Pedido Fazenda Boa Vista:%0A";
    for (let item in window.carrinho) {
      mensagem += `${item}: ${window.carrinho[item]} unidade(s)%0A`;
    }
    mensagem += `%0ATotal: R$ ${window.total.toFixed(2)}`;
    let numero = "5531993932063";
    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
  };

  window.limparCarrinho = function() {
    window.carrinho = {};
    window.total = 0;
    window.totalItens = 0;
    const badge = document.getElementById("badge");
    if (badge) badge.innerText = 0;
    window.atualizarCarrinho();
  };

  // ========================================
  // TOAST & FILTROS
  // ========================================
  window.mostrarToast = function(mensagem) {
    const toast = document.createElement("div");
    toast.className = "toast-notificacao";
    toast.innerText = mensagem;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("active"), 10);
    setTimeout(() => {
      toast.classList.remove("active");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  window.filtrar = function(categoria, btn) {
    document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    document.querySelectorAll(".produto-card").forEach(card => {
      if (categoria === "todos" || card.dataset.categoria === categoria) {
        card.style.display = "";
        card.style.animation = "fadeInUp 0.4s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  };

  // ========================================
  // EVENT LISTENERS GLOBAIS (DELEGAÇÃO)
  // ========================================
  document.addEventListener('click', (e) => {
    // 1. Verificar se clicou no Card ou botão dentro do Card
    const card = e.target.closest('.produto-card');
    if (card) {
      const btnAdd = e.target.closest('.card-btn-add');
      
      // Se clicou no botão "+", adiciona direto
      if (btnAdd) {
        e.stopPropagation();
        const nome = card.dataset.nome;
        const preco = parseFloat(card.dataset.preco);
        window.addItem(nome, preco);
        window.mostrarToast(`✅ ${nome} adicionado!`);
        return;
      }

      // Se clicou no card (fora do botão), abre o modal
      const extras = JSON.parse(card.dataset.extras || "[]");
      window.abrirProdutoTela(
        card.dataset.nome,
        parseFloat(card.dataset.preco),
        card.dataset.img,
        card.dataset.desc,
        extras
      );
      return;
    }

    // 2. Fechar modal de produto ao clicar fora do conteúdo
    const pModal = document.getElementById("produtoTela");
    if (e.target === pModal) {
      window.fecharProdutoTela();
    }
    
    // 3. Fechar modal de carrinho ao clicar fora do conteúdo
    const cModal = document.getElementById("carrinhoModal");
    if (e.target === cModal) {
      window.fecharCarrinho();
    }
  });

});
