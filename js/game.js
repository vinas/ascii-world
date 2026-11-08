// Game lifecycle: start, main loop, clock and endings
function Game() {

    return {
        init,
        endGame,
        nextLevel,
        passedNextLevel
    };

    function init() {
        input.enableKeyboard();
        input.enableTouchControls();
        input.preventDblClick();
        setup.loadContent();
        screens.showGame();
        sounds.unlockForMobile();
        setup.resetGame();
        gameLoop();
        gameClock();
    }

    function nextLevel() {
        window.location.href = `level${timeUtils.addZero(level.current + 1)}.html`;
    }

    // Level trigger action: the level's goal was reached
    function passedNextLevel() {
        endGame('nextLevel');
    }

    function gameLoop() {
        if (gameOn) {
            handleMovement();
            events.triggers();
            handleGameEnds();
            handleCrossMargin();
            handleFiring();
        }
        setTimeout(gameLoop, 15);
    }

    // Whole seconds since the current game started, refreshed several times
    // a second so the HUD doesn't lag behind when a game restarts mid-second
    function gameClock() {
        if (gameOn) {
            timer = Math.floor((Date.now() - time) / 1000);
            screens.updateTime();
        }
        setTimeout(gameClock, 250);
    }

    function handleFiring() {
        if (commands.fire && !actions.firing) {
            actions.firing = true;
            charman.shoot(() => {
                commands.fire = false;
                actions.firing = false;
                projectiles.charShot();
            });
        }
    }

    function handleMovement() {
        physics.setCurrentFloorIndex();
        moveCharman();
        actions.swimming = physics.isUserOnWater();
        charman.handleCharmanImg();
        handleJump();
    }

    function moveCharman() {
        physics.setNewCoord();
        if (physics.shouldBeFalling()) {
            if (physics.isOverHole()) {
                endGame('hole');
            } else {
                charman.fall();
            }
        }
        charDiv.style.left = `${leftPos}%`;
    }

    function handleJump() {
        if (commands.jump && !actions.jumping) {
            actions.jumping = true;
            charman.jump();
        }
    }

    function handleCrossMargin() {
        if (commands.right || commands.left) {
            if (leftPos >= 98) {
                events.crossRight();
            } else if (currMap !== 0 && leftPos <= -3) {
                events.crossLeft();
            }
        }
    }

    function handleGameEnds() {
        const ending = getEndingCause();
        if (ending) endGame(ending);
    }

    function getEndingCause() {
        if (physics.isSteppingOnHole()) return 'hole';
        if (collision.touchedEnemy()) return 'touched';
        return false;
    }

    // Level trigger action too (level 1 ends with endGame('abducted'))
    function endGame(reason) {
        gameOn = false;
        sounds.pause('music');
        sounds.pause('pigJump');
        setGameEndingTime();
        switch (reason) {
            case 'hole':
                sounds.playFromStart('gameOver');
                charman.fall(screens.showGameOver);
                break;
            case 'hit':
            case 'touched':
                sounds.playFromStart('gameOver');
                screens.showGameOver();
                break;
            case 'abducted':
                sounds.playFromStart('nextLevel');
                enemies.abduction();
                break;
            case 'nextLevel':
                sounds.playFromStart('nextLevel');
                screens.showLevelScore();
        }
    }

    function setGameEndingTime() {
        gameTime = Date.now() - time;
        timer = 0;
    }

}
