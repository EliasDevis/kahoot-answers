import formatAllDates from './formatDate.js';
import Challenges from './challengeService.js';

const block = document.getElementById('block');
const input = block.querySelector('input');
const button = block.querySelector('button');

function renderChallenges() {
    const challenges = Challenges.getChallenges();
    const challengesContainer = document.createElement('details');

    challengesContainer.classList = 'challenges';
    challengesContainer.innerHTML = `<summary>Viewed challenges</summary><div class="challenges__list"></div>`;

    const challengesList =
        challengesContainer.querySelector('.challenges__list');

    challenges.forEach((ch) => {
        const challenge = document.createElement('div');

        challenge.classList = 'challenge';
        challenge.dataset.id = ch.urlId;

        challenge.innerHTML = `
            <div class="challenge__name">${ch.title.slice(0, 18) + '...'}</div>
            <div class="challenge__date format-date">${ch.date}</div>
        `;

        challenge.addEventListener('click', (e) => {
            window.location.replace(`/game?id=${challenge.dataset.id}`);
        });

        challengesList.append(challenge);
    });

    if (challenges.length > 0)
        document.body.insertBefore(
            challengesContainer,
            document.querySelector('footer')
        );
}

renderChallenges();
formatAllDates();

input.addEventListener('input', (ev) => {
    input.classList.remove('error-anim');

    if (!new RegExp(input.pattern).test(input.value)) {
        input.classList.add('error');
        button.disabled = true;
    } else {
        input.classList.remove('error');
        button.disabled = false;

    }
});

input.addEventListener('keyup', e => {
    if (e.key === 'Enter' && !button.disabled) {
        // console.log("ayy")
        button.click()
    }
})

block.querySelector('button').addEventListener('click', async (ev) => {
    let id = input.value
        .replace(/((http|https):\/\/)?kahoot.it\/challenge\//, '')
        .replace(/\d{8}\?challenge-id=/, '');

    const status = await fetch(`/game?id=${id}`)
        .catch((err) => {
            input.classList.add('error');

            return {
                status: 400,
            };
        })
        .then((res) => res.status);

    if (status === 200) window.location.href = `/game?id=${id}`;
    else {
        input.classList.add('error-anim');
        button.disabled = true;
    }
});
