function Calculator() {

    this.setNewCoord = setNewCoord;
    this.setCurrentFloorIndex = setCurrentFloorIndex;
    this.isUserOnWater = isUserOnWater;
    this.isSteppingOnHole = isSteppingOnHole;
    this.shouldBeFalling = shouldBeFalling;
    this.jumpTop = jumpTop;
    this.jumpFloorBase = jumpFloorBase;
    this.getCoord = getCoord;
    this.hitEnemy = hitEnemy;
    this.touchedEnemy = touchedEnemy;
    this.setGameEndingTime = setGameEndingTime;
    this.areTouching = areTouching;
    this.isVisible = isVisible;
    this.isOverHole = isOverHole;

    return this;

    function setGameEndingTime() {
        gameTime = Date.now() - time;
        timer = 0;
    }

    function touchedEnemy() {
        return enemies.some(enemy => isVisible(enemy) && areTouching(charDiv, enemy));
    }

    function hitEnemy(bullet) {
        return enemies.find(enemy => isVisible(enemy) && areTouching(bullet, enemy)) || false;
    }

    function getCoord(coord) {
        if (coord === '') return 0;
        return parseFloat(coord.match(/[+-]?\d+(\.\d+)?/g).map(v => parseFloat(v)));
    }

    function jumpFloorBase() {
        return FLOORS[mapArr[jumpFloorIndex()][2]] - FLOORVERTTOLERANCE;
    }

    function jumpTop() {
        return jumpFloorBase() - JUMPHIGH;
    }

    function jumpFloorIndex() {
        return (!isAllInSection() && isRightFloorHigherThanCurrent()) ? floorIndex + 1 : floorIndex;
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

    function isVisible(element) {
        return element && element.style.display === 'block';
    }

    function areTouching(elementA, elementB) {
        const aLeft = getCoord(elementA.style.left),
            aTop = getCoord(elementA.style.top),
            bLeft = getCoord(elementB.style.left),
            bTop = getCoord(elementB.style.top);
        return aLeft + getCoord(elementA.style.width) - 2 >= bLeft
            && aLeft < bLeft + getCoord(elementB.style.width) - 2
            && aTop + getCoord(elementA.style.height) - 2 >= bTop
            && aTop < bTop + getCoord(elementB.style.height) - 2;
    }

}
