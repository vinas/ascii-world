// Renders the current map: background, floor tiles and HUD stage info.
// Each map section is [image, 'single'|'double' width, floor height index, 'solid'|'hole'|'liquid'].
import { state } from './state.js';
import { FLOORS, SINGLEBLOCK, DOUBLEBLOCK } from './constants.js';
import * as dom from './dom.js';

const bkgLayer = dom.el('gameBrackground');

export function load() {
    const maps = state.level.loadMapArr();
    let floorPos = 0;

    dom.el('stage').innerHTML = `${state.currMap + 1} / ${maps.length}`;
    dom.el('level').innerHTML = state.level.current;

    state.mapIndexArray = [];
    state.mapArr = maps[state.currMap];

    setBackgroundImg();
    clearFloor();

    state.mapArr.forEach(([image, width, floor]) => {
        const classes = image.includes('fragile') ? `floor fragile ${width}` : `floor ${width}`;
        bkgLayer.innerHTML += `<img class="${classes}" style="left: ${floorPos}%; top: ${FLOORS[floor]}%" src="img/map/floor/${image}" />`;
        floorPos += (width === 'single') ? SINGLEBLOCK : DOUBLEBLOCK;
        state.mapIndexArray.push(floorPos);
    });
}

// Hides every enemy/projectile/effect element (on reset and map change)
export function hideHidables() {
    dom.setClassProp('hidable', 'display', 'none');
}

function setBackgroundImg() {
    const image = (state.currMap % 2 === 0) ? state.level.bkgdImage1 : state.level.bkgdImage2;
    bkgLayer.style.backgroundImage = `url('img/map/${image}')`;
}

function clearFloor() {
    for (const el of [...document.getElementsByClassName('floor')]) el.remove();
}
