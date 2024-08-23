# Forum Dapp inspired by scaffold.eth

This project is an attempt to use some of the technologies used by
scaffold.eth. Scaffold.eth is, therefore, a huge project template.

We will build a forum dapp that uses some of the components but with one major change (?) 
we will be using [Astro](https://astro.build/) instead of NextJS and [Biome](https://biomejs.dev) 
over Eslint and Prettier.

## Process of preparing this project

This project was generated with

```bash
npx create-eth@latest
```

And after further exploring, I decided to get it over with by creating a bare branch with no commits by running the following command

```bash
git restore .  # This will restore if there was something there that was modified
git switch --orphan scratch
```

Now that we are now in the bare branch with no commit history,  next is to prepare the repository.

### Creating the workspace

There are still some left over directories that are ignored by `.gitignore` of the main branch before we switched so let's delete those

```bash
rm -rfv .husky  # I don't use this so whatever?
rm -rfv packages  # some node_modules folder are there so let's just delete this for now
```

Next thing to do is preparing the new `.gitignore` with the following contents at the root of the project.

```gitignore
# dependencies
node_modules

# env files
*.env**

# yarn
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# eslint
.eslintcache

# misc
.DS_Store

# IDE
.vscode
.idea

# cli
dist
```

We did this because
1. `.env` files contain sensitive data.
2. `node_modules` contain dependencies that are recorded from `package.json` and `yarn.lock` plus thousands of content.

We will further add more on the `.gitignore` for anything not relevant or should not be tracked by our commit history.

Now that's out of the way, we will start preparing our project workspace by running the command at the root of the project

```bash
yarn init -w
```

This will also create a new directory called `packages` at the root of the project directory.

Heading over the `packages` directory, we will also initialise our [Foundry](https://getfoundry.sh/) project using the following command

```bash
forge init --force foundry
```

This is with `--force` because by default, forge initialises a new git repository plus a git submodule for the `lib/forge-std`. This will also generate
a new `.gitmodules` which contains the content of said `forge-std`.

```gitmodules
[submodule "packages/foundry/lib/forge-std"]
	path = packages/foundry/lib/forge-std
	url = https://github.com/foundry-rs/forge-std
```

Next would be the app components by running the

```bash
yarn create astro
```

with the selected options for the following questions

1.  **dir**  *Where should we create your new project?* `./forum`
2.  **tmpl**  *How would you like to start your new project?* Include sample files
3.  **ts**   *Do you plan to write TypeScript?* Yes
4.  **deps**  *Install dependencies?* No

The fourth option is for me to add more dependencies and tools but it's just biome. We add biome by running the command

```bash
yarn add --dev --exact @biomejs/biome
```

This will fail because our workspace has to be reinitialised

> [!NOTE]
> I guess we should have not ran `yarn init -w` before and started building around the project?

therefore, we have to run `yarn init -w` again at the root of the project directory. This will now create a bunch of
files. Although the documentation says that biome does not support [yet](https://github.com/biomejs/biome/issues/1724)
[.editorconfig](https://editorconfig.org), the same link already has merged said support!

Next, we will add a new `format` script that runs `biome format --write` for the `packages/forum/package.json`. The script section or content should look similar to this

```json
"scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro",
    "format": "biome format --write !(node_modules|.vscode)/**/*"
  },
```

Of course, our global `package.json` located at the root of the project directory 
also needs a new script section too so that we can just run `yarn format` at the root of the project for CI stuff or other important actions
in the future! So we have to edit it as well.

```json
"scripts": {
    "astro:format": "yarn workspace forum format", 
    "format": "yarn astro:format",
    "start": "yarn workspace forum dev"
  }
```

Once done, we can test that our Astro template app is working by running the following command at the root of the project directory

```bash
yarn start
```

This should run now at http://localhost:4321.

### Writing Our Smart Contract with Foundry

#### Objectives

#### Processes

#### Tests
