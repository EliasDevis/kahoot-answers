const URL = 'https://kahoot.it/rest/challenges/'

module.exports.URLS = {
    progress: `${URL}{id}/progress`,
    pin: `${URL}pin/{pin}`,
    answers: `${URL}{id}/answers`,
}