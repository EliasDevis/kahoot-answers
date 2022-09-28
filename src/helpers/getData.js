const axios = require("axios").default;
const URLS = require("../consts").URLS;

module.exports = async (idOrPin, isPin) => {
    const url = URLS.pin.replace('{}', idOrPin) 

    const data = await axios
        .get(url)
        .then((res) => res.data)
        .catch(err => {
            if (err.response.data.error === 'NOT_FOUND') throw new Error('Pin is wrong')
        });

    return {
        pin: data.challenge.pin,
        fullChallengeId: data.challenge.challengeId,
        challengeId: data.challenge.quizId,
        startTime: data.challenge.startTime,
        endTime: data.challenge.endTime,
        randomizeAnswers: data.challenge.game_options.randomize_answers,
        title: (isPin ? data.challenge : data.challenge.kahoot).title,
        questions: (isPin ? data.kahoot : data.challenge.kahoot).questions.map((question) => {
            return {
                question: question.question,
                time: question.time,
                answers: question.choices,
            };
        }),
    };
};
