# Create React App Vite [![Typecheck](https://github.com/bbkpr/instamunchadmin/actions/workflows/typecheck.yml/badge.svg)](https://github.com/bbkpr/instamunchadmin/actions/workflows/typecheck.yml) [![Test](https://github.com/bbkpr/instamunchadmin/actions/workflows/test.yml/badge.svg)](https://github.com/bbkpr/instamunchadmin/actions/workflows/test.yml) [![Build](https://github.com/bbkpr/instamunchadmin/actions/workflows/build.yml/badge.svg)](https://github.com/bbkpr/instamunchadmin/actions/workflows/build.yml) [![Lint](https://github.com/bbkpr/instamunchadmin/actions/workflows/lint.yml/badge.svg)](https://github.com/bbkpr/instamunchadmin/actions/workflows/lint.yml)

### pnpm

```sh
cd myapp
pnpm install
pnpm validate
pnpm start
```

### Commands

```sh
pnpm dev             # start development server
pnpm start           # start development server
pnpm validate        # run test,lint,build,typecheck concurrently
pnpm test            # run vitest
pnpm test:ui         # run vitest with a web UI
pnpm test:watch      # run vitest in watch mode
pnpm lint            # run eslint
pnpm lint:fix        # run eslint with --fix option
pnpm typecheck       # run TypeScript compiler check
pnpm build           # build production bundle to 'dist' directly
pnpm prettier        # run prettier for json|yml|css|md|mdx files
pnpm clean           # remove 'node_modules' 'yarn.lock' 'dist' completely
pnpm serve           # launch server for production bundle in local
```
