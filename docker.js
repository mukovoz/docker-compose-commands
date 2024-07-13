import chalk from "chalk";
import { lstatSync } from "fs";
import shell from 'shelljs';
import { sep as DIRECTORY_SEPARATOR } from "path";
import os from "os";


export const downContainers = () => {

    console.log(chalk.green('Stop all active containers'));

    /**
     * Parse list of exist active containers and their ids 
     */
    let execResponse = shell.exec(`docker inspect --format='{{json .}}' $(docker ps --format {{.ID}})`, { silent: true });


    /**
     * Stop all exist active containers
     */
    shell.exec(`docker stop $(docker ps --format '{{.ID}}')`, { silent: true });

    /**
     * Display information about stopped instances
     */
    const activeContainers = execResponse.stdout.split(os.EOL);
    activeContainers.map(activeContainer => {
        if (activeContainer === '') return;
        const containerData = JSON.parse(activeContainer);
        const containerName = containerData.Name.substring(1);
        const projectWorkDir = containerData.Config.Labels['com.docker.compose.project.working_dir'];
        console.log(`${chalk.green('✔')} Container ${chalk.blue(containerName)} from ${chalk.blue(projectWorkDir)} ${chalk.red('Stopped')}`);
    });

}


export const checkDockerCompose = () => {
    /*
       We have to check is file really exist
   */
    try {
        lstatSync(process.cwd() + DIRECTORY_SEPARATOR + "docker-compose.yml");
    } catch (e) {
        throw new Error("docker-compose.yml is not found in current directory");
    }
}

export const upContainers = () => {


    /**
     * Run containers from current directory
     */
    console.log(chalk.green('Starting containers'));
    const startResponse = shell.exec('docker-compose up -d', { silent: true });
    if (startResponse.code === 0) {
        (startResponse.stdout.length > 0 ? startResponse.stdout : startResponse.stderr).split(os.EOL).map((line) => {
            if (line.trim().startsWith("Container ")) {
                const [containerWord, name, action] = line.trim().split(" ").filter(w => w != '');
                if (action === 'Started') {
                    console.log(`${chalk.green('✔')} Container ${chalk.blue(name)} from ${chalk.blue(process.cwd())} ${chalk.green(action)}`);
                }
            }
        });
    }

}