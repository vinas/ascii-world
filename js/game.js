// Game lifecycle: start, main loop, clock and endings
import { state } from './state.js';
import * as collision from './collision.js';
import * as sounds from './sounds.js';
import * as physics from './map-physics.js';
import * as charman from './charman.js';
import * as projectiles from './projectiles.js';
import * as enemies from './enemies.js';
import * as screens from './screens.js';
import * as input from './input.js';
import * as events from './events.js';
import * as setup from './setup.js';

export function init() {
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

export function nextLevel() {
    window.location.search = `?level=${state.level.current + 1}`;
}

// Level trigger action: the level's goal was reached
export function passedNextLevel() {
    endGame('nextLevel');
}

function gameLoop() {
    if (state.gameOn) {
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
    if (state.gameOn) {
        state.timer = Math.floor((Date.now() - state.time) / 1000);
        screens.updateTime();
    }
    setTimeout(gameClock, 250);
}

function handleFiring() {
    if (state.commands.fire && !state.actions.firing) {
        state.actions.firing = true;
        charman.shoot(() => {
            state.commands.fire = false;
            state.actions.firing = false;
            projectiles.charShot();
        });
    }
}

function handleMovement() {
    physics.setCurrentFloorIndex();
    moveCharman();
    state.actions.swimming = physics.isUserOnWater();
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
    charman.charDiv.style.left = `${state.leftPos}%`;
}

function handleJump() {
    if (state.commands.jump && !state.actions.jumping) {
        state.actions.jumping = true;
        charman.jump();
    }
}

function handleCrossMargin() {
    if (state.commands.right || state.commands.left) {
        if (state.leftPos >= 98) {
            events.crossRight();
        } else if (state.currMap !== 0 && state.leftPos <= -3) {
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
export function endGame(reason) {
    state.gameOn = false;
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
    state.gameTime = Date.now() - state.time;
    state.timer = 0;
}
