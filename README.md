# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
pnpm build
```

You can preview the production build with `pnpm preview`.

## Deployment

This project is configured for static deployment using `@sveltejs/adapter-static` and can be deployed via nginx.

### Quick Start

See [QUICK_START.md](./QUICK_START.md) for a quick deployment guide.

### Detailed Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

### Nginx Configuration

Example nginx configuration is available in [nginx.conf.example](./nginx.conf.example).

### Learning Plan

For nginx study plan and homework tasks, see [NGINX_STUDY_PLAN.md](./NGINX_STUDY_PLAN.md).
