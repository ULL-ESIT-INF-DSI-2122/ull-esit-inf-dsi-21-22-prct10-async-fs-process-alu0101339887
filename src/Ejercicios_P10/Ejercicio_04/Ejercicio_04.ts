import {open, mkdirSync, existsSync, rmdirSync} from 'fs';
import {rename, statSync, access, constants, readdir} from 'fs';
import yargs from 'yargs';

// --------------- MANEJO DE LOS ARGUMENTOS ----------------- //

/**
 * Comando para comprobar si se trata de un directorio o un fichero.
 */
yargs.command({
  command: 'type',
  describe: 'Mostrar si es un directorio o un fichero',
  builder: {
    path: {
      describe: 'Ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.path!== 'string') {
      console.log('Invalid path');
    } else {
      type_(argv.path);
    }
  },
});

/**
 * Comando para crear un nuevo directorio.
 */
yargs.command({
  command: 'add',
  describe: 'Crear un nuevo directorio',
  builder: {
    path: {
      describe: 'Ruta del directorio',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.path!== 'string') {
      console.log('Invalid path');
    } else {
      add(argv.path);
    }
  },
});

/**
 * Comando para listar los ficheros dentro de un directorio.
 */
yargs.command({
  command: 'list',
  describe: 'Listar los ficheros dentro de un directorio',
  builder: {
    path: {
      describe: 'Ruta del directorio',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.path!== 'string') {
      console.log('Invalid path');
    } else {
      list(argv.path);
    }
  },
});

/**
 * Comando para mostrar el contenido de un fichero.
 */
yargs.command({
  command: 'show',
  describe: 'Mostrar el contenido de un fichero',
  builder: {
    path: {
      describe: 'Ruta del fichero',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.path !== 'string') {
      console.log('Invalid user or path');
    } else {
      showFile(argv.path);
    }
  },
});

/**
 * Comando para eliminar un directorio o un fichero.
 */
yargs.command({
  command: 'remove',
  describe: 'Borrar ficheros y directorios',
  builder: {
    path: {
      describe: 'Ruta del directorio o del fichero',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.path!== 'string') {
      console.log('Invalid path');
    } else {
      remove(argv.path);
    }
  },
});

/**
 * Comando para mover un directorio o un fichero.
 */
yargs.command({
  command: 'move',
  describe: 'Control de cambios sobre un directorio',
  builder: {
    orig_path: {
      describe: 'Ruta del directorio original',
      demandOption: true,
      type: 'string',
    },
    dest_path: {
      describe: 'Ruta del directorio destino',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.orig_path !== 'string' ||
        typeof argv.dest_path !== 'string') {
      console.log('Invalid user or path');
    } else {
      moveDir(argv.orig_path, argv.dest_path);
    }
  },
});

yargs.parse();


// --------------------- FUNCIONES --------------------- //

/**
 * Función para comprobar si se trata de un directorio o un fichero.
 * @param path Ruta del directorio a comprobar.
 */
export function type_(path: string) {
  if (existsSync(path)) {
    if (isDirectory(path)) {
      console.log(`${path} is a directory`);
    } else {
      console.log(`${path} is a file`);
    }
  } else {
    console.log('Path not found');
  }
}

/**
 * Comprobar si una ruta es un directorio.
 * @param path Ruta del directorio a crear.
 * @returns Retorna un booleano indicando si se trata de un directorio o no.
 */
export function isDirectory(path: string) {
  return existsSync(path) && statSync(path).isDirectory();
}

/**
 * Función para crear un nuevo directorio.
 * @param path Ruta del directorio a crear.
 */
export function add(path: string) {
  const dir = path.split('/');
  const dirName = dir[dir.length - 1];
  const dirPath = path.substring(0, path.length - dirName.length);
  const dirExists = existsSync(dirPath);
  if (dirExists) {
    const dirExists = existsSync(path);
    if (dirExists) {
      console.log('Directory already exists');
    } else {
      mkdirSync(path);
      console.log('Directory created');
    }
  } else {
    console.log('Invalid path');
  }
}

/**
 * Función para listar los ficheros dentro de un directorio.
 * @param path Ruta del directorio a listar.
 */
export function list(path: string) {
  const dirExists = existsSync(path);
  if (dirExists) {
    readdir(path, (err, files) => {
      if (err) {
        console.log('Error reading directory');
      } else {
        files.forEach((file) => {
          if (isDirectory(`${path}/${file}`)) {
            console.log(`[Directory]\t ${file}`);
          } else {
            console.log(`[File]\t\t ${file}`);
          }
        });
      }
    });
  } else {
    console.log('Invalid path');
  }
}

/**
 * Función para mostrar el contenido de un fichero.
 * @param path Ruta del fichero a mostrar.
 */
export function showFile(path: string) {
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
        console.log(` --> Content of ${path}:\n${data}`);
      });
    }
  });
}

/**
 * Función para eliminar un directorio o un fichero.
 * @param path Ruta del directorio a eliminar.
 */
export function remove(path: string) {
  const dirExists = existsSync(path);
  if (dirExists) {
    const dir = path.split('/');
    const dirName = dir[dir.length - 1];
    const dirPath = path.substring(0, path.length - dirName.length);
    const dirExists = existsSync(dirPath);
    if (dirExists) {
      rmdirSync(path);
      console.log('Directory removed');
    } else {
      console.log('Invalid path');
    }
  } else {
    console.log('Invalid path');
  }
}

/**
 * Función para mover un directorio o un fichero.
 * @param oPath Ruta del directorio original.
 * @param dPath Ruta del directorio destino.
 */
export function moveDir(oPath: string, dPath: string) {
  access(oPath, constants.F_OK, (err) => {
    if (err?.code === 'ENOENT') {
      console.log('Directory not found');
    } else if (err) {
      console.log(err);
    } else {
      access(dPath, constants.F_OK, (err) => {
        if (err?.code === 'ENOENT') {
          rename(oPath, dPath, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Directory moved');
            }
          });
        } else {
          console.log('Directory already exists');
        }
      });
    }
  });
}
