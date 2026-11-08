// Level triggers, moving between maps, and restarting after game over
import { state } from './state.js';
import { FLOORHORTOLERANCE } from './constants.js';
import * as levelMap from './level-map.js';
import * as charman from './charman.js';
import * as screens from './screens.js';
import * as setup from './setup.js';

// Runs the current map's trigger at the player's position (if any) while
// moving right. Triggers are defined per map in js/levels/.
export function triggers() {
    const trigger = state.levelTriggers[state.currMap][Math.floor(state.leftPos) + FLOORHORTOLERANCE];
    if (!state.commands.right || !trigger) return;
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

export function crossRight() {
    crossMap(1, charman.placeAtLeftEdge);
}

export function crossLeft() {
    crossMap(-1, charman.placeAtRightEdge);
}

function crossMap(step, placeCharman) {
    state.actions.cancelShot = true;
    levelMap.hideHidables();
    placeCharman();
    state.currMap += step;
    levelMap.load();
    setTimeout(() => { state.actions.cancelShot = false; }, 20);
}

export function reset() {
    setup.resetGame();
    state.gameOn = true;
    screens.hideGameOver();
}
