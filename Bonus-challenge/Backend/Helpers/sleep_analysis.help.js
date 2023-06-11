module.exports = {
    calculateSleepEfficiency : (sleep_hours) => {
        if(sleep_hours >= 8)
        {
            return 100;
        }
        else if(sleep_hours >= 6)
        {
            return 80;
        }
        else if(sleep_hours >= 4)
        {
            return 60;
        }
        else{
            return 40;
        }
    }
}