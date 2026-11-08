// The player's arrow and enemy shots
function Projectiles() {

    const arrow = dom.el('charShot'),
        enemyShot = dom.el('ufoShot');

    init();

    return {
        charShot,
        enemyFire
    };

    function init() {
        dom.setSize(arrow, CHARSHOTWIDTH, CHARSHOTHEIGHT);
        dom.setSize(enemyShot, UFOSHOTWIDTH, UFOSHOTHEIGHT);
    }

    function charShot() {
        if (actions.shooting) return;

        const direction = actions.lastDirection,
            top = topPos + 6;
        let left = (direction === 'right') ? leftPos + FLOORHORTOLERANCE : leftPos - CHARSHOTWIDTH;

        dom.at(arrow, left, top);
        actions.shooting = true;
        sounds.play('charArrow');

        moveArrow();

        function moveArrow() {
            if (actions.cancelShot) {
                stopArrow();
                return;
            }
            const hit = collision.hitEnemy(arrow);
            if (hit) {
                effects.explosion(left, top);
                enemies.takeHit(hit);
                stopArrow();
                return;
            }
            if (direction === 'right' && left <= 100) {
                left += BASICMOVRATE * 2;
            } else if (direction === 'left' && left >= -2) {
                left -= BASICMOVRATE * 2;
            } else {
                stopArrow();
                return;
            }
            arrow.style.left = `${left}%`;
            setTimeout(moveArrow, 5);
        }
    }

    function stopArrow() {
        dom.hide(arrow);
        actions.shooting = false;
    }

    // Shot from an enemy towards the player's side of the screen.
    // relativeTop: height of the gun relative to the enemy's top.
    function enemyFire(enemy, moveRate, relativeTop, callback) {
        if (!collision.isVisible(enemy)) return;

        const enemyLeft = collision.getCoord(enemy.style.left),
            isRight = leftPos > enemyLeft;
        let left = isRight ? enemyLeft + collision.getCoord(enemy.style.width) : enemyLeft;

        sounds.play('ufoLaser');
        dom.at(enemyShot, left, collision.getCoord(enemy.style.top) + relativeTop);
        if (callback) setTimeout(callback, 300);
        moveShot();

        function moveShot() {
            if (actions.cancelShot) {
                dom.hide(enemyShot);
                return;
            }
            if (collision.areTouching(enemyShot, charDiv) && !actions.swimming) {
                game.endGame('hit');
                return;
            }
            if (!isRight && left >= -2) {
                left -= moveRate;
            } else if (isRight && left < 100) {
                left += moveRate;
            } else {
                dom.hide(enemyShot);
                if (callback) callback();
                return;
            }
            enemyShot.style.left = `${left}%`;
            setTimeout(moveShot, 5);
        }
    }

}
