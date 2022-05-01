import 'mocha';
import {expect} from 'chai';
import {withPipe} from '../../src/Ejercicios_P10/Ejercicio_02/Ejercicio_02';
import {withoutPipe} from '../../src/Ejercicios_P10/Ejercicio_02/Ejercicio_02';


describe('Ejercicio 02', () => {
  let archivo: string;
  let archivo2: string;
  let palabra: string;

  beforeEach(() => {
    archivo = 'test/testFiles/Prueba.txt';
    archivo2 = 'test/testFiles/P.txt';
    palabra = 'Hola';
  });

  describe('Función withPipe', () => {
    it('Devuelve número de veces que aparece la palabra en el archivo', () => {
      expect(withPipe).to.exist;
      expect(withPipe).to.be.a('function');
      expect(withPipe(archivo, palabra)).to.throw;
      expect(withPipe(archivo, palabra)).to.equal(undefined);
      expect(withPipe(archivo2, palabra)).to.equal(undefined);
    });
  });
  describe('Función withoutPipe', () => {
    it('Devuelve número de veces que aparece la palabra en el archivo', () => {
      expect(withoutPipe).to.exist;
      expect(withoutPipe).to.be.a('function');
      expect(withoutPipe(archivo, palabra)).to.throw;
      expect(withoutPipe(archivo, palabra)).to.equal(undefined);
      expect(withoutPipe(archivo2, palabra)).to.equal(undefined);
    });
  });
});