# Defold Typescript
A dev environment for Defold that transpiles TypeScript into lua using typescript-to-lua.
This 🗝 turnkey Defold TypeScript dev environment features:
> ⭐ .vscode folder based project  
> ⭐ lua-types and defold-types for autocomplete and inline docs  
> ⭐ eslint with sane typescript defaults  
> ⭐ patched typescript-to-lua to generate *.script files

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

To get started simply use `npm run` and get going!
> ✔ Use `npm run dev` to start a watcher that compiles and emits lua and script when you save  
> ✔ Use `npm run build` to just compile your ts, sans watcher  

## Installation

1. Create a new Defold project

2. `cd` into the root directory of your new Defold project

3. Use [degit](https://www.npmjs.com/package/degit) to bring in the template

```bash
npx degit @ts-defold/tsd-template --force
```

4. Initialize the modules
```bash
npm install
```

5. Profit 💰
```bash
npm run build # Transpile the TypeScript files to lua
# or
npm run watch # Watch for changes and regenerate files on save
```

6. VS Code
```
code .
```

<p align="center" class="h4">
  Typescript :heart: Defold
</p>
