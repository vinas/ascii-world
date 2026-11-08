// Asset loading and (re)starting a game
import { state } from './state.js';
import { CHARBASEFLOOR } from './constants.js';
import * as sounds from './sounds.js';
import * as levelMap from './level-map.js';
import * as charman from './charman.js';
import * as screens from './screens.js';

export function loadContent() {
    preloadImages([
        ...Object.values(charman.SPRITES),
        'img/interactions/explosion01.gif'
    ]);
    sounds.load();
}

function preloadImages(images) {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

export function resetGame() {
    sounds.pause('gameOver');
    sounds.pause('nextLevel');
    sounds.playFromStart('music');
    levelMap.hideHidables();
    resetGameVariables();
    screens.updateTime();
    cancelAllActions();
    cancelAllCommands();
    charman.reset();
    state.level.loadLevelTriggers();
    levelMap.load();
}

function resetGameVariables() {
    state.topPos = CHARBASEFLOOR;
    state.leftPos = 0;
    state.currMap = 0;
    state.gameTime = 0;
    state.timer = 0;
    state.time = Date.now();
}

function cancelAllCommands() {
    state.commands.right = false;
    state.commands.left = false;
    state.commands.fire = false;
    state.commands.jump = false;
}

function cancelAllActions() {
    state.actions.canMove = true;
    state.actions.canJump = true;
    state.actions.canFire = true;
    state.actions.jumping = false;
    state.actions.firing = false;
    state.actions.swimming = false;
    state.actions.falling = false;
    state.actions.cancelShot = false;
    state.actions.shooting = false;
    state.actions.lastDirection = 'right';
    state.actions.abduction = false;
}
