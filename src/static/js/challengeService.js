class Challenges {
    static getChallenges() {
        if (!localStorage.getItem('challenges'))
            localStorage.setItem('challenges', '[]');
    
        return JSON.parse(localStorage.getItem('challenges'));
    }
    
    static setChallenges(challenges) {
        localStorage.setItem('challenges', JSON.stringify(challenges))
    }

    static addChallenge(challenge) {
        const challenges = this.getChallenges()
    
        if (!challenges.some((chl) => chl.urlId === challenge.urlId))
            challenges.push(challenge);
    
        this.setChallenges(challenges)
    }
}