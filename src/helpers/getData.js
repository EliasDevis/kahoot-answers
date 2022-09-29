const axios = require("axios").default;
const URLS = require("../consts").URLS;

function parseData(challenge) {
    return {
        pin: challenge.pin,
        urlId: challenge.challengeId,
        challengeId: challenge.quizId,
        startTime: challenge.startTime,
        endTime: challenge.endTime,
        randomizeAnswers: challenge.game_options.randomize_answers,
    }
}


async function getData(url) {
    return await axios
        .get(url)
        .catch(err => {
            if (err.response.data.error === 'NOT_FOUND')
                throw new Error('Not found')
        })
        .then(res => res.data)
}

function mapQuestions(questions) {
    return questions.map(({question, time, choices}) => {
        return {
            question,
            time,
            answers: choices,
        }
    })
}

module.exports.getByPin = async (pin) => {
    const url = URLS.pin.replace('{}', pin)
    const data = await getData(url)


    return {
        title: data.challenge.title, 
        questions: mapQuestions(data.kahoot.questions),
        ...parseData(data.challenge)
    }
    
}

module.exports.getByUrlId = async (urlId) => {
    const url = URLS.answers.replace('{}', urlId)
    const data = await getData(url)

    return {
        title: data.challenge.kahoot.title,
        questions: mapQuestions(data.challenge.kahoot.questions), 
        ...parseData(data.challenge)  
    }
}
