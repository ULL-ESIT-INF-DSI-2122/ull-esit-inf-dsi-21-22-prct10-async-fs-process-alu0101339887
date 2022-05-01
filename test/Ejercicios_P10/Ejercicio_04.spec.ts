import 'mocha';
import {expect} from 'chai';
import {type_} from '../../src/Ejercicios_P10/Ejercicio_04/Ejercicio_04';
import {isDirectory} from '../../src/Ejercicios_P10/Ejercicio_04/Ejercicio_04';
import {add} from '../../src/Ejercicios_P10/Ejercicio_04/Ejercicio_04';
import {list} from '../../src/Ejercicios_P10/Ejercicio_04/Ejercicio_04';
import {showFile} from '../../src/Ejercicios_P10/Ejercicio_04/Ejercicio_04';
import {remove} from '../../src/Ejercicios_P10/Ejercicio_04/Ejercicio_04';
import {moveDir} from '../../src/Ejercicios_P10/Ejercicio_04/Ejercicio_04';


describe('Ejercicio 04', () => {
  let ruta: string;
  let ruta2: string;
  let ruta3: string;
  let ruta4: string;
  let ruta5: string;
  let ruta6: string;

  beforeEach(() => {
    ruta = 'test/testFiles/Prueba.txt';
    ruta2 = 'test/Prueba.txt';
    ruta3 = 'test/NewTestingFiles';
    ruta4 = 'test/p.txt';
    ruta5 = '12344';
    ruta6 = 'tests/';
  });

  describe('Función type_', () => {
    it('Muestra si es un directorio o no', () => {
      expect(type_).to.exist;
      expect(type_).to.be.a('function');
      expect(type_(ruta)).to.throw;
      expect(type_(ruta)).to.equal(undefined);
      expect(type_(ruta4)).to.equal(undefined);
    });
  });
  describe('Función isDirectory', () => {
    it('Devuelve true si es un directorio y false en caso contrario', () => {
      expect(isDirectory).to.exist;
      expect(isDirectory).to.be.a('function');
      expect(isDirectory(ruta)).to.throw;
      expect(isDirectory(ruta)).to.be.equal(true);
    });
  });
  describe('Función add', () => {
    it('Añade un fichero al directorio', () => {
      expect(add).to.exist;
      expect(add).to.be.a('function');
      expect(add(ruta)).to.throw;
      expect(add(ruta)).to.equal(undefined);
      expect(add(ruta3)).to.equal(undefined);
      expect(add(ruta5)).to.equal(undefined);
    });
  });
  describe('Función list', () => {
    it('Lista los ficheros del directorio', () => {
      expect(list).to.exist;
      expect(list).to.be.a('function');
      expect(list(ruta)).to.throw;
      expect(list(ruta)).to.equal(undefined);
      expect(list(ruta6)).to.equal(undefined);
    });
  });
  describe('Función showFile', () => {
    it('Muestra el contenido de un fichero', () => {
      expect(showFile).to.exist;
      expect(showFile).to.be.a('function');
    });
  });
  describe('Función remove', () => {
    it('Elimina un fichero o directorio', () => {
      expect(remove).to.exist;
      expect(remove).to.be.a('function');
      expect(remove(ruta)).to.throw;
      expect(remove(ruta)).to.equal(undefined);
    });
  });
  describe('Función moveDir', () => {
    it('Mueve un directorio o un fichero', () => {
      expect(moveDir).to.exist;
      expect(moveDir).to.be.a('function');
      expect(moveDir(ruta, ruta2)).to.throw;
      expect(moveDir(ruta, ruta2)).to.equal(undefined);
    });
  });
});