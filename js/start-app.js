document.addEventListener('DOMContentLoaded', () => {
    dom = Dom();
    collision = Collision();
    timeUtils = TimeUtils();
    sounds = Sounds();
    physics = MapPhysics();
    levelMap = LevelMap();
    charman = Charman();
    projectiles = Projectiles();
    enemies = Enemies();
    effects = Effects();
    screens = Screens();
    input = Input();
    events = Events();
    setup = Setup();
    game = Game();
    level = Level();
    dialogs = (typeof Dialogs !== 'undefined') ? Dialogs() : false;

    input.bindScreenButtons();
});
