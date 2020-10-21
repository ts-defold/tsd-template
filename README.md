# Defold TypeScript
A dev environment for Defold that transpiles TypeScript into lua using typescript-to-lua.
This 🗝 turnkey [Defold](https://defold.com/) TypeScript dev environment features:
> ⭐ .vscode folder based project  
> ⭐ lua-types and defold-types for autocomplete and inline docs  
> ⭐ eslint with sane typescript defaults  
> ⭐ patched typescript-to-lua to generate *.script files

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

To get started simply use `npm run` and get going!
> ✔ Use `npm run dev` to start a watcher that compiles and emits lua and script when you save  
> ✔ Use `npm run build` to just compile your ts, sans watcher  

## Installation

1. Fork this tempalte or use [degit](https://www.npmjs.com/package/degit) to download the template locally

```bash
npx degit @ts-defold/tsd-template --force
```

2. Initialize
```bash
npm install
```

3. Generate
```bash
npm run build # Transpile the TypeScript files to lua
# or
npm run watch # Watch for changes and regenerate files on save
```

4. Code
```
code .
```

5. Open `app/game.project` in Defold
> and start making games with typescript!

<p align="center" class="h4">
  TypeScript :heart: Defold
</p>
