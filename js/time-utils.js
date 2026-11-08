function TimeUtils() {

    return {
        formatGameTime,
        addZero
    };

    // 'm:ss:ms' from a duration in milliseconds
    function formatGameTime(millis) {
        const date = new Date(millis);
        return `${date.getUTCMinutes()}:${addZero(date.getUTCSeconds())}:${date.getUTCMilliseconds()}`;
    }

    function addZero(i) {
        return (i < 10) ? `0${i}` : i;
    }

}
