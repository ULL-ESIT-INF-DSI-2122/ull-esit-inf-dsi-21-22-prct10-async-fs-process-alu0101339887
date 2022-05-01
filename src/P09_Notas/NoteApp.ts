import {NoteManage} from './NoteManage';
import yargs from 'yargs';

const noteManage = new NoteManage();

/**
 * Comando add. Añade una nota al directorio del usuario.
 */
yargs.command({
  command: 'add',
  describe: 'Añade una nueva nota',
  builder: {
    user: {
      describe: 'Autor de la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.user === 'string' &&
        typeof argv.title === 'string' &&
        typeof argv.body === 'string' &&
        typeof argv.color === 'string') {
      console.log('Añadiendo nota...');
      noteManage.addNote(argv.user, argv.title, argv.body, argv.color);
    }
  },
});

/**
 * Comando edit. Edita una nota del directorio del usuario
 */
yargs.command({
  command: 'edit',
  describe: 'Edita una nota',
  builder: {
    user: {
      describe: 'Autor de la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.title === 'string' &&
        typeof argv.body === 'string' &&
        typeof argv.user === 'string' &&
        typeof argv.color === 'string') {
      console.log('Editando nota...');
      noteManage.editNote(argv.user, argv.title, argv.body, argv.color);
    }
  },
});

/**
 * Comando delete. Elimina una nota del directorio del usuario
 */
yargs.command({
  command: 'delete',
  describe: 'Elimina una nota',
  builder: {
    user: {
      describe: 'Autor de la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      console.log('Eliminando nota...');
      noteManage.deleteNote(argv.user, argv.title);
    }
  },
});

/**
 * Comando list. Lista las notas del directorio del usuario
 */
yargs.command({
  command: 'list',
  describe: 'Lista las notas del directorio del usuario',
  builder: {
    user: {
      describe: 'Autor de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.user === 'string') {
      console.log('Listando notas...');
      noteManage.listNotes(argv.user);
    }
  },
});

/**
 * Comando read. Lee una nota del directorio del usuario
 */
yargs.command({
  command: 'read',
  describe: 'Lee una nota',
  builder: {
    user: {
      describe: 'Autor de la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Título de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.title === 'string' &&
        typeof argv.user === 'string') {
      console.log('Leyendo nota...');
      noteManage.readNote(argv.user, argv.title);
    }
  },
});

yargs.parse();
