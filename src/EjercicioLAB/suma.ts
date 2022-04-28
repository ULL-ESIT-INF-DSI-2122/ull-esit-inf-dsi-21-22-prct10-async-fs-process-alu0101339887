// Programa en TypeScript que consista en una función que abre
// el fichero con la lista de números, los sume, y escriba en
// consola el resultado. Deberá invocar dicho programa desde
// el manejador de la función watch expandiendo un subproceso.


import {access, watch} from 'fs';
import {spawn} from 'child_process';

/**
 * Función que abre el fichero con la lista de números,
 * opera con ellos, y escribe en consola el resultado.
 */
export class Suma {
  constructor(readonly file: string,
              readonly operation: string,
              readonly command: string,
              readonly args: string[]) {
    access(file, (err) => {
      if (err) {
        console.log(`File ${file} not found`);
      } else {
        this.run();
      }
    });
  }

  /**
   * Método que realiza la suma de los números de un fichero.
   * @param file_ Nombre del fichero
   */
  private addFile(file_: string) {
    let sum = 0;
    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(file_),
    });
    lineReader.on('line', (line: number) => {
      sum += +line;
    });
    lineReader.on('close', () => {
      console.log(`${this.operation} of ${file_} is ${sum}`);
    });
  }

  /**
   * Función que abre el fichero con la lista de números,
   * opera con ellos, y escribe en consola el resultado.
   */
  private run() {
    watch(this.file, (event, filename) => {
      if (event === 'change') {
        const child = spawn(this.command, [...this.args, this.file]);
        let output = 0;
        child.stdout.on('data', (data) => {
          if (this.operation) {
            if (this.operation === '+') {
              output += data;
            } else if (this.operation === '-') {
              for (const num of file) {
                output -= Number(num);
              }
            } else if (this.operation === '*') {
              for (const num of file) {
                output *= Number(num);
              }
            } else if (this.operation === '/') {
              for (const num of file) {
                output /= Number(num);
              }
            } else {
              console.log(`The operation is not supported`);
            }
            console.log(`Suma: ${output}`);
          } else if (this.operation === '') {
            this.addFile(this.file);
          }
        });
        child.on('close', () => {
          console.log(`Suma: ${output}`);
        });
      } else {
        console.log(`${filename} has been deleted`);
        throw new Error(`${filename} has been deleted`);
      }
    });
  }
}

/**
 * Línea de comandos para ejecutar el programa.
 */
const argv = process.argv;

if (argv.length < 3) {
  console.log('Usage: node suma.js numberList.txt [+, -, *, /...]');
  process.exit(1);
}
const file = argv[2];
