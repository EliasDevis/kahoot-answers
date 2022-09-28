const block = document.getElementById("block");
const input = block.querySelector("input");
const button = block.querySelector("button")

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
    // ev.preventDefault()

    const status = await fetch(`/game?id=${input.value}`)
        .catch((err) => {
            input.classList.add('error');

            return {
                status: 400,
            }
        })
        .then(res => res.status);

    if (status === 200) 
        window.location.href = `/game?id=${input.value}`
    else {
        input.classList.add('error-anim');
        button.disabled = true
    }
});
