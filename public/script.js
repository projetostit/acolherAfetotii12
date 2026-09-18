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


// CONEXÃO COM A API - FORMULÁRIO CONTATO
const formulario = document.querySelector('#contact-form');

const areaFormulario =
    document.querySelector('#contact-form-wrapper');

const mensagemSucesso =
    document.querySelector('#mensagem-sucesso');

const btnOutraMensagem =
    document.querySelector('#enviar-outra-mensagem');


// Só executa se o formulário existir na página
if (formulario) {

    formulario.addEventListener(
        'submit',
        async (event) => {

            event.preventDefault();

            const dados = {

                nome:
                    document.querySelector('#nome').value,

                email:
                    document.querySelector('#email').value,

                telefone:
                    document.querySelector('#telefone').value,

                mensagem:
                    document.querySelector('#mensagem').value

            };


            try {

                const resposta = await fetch(
                    '/form-usuario',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify(dados)
                    }
                );


                if (!resposta.ok) {

                    const erro =
                        await resposta.json();

                    console.error(
                        'Erro da API:',
                        erro
                    );

                    alert(
                        erro.message ||
                        'Não foi possível enviar a mensagem.'
                    );

                    return;
                }


                const resultado =
                    await resposta.json();

                console.log(
                    'Formulário cadastrado:',
                    resultado
                );


                formulario.reset();


                if (areaFormulario) {

                    areaFormulario.style.display =
                        'none';
                }


                if (mensagemSucesso) {

                    mensagemSucesso.classList.add(
                        'ativo'
                    );
                }

            } catch (erro) {

                console.error(
                    'Erro:',
                    erro
                );

                alert(
                    'Erro ao conectar com o servidor.'
                );
            }

        }
    );
}

// ENVIAR OUTRA MENSAGEM

if (btnOutraMensagem) {

    btnOutraMensagem.addEventListener(
        'click',
        () => {

            if (mensagemSucesso) {

                mensagemSucesso.classList.remove(
                    'ativo'
                );
            }


            if (areaFormulario) {

                areaFormulario.style.display =
                    'block';
            }


            const campoNome =
                document.querySelector('#nome');

            if (campoNome) {

                campoNome.focus();
            }

        }
    );
}


// CADASTRO DO PROFISSIONAL

const professionalForm =
    document.getElementById('professional-form');

const professionalSuccess =
    document.getElementById('professional-success');


if (professionalForm) {

    professionalForm.addEventListener(
        'submit',
        async (event) => {

            event.preventDefault();


            // PEGAR MODALIDADES SELECIONADAS
            const modalidades = Array.from(
                document.querySelectorAll(
                    'input[name="modalidades"]:checked'
                )
            ).map(
                checkbox => Number(checkbox.value)
            );


            // Pelo menos uma modalidade
            if (modalidades.length === 0) {

                alert(
                    'Selecione pelo menos uma modalidade de atendimento.'
                );

                return;
            }

            // PEGAR VALOR DA CONSULTA
            const valor =
                document.getElementById('valor').value;


            // MONTAR OBJETO PARA API
            const dados = {

                nome:
                    document
                        .getElementById('nome')
                        .value
                        .trim(),

                sobrenome:
                    document
                        .getElementById('sobrenome')
                        .value
                        .trim(),

                cpf:
                    document
                        .getElementById('cpf')
                        .value
                        .replace(/\D/g, ''),

                telefone:
                    document
                        .getElementById('telefone')
                        .value
                        .trim(),

                email:
                    document
                        .getElementById('email')
                        .value
                        .trim(),

                especialidade_id:
                    Number(
                        document
                            .getElementById('especialidade')
                            .value
                    ),

                modalidades:
                    modalidades,

                registro_profissional:
                    document
                        .getElementById('registro')
                        .value
                        .trim(),

                cidade:
                    document
                        .getElementById('cidade')
                        .value
                        .trim(),

                estado:
                    document
                        .getElementById('estado')
                        .value,

                descricao:
                    document
                        .getElementById('descricao')
                        .value
                        .trim()
            };


            // VALOR É OPCIONAL
            if (valor !== '') {

                dados.valor_consulta =
                    Number(valor);
            }


            console.log(
                'Dados enviados:',
                dados
            );


            try {

                // ENVIAR PARA NESTJS
                const resposta = await fetch(
                    '/form-profissional',
                    {

                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify(dados)

                    }
                );


                const resultado =
                    await resposta.json();


                console.log(
                    'Status:',
                    resposta.status
                );

                console.log(
                    'Resposta:',
                    resultado
                );

                // SE A API RETORNAR ERRO

                if (!resposta.ok) {

                    let mensagem =
                        resultado.message;


                    if (Array.isArray(mensagem)) {

                        mensagem =
                            mensagem.join('\n');
                    }


                    alert(
                        mensagem ||
                        'Erro ao enviar cadastro.'
                    );

                    return;
                }


                // CADASTRO REALIZADO

                professionalForm.reset();

                // Esconde formulário
                professionalForm.style.display =
                    'none';

                // Mostra mensagem
                professionalSuccess.style.display =
                    'block';

                professionalSuccess.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

            }

            catch (erro) {

                console.error(
                    'Erro ao conectar com API:',
                    erro
                );


                alert(
                    'Não foi possível conectar com o servidor.'
                );
            }

        }
    );
}
