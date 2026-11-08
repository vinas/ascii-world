// Element visibility and bounding-box overlap, based on inline % styles
import { charDiv } from './charman.js';
import * as enemies from './enemies.js';

// Numeric value of an inline style length such as '12.5%'
export function getCoord(coord) {
    return parseFloat(coord) || 0;
}

export function isVisible(element) {
    return element && element.style.display === 'block';
}

export function areTouching(elementA, elementB) {
    const aLeft = getCoord(elementA.style.left),
        aTop = getCoord(elementA.style.top),
        bLeft = getCoord(elementB.style.left),
        bTop = getCoord(elementB.style.top);
    return aLeft + getCoord(elementA.style.width) - 2 >= bLeft
        && aLeft < bLeft + getCoord(elementB.style.width) - 2
        && aTop + getCoord(elementA.style.height) - 2 >= bTop
        && aTop < bTop + getCoord(elementB.style.height) - 2;
}

export function touchedEnemy() {
    return enemies.list().some(enemy => isVisible(enemy) && areTouching(charDiv, enemy));
}

export function hitEnemy(bullet) {
    return enemies.list().find(enemy => isVisible(enemy) && areTouching(bullet, enemy)) || false;
}
