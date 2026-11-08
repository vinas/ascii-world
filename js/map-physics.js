// How the current map's floor sections (solid / hole / liquid, at different
// heights) constrain the player's movement, jumps and falls.
function MapPhysics() {

    return {
        setNewCoord,
        setCurrentFloorIndex,
        isUserOnWater,
        isSteppingOnHole,
        isOverHole,
        shouldBeFalling,
        jumpTop,
        jumpFloorBase,
        fallTarget
    };

    function jumpFloorBase() {
        return FLOORS[mapArr[jumpFloorIndex()][2]] - FLOORVERTTOLERANCE;
    }

    function jumpTop() {
        return jumpFloorBase() - JUMPHIGH;
    }

    function jumpFloorIndex() {
        return (!isAllInSection() && isRightFloorHigherThanCurrent()) ? floorIndex + 1 : floorIndex;
    }

    // Where a fall from the current section ends (off-screen for holes)
    function fallTarget() {
        return (mapArr[floorIndex][3] !== 'hole') ? FLOORS[mapArr[floorIndex][2]] - FLOORVERTTOLERANCE : 120;
    }

    function setNewCoord() {
        if (commands.right && canMoveRight()) {
            leftPos += BASICMOVRATE;
            restrainMovement();
            return true;
        }
        if (commands.left && canMoveLeft()) {
            leftPos -= BASICMOVRATE;
            return true;
        }
        return false;
    }

    function isSteppingOnHole() {
        return topPos >= CHARBASEFLOOR && isOverHole();
    }

    function isOverHole() {
        return mapArr[floorIndex][3] === 'hole'
            && (isAllInSection() || mapArr[floorIndex + 1][3] === 'hole');
    }

    function isUserOnWater() {
        return mapArr[floorIndex][3] === 'liquid'
            && (isAllInSection() || mapArr[floorIndex + 1]?.[3] === 'liquid');
    }

    function isAllInSection() {
        return leftPos <= mapIndexArray[floorIndex] - FLOORHORTOLERANCE;
    }

    function setCurrentFloorIndex() {
        const idx = getFloorIndexForPos(leftPos);
        if (idx !== -1) floorIndex = idx;
    }

    function shouldBeFalling() {
        return !actions.falling
            && !actions.swimming
            && !actions.jumping
            && isAllInSection()
            && topPos + FLOORVERTTOLERANCE < FLOORS[mapArr[floorIndex][2]];
    }

    function notCrossMappingToOblivion() {
        return !(leftPos <= -.5 && currMap === 0);
    }

    function restrainMovement() {
        const sectionEdge = mapIndexArray[floorIndex] - FLOORHORTOLERANCE;
        if (!isNextRightStepOnSameFloorBase() && isRightFloorHigherThanCharTop() && leftPos > sectionEdge) {
            leftPos = sectionEdge;
        }
    }

    function canMoveRight() {
        return (!actions.falling && !isAllInSection() && !isRightFloorHigherThanCharTop())
            || isNextRightStepOnSameFloorBase()
            || !isRightFloorHigherThanCharTop();
    }

    function canMoveLeft() {
        return !actions.falling
            && notCrossMappingToOblivion()
            && (isNextLeftStepOnSameFloorBase() || !isLeftFloorHigherThanCharTop());
    }

    function isNextRightStepOnSameFloorBase() {
        return floorIndex === getFloorIndexForPos(leftPos + FLOORHORTOLERANCE);
    }

    function isNextLeftStepOnSameFloorBase() {
        return floorIndex === getFloorIndexForPos(leftPos - BASICMOVRATE);
    }

    function getFloorIndexForPos(pos) {
        return mapIndexArray.findIndex(sectionEnd => pos < sectionEnd);
    }

    function isLeftFloorHigherThanCharTop() {
        const currFloorBase = mapArr[floorIndex][2],
            nextFloorBase = mapArr[floorIndex - 1][2];
        return currFloorBase < nextFloorBase && isCharmanHigherThanNextFloor(nextFloorBase);
    }

    function isRightFloorHigherThanCharTop() {
        const currFloorBase = mapArr[floorIndex] ? mapArr[floorIndex][2] : 0,
            nextFloorBase = (leftPos < 95) ? mapArr[getFloorIndexForPos(leftPos + FLOORHORTOLERANCE)][2] : currFloorBase;
        return currFloorBase < nextFloorBase && isCharmanHigherThanNextFloor(nextFloorBase);
    }

    function isRightFloorHigherThanCurrent() {
        const currFloorBase = mapArr[floorIndex] ? mapArr[floorIndex][2] : 0;
        let nextFloorBase = currFloorBase;
        if (mapArr[floorIndex + 1] && leftPos < 95) {
            nextFloorBase = mapArr[floorIndex + 1][2];
        }
        return currFloorBase < nextFloorBase;
    }

    function isCharmanHigherThanNextFloor(nextFloorBase) {
        return topPos + FLOORVERTTOLERANCE > FLOORS[nextFloorBase];
    }

}
