const HOST = 'https://kahoot.it'
const URL = `${HOST}/rest/challenges/`

//  * https://kahoot.it/challenge/04442638?challenge-id=6e342965-8e19-47ed-8f27-5707b03d8797_1664805379662
// * https://kahoot.it/challenge/6e342965-8e19-47ed-8f27-5707b03d8797_1664805379662

const regexes = {
    pin: /^\d{8}$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    time: /^\d{13,}$/,
    pinUrl: /^((http|https):\/\/)?kahoot.it\/challenge\/\d{8}(\?challenge-id=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_\d{13,})?$/,
    idUrl: /^((http|https):\/\/)?kahoot.it\/challenge\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_\d{13,}$/,
    urlId: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}_\d{13,}$/
}

// const inputRegexes = ['pin', 'urlId', 'idUrl', 'pinUrl']

module.exports.URLS = {
    progress: `${URL}{}/progress`,
    pin: `${URL}pin/{}`,
    answers: `${URL}{}/answers`,
}

module.exports.regexes = regexes
