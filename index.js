#!/usr/bin/env node
import { checkDockerCompose, downContainers, upContainers } from "./docker.js";
import chalk from "chalk";

try {
    if (process.argv[2] === "down") {
        downContainers();
    } else {
        checkDockerCompose();
        upContainers();
    }
} catch (e) {
    console.error(chalk.red(e.message));
}


