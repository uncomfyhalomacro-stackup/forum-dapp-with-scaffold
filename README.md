# Forum Dapp

This uses Vite + React + TS with SWC. Still WIP.

# Running the app

```bash
yarn install --refresh-lockfile && yarn start
```

# TODOS

- [X] Post Logic
- [ ] List of posts or "feed" from different users
- [ ] Forum Smart Contract
- [ ] Posts Smart Contract

## Firefox weirdness

Firefox enables ipv6 by default so instead of https://localhost:5173, it's actually http://[::1]:5173/. See https://github.com/vitejs/vite/discussions/14754#discussioncomment-9725263. This is an on and off bug
depending on weird networking in Firefox.
