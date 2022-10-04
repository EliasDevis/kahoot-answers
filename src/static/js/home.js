const block = document.getElementById("block");
const input = block.querySelector("input");
const button = block.querySelector("button")
const regexes = {
    pinUrl: /^((http|https):\/\/)?kahoot.it\/challenge\/(\d{8})(\?challenge-id=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_\d{13,})?$/,
    idUrl: /^((http|https):\/\/)?kahoot.it\/challenge\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_\d{13,})$/,
}



input.addEventListener('input', (ev) => {
    input.classList.remove('error-anim');

    if (!new RegExp(input.pattern).test(input.value)) {
        input.classList.add('error');
        button.disabled = true
    } else {
        input.classList.remove('error')
        button.disabled = false

    }
})

block.querySelector("button").addEventListener("click", async (ev) => {
    let id = input.value
        .replace(/((http|https):\/\/)?kahoot.it\/challenge\//, '')
        .replace(/\?challenge-id=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_\d{13,}/, '')

    const status = await fetch(`/game?id=${id}`)
        .catch((err) => {
            input.classList.add('error');

            return {
                status: 400,
            }
        })
        .then(res => res.status);

    if (status === 200) 
        window.location.href = `/game?id=${id}`
    else {
        input.classList.add('error-anim');
        button.disabled = true
    }
});
