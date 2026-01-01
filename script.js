// Script para o menu hambúrguer
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active'); // Alterna a classe 'active' para mostrar/ocultar o menu
});

// Script para o header scrolled
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});


// modal

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const span = document.querySelector(".close");

document.querySelectorAll(".imagem-modal").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

// Fechar ao clicar no X
span.onclick = function() {
    modal.style.display = "none";
}

// Fechar ao clicar fora da imagem
modal.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}

// CARRINHO
let carrinho = {};
let total = 0;
let totalItens = 0;

function addItem(nome, preco) {
    if (!carrinho[nome]) carrinho[nome] = 0;

    carrinho[nome]++;
    totalItens++;
    total += preco;

    document.getElementById("badge").innerText = totalItens;
}

function abrirCarrinho() {
    atualizarCarrinho();
    document.getElementById("carrinhoModal").style.display = "flex";
}

function fecharCarrinho() {
    document.getElementById("carrinhoModal").style.display = "none";
}

function atualizarCarrinho() {
    let texto = "";

    for (let item in carrinho) {
        texto += `${item}: ${carrinho[item]} unidade(s)\n`;
    }

    document.getElementById("lista").innerText = texto || "Carrinho vazio";
    document.getElementById("total").innerText = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarCompra() {
    if (total === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Pedido Fazenda Boa Vista:%0A";
    for (let item in carrinho) {
        mensagem += `${item}: ${carrinho[item]} unidade(s)%0A`;
    }
    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

    let numero = "5531993932063";

    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
}

function limparCarrinho() {
    carrinho = {};
    total = 0;
    totalItens = 0;

    document.getElementById("badge").innerText = 0;
    atualizarCarrinho();
}
