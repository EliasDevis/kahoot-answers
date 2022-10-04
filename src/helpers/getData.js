const axios = require('axios').default;
const URLS = require('../consts').URLS;

function parseData(challenge) {
    return {
        pin: challenge.pin,
        urlId: challenge.challengeId,
        challengeId: challenge.quizMaster.uuid,
        startTime: challenge.startTime,
        endTime: challenge.endTime,
        randomizeAnswers: challenge.game_options.randomize_answers,
    };
}

async function getData(url) {
    return await axios
        .get(url)
        .catch((err) => {
            if (err.response.data.error === 'NOT_FOUND')
                throw new Error('Not found');
        })
        .then((res) => res.data);
}

function mapQuestions(questions) {
    return questions.map(({ question, time, choices, image }) => {
        return {
            question,
            time,
            answers: choices.map(choice => {
                return {
                    correct: choice.correct,
                    answer: choice.answer,
                    imageUrl: choice.image ? `https://media.kahoot.it/${choice.image.id}` : undefined
                }
            }),
            imageUrl: image
        };
    });
}

module.exports.getByPin = async (pin) => {
    const data = await getData(URLS.pin.replace('{}', pin));

    return {
        title: data.challenge.title,
        questions: mapQuestions(data.kahoot.questions),
        coverUrl: data.kahoot.cover,
        creator: {
            id: data.kahoot.creator,
            username: data.kahoot.creator_username
        },
        ...parseData(data.challenge),
    };
};

module.exports.getByUrlId = async (urlId) => {
    const data = await getData(URLS.answers.replace('{}', urlId));

    return {
        title: data.challenge.kahoot.title,
        questions: mapQuestions(data.challenge.kahoot.questions),
        coverUrl: data.challenge.kahoot.cover,
        creator: {
            id: data.challenge.kahoot.creator,
            username: data.challenge.kahoot.creator_username
        },
        ...parseData(data.challenge),
    };
};
