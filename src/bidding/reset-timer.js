function resetTimer() {
    const startDate = new Date().getTime();
    const endDate = startDate + 5000;

    const deadline = new Date(endDate).getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = deadline - now;
        // const seconds = Math.ceil(timeRemaining % (1000 * 60) / 1000);
       
        if(timeRemaining < 0) {
            clearInterval(interval);
            
        }
    });
}

export default resetTimer;