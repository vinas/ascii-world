// Level triggers, moving between maps, and restarting after game over
function Events() {

    return {
        triggers,
        crossRight,
        crossLeft,
        reset
    };

    // Runs the current map's trigger at the player's position (if any) while
    // moving right. Triggers are defined per map in js/levels/.
    function triggers() {
        const trigger = levelTriggers[currMap][Math.floor(leftPos) + FLOORHORTOLERANCE];
        if (!commands.right || !trigger) return;
        if (trigger.onlyOnce && trigger.triggered) return;

        trigger.actions.forEach((action, idx) => {
            if (trigger.params[idx]) {
                action(trigger.params[idx]);
            } else {
                action();
            }
        });
        trigger.triggered = true;
    }

    function crossRight() {
        crossMap(1, charman.placeAtLeftEdge);
    }

    function crossLeft() {
        crossMap(-1, charman.placeAtRightEdge);
    }

    function crossMap(step, placeCharman) {
        actions.cancelShot = true;
        levelMap.hideHidables();
        placeCharman();
        currMap += step;
        levelMap.load();
        setTimeout(() => { actions.cancelShot = false; }, 20);
    }

    function reset() {
        setup.resetGame();
        gameOn = true;
        screens.hideGameOver();
    }

}
