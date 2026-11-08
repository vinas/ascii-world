# Ascii World Adventure

A side-scrolling platform game drawn entirely in ASCII art, built in vanilla JavaScript. No framework, no bundler, no build step. You run, jump and swim across a series of screens, dodging holes, UFOs, aliens and a radioactive talking pig, and shooting arrows at whatever gets in your way.

Play it at <https://vinas.github.io/ascii-world/>.

## Gameplay

- Each **level** is a sequence of **maps** (screens). Walk off the right edge to reach the next map, or off the left edge to go back. The HUD shows the level ("Fase"), elapsed time ("Tempo") and current map ("Estágio").
- **Falling into a hole**, **touching an enemy** or **getting shot** ends the game. Tap the game over screen to restart the level.
- In **water** you swim: you can't jump or shoot, but enemy shots can't hit you either.
- Enemies (UFOs, aliens, the big boss) and events (crumbling floors, dialogs) are triggered as you walk through each map. Shooting an enemy destroys it; the big boss takes four hits.
- Level 1 ends with an alien abduction. Level 2 has the talking pig and the big boss. Level 3 is a work in progress.

**Controls:** on-screen buttons on touch devices; on a keyboard, use **←/→** to move, **Ctrl** to jump and **Space** to shoot.

## Running it

There are no dependencies and no build. The JavaScript is loaded as native ES modules, which browsers won't load from `file://` URLs, so serve the folder with any static file server:

```bash
# from the project root, e.g.
npx serve .
# or
python3 -m http.server
```

Then open `index.html`. To jump straight to a level, add `?level=N` (for example `index.html?level=2`).

## Project structure

`index.html` loads a single `<script type="module" src="js/start-app.js">`. The browser resolves the rest of the import graph itself. Each file exports its public functions directly, and modules import each other as namespaces (`import * as sounds from './sounds.js'` → `sounds.play('charJump')`). Shared mutable game state lives in one exported object (`js/state.js`); values that never change live in `js/constants.js`. All positions and sizes are percentages of the game area.

```
index.html             Page markup and the single module <script> tag
css/styles.css          All styling
img/, audio/            Sprites, backgrounds, map tiles, sounds and music

js/
  start-app.js          Entry point: loads the level from ?level=N and binds the start screen
  state.js              Shared mutable game state (position, current map, actions, timing, ...)
  constants.js          Tuning constants and key names

  game.js               Game lifecycle: init, main loop, clock, endings, next level
  setup.js              Asset preloading and resetting a game
  input.js              Keyboard, touch buttons and screen taps
  events.js             Level triggers, moving between maps, restart

  map-physics.js        How floor sections (solid/hole/water, different heights) limit movement, jumps and falls
  level-map.js          Renders the current map (background and floor tiles)
  collision.js          Element visibility and bounding-box overlap

  charman.js            The player: sprites, jump, fall, placement
  projectiles.js        The player's arrows and enemy shots
  enemies.js            UFO, alien, pig and big boss behaviours
  effects.js            Explosions and crumbling/restored floors
  screens.js            Start, game over and level score screens, HUD clock
  sounds.js             Loading and playing music/sound effects (incl. mobile audio unlock)
  dom.js                Small generic DOM helpers
  time-utils.js         Time formatting

  levels/
    level01.js ...      One module per level: maps, triggers and backgrounds
    dialogs02.js        Level 2 dialogs
```

Several modules import each other (for example `game.js` ↔ `input.js`). That's safe with ES modules as long as no module uses another's exports at its own top level, only inside functions called later. The only top-level work is looking up and sizing DOM elements via `dom.js`, which imports nothing.

### Adding a level

Create `js/levels/levelNN.js` exporting `current`, `bkgdImage1`, `bkgdImage2`, `loadMapArr()` and `loadLevelTriggers()`; the header comment of any existing level describes the format. Finishing level N (via the `game.passedNextLevel` or `game.endGame('abducted')` trigger) sends the player to `?level=N+1`.
