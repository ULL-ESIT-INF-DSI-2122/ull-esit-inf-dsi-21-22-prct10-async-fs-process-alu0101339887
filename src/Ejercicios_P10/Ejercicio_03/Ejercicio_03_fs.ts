import {watch, open} from 'fs';
import yargs from 'yargs';

// --------------- MANEJO DE LOS ARGUMENTOS ----------------- //

/**
 * Comando para realizar el control del directorio de un usuario.
 */
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

/**
 * Comando para realizar el control del directorio de todos los usuarios.
 */
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

// --------------------- FUNCIONES ----------------------- //

/**
 * Método para controlar los cambios del directorio de un usuario.
 * @param user Nombe del usuario
 * @param path Ruta del directorio
 */
function watchFile_(user: string, path: string) {
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

/**
 * Método para controlar los cambios de los direcotorios de todos los usuarios.
 * @param path Ruta del directorio
 */
function watchAll(path: string) {
  const user = getUser(path);
  watch(path, (event: string, filename: string) => {
    if (event === 'rename') {
      console.log(`${user} renamed ${filename}`);
    } else if (event === 'change') {
      console.log(`${user} changed ${filename}`);
    }
  });
}

/**
 * Método para obtener el nombre del usuario a partir de la
 * ruta de su directorio.
 * @param path Ruta del directorio
 * @returns Nombe del usuario
 */
export function getUser(path: string) {
  const user = path.split('/')[3];
  return user;
}

/**
 * Método para controlar los cambios de un archivo y mostrar su contenido.
 * @param path Ruta del archivo
 */
function readFile_(path: string) {
  console.log(`Reading file ${path}`);
  open(path, 'r', (err) => {
    if (err) {
      console.log(`Error opening ${path}`);
    } else {
      let data = '';
      const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(path),
      });
      lineReader.on('line', (line: string) => {
        data += line;
      });
      lineReader.on('close', () => {
        console.log(` --> Content of ${path}: ${data}`);
      });
    }
  });
}

