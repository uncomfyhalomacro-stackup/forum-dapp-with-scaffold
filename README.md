# Forum Dapp

This uses Vite + React + TS with SWC. Still WIP.

## Installation

```bash
yarn install --refresh-lockfile
```

## List of commands

The commands use `just` to invoke other commands. The reason being that
`yarn` can't read `.env` files *for itself*. So we can't do custom
env vars for the scripts section in `yarn`.

See the following files in the directories for `justfiles`
- `./justfile` the root project justfile.
- `./packages/foundry/justfile` the foundry project justfile

`just` can read `.env` files and use it for commands. See the first three lines of
the foundry project justfile

```just
#!/usr/bin/just

set dotenv-load := true
```

We didn't add a `justfile` for `./packages/forum` because it does not need to.
The justfiles were intentionally for the `./packages/foundry` project. To reduce
redundant usage between the purpose of `just` and `yarn`, all convenient commands
are now delegated to `just`.

The following commands are done at the root of the whole project:

1. Build / compile both frontend and contract

```bash
just build
```

2. Deploy and verify contract

```bash
just deploy-contract
```

3. Format source files for frontend and contract

```bash
just format
```

4. Compile contract and export the ABI

```bash
just export-abi
```

# TODOS

- [X] Post Logic
- [ ] List of posts or "feed" from different users
- [X] Forum Smart Contract
- ~~[ ] Posts Smart Contract~~
- [ ] Use https://just.systems to automate?
- [ ] Use smart contract with updated Post and Comment. They have owner addresses now.

## Firefox weirdness

Firefox enables ipv6 by default so instead of https://localhost:5173, it's actually http://[::1]:5173/. See https://github.com/vitejs/vite/discussions/14754#discussioncomment-9725263. This is an on and off bug
depending on weird networking in Firefox.
