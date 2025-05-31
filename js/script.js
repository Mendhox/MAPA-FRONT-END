document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.menu').classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link (mobile)
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.menu').classList.remove('active');
        });
    });

    // Efeito interativo: destaque ao passar mouse nos cards (exemplo para adotar.html)
    const cards = document.querySelectorAll('.dog-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('highlight');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('highlight');
        });
    });

    // Validação do formulário de contato
    const form = document.getElementById('contato-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            let msg = '';

            if (nome.length < 2) {
                msg = 'Por favor, informe um nome válido.';
            } else if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                msg = 'Por favor, informe um e-mail válido.';
            } else if (mensagem.length < 10) {
                msg = 'A mensagem deve ter pelo menos 10 caracteres.';
            }

            const formMsg = document.getElementById('form-msg');
            if (msg) {
                formMsg.textContent = msg;
                formMsg.style.color = 'red';
            } else {
                formMsg.textContent = 'Mensagem enviada com sucesso!';
                formMsg.style.color = 'green';
                form.reset();
            }
        });
    }

    // Efeito de scroll suave para âncoras internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const dogCards = document.querySelectorAll('.dog-card img');
    const overlay = document.getElementById('carousel-overlay');
    const carouselImg = document.getElementById('carousel-img');
    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');
    const closeBtn = document.querySelector('.carousel-close');

    // Array com os src das imagens dos cachorros
    const images = Array.from(dogCards).map(img => img.src);
    let currentIndex = 0;

    function openCarousel(index) {
        currentIndex = index;
        carouselImg.src = images[currentIndex];
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeCarousel() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        carouselImg.src = images[currentIndex];
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        carouselImg.src = images[currentIndex];
    }

    dogCards.forEach((img, idx) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openCarousel(idx));
    });

    leftArrow.addEventListener('click', showPrev);
    rightArrow.addEventListener('click', showNext);
    closeBtn.addEventListener('click', closeCarousel);

    // Fechar ao clicar fora da imagem
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeCarousel();
    });

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (overlay.style.display === 'flex') {
            if (e.key === 'Escape') closeCarousel();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });
});