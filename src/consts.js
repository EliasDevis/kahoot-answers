const URL = 'https://kahoot.it/rest/challenges/'

const regexes = {
    pin: /^\d{8}$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    time: /^\d{13,}$/,
}

regexes.urlId = new RegExp(regexes.uuid.source.replace('$', '') + '_' + regexes.time.source.replace('^', ''))

module.exports.URLS = {
    progress: `${URL}{}/progress`,
    pin: `${URL}pin/{}`,
    answers: `${URL}{}/answers`,
}

module.exports.regexes = regexes
