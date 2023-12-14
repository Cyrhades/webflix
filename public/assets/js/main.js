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
    document.querySelectorAll('.release').forEach((element) => {
        element.textContent = date_release(element.textContent);
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

function date_release(dateString) {
    const dateObj = new Date(dateString);  
    const moisNoms = [
      "Jan.", "Fév.", "Mar.", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."
    ];
    return `${dateObj.getDate()} ${moisNoms[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
}