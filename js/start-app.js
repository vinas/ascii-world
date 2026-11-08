// Entry point: loads the level given by ?level=N (default 1) and wires up the start screen
import { state } from './state.js';
import * as input from './input.js';

const FIRST_LEVEL = 1;

async function loadLevel() {
    const requested = new URLSearchParams(window.location.search).get('level');
    const number = /^\d+$/.test(requested ?? '') ? parseInt(requested, 10) : FIRST_LEVEL;
    try {
        return await import(`./levels/level${String(number).padStart(2, '0')}.js`);
    } catch (e) {
        // Unknown level (e.g. past the last one): start from the beginning
        console.warn(`Level ${number} could not be loaded, starting level ${FIRST_LEVEL}`, e);
        return import(`./levels/level${String(FIRST_LEVEL).padStart(2, '0')}.js`);
    }
}

state.level = await loadLevel();
input.bindScreenButtons();
