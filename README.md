# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

**NOTES**

MultiClient Game Mode

const gameState = {
id: ""
board: [],
currentPlayer: "X",
// may not need player id
player1: {token: "X", id: ""},
player2: {token: "O", id: ""},

}

connect to the internet
server

- game state
- server actions
  - create
    - reset
    - create new game
  - read
    - get game ( hydrate game state )
    - all games
    - games that need another player
  - update
    - join a game
    - make a move ( accepting a move from a specific player for a specific game )
    - clear board for next round
  - delete

client

- fetch game state (websockets, long polling)
- new page: Lobby
  - view all of the games that currently need to be joined
  - start a new game
- win modal

notes
on client
severPath = "htt..."
get game from serverPath/game/id
when in lobby
store id if you join or create a game
dont need to toggle player or set tile

- first steps
  button to get game
  - useEffect
    - const initialize game, await get game
    - store it in state
    - poller in dependency array
    - polling
      - ask for an update every so often
      - set a timeout
        - timeout is 1000 ms
        - usestate poller
        - set poller to poller + 1
  - display game
  - make a move
    - onclick make a post req to server- send the id of the cell clicked
