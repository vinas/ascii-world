// The player character: placement, sprites, jumping and falling
function Charman() {

    const SPRITES = {
        idle: 'img/charman/charman-01.png',
        run: 'img/charman/charman-run.gif',
        jump: 'img/charman/charman-jump.gif',
        swim: 'img/charman/charman-swim.gif',
        bow: 'img/charman/charman-bow.gif',
        handsUp: 'img/charman/charman-hands-up.png'
    };

    init();

    return {
        SPRITES,
        reset,
        face,
        jump,
        fall,
        shoot,
        handsUp,
        handleCharmanImg,
        placeAtLeftEdge,
        placeAtRightEdge,
        charAt,
        freezeChar,
        unfreezeChar
    };

    function init() {
        charDiv = dom.el('charman');
        charmanImg = dom.el('charmanImg');
        dom.setSize(charDiv, FLOORHORTOLERANCE, FLOORVERTTOLERANCE);
    }

    function reset() {
        charDiv.style.opacity = 1;
        charDiv.style.top = `${topPos}%`;
        charDiv.style.left = `${leftPos}%`;
        charDiv.style.display = 'block';
    }

    function face(direction) {
        actions.lastDirection = direction;
        dom.mirror(charmanImg, (direction === 'right') ? 1 : -1);
    }

    function freezeChar() {
        input.tapStop('btnRight');
        actions.canMove = false;
        actions.canJump = false;
        actions.canFire = false;
    }

    function unfreezeChar() {
        actions.canMove = true;
        actions.canJump = true;
        actions.canFire = true;
    }

    // Level trigger action: teleport the player
    function charAt(params) {
        leftPos = params.left;
        topPos = params.top;
        dom.at(charDiv, leftPos, topPos);
    }

    // Entering a map from the previous one
    function placeAtLeftEdge() {
        charDiv.style.left = '-3%';
        leftPos = -3;
        floorIndex = 0;
    }

    // Entering a map from the next one
    function placeAtRightEdge() {
        charDiv.style.left = '97%';
        leftPos = 95;
    }

    function jump() {
        const jumpTop = physics.jumpTop();
        let direction = 'up';

        setJumpingImg();
        jumping();

        function jumping() {
            const base = physics.jumpFloorBase();
            if (topPos <= jumpTop) direction = 'down';
            topPos += (direction === 'up') ? -JUMPVARRATE : JUMPVARRATE;
            if (topPos >= base) {
                topPos = base;
                dom.moveVertically(charDiv, topPos);
                actions.jumping = false;
                return;
            }
            dom.moveVertically(charDiv, topPos);
            setTimeout(jumping, 10);
        }
    }

    function fall(callback) {
        if (actions.falling) return;

        actions.falling = true;
        const target = physics.fallTarget();
        setTimeout(handsUp, 20);
        falling();

        function falling() {
            if (topPos <= target) {
                topPos += JUMPVARRATE;
                dom.moveVertically(charDiv, topPos);
                setTimeout(falling, 5);
            } else {
                dom.moveVertically(charDiv, target);
                actions.falling = false;
                if (callback) callback();
            }
        }
    }

    // Bow animation; callback fires when the arrow should be released
    function shoot(callback) {
        charmanImg.setAttribute('src', SPRITES.bow);
        if (callback) setTimeout(callback, 300);
    }

    function handsUp() {
        charmanImg.setAttribute('src', SPRITES.handsUp);
    }

    function handleCharmanImg() {
        if (actions.swimming) {
            setSwimmingImg();
        } else if (!actions.falling && (commands.right || commands.left) && (actions.jumping || !actions.firing)) {
            setRunningImg();
        } else if (!actions.jumping && !actions.firing && !actions.falling) {
            setIdleImg();
        }
    }

    function setIdleImg() {
        charmanImg.setAttribute('src', SPRITES.idle);
    }

    function setJumpingImg() {
        setSprite(SPRITES.jump, '100%', '100%', '0%');
        backToIdleAfterJump();
    }

    function backToIdleAfterJump() {
        if (gameOn && !actions.jumping) {
            if (physics.isUserOnWater()) {
                setSwimmingImg();
                return;
            }
            setIdleImg();
            setTimeout(backToIdleAfterJump, 50);
        }
    }

    function setRunningImg() {
        if (!actions.jumping && charmanImg.getAttribute('src') !== SPRITES.run) {
            setSprite(SPRITES.run, '100%', '100%', '0%');
        }
    }

    function setSwimmingImg() {
        if (!actions.jumping && charmanImg.getAttribute('src') !== SPRITES.swim) {
            setSprite(SPRITES.swim, '160%', '60%', '85%');
        }
    }

    function setSprite(src, width, height, paddingTop) {
        charmanImg.setAttribute('src', src);
        charmanImg.style.width = width;
        charmanImg.style.height = height;
        charmanImg.style.paddingTop = paddingTop;
    }

}
