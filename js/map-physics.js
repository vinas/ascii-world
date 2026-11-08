// How the current map's floor sections (solid / hole / liquid, at different
// heights) constrain the player's movement, jumps and falls.
import { state } from './state.js';
import { BASICMOVRATE, CHARBASEFLOOR, FLOORS, FLOORHORTOLERANCE, FLOORVERTTOLERANCE, JUMPHIGH } from './constants.js';

export function jumpFloorBase() {
    return FLOORS[state.mapArr[jumpFloorIndex()][2]] - FLOORVERTTOLERANCE;
}

export function jumpTop() {
    return jumpFloorBase() - JUMPHIGH;
}

function jumpFloorIndex() {
    return (!isAllInSection() && isRightFloorHigherThanCurrent()) ? state.floorIndex + 1 : state.floorIndex;
}

// Where a fall from the current section ends (off-screen for holes)
export function fallTarget() {
    return (state.mapArr[state.floorIndex][3] !== 'hole') ? FLOORS[state.mapArr[state.floorIndex][2]] - FLOORVERTTOLERANCE : 120;
}

export function setNewCoord() {
    if (state.commands.right && canMoveRight()) {
        state.leftPos += BASICMOVRATE;
        restrainMovement();
        return true;
    }
    if (state.commands.left && canMoveLeft()) {
        state.leftPos -= BASICMOVRATE;
        return true;
    }
    return false;
}

export function isSteppingOnHole() {
    return state.topPos >= CHARBASEFLOOR && isOverHole();
}

export function isOverHole() {
    return state.mapArr[state.floorIndex][3] === 'hole'
        && (isAllInSection() || state.mapArr[state.floorIndex + 1][3] === 'hole');
}

export function isUserOnWater() {
    return state.mapArr[state.floorIndex][3] === 'liquid'
        && (isAllInSection() || state.mapArr[state.floorIndex + 1]?.[3] === 'liquid');
}

function isAllInSection() {
    return state.leftPos <= state.mapIndexArray[state.floorIndex] - FLOORHORTOLERANCE;
}

export function setCurrentFloorIndex() {
    const idx = getFloorIndexForPos(state.leftPos);
    if (idx !== -1) state.floorIndex = idx;
}

export function shouldBeFalling() {
    return !state.actions.falling
        && !state.actions.swimming
        && !state.actions.jumping
        && isAllInSection()
        && state.topPos + FLOORVERTTOLERANCE < FLOORS[state.mapArr[state.floorIndex][2]];
}

function notCrossMappingToOblivion() {
    return !(state.leftPos <= -.5 && state.currMap === 0);
}

function restrainMovement() {
    const sectionEdge = state.mapIndexArray[state.floorIndex] - FLOORHORTOLERANCE;
    if (!isNextRightStepOnSameFloorBase() && isRightFloorHigherThanCharTop() && state.leftPos > sectionEdge) {
        state.leftPos = sectionEdge;
    }
}

function canMoveRight() {
    return (!state.actions.falling && !isAllInSection() && !isRightFloorHigherThanCharTop())
        || isNextRightStepOnSameFloorBase()
        || !isRightFloorHigherThanCharTop();
}

function canMoveLeft() {
    return !state.actions.falling
        && notCrossMappingToOblivion()
        && (isNextLeftStepOnSameFloorBase() || !isLeftFloorHigherThanCharTop());
}

function isNextRightStepOnSameFloorBase() {
    return state.floorIndex === getFloorIndexForPos(state.leftPos + FLOORHORTOLERANCE);
}

function isNextLeftStepOnSameFloorBase() {
    return state.floorIndex === getFloorIndexForPos(state.leftPos - BASICMOVRATE);
}

function getFloorIndexForPos(pos) {
    return state.mapIndexArray.findIndex(sectionEnd => pos < sectionEnd);
}

function isLeftFloorHigherThanCharTop() {
    const currFloorBase = state.mapArr[state.floorIndex][2],
        nextFloorBase = state.mapArr[state.floorIndex - 1][2];
    return currFloorBase < nextFloorBase && isCharmanHigherThanNextFloor(nextFloorBase);
}

function isRightFloorHigherThanCharTop() {
    const currFloorBase = state.mapArr[state.floorIndex] ? state.mapArr[state.floorIndex][2] : 0,
        nextFloorBase = (state.leftPos < 95) ? state.mapArr[getFloorIndexForPos(state.leftPos + FLOORHORTOLERANCE)][2] : currFloorBase;
    return currFloorBase < nextFloorBase && isCharmanHigherThanNextFloor(nextFloorBase);
}

function isRightFloorHigherThanCurrent() {
    const currFloorBase = state.mapArr[state.floorIndex] ? state.mapArr[state.floorIndex][2] : 0;
    let nextFloorBase = currFloorBase;
    if (state.mapArr[state.floorIndex + 1] && state.leftPos < 95) {
        nextFloorBase = state.mapArr[state.floorIndex + 1][2];
    }
    return currFloorBase < nextFloorBase;
}

function isCharmanHigherThanNextFloor(nextFloorBase) {
    return state.topPos + FLOORVERTTOLERANCE > FLOORS[nextFloorBase];
}
