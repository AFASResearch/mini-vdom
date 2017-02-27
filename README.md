# mini-vdom
Material of a live coding session to create a Virtual DOM framework from scratch. Do not use in production, use our maquette library instead.

# This repository is the result from

### Executing the following commands
- npm init
- npm install --save-dev -E typescript webpack webpack-dev-server awesome-typescript-loader
- .\node_modules\.bin\tsc --init

### Changing the following files
- edited package.json "scripts"/"start": "webpack-dev-server"
- edited tsconfig.json (noImplicitAny, strictNullChecks, sourceMap, outDir: "build/js")

### Adding the following files
- src/example.ts
- src/mini-vdom.ts
- webpack.config.js
