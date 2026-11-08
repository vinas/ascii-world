// Music and sound effects
function Sounds() {

    const SOURCES = {
            music: 'audio/alien-cat.mp3',
            nextLevel: 'audio/level-end-autumn-leaves.mp3',
            gameOver: 'audio/star-floor.mp3',
            charJump: 'audio/jump.mp3',
            ufoLaser: 'audio/tir.mp3',
            charArrow: 'audio/sling-shot.mp3',
            pigJump: 'audio/jumppp22.ogg.mp3',
            explosion: 'audio/8bit_bomb_explosion.wav.mp3'
        },
        LOOPING = ['music', 'nextLevel', 'gameOver'],
        VOLUMES = { music: .7 },
        tracks = {};

    return {
        load,
        unlockForMobile,
        play,
        playFromStart,
        pause
    };

    function load() {
        Object.entries(SOURCES).forEach(([name, src]) => {
            tracks[name] = new Audio(src);
            tracks[name].loop = LOOPING.includes(name);
        });
    }

    // Mobile browsers only allow audio started from a user gesture, so
    // play/pause every sound once (muted) while handling the start tap.
    function unlockForMobile() {
        Object.entries(tracks).forEach(([name, track]) => {
            track.volume = 0;
            play(name);
            track.pause();
            track.currentTime = 0;
            track.volume = VOLUMES[name] ?? 1;
        });
    }

    // play() returns a promise that rejects if playback is interrupted
    // (e.g. paused right away) or blocked; that's never an error for a game.
    function play(name) {
        tracks[name].play().catch(() => {});
    }

    function playFromStart(name) {
        tracks[name].currentTime = 0;
        play(name);
    }

    function pause(name) {
        tracks[name].pause();
    }

}
