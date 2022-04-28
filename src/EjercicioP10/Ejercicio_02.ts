import {access} from 'fs';
import {spawn} from 'child_process';
import yargs from 'yargs';

yargs.command({
  command: 'count',
  describe: 'Counts the number of word occurrences in a file',
  builder: {
    file: {
      describe: 'File to count',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'Word to count',
      demandOption: true,
      type: 'string',
    },
    searchFunction: {
      describe: 'Function to use',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    const {file, word, searchFunction} = argv;
    if (searchFunction === 'pipe') {
      withPipe(file as string, word as string);
    } else if (searchFunction === 'no_pipe') {
      withoutPipe(file as string, word as string);
    } else {
      console.log('Invalid function');
    }
  },
});

yargs.parse();


export function withPipe(file: string, word: string) {
  access(file, (err) => {
    if (err) {
      console.log(`File ${file} not found`);
    } else {
      const grepChild = spawn('grep', ['-o', word, file]);
      const wcChild = spawn('wc', ['-l']);
      grepChild.stdout.pipe(wcChild.stdin);
      wcChild.stdout.on('data', (data: string) => {
        const counter = data.toString().trim();
        console.log(`${word} appears ${counter} times in ${file}`);
      });
    }
  });
}


export function withoutPipe(file: string, word: string) {
  access(file, (err) => {
    if (err) {
      console.log(`File ${file} not found`);
    } else {
      const child = spawn('grep', ['-o', word, file]);
      child.stdout.on('data', (data: string) => {
        const counter = data.toString().split('\n').length - 1;
        console.log(`${word} appears ${counter} times in ${file}`);
      });
    }
  });
}

