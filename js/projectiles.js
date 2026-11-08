// The player's arrow and enemy shots
import { state } from './state.js';
import { BASICMOVRATE, FLOORHORTOLERANCE, UFOSHOTWIDTH, UFOSHOTHEIGHT, CHARSHOTWIDTH, CHARSHOTHEIGHT } from './constants.js';
import { charDiv } from './charman.js';
import * as dom from './dom.js';
import * as collision from './collision.js';
import * as sounds from './sounds.js';
import * as enemies from './enemies.js';
import * as effects from './effects.js';
import * as game from './game.js';

const arrow = dom.el('charShot'),
    enemyShot = dom.el('ufoShot');

init();

function init() {
    dom.setSize(arrow, CHARSHOTWIDTH, CHARSHOTHEIGHT);
    dom.setSize(enemyShot, UFOSHOTWIDTH, UFOSHOTHEIGHT);
}

export function charShot() {
    if (state.actions.shooting) return;

    const direction = state.actions.lastDirection,
        top = state.topPos + 6;
    let left = (direction === 'right') ? state.leftPos + FLOORHORTOLERANCE : state.leftPos - CHARSHOTWIDTH;

    dom.at(arrow, left, top);
    state.actions.shooting = true;
    sounds.play('charArrow');

    moveArrow();

    function moveArrow() {
        if (state.actions.cancelShot) {
            stopArrow();
            return;
        }
        const hit = collision.hitEnemy(arrow);
        if (hit) {
            effects.explosion(left, top);
            enemies.takeHit(hit);
            stopArrow();
            return;
        }
        if (direction === 'right' && left <= 100) {
            left += BASICMOVRATE * 2;
        } else if (direction === 'left' && left >= -2) {
            left -= BASICMOVRATE * 2;
        } else {
            stopArrow();
            return;
        }
        arrow.style.left = `${left}%`;
        setTimeout(moveArrow, 5);
    }
}

function stopArrow() {
    dom.hide(arrow);
    state.actions.shooting = false;
}

// Shot from an enemy towards the player's side of the screen.
// relativeTop: height of the gun relative to the enemy's top.
// callback (e.g. the enemy leaving) runs once: 300ms after firing or
// when the shot leaves the screen, whichever comes first.
export function enemyFire(enemy, moveRate, relativeTop, callback) {
    if (!collision.isVisible(enemy)) return;

    let callbackDone = false;
    const done = () => {
        if (callbackDone || !callback) return;
        callbackDone = true;
        callback();
    };

    const enemyLeft = collision.getCoord(enemy.style.left),
        isRight = state.leftPos > enemyLeft;
    let left = isRight ? enemyLeft + collision.getCoord(enemy.style.width) : enemyLeft;

    sounds.play('ufoLaser');
    dom.at(enemyShot, left, collision.getCoord(enemy.style.top) + relativeTop);
    setTimeout(done, 300);
    moveShot();

    function moveShot() {
        if (state.actions.cancelShot) {
            dom.hide(enemyShot);
            return;
        }
        if (collision.areTouching(enemyShot, charDiv) && !state.actions.swimming) {
            game.endGame('hit');
            return;
        }
        if (!isRight && left >= -2) {
            left -= moveRate;
        } else if (isRight && left < 100) {
            left += moveRate;
        } else {
            dom.hide(enemyShot);
            done();
            return;
        }
        enemyShot.style.left = `${left}%`;
        setTimeout(moveShot, 5);
    }
}
