// Start / game over / level score screens and the in-game HUD clock
function Screens() {

    return {
        showGame,
        showGameOver,
        hideGameOver,
        showLevelScore,
        updateTime
    };

    function showGame() {
        dom.el('gameElements').style.display = 'block';
        dom.hide('startGame');
    }

    function showGameOver() {
        dom.el('gameOver').style.display = 'block';
        dom.el('gameTime').innerHTML = timeUtils.formatGameTime(gameTime);
        dom.el('lastStage').innerHTML = currMap + 1;
        updateTime();
    }

    function hideGameOver() {
        dom.hide('gameOver');
    }

    function showLevelScore() {
        dom.el('levelScoreTime').innerHTML = timeUtils.formatGameTime(gameTime);
        dom.el('levelScoreStage').innerHTML = currMap + 1;
        dom.hide('gameElements');
        dom.el('levelScore').style.display = 'block';
    }

    function updateTime() {
        dom.el('time').innerHTML = `${timer} segs.`;
    }

}
