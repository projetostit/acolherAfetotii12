const faqHomeItems = document.querySelectorAll('.faq-home__item');

faqHomeItems.forEach(item => {

    const button = item.querySelector('.faq-home__button');

    button.addEventListener('click', () => {

        faqHomeItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
            }
        });

        item.classList.toggle('active');

    });

});

// NAVEGAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");

    let paginaAtual = window.location.pathname.split("/").pop();

    if (paginaAtual === "") {
        paginaAtual = "index.html";
    }

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        const paginaLink = href.split("/").pop();

        if (paginaLink === paginaAtual) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});

// MENU HAMBURGER
document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileLinks = document.querySelectorAll(".mobile-nav .nav-link");

    hamburger.addEventListener("click", () => {

        const aberto = hamburger.classList.toggle("active");

        mobileNav.classList.toggle("open");

        hamburger.setAttribute("aria-expanded", aberto);

    });

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            hamburger.classList.remove("active");
            mobileNav.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");

        });

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 750) {

            hamburger.classList.remove("active");
            mobileNav.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");

        }

    });

});


// ========================================
// CONEXÃO COM A API - FORMULÁRIO CONTATO
// ========================================

const formulario = document.querySelector('#contact-form');

const areaFormulario = document.querySelector('#contact-form-wrapper');

const mensagemSucesso = document.querySelector('#mensagem-sucesso');

const btnOutraMensagem = document.querySelector(
    '#enviar-outra-mensagem'
);


formulario.addEventListener('submit', async (event) => {

    event.preventDefault();


    // Captura os dados do formulário
    const dados = {

        nome: document.querySelector('#nome').value,

        email: document.querySelector('#email').value,

        telefone: document.querySelector('#telefone').value,

        mensagem: document.querySelector('#mensagem').value

    };


    try {

        const resposta = await fetch(
            'http://localhost:3000/form-usuario',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(dados)
            }
        );


        // Verifica se ocorreu erro na API
        if (!resposta.ok) {

            const erro = await resposta.json();

            console.error('Erro da API:', erro);

            alert('Não foi possível enviar a mensagem.');

            return;
        }


        // Converte a resposta
        const resultado = await resposta.json();

        console.log('Formulário cadastrado:', resultado);


        // Limpa o formulário
        formulario.reset();


        // Esconde o formulário
        areaFormulario.style.display = 'none';


        // Mostra a mensagem de sucesso
        mensagemSucesso.classList.add('ativo');


    } catch (erro) {

        console.error('Erro:', erro);

        alert('Erro ao conectar com o servidor.');

    }

});


// ========================================
// ENVIAR OUTRA MENSAGEM
// ========================================

btnOutraMensagem.addEventListener('click', () => {

    // Esconde a mensagem
    mensagemSucesso.classList.remove('ativo');


    // Mostra novamente o formulário
    areaFormulario.style.display = 'block';


    // Coloca o cursor no primeiro campo
    document.querySelector('#nome').focus();

});