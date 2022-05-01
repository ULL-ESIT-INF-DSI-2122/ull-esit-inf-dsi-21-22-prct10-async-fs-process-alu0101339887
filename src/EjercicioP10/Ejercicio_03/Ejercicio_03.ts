import {watch} from 'chokidar';
import {open} from 'fs';
import yargs from 'yargs';

yargs.command({
  command: 'watch',
  describe: 'Control de cambios sobre un directorio',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    path: {
      describe: 'Ruta del directorio',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.user !== 'string' || typeof argv.path !== 'string') {
      console.log('Invalid user or path');
    } else {
      watchFile_(argv.user, argv.path);
    }
  },
});

yargs.command({
  command: 'watchAll',
  describe: 'Control de cambios sobre un directorio',
  builder: {
    path: {
      describe: 'Ruta del directorio',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.path !== 'string') {
      console.log('Invalid path');
    } else {
      watchAll(argv.path);
    }
  },
});

yargs.parse();

export function watchFile_(user: string, path: string) {
  const watcher = watch(path);
  watcher.on('add', (path) => {
    console.log(`${user} added ${path}`);
    readFile_(path);
  });
  watcher.on('change', (path) => {
    console.log(`${user} changed ${path}`);
    readFile_(path);
  });
  watcher.on('unlink', (path) => {
    console.log(`${user} removed ${path}`);
  });
  watcher.on('error', (error) => {
    console.log(`${user} error ${error}`);
  });
}

export function watchAll(path: string) {
  const watcher = watch(path);
  watcher.on('add', (path) => {
    const user = getUser(path);
    console.log(`${user} added ${path}`);
    readFile_(path);
  });
  watcher.on('change', (path) => {
    const user = getUser(path);
    console.log(`${user} changed ${path}`);
    readFile_(path);
  });
  watcher.on('unlink', (path) => {
    const user = getUser(path);
    console.log(`${user} removed ${path}`);
  });
  watcher.on('error', (error) => {
    const user = getUser(path);
    console.log(`${user} error ${error}`);
  });
}

export function getUser(path: string) {
  const user = path.split('/')[3];
  return user;
}

export function readFile_(path: string) {
  open(path, 'r', (err) => {
    if (err) {
      console.log(`Error opening ${path}`);
    } else {
      let sum = '';
      const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(path),
      });
      lineReader.on('line', (line: string) => {
        sum += line;
      });
      lineReader.on('close', () => {
        console.log(` --> Content of ${path}: ${sum}`);
      });
    }
  });
}

