// Start / game over / level score screens and the in-game HUD clock
import { state } from './state.js';
import * as dom from './dom.js';
import * as timeUtils from './time-utils.js';

export function showGame() {
    dom.el('gameElements').style.display = 'block';
    dom.hide('startGame');
}

export function showGameOver() {
    dom.el('gameOver').style.display = 'block';
    dom.el('gameTime').innerHTML = timeUtils.formatGameTime(state.gameTime);
    dom.el('lastStage').innerHTML = state.currMap + 1;
    updateTime();
}

export function hideGameOver() {
    dom.hide('gameOver');
}

export function showLevelScore() {
    dom.el('levelScoreTime').innerHTML = timeUtils.formatGameTime(state.gameTime);
    dom.el('levelScoreStage').innerHTML = state.currMap + 1;
    dom.hide('gameElements');
    dom.el('levelScore').style.display = 'block';
}

export function updateTime() {
    dom.el('time').innerHTML = `${state.timer} segs.`;
}
