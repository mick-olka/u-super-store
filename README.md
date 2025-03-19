# u-super-store

Package manager - `pnpm`

### How to use

Install pnpm  
`npm install -g pnpm`

Install project dependencies  
`pnpm install`

## Run in dev mode

`pnpm run dev`

## Recommended VSCode Extensions

- **Biome** ([biomejs.biome](https://marketplace.cursorapi.com/items?itemName=biomejs.biome))
  - Official VSCode extension for Biome - the toolchain of the web
  - Provides formatting, linting, and other web development tools

## Before pushing to the repository make sure to perform these actions

``` bash
# perform formatting and linting
pnpm biome check --write
# check that everything works
pnpm run dev
```