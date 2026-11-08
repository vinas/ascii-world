// Asset loading and (re)starting a game
function Setup() {

    return {
        loadContent,
        resetGame
    };

    function loadContent() {
        preloadImages([
            ...Object.values(charman.SPRITES),
            'img/interactions/explosion01.gif'
        ]);
        sounds.load();
    }

    function preloadImages(images) {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    function resetGame() {
        sounds.pause('gameOver');
        sounds.pause('nextLevel');
        sounds.playFromStart('music');
        levelMap.hideHidables();
        resetGameVariables();
        screens.updateTime();
        cancelAllActions();
        cancelAllCommands();
        charman.reset();
        level.loadLevelTriggers();
        levelMap.load();
    }

    function resetGameVariables() {
        topPos = CHARBASEFLOOR;
        leftPos = 0;
        currMap = 0;
        gameTime = 0;
        timer = 0;
        time = Date.now();
    }

    function cancelAllCommands() {
        commands.right = false;
        commands.left = false;
        commands.fire = false;
        commands.jump = false;
    }

    function cancelAllActions() {
        actions.canMove = true;
        actions.canJump = true;
        actions.canFire = true;
        actions.jumping = false;
        actions.firing = false;
        actions.swimming = false;
        actions.falling = false;
        actions.cancelShot = false;
        actions.shooting = false;
        actions.lastDirection = 'right';
        actions.abduction = false;
    }

}
