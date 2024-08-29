/// <reference types="vite/client" />

import type { Address } from "viem";

interface ImportMetaEnv {
	readonly VITE_PROJECT_ID: string;
	readonly VITE_DEPLOYED_ADDRESS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
