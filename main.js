import './style.scss'

const init = (item, value) => {
    // container
    const items = Array.from(document.querySelectorAll(`.${item}`))

    // item 탐색
    items.forEach((item) => {
        // 아코디언 아이템 배열
        const box = Array.from(item.querySelectorAll('.accordion-item'))
        box.forEach(header => {
            header.addEventListener('click', (e) => {
                if (value) {
                    box.forEach(item => item.classList.remove('active'))
                }
                header.classList.toggle('active')
            })
        })
    })
}


document.addEventListener('DOMContentLoaded', (e) => {
    init('accordion', true)
});


