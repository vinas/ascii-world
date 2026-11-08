// The player character: placement, sprites, jumping and falling
import { state } from './state.js';
import { JUMPVARRATE, FLOORHORTOLERANCE, FLOORVERTTOLERANCE } from './constants.js';
import * as dom from './dom.js';
import * as physics from './map-physics.js';
import * as input from './input.js';

export const charDiv = dom.el('charman'),
    charmanImg = dom.el('charmanImg');

export const SPRITES = {
    idle: 'img/charman/charman-01.png',
    run: 'img/charman/charman-run.gif',
    jump: 'img/charman/charman-jump.gif',
    swim: 'img/charman/charman-swim.gif',
    bow: 'img/charman/charman-bow.gif',
    handsUp: 'img/charman/charman-hands-up.png'
};

init();

function init() {
    dom.setSize(charDiv, FLOORHORTOLERANCE, FLOORVERTTOLERANCE);
}

export function reset() {
    charDiv.style.opacity = 1;
    charDiv.style.top = `${state.topPos}%`;
    charDiv.style.left = `${state.leftPos}%`;
    charDiv.style.display = 'block';
}

export function face(direction) {
    state.actions.lastDirection = direction;
    dom.mirror(charmanImg, (direction === 'right') ? 1 : -1);
}

export function freezeChar() {
    input.tapStop('btnRight');
    state.actions.canMove = false;
    state.actions.canJump = false;
    state.actions.canFire = false;
}

export function unfreezeChar() {
    state.actions.canMove = true;
    state.actions.canJump = true;
    state.actions.canFire = true;
}

// Level trigger action: teleport the player
export function charAt(params) {
    state.leftPos = params.left;
    state.topPos = params.top;
    dom.at(charDiv, state.leftPos, state.topPos);
}

// Entering a map from the previous one
export function placeAtLeftEdge() {
    charDiv.style.left = '-3%';
    state.leftPos = -3;
    state.floorIndex = 0;
}

// Entering a map from the next one
export function placeAtRightEdge() {
    charDiv.style.left = '97%';
    state.leftPos = 95;
}

export function jump() {
    const jumpTop = physics.jumpTop();
    let direction = 'up';

    setJumpingImg();
    jumping();

    function jumping() {
        const base = physics.jumpFloorBase();
        if (state.topPos <= jumpTop) direction = 'down';
        state.topPos += (direction === 'up') ? -JUMPVARRATE : JUMPVARRATE;
        if (state.topPos >= base) {
            state.topPos = base;
            dom.moveVertically(charDiv, state.topPos);
            state.actions.jumping = false;
            return;
        }
        dom.moveVertically(charDiv, state.topPos);
        setTimeout(jumping, 10);
    }
}

export function fall(callback) {
    if (state.actions.falling) return;

    state.actions.falling = true;
    const target = physics.fallTarget();
    setTimeout(handsUp, 20);
    falling();

    function falling() {
        if (state.topPos <= target) {
            state.topPos += JUMPVARRATE;
            dom.moveVertically(charDiv, state.topPos);
            setTimeout(falling, 5);
        } else {
            dom.moveVertically(charDiv, target);
            state.actions.falling = false;
            if (callback) callback();
        }
    }
}

// Bow animation; callback fires when the arrow should be released
export function shoot(callback) {
    charmanImg.setAttribute('src', SPRITES.bow);
    if (callback) setTimeout(callback, 300);
}

export function handsUp() {
    charmanImg.setAttribute('src', SPRITES.handsUp);
}

export function handleCharmanImg() {
    if (state.actions.swimming) {
        setSwimmingImg();
    } else if (!state.actions.falling && (state.commands.right || state.commands.left) && (state.actions.jumping || !state.actions.firing)) {
        setRunningImg();
    } else if (!state.actions.jumping && !state.actions.firing && !state.actions.falling) {
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
    if (state.gameOn && !state.actions.jumping) {
        if (physics.isUserOnWater()) {
            setSwimmingImg();
            return;
        }
        setIdleImg();
        setTimeout(backToIdleAfterJump, 50);
    }
}

function setRunningImg() {
    if (!state.actions.jumping && charmanImg.getAttribute('src') !== SPRITES.run) {
        setSprite(SPRITES.run, '100%', '100%', '0%');
    }
}

function setSwimmingImg() {
    if (!state.actions.jumping && charmanImg.getAttribute('src') !== SPRITES.swim) {
        setSprite(SPRITES.swim, '160%', '60%', '85%');
    }
}

function setSprite(src, width, height, paddingTop) {
    charmanImg.setAttribute('src', src);
    charmanImg.style.width = width;
    charmanImg.style.height = height;
    charmanImg.style.paddingTop = paddingTop;
}
