// Level 2 dialogs with the talking pig
import { BASICMOVRATE, FLOORHORTOLERANCE } from '../constants.js';
import * as dom from '../dom.js';
import * as collision from '../collision.js';
import * as charman from '../charman.js';
import * as enemies from '../enemies.js';

const balloon = dom.el('dialogBalloon'),
    pig = dom.el('pig'),
    player = charman.charDiv;

const PIG_MEETING = [
        [pig, "Hey, wait a moment! DON'T SHOOT!"],
        [pig, 'I got abducted last level, man...'],
        [pig, 'Did you see it?'],
        [player, '<br/>Yes...'],
        [pig, "Cool, wasn't it? =D"],
        [player, '<br/>Yes...'],
        [pig, "Don't be shy. Come closer..."]
    ],
    PIG_ESCAPE = [
        [pig, 'How did you get here?'],
        [player, 'I was also abducted.'],
        [pig, 'Cool!! =D'],
        [player, "Wait, how come you're a talking pig??"],
        [pig, 'Microchips in my head, dude.'],
        [player, '?? =O'],
        [pig, "The aliens implanted'em."],
        [pig, 'I guess they wanted to communicate,'],
        [pig, 'or something...'],
        [player, '...cool... I guess! =S'],
        [pig, '...'],
        [player, '...'],
        [pig, '...so, wanna get out of this shit?'],
        [player, 'Well, sure!'],
        [pig, 'Follow me. I know the way...'],
        [pig, 'Just be careful not to touch me.'],
        [pig, 'They made me radioactive as well...']
    ];

export function pigMeeting() {
    charman.freezeChar();
    playDialog(PIG_MEETING, charman.unfreezeChar);
}

export function pigEscape() {
    charman.freezeChar();
    playDialog(PIG_ESCAPE, endDialog);
}

// Shows each [speaker, text] line in turn; clicking the balloon advances
function playDialog(lines, onEnd) {
    showLine(0);

    function showLine(idx) {
        const [speaker, text] = lines[idx],
            isLast = idx === lines.length - 1;
        dialogBalloon(speaker, text, isLast ? onEnd : () => showLine(idx + 1));
    }
}

function endDialog() {
    hideBalloon();
    charman.unfreezeChar();
    setTimeout(() => {
        enemies.moveElmRight(pig, 100, BASICMOVRATE * .3, () => dom.hide(pig));
    }, 500);
}

function dialogBalloon(el, txt, callback) {
    const elLeft = collision.getCoord(el.style.left);
    if (el.classList.contains('enemy')) {
        balloon.style.backgroundImage = "url('img/interactions/dialog-balloon-right.png')";
        balloon.style.left = `${elLeft - 27}%`;
    } else {
        balloon.style.backgroundImage = "url('img/interactions/dialog-balloon-left.png')";
        balloon.style.left = `${elLeft + FLOORHORTOLERANCE}%`;
    }
    balloon.style.top = `${collision.getCoord(el.style.top) - 45}%`;
    balloon.innerHTML = txt;
    balloon.onclick = callback || null;
    balloon.style.display = 'block';
}

function hideBalloon() {
    dom.hide(balloon);
}
