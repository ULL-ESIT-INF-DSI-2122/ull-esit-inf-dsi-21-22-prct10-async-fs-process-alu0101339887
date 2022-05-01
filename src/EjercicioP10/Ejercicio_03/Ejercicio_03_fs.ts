import {watch, open} from 'fs';
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
  watch(path, (event: string, filename: string) => {
    const file = `${path}/${filename}`;
    if (event === 'rename') {
      console.log(`${user} renamed ${filename}`);
      readFile_(file);
    } else if (event === 'change') {
      console.log(`${user} changed ${filename}`);
      readFile_(file);
    }
  });
}

export function watchAll(path: string) {
  const user = getUser(path);
  watch(path, (event: string, filename: string) => {
    if (event === 'rename') {
      console.log(`${user} renamed ${filename}`);
    } else if (event === 'change') {
      console.log(`${user} changed ${filename}`);
    }
  });
}

export function getUser(path: string) {
  const user = path.split('/')[3];
  return user;
}

export function readFile_(path: string) {
  console.log(`Reading file ${path}`);
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

