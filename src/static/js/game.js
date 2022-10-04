const tabs = document.querySelectorAll('.header__tab');
const activeClassname = 'header__tab_active';


window.onload = () => {
    if (window.location.hash.slice(1) === '') window.location.hash = '#info';
    tabs.forEach(tab => {
        // console.log(tab.href)
        // console.log(window.location.href)
        tab.classList.remove(activeClassname)
        if (tab.href === window.location.href) tab.classList.add(activeClassname)
    })
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
