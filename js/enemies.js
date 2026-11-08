// Enemy behaviours, used as level trigger actions (see js/levels/)
import { state } from './state.js';
import { BASICMOVRATE, JUMPVARRATE, FLOORHORTOLERANCE } from './constants.js';
import * as dom from './dom.js';
import * as collision from './collision.js';
import * as sounds from './sounds.js';
import * as charman from './charman.js';
import * as projectiles from './projectiles.js';
import * as screens from './screens.js';

const ufo = dom.el('ufo'),
    alien = dom.el('alien'),
    pig = dom.el('pig'),
    bigBoss = dom.el('bigBoss'),
    abductionRay = dom.el('abduction');

init();

function init() {
    dom.setSize(ufo, 20, 20);
    dom.setSize(pig, 8, 10);
    dom.setSize(alien, 4, 14);
    dom.setSize(bigBoss, 20, 35);
    bigBoss.health = 0;
}

// Elements that kill the player on touch and can be shot
export function list() {
    return [ufo, pig, alien, bigBoss];
}

export function takeHit(enemy) {
    if (enemy === bigBoss) {
        bigBoss.health -= 1;
        if (bigBoss.health > 0) return;
    }
    dom.hide(enemy);
}

export function moveElmRight(el, target, moveRate, callback) {
    const top = collision.getCoord(el.style.top);
    let left = collision.getCoord(el.style.left);

    moveRight();

    function moveRight() {
        if (!collision.isVisible(el)) return;
        if (left <= target) {
            left += moveRate;
            dom.at(el, left, top);
            setTimeout(moveRight, 5);
        } else {
            dom.hide(el);
            if (callback) callback();
        }
    }
}

// Slides an element down from `top` until it reaches `target`
function elementVertIn(el, left, top, target, callback, args) {
    dom.at(el, left, top);
    goingDown();

    function goingDown() {
        if (top <= target) {
            top += BASICMOVRATE * 1.5;
            el.style.top = `${top}%`;
            setTimeout(goingDown, 5);
            return;
        }
        el.style.top = `${top}%`;
        if (callback) callback(args);
    }
}

// Slides an element up and out of the screen, then hides it
function elementVertOut(el, moveRate, callback, args) {
    let top = collision.getCoord(el.style.top);
    goingUp();

    function goingUp() {
        if (top > -20) {
            top -= moveRate;
            el.style.top = `${top}%`;
            setTimeout(goingUp, 5);
        } else {
            dom.hide(el);
            if (callback) callback(args);
        }
    }
}

// ---- UFO ----

export function ufoIn(pos, callback, args) {
    if (ufo.style.display === 'none') {
        elementVertIn(ufo, pos.left, -20, pos.top, callback, args);
    }
}

export function ufoOut() {
    if (ufo.style.display === 'block') {
        elementVertOut(ufo, BASICMOVRATE * 3, false, false);
    }
}

export function ufoAttack01(pos) {
    ufoIn(pos, ufoShot);
}

function ufoShot() {
    projectiles.enemyFire(ufo, BASICMOVRATE * .6, 10, ufoOut);
}

// End of level 1: the UFO beams the player up
export function abduction() {
    charman.handsUp();
    ufoIn({ left: centeredUfoLeft(state.leftPos), top: 20 }, abduct, charman.charDiv);
}

export function abductPig() {
    ufoIn({ left: centeredUfoLeft(collision.getCoord(pig.style.left)), top: 10 }, abduct, pig);
}

function centeredUfoLeft(targetLeft) {
    return targetLeft - (collision.getCoord(ufo.style.width) / 2) + (FLOORHORTOLERANCE / 2);
}

function abduct(abductee) {
    dom.at(
        abductionRay,
        collision.getCoord(ufo.style.left) + 2.5,
        collision.getCoord(ufo.style.top) + collision.getCoord(ufo.style.height)
    );
    dom.fade(abductee, abducted);
}

function abducted(el) {
    dom.hide(abductionRay);
    setTimeout(() => {
        ufoOut();
        dom.hide(el);
        if (el === charman.charDiv) setTimeout(screens.showLevelScore, 1500);
    }, 100);
}

// ---- Pig ----

export function standingPig(params) {
    dom.at(pig, params.left, params.top);
    if (params.callback) params.callback();
}

export function jumpingPig(jumpInfo) {
    const base = jumpInfo.top,
        jumpTop = Number.isInteger(jumpInfo.forceTop) ? jumpInfo.forceTop : base - 20;
    let top = base,
        dir = 'up';

    dom.at(pig, jumpInfo.left, jumpInfo.top);
    jumping();

    function jumping() {
        if (top < jumpTop) {
            dir = 'down';
        } else if (top >= base) {
            sounds.play('pigJump');
            dir = 'up';
        }
        top += (dir === 'up') ? -JUMPVARRATE : JUMPVARRATE;
        if (collision.isVisible(pig)) {
            dom.moveVertically(pig, top);
            setTimeout(jumping, 10);
        }
    }
}

// ---- Alien ----

export function standingAlien(params) {
    dom.at(alien, params.left, params.top);
    if (params.callback) params.callback();
}

// Walks in from the right edge (or the left edge if params.right) to params.left
export function alienIn(params) {
    let left = params.right ? -3 : 100;

    dom.at(alien, left, params.top);

    moveAlien();

    function moveAlien() {
        if (!collision.isVisible(alien)) return;
        if (!params.right && left >= params.left) {
            left -= BASICMOVRATE * .6;
        } else if (params.right && left < params.left) {
            left += BASICMOVRATE * .6;
        } else {
            if (params.callback) params.callback();
            return;
        }
        dom.at(alien, left, params.top);
        setTimeout(moveAlien, 5);
    }
}

export function alienOutRight(callback) {
    moveElmRight(alien, 100, BASICMOVRATE * .6, callback);
}

export function alienOutLeft(callback) {
    const top = collision.getCoord(alien.style.top);
    let left = collision.getCoord(alien.style.left);

    moveLeft();

    function moveLeft() {
        if (!collision.isVisible(alien)) return;
        if (left > -5) {
            left -= BASICMOVRATE * .6;
            dom.at(alien, left, top);
            setTimeout(moveLeft, 5);
        } else {
            dom.hide(alien);
            if (callback) callback();
        }
    }
}

export function alienAttack01(pos) {
    pos.callback = alienShot;
    alienIn(pos);
}

function alienShot() {
    projectiles.enemyFire(alien, BASICMOVRATE, 9, alienOutRight);
}

// ---- Big boss ----

export function bigBossIn(params) {
    elementVertIn(bigBoss, params.left, params.startAt || -20, params.top, params.callback, false);
}

export function bigBossOut(callback) {
    elementVertOut(bigBoss, BASICMOVRATE * 2, callback, false);
}

function bigBossShoot(callback) {
    projectiles.enemyFire(bigBoss, BASICMOVRATE, 23, callback);
}

// Boss keeps dropping in at alternating sides and shooting until it
// takes 4 hits; then params.callback(params.args) runs.
export function bigBossRoutine(params) {
    let count = 0;
    bigBoss.health = 4;

    routine();

    function routine() {
        const tempLeft = Math.floor(Math.random() * 30),
            left = (count % 2 === 0) ? tempLeft : tempLeft + 50;

        bigBossIn({ left, top: 12, callback: () => setTimeout(stepDown, 100) });

        function stepDown() {
            if (!isAlive() || !state.gameOn) return finish();
            bigBossIn({ left, top: 31, startAt: 12, callback: () => setTimeout(attack, 130) });
        }

        function attack() {
            if (!isAlive() || !state.gameOn) return finish();
            bigBossShoot();
            bigBossOut(() => {
                count++;
                setTimeout(routine, 650);
            });
        }
    }

    function finish() {
        if (state.gameOn && params.callback) params.callback(params.args ? params.args : false);
    }

    function isAlive() {
        return collision.isVisible(bigBoss) && bigBoss.health > 0;
    }
}
