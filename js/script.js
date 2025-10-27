// Navegación por pestañas
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover clase active de todas las pestañas
        document.querySelectorAll('.nav-tab').forEach(t => {
            t.classList.remove('active');
        });

        // Remover clase active de todas las secciones
        document.querySelectorAll('.section-content').forEach(s => {
            s.classList.remove('active');
        });

        // Agregar clase active a la pestaña clickeada
        tab.classList.add('active');

        // Mostrar la sección correspondiente
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Navegación a enlaces internos entre pestañas
document.querySelectorAll('.document-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);

        // Activar la pestaña de documentos
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector('.nav-tab[data-target="documentos"]').classList.add('active');

        // Mostrar la sección de documentos
        document.querySelectorAll('.section-content').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById('documentos').classList.add('active');

        // Desplazarse al elemento objetivo
        setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    });
});

// Botón "Volver arriba"
document.querySelectorAll('.back-to-top').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
