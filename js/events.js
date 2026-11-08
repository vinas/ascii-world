function Events() {

    this.tapJump = tapJump;
    this.tapMoveRight = tapMoveRight;
    this.tapMoveLeft = tapMoveLeft;
    this.tapStop = tapStop;
    this.tapAttack = tapAttack;
    this.reset = reset;
    this.crossRight = crossRight;
    this.crossLeft = crossLeft;
    this.triggers = triggers;

    return this;

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
        crossMap(1, display.setCharmanLeft);
    }

    function crossLeft() {
        crossMap(-1, display.setCharmanRight);
    }

    function crossMap(step, placeCharman) {
        actions.cancelShot = true;
        setup.hideHidables();
        placeCharman();
        currMap += step;
        setup.loadLevelMap();
        setTimeout(() => { actions.cancelShot = false; }, 20);
    }

    function reset() {
        setup.resetGame();
        gameOn = true;
        document.getElementById('gameOver').style.display = 'none';
    }

    function tapAttack() {
        if (gameOn && actions.canFire && !actions.swimming && !actions.shooting) {
            display.imgColorOver('btnAttack');
            commands.fire = true;
        }
    }

    function tapMoveRight() {
        if (gameOn && actions.canMove) {
            display.imgColorOver('btnRight');
            actions.lastDirection = 'right';
            display.mirrorObj(charmanImg, 1);
            commands.left = false;
            commands.right = true;
        }
    }

    function tapMoveLeft() {
        if (gameOn && actions.canMove) {
            display.imgColorOver('btnLeft');
            actions.lastDirection = 'left';
            display.mirrorObj(charmanImg, -1);
            commands.right = false;
            commands.left = true;
        }
    }

    function tapStop(elmId) {
        display.imgColorOut(elmId);
        if (elmId === 'btnRight') commands.right = false;
        if (elmId === 'btnLeft') commands.left = false;
    }

    function tapJump() {
        if (gameOn && actions.canJump && !actions.swimming && !actions.falling && !actions.jumping) {
            display.imgColorOver('btnJump');
            commands.jump = true;
            charJumpSound.play();
            setTimeout(() => { commands.jump = false; }, 150);
        }
    }

}
