#!/usr/bin/env node
import {checkDockerCompose, downContainers, upContainers} from "./docker.js";
import chalk from "chalk";
try {
    checkDockerCompose();
    downContainers();
    upContainers();
} catch (e) {
    console.error(chalk.red(e.message));
}
