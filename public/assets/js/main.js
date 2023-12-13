document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme]').forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.setAttribute('data-bs-theme', e.currentTarget.getAttribute('data-theme'));
        })
    });
})

function notation(note) {
    let stars = Math.round(note/2);
    let notationStr = '';
    if(stars > 5) throw new Error('Erreur de notation');
    for (let i = 0; i < stars; i++) notationStr += `⭐`;    
    if (stars < 5) notationStr += `★`.repeat(Math.ceil(5-stars)).substring(0,(5-stars));
    return notationStr;
}