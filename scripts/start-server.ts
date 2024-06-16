import { execSync } from 'child_process';

// Linux systems need sudo to run docker by default?
const isLinuxish = process.platform !== 'win32';
console.log("You're using a Linux system, sudo permissions needed to run docker.");

const docker = isLinuxish ? 'sudo docker' : 'docker';


function isContainerExists(containerName: string): boolean {
  try {
    execSync(`${docker} inspect ${containerName}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function isContainerRunning(containerName: string): boolean {
  try {
    const running = execSync(`${docker} inspect --format '{{.State.Running}}' ${containerName}`, { stdio: 'pipe' }).toString().trim();
    return running === 'true';
  } catch (error) {
    return false;
  }
}

const containerName = 'pocketbase';
const portMapping = '8090:8090';
const volumeMapping = './pb/pb_migrations:/pb_migrations';
const restartPolicy = '--restart unless-stopped';
const image = 'ghcr.io/muchobien/pocketbase:latest';

if (isContainerExists(containerName)) {
  if (isContainerRunning(containerName)) {
    try {
      execSync(`${docker} stop ${containerName}`);
      console.log(`Stopped existing container '${containerName}'.`);
    } catch (error) {
      console.error(`Error stopping container '${containerName}':`, error);
    }
  }

try {
    execSync(`${docker} rm ${containerName}`);
    console.log(`Removed existing container '${containerName}'.`);
  } catch (error) {
    console.error(`Error removing container '${containerName}':`, error);
  }
}

const command = `${docker} run -d --name=${containerName} -p ${portMapping} -v ${volumeMapping} ${restartPolicy} ${image}`;

try {
  execSync(command);
  console.log(`Container '${containerName}' created and started.`);
} catch (error) {
  console.error(`Error creating or starting container '${containerName}':`, error);
}
