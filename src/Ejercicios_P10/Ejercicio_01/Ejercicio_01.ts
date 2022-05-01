// --------------------- EJEMPLO EJERCICIO 1 --------------------- //

import {access, constants, watch} from 'fs';

/**
 * Primero se comprueba el número de argumentos introducidos por el usuario.
 * Si no se introdujo el número correcto de argumentos, se muestra un mensaje
 * de error.
 */
if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  /**
   * Se comprueba si el fichero existe.
   */
  access(filename, constants.F_OK, (err) => {
    /**
     * Si el fichero no existe, se muestra un mensaje de error.
     * En caso contrario, se crea un observador para el fichero.
     */
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);
      /**
       * Se crea un observador para el fichero.
       */
      const watcher = watch(process.argv[2]);
      /**
       * En caso de que se produzca un cambio en el fichero
       * se muestra un mensaje.
       */
      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      /**
       * En caso de que no se produzca ningún cambio en el fichero
       * se muestra un mensaje relacionado con el evento.
       */
      console.log(`File ${filename} is no longer watched`);
    }
  });
}