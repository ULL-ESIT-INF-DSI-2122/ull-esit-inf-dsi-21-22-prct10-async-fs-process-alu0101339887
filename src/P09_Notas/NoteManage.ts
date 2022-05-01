import * as fs from 'fs';
import chalk from 'chalk';

/**
 * Clase que gestiona las notas
 */
export class NoteManage {
  private ruta: string;
  constructor() {
    this.ruta = '';
  }

  /**
  * Función que establece la ruta del directorio del usuario
  * @param usuario Usuario del que se quiere obtener la ruta
  */
  private createPath(usuario: string): void {
    this.ruta = `./Notes/${usuario}`;
  }

  public getCreatePath(usuario: string) {
    return this.createPath(usuario);
  }

  /**
   * @description Función que crea el directorio del usuario
   */
  private addDir(): void {
    if (!fs.existsSync(this.ruta)) {
      /* istanbul ignore next */
      fs.mkdirSync(this.ruta);
    }
  }

  /**
   * Función para realizar las pruebas
   * @returns Función getAddDir
   */
  public getAddDir() {
    return this.addDir;
  }

  /**
   * Función que busca una nota en el directorio del usuario
   * @param title Título de la nota
   * @returns {boolean} Devuelve true si la nota existe, false en caso contrario
   */
  private searchNote(title: string): boolean {
    if (fs.existsSync(`${this.ruta}/${title}.json`)) {
      return true;
    }
    return false;
  }

  /**
   * Función para realizar las pruebas
   * @param title Título de la nota
   * @returns Función searchNote
   */
  getSearchNote(title: string) {
    return this.searchNote(title);
  }

  /**
   * Función que imprime la nota según el formato establecido
   * @param title Título de la nota
   * @param body Cuerpo de la nota
   * @param color Color de la nota
   */
  private printNote(title: string, body: string, color: string): void {
    const text = `${title}\n${body}`;
    if (color === 'red' || color === 'rojo') {
      /* istanbul ignore next */
      console.log(chalk.red(text));
    } else if (color === 'green' || color === 'verde') {
      console.log(chalk.green(text));
      /* istanbul ignore next */
    } else if (color === 'blue' || color === 'azul') {
      console.log(chalk.blue(text));
      /* istanbul ignore next */
    } else if (color === 'yellow' || color === 'amarillo') {
      console.log(chalk.yellow(text));
      /* istanbul ignore next */
    } else {
      /* istanbul ignore next */
      console.log(chalk.white(text));
      /* istanbul ignore next */
      console.log(chalk.red(`El color ${color} no disponible`));
    }
  }

  /**
   * Función para realizar las pruebas
   * @param title Título de la nota
   * @param body Cuerpo de la nota
   * @param color Color de la nota
   * @returns Función printNote
   */
  public getPrint(title: string, body: string, color: string) {
    return this.printNote(title, body, color);
  }

  /**
   * Función que guarda la nueva nota en el directorio del usuario
   * @param user Usuario del que se quiere guardar la nota
   * @param title Título de la nota
   * @param body Cuerpo de la nota
   * @param col Color de la nota
   */
  public addNote(user: string, title: string, body: string, col: string): void {
    this.createPath(user);
    this.addDir();
    const filePath = `${this.ruta}/${title}.json`;
    if (!this.searchNote(title)) {
      fs.writeFileSync(filePath, JSON.stringify({
        title: title,
        body: body,
        color: col,
      }));
      console.log(chalk.green('Nota guardada correctamente'));
    } else {
      console.log(chalk.red('La nota ya existe'));
    }
  }

  /**
   * Función que modifica una nota existente
   * @param user Usuario que quiere editar la nota
   * @param title Título de la nota
   * @param bod Cuerpo de la nota
   * @param col Color de la nota
   */
  public editNote(user: string, title: string, bod: string, col: string): void {
    this.createPath(user);
    if (this.searchNote(title)) {
      const filePath = `${this.ruta}/${title}.json`;
      const note_ = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      note_.body = bod;
      note_.color = col;
      fs.writeFileSync(filePath, JSON.stringify(note_));
      console.log(chalk.green('Nota actualizada correctamente'));
    } else {
      console.log(chalk.red('La nota no existe'));
    }
  }

  /**
   * Función que elimina una nota existente
   * @param user Usuario que quiere eliminar la nota
   * @param title Título de la nota
   */
  public deleteNote(user: string, title: string): void {
    this.createPath(user);
    if (this.searchNote(title)) {
      fs.unlinkSync(`${this.ruta}/${title}.json`);
      console.log(chalk.green('Nota eliminada correctamente'));
    } else {
      console.log(chalk.red('La nota no existe'));
    }
  }

  /**
   * Función que lista las notas existentes en el directorio del usuario
   * @param user Usuario del que se quiere listar las notas
   */
  public listNotes(user: string): void {
    this.createPath(user);
    if (fs.existsSync(this.ruta)) {
      const notes = fs.readdirSync(this.ruta);
      if (notes.length === 0) {
        /* istanbul ignore next */
        console.log(chalk.red('El usuario no tiene notas'));
      } else {
        console.log(chalk.green('Listado de notas:'));
        notes.forEach((note) => {
          console.log(chalk.white(note));
        });
      }
    } else {
      console.log(chalk.red('El usuario no existe'));
    }
  }

  /**
   * Función que lee una nota existente
   * @param user Usuario que quiere leer la nota
   * @param title Título de la nota
   */
  public readNote(user: string, title: string): void {
    this.createPath(user);
    if (this.searchNote(title)) {
      const note = fs.readFileSync(`${this.ruta}/${title}.json`, 'utf-8');
      const note_ = JSON.parse(note);
      const body = note_.body;
      const color = note_.color;
      this.printNote(title, body, color);
    } else {
      console.log(chalk.red('La nota no existe'));
    }
  }
}