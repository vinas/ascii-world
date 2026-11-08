function Dialogs() {

    const balloon = dom.el('dialogBalloon'),
        pig = dom.el('pig');

    const PIG_MEETING = [
            [pig, "Hey, wait a moment! DON'T SHOOT!"],
            [pig, 'I got abducted last level, man...'],
            [pig, 'Did you see it?'],
            [charDiv, '<br/>Yes...'],
            [pig, "Cool, wasn't it? =D"],
            [charDiv, '<br/>Yes...'],
            [pig, "Don't be shy. Come closer..."]
        ],
        PIG_ESCAPE = [
            [pig, 'How did you get here?'],
            [charDiv, 'I was also abducted.'],
            [pig, 'Cool!! =D'],
            [charDiv, "Wait, how come you're a talking pig??"],
            [pig, 'Microchips in my head, dude.'],
            [charDiv, '?? =O'],
            [pig, "The aliens implanted'em."],
            [pig, 'I guess they wanted to communicate,'],
            [pig, 'or something...'],
            [charDiv, '...cool... I guess! =S'],
            [pig, '...'],
            [charDiv, '...'],
            [pig, '...so, wanna get out of this shit?'],
            [charDiv, 'Well, sure!'],
            [pig, 'Follow me. I know the way...'],
            [pig, 'Just be careful not to touch me.'],
            [pig, 'They made me radioactive as well...']
        ];

    return {
        pigMeeting,
        pigEscape
    };

    function pigMeeting() {
        charman.freezeChar();
        playDialog(PIG_MEETING, charman.unfreezeChar);
    }

    function pigEscape() {
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

}
