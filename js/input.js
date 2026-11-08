// Player input: keyboard, on-screen touch buttons and screen taps
function Input() {

    return {
        enableKeyboard,
        enableTouchControls,
        bindScreenButtons,
        preventDblClick,
        tapJump,
        tapMoveRight,
        tapMoveLeft,
        tapAttack,
        tapStop
    };

    function preventDblClick() {
        document.ondblclick = e => e.preventDefault();
    }

    function enableKeyboard() {
        const pressActions = {
                [KEY_RIGHT]: tapMoveRight,
                [KEY_LEFT]: tapMoveLeft,
                [KEY_ATTACK]: tapAttack,
                [KEY_JUMP]: tapJump
            },
            releaseButtons = {
                [KEY_RIGHT]: 'btnRight',
                [KEY_LEFT]: 'btnLeft',
                [KEY_ATTACK]: 'btnAttack',
                [KEY_JUMP]: 'btnJump'
            },
            pressedKeys = {};

        document.addEventListener('keydown', e => {
            pressedKeys[e.key] = true;
            if (pressActions[e.key]) pressActions[e.key]();
        });

        document.addEventListener('keyup', e => {
            pressedKeys[e.key] = false;
            setTimeout(() => {
                // The key may have been pressed again during the delay
                if (pressedKeys[e.key]) return;
                if (releaseButtons[e.key]) tapStop(releaseButtons[e.key]);
            }, 50);
        });
    }

    function enableTouchControls() {
        const buttons = {
            btnAttack: tapAttack,
            btnJump: tapJump,
            btnLeft: tapMoveLeft,
            btnRight: tapMoveRight
        };

        Object.entries(buttons).forEach(([id, onPress]) => {
            const btn = dom.el(id);
            btn.addEventListener('touchstart', () => onPress());
            btn.addEventListener('touchend', () => tapStop(id));
        });
    }

    function bindScreenButtons() {
        dom.el('startGame').addEventListener('click', () => game.init());
        dom.el('gameOver').addEventListener('click', () => events.reset());
        dom.el('levelScore').addEventListener('click', () => game.nextLevel());
    }

    function tapAttack() {
        if (gameOn && actions.canFire && !actions.swimming && !actions.shooting) {
            pressButton('btnAttack');
            commands.fire = true;
        }
    }

    function tapMoveRight() {
        if (gameOn && actions.canMove) {
            pressButton('btnRight');
            charman.face('right');
            commands.left = false;
            commands.right = true;
        }
    }

    function tapMoveLeft() {
        if (gameOn && actions.canMove) {
            pressButton('btnLeft');
            charman.face('left');
            commands.right = false;
            commands.left = true;
        }
    }

    function tapStop(btnId) {
        releaseButton(btnId);
        if (btnId === 'btnRight') commands.right = false;
        if (btnId === 'btnLeft') commands.left = false;
    }

    function tapJump() {
        if (gameOn && actions.canJump && !actions.swimming && !actions.falling && !actions.jumping) {
            pressButton('btnJump');
            commands.jump = true;
            sounds.play('charJump');
            setTimeout(() => { commands.jump = false; }, 150);
        }
    }

    // Visual feedback on the on-screen buttons
    function pressButton(btnId) {
        dom.el(btnId).style.filter = 'invert(1)';
    }

    function releaseButton(btnId) {
        dom.el(btnId).style.filter = 'invert(0)';
    }

}
