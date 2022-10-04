// import Challenges from "./challengeService.js";
// import formatAllDates from "./formatDate.js";

const tabs = document.querySelectorAll('.header__tab');
const activeClassname = 'header__tab_active';
const challenge = {
    pin: document.getElementById('pin').innerText,
    urlId: document.getElementById('urlId').innerText,
    date: +Date.now(),
    title: document.querySelector('.header__title').innerText
};


Challenges.addChallenge(challenge);

window.onload = () => {
    formatAllDates()
    if (window.location.hash.slice(1) === '') window.location.hash = '#info';

    tabs.forEach((tab) => {
        tab.classList.remove(activeClassname);
        if (tab.href === window.location.href)
            tab.classList.add(activeClassname);
    });
};

tabs.forEach((tab) =>
    tab.addEventListener('click', (ev) => {
        tabs.forEach((innerTab) => {
            if (innerTab.classList.contains(activeClassname))
                innerTab.classList.remove(activeClassname);
        });
        tab.classList.add(activeClassname);
    })
);
