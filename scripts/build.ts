import {execSync} from "child_process";

execSync("bun vite build && bun ionic capacitor sync", {stdio: "inherit"});