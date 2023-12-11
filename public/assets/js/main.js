document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme]').forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.setAttribute('data-bs-theme', e.currentTarget.getAttribute('data-theme'));
        })
    });
})