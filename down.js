#!/usr/bin/env node
import { downContainers } from "./docker.js";
import chalk from "chalk";
try {
    downContainers();
} catch (e) {
    console.error(chalk.red(e.message));
}
