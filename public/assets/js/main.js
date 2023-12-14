document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme]').forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.setAttribute('data-bs-theme', e.currentTarget.getAttribute('data-theme'));
        })
    });

    document.querySelectorAll('.notation').forEach((element) => {
        element.textContent = notation(parseFloat(element.textContent));
    })
})

function notation(note) {
    let stars = Math.round(note/2);
    let notationStr = '';
    if(stars > 5) stars = 5;
    for (let i = 0; i < stars; i++) notationStr += `⭐`;    
    if (stars < 5) notationStr += `★`.repeat(Math.ceil(5-stars)).substring(0,(5-stars));
    return notationStr;
}