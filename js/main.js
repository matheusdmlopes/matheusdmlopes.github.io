// Inicializa biblioteca de animações AOS
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Inicializa EmailJS
    emailjs.init({
        publicKey: "iQikSNq6W3PmUAB-H",
    });

    // Seleciona elementos DOM
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');

    // Toggle do menu de navegação mobile
    burger.addEventListener('click', () => {
        // Toggle da classe nav-active
        nav.classList.toggle('nav-active');

        // Animação dos links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animação do burger
        burger.classList.toggle('toggle');
    });

    // Fechar o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // Mudar o estilo da navbar ao fazer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Formulário de contato com envio de e-mail via EmailJS
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Feedback visual - Mudando o botão para "Enviando..."
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Enviando...';
            button.disabled = true;

            // Coletando os dados do formulário
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                message: contactForm.querySelector('#message').value,
                to_email: 'matheusdemarcolopes@gmail.com'
            };

            // Debug dos dados
            console.log('Dados do formulário:', formData);

            // Enviando o e-mail usando EmailJS
            emailjs.send('service_92dl55k', 'template_72sfc6i')
                .then(function (response) {
                    console.log('E-mail enviado com sucesso!', response);

                    // Feedback visual de sucesso
                    button.textContent = 'Mensagem Enviada!';

                    // Resetar o formulário após um tempo
                    setTimeout(() => {
                        contactForm.reset();
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 3000);
                })
                .catch(function (error) {
                    console.error('Erro ao enviar e-mail:', error);

                    // Feedback visual de erro
                    button.textContent = 'Erro ao enviar!';

                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 3000);
                });
        });
    }

    // Atualiza o ano do copyright
    const copyrightYear = document.querySelector('.footer-content p');
    if (copyrightYear) {
        const year = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2023', year);
    }
}); 