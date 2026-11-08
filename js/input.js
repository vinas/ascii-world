// Player input: keyboard, on-screen touch buttons and screen taps
import { state } from './state.js';
import { KEY_LEFT, KEY_RIGHT, KEY_ATTACK, KEY_JUMP } from './constants.js';
import * as dom from './dom.js';
import * as sounds from './sounds.js';
import * as charman from './charman.js';
import * as events from './events.js';
import * as game from './game.js';

export function preventDblClick() {
    document.ondblclick = e => e.preventDefault();
}

export function enableKeyboard() {
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

export function enableTouchControls() {
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

export function bindScreenButtons() {
    dom.el('startGame').addEventListener('click', () => game.init());
    dom.el('gameOver').addEventListener('click', () => events.reset());
    dom.el('levelScore').addEventListener('click', () => game.nextLevel());
}

export function tapAttack() {
    if (state.gameOn && state.actions.canFire && !state.actions.swimming && !state.actions.shooting) {
        pressButton('btnAttack');
        state.commands.fire = true;
    }
}

export function tapMoveRight() {
    if (state.gameOn && state.actions.canMove) {
        pressButton('btnRight');
        charman.face('right');
        state.commands.left = false;
        state.commands.right = true;
    }
}

export function tapMoveLeft() {
    if (state.gameOn && state.actions.canMove) {
        pressButton('btnLeft');
        charman.face('left');
        state.commands.right = false;
        state.commands.left = true;
    }
}

export function tapStop(btnId) {
    releaseButton(btnId);
    if (btnId === 'btnRight') state.commands.right = false;
    if (btnId === 'btnLeft') state.commands.left = false;
}

export function tapJump() {
    if (state.gameOn && state.actions.canJump && !state.actions.swimming && !state.actions.falling && !state.actions.jumping) {
        pressButton('btnJump');
        state.commands.jump = true;
        sounds.play('charJump');
        setTimeout(() => { state.commands.jump = false; }, 150);
    }
}

// Visual feedback on the on-screen buttons
function pressButton(btnId) {
    dom.el(btnId).style.filter = 'invert(1)';
}

function releaseButton(btnId) {
    dom.el(btnId).style.filter = 'invert(0)';
}
