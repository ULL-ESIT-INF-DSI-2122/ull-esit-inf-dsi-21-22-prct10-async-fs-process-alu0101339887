<br>

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101339887/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101339887/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101339887/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101339887?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101339887&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101339887)

# ÍNDICE

- [INTRODUCCIÓN](#id1).
- [DESARROLLO](#id2).
  - [Ejercicio 1](#id3).
  - [Ejercicio 2](#id4).
    - [Manejo de los argumentos](#id5).
    - [Método ```withPipe()```](#id6).
    - [Método ```withoutPipe()```](#id7).
    - [Ejemplos de ejecución](#id8).
  - [Ejercicio 3](#id9).
    - [Manejo de los argumentos](#id10).
    - [Método ```watchFile_()```](#id11).
    - [Método ```watchAll()```](#id12).
    - [Método ```getUser()```](#id13).
    - [Método ```readFile_()```](#id14).
    - [Ejemplos de ejecución](#id15).
  - [Ejercicio 4](#id16).
    - [Manejo de los argumentos](#id17).
    - [Método ```type_()```](#id18).
    - [Método ```isDirectory()```](#id19).
    - [Método ```add()```](#id20).
    - [Método ```list()```](#id21).
    - [Método ```showFile_()```](#id22).
    - [Método ```remove()```](#id23).
    - [Método ```moveDir()```](#id24).
    - [Ejemplos de ejecución](#id25).
- [CONCLUSIÓN](#id26).

# INTRODICCIÓN<a name="id1"></a>

En esta práctica resolveremos distintos ejercicios centrándonos, sobretodo, en el uso de **callbacks** y **funciones asíncronas**. Para ello haremos uso de algunas de las funciones proporcionadas por ```fs```, ```spawn``` y ```chokidar``` (se utilizará para comprobar su funcionamiento respecto al de fs). Por otra parte, también tendremos que hacer uso de yargs para poder utilizar la entrada de comandos del usuario por la terminal para poder ejecutar cada uno de los programas. 

Al igual que en prácticas anteriores, tendremos que realizar un conjunto de ejercicios que podremos encontrarlos dentro de los directorios _/Ejercicio-01_, _/Ejercicio-02_, _/Ejercicio-03_ y _Ejercicio-04_ que, a su vez, estarán ubicados dentro de los directorios **/src/Ejercicios_P10**. Dentro del directorio **/src** también podremos encontrarnos con los siguientes directorios:

  - **EjercicioLAB:** Contiene los ejercicios de la práctica de laboratorio.
  - **EjercicioPrueba:** Contiene ejercicios de prueba para el funcionamiento de las GitHub Actions en la configuración inicial del repositorio.
  - **P09_Notas:** Contiene la API de la práctica 9 para poder usarla en el ejercicio 3 de esta práctica.

Por otro lado, también se creará la documentación, de forma automática, de todos los ejercicios que hayamos realizado haciendo uso de TypeDoc. Podremos consultar la documentación pulsando sobre el siguiente [_enlace_](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101339887/tree/main/docs) que le llevará al directorio o accediendo manualmente al directorio **/docs**. 

Además, para poder acceder a los tests de cada ejercicio podrá hacerlo pulsando sobre el siguiente [_enlace_](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101339887/tree/main/test) que le llevará al directorio correspondiente o accediendo manualmente al directorio **/test**.

Por último, podrá acceder a la página web del informe pulsando sobre este [_enlace_](https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101339887/).

# DESAROLLO<a name="id2"></a>

## Ejercicio 1<a name="id3"></a>


## Ejercicio 2<a name="id4"></a>

Para este segundo ejercicio se nos pide implementar un programa que devuelva el número de ocurrencias de una palabra en un fichero de texto. Para ello deberemos hacer uso de la función **spawn** y de los comandos ```grep```, ```cat``` y ```wc```. Además, gracias al uso del paquete **yargs** podremos acceder y gestionar los parámetros introducidos por el usuario desde la línea de comandos.

<img width="765" alt="Captura de pantalla 2022-04-28 a las 20 32 24" src="https://user-images.githubusercontent.com/58183963/166163830-22b8fdca-49b5-4327-a397-78dfb5dc2ef1.png">

### Manejo de los argumentos<a name="id5"></a>

Como comentamos anteriormente, para poder acceder a los argumentos introducidos por el usuario desde la línea de comandos, se utilizará el paquete **yargs**.

```typescript 
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
    pipe: {
      describe: 'Function to use',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    // here goes the code to execute
  },
});
```

Dentro del handler de la línea de comandos, se realizará una llamada a la función withPipe() o withouPipe() dependiendo de cómo se haya especificado el parámetro ```--pipe=```.

```typescript
yargs.command({
  // here goes the code to execute
  handler: (argv) => {
    const {file, word, pipe} = argv;
    if (pipe === 'yes') {
      withPipe(file as string, word as string);
    } else if (pipe === 'no') {
      withoutPipe(file as string, word as string);
    } else {
      console.log('Invalid function');
    }
  },
});
```

### Método ```withPipe()```<a name="id6"></a>

Con esta función se podrá contar el número de ocurrencias de una palabra en un fichero de texto haciendo uso del método pipe de la función **spawn**. 

```typescript
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
```

### Método ```withoutPipe()```<a name="id7"></a>

Con esta función se podrá contar el número de ocurrencias de una palabra en un fichero de texto sin hacer uso del método pipe de la función **spawn**. 

```typescript
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
```

>> En caso de que el fichero no exista, se mostrará un mensaje de error, sin embargo, si el fichero existe, se mostrará el número de ocurrencias de la palabra.

<img width="1279" alt="Captura de pantalla 2022-04-28 a las 22 12 30" src="https://user-images.githubusercontent.com/58183963/166163854-58380671-042c-4b23-a842-ba9bfe363095.png">

### Ejemplos de ejecución<a name="id8"></a>

```bash
$ node count.js count --file=file.txt --word=word --pipe=yes
$ node count.js count --file=file.txt --word=word --pipe=no
```

## Ejercicio 3<a name="id9"></a>

En este tercer ejercicio se tendrá que crear un programa que controle los cambios realizados sobre todo el directorio especificado en la línea de comandos por el usuario al mismo tiempo que dicho usuario interactúa con la aplicación de procesamiento de notas creada en la práctica anterior ([_Práctica_09_](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101339887)).

Para ello, el nuevo programa deberá recibir desde la línea de comandos tanto el nombre de un usuario de la aplicación de notas, así como la ruta donde se almacenan las notas de dicho usuario. Esto puede gestionarse nuevamente haciendo uso del paquete ```yargs```.

### Manejo de los argumentos<a name="id10"></a>

Como comentamos anteriormente, para poder acceder a los argumentos introducidos por el usuario desde la línea de comandos, se utilizará el paquete **yargs**.

En este caso, se crearán dos comandos:

  - ```watch```: Para controlar los cambios realizados en el directorio especificado por el usuario.

    ```typescript
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
    ```

  - ```watchAll```: Para controlar los cambios realizados en los directorios de todos los usuarios.

    ```typescript
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
    ```

### Método ```watchFile_()```<a name="id11"></a>

Este método se encargará de controlar los cambios realizados en un fichero especificado por el usuario. En esta función es interesante comentar que, dependiendo del paquete que usemos, podremos especificar más o menos los eventos que suceden a la hora de realizar cambios en un directorio o en un fichero.

Por ejemplo, si realizamos la función haciendo uso del paquete **fs**, solo podemos observar dos eventos a la hora de realizar los cambios:

  - ```change```: Cuando se realiza un cambio en el fichero.
  - ```rename```: Cuando se renombra, se añade o se elimina un fichero.

```typescript
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
```

Por otro lado, si hacemos uso de **chokidar**, podemos observar los eventos que suceden a la hora de realizar los cambios en un directorio o en un fichero de una forma más específica, ya que podemos observar tres eventos distintos:

  - ```add```: Cuando se añade un fichero.
  - ```change```: Cuando se añade un directorio.
  - ```unlink```: Cuando se elimina un fichero.

Sin embargo, a la hora de renombrar un archivo, nos aparecerán dos eventos, add y unlink, ya que al renombrar un fichero en específico, se "eliminará" el fichero original y se "creará" uno con el nuevo nombre.

```typescript
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
```

### Método ```watchAll()```<a name="id12"></a>

En el caso de la función ```watchAll()```, se encargará de controlar los cambios realizados en todos los directorios de todos los usuarios. Al igual que en la función anterior, también es interesante comentar que, dependiendo del paquete que usemos, podremos especificar más o menos los eventos que suceden a la hora de realizar cambios en un directorio o en un fichero.

Por otro lado, al contrario que la anterior, en esta tendremos que obtener el nombre de cada usuario haciendo uso de la función ```getUser()``` para poder especificar en la terminal en qué directorio se entán realizando los cambios.

```typescript
export function watchAll(path: string) {
  const user = getUser(path);
  watch(path, (event: string, filename: string) => {
    // here go the code 
  });
}
```

### Método ```getUser()```<a name="id13"></a>

Este método se encargará de obtener el nombre del usuario que está realizando los cambios en un directorio especificado por el usuario.

```typescript
export function getUser(path: string) {
  const user = path.split('/')[3];
  return user;
}
```

### Método ```readFile_()```<a name="id14"></a>

Este método se encargará de leer el fichero especificado por el usuario y de mostrarlo por pantalla cada vez que se produzca un cambio en él.

```typescript
export function readFile_(path: string) {
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
```

### Ejemplos de ejecución<a name="id15"></a>

```bash
$ node watch.js watch --user=user --path=path
$ node watch.js watchAll --path=path
```

## Ejercicio 4<a name="id16"></a>

En este último ejercicio se realizará una aplicación que permita hacer de **wrapper** de los distintos comandos empleados en Linux para el manejo de ficheros y directorios. La aplicación deberá permitir los siguientes comandos:

  1. Mostrar si es un directorio o un fichero.
  2. Crear un nuevo directorio.
  3. Listar los ficheros dentro de un directorio.
  4. Mostrar el contenido de un fichero.
  5. Borrar ficheros y directorios.
  6. Mover ficheros y/o directorios de una ruta a otra. 

### Manejo de los argumentos<a name="id17"></a>

Como comentamos anteriormente, para poder acceder a los argumentos introducidos por el usuario desde la línea de comandos, se utilizará el paquete **yargs**.

En este caso, tendremos que crear varios comandos:

  - ```type```: Este comando se encargará de mostrar si se trata de un directorio o un fichero.

  ```typescript
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
  ```

  - ```add```: Este comando se encargará de añadir un nuevo directorio.

  ```typescript
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
  ```

  - ```list```: Este comando se encargará de mostrar los directorios y ficheros que contiene.

  ```typescript
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
  ```

  - ```show```: Este comando se encargará de mostrar el contenido de un fichero.

  ```typescript
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
  ```

  - ```remove```: Este comando se encargará de eliminar un directorio.

  ```typescript
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
  ```

  - ```move```: Este comando se encargará de mover un directorio.

  ```typescript
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
  ```

### Método ```type_()```<a name="id18"></a>

Este método se encargará de mostrar si se trata de un directorio o un fichero, para ello primero tendrá que comprobar si la ruta introducida existe y, después, haciendo uso de la función isDirectory() se comprobará si es un directorio o un fichero.

```typescript
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
```

### Método ```isDirectory()```<a name="id19"></a>

Este método se encargará de comprobar si una ruta es un directorio.

```typescript
export function isDirectory(path: string) {
  return existsSync(path) && statSync(path).isDirectory();
}
```

### Método ```add()```<a name="id20"></a>

Este método se encargará de crear un nuevo directorio.

```typescript
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
```

### Método ```list()```<a name="id21"></a>

Este método se encargará de mostrar los directorios y ficheros que contiene.

```typescript
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
```

### Método ```showFile()```<a name="id22"></a>

Este método se encargará de mostrar el contenido de un fichero.

```typescript
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
```

### Método ```remove()```<a name="id23"></a>

Este método se encargará de eliminar un directorio o un fichero.

```typescript
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
```

### Método ```moveDir()```<a name="id24"></a>

Este método se encargará de mover un directorio o un fichero de una ruta a otra.

```typescript
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
```

### Ejemplos de ejecución<a name="id25"></a>

```bash
$ node watch.js type --path=path
$ node watch.js add --path=path
$ node watch.js list --path=path
$ node watch.js show --path=path
$ node watch.js remove --path=path
$ node watch.js move --orig_path=path --dest_path=path
```

<img width="1393" alt="Captura de pantalla 2022-05-01 a las 16 09 27" src="https://user-images.githubusercontent.com/58183963/166163871-affe8fb8-5ba8-4faf-8718-7daa8d79e1ac.png">

# CONCLUSIÓN<a name="id26"></a>

En conclusión, podemos comentar que gracias al paquete yargs podemos acceder y gestionar los parámetros de entrada de una forma muy sencilla, una cosa que es muy importante para poder realizar una aplicación de gran calidad para el usuario.

Por otro lado, gracias al uso de funciones asínronas, podemos realizar una gran cantidad de tareas en paralelo, lo que nos permite ahorrar tiempo y evitar errores, además de crear aplicaciones que nos permitan trabajar con directorios y ficheros de manera más sencilla.
