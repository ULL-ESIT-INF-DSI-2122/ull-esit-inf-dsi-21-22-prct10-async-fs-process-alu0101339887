import 'mocha';
import {expect} from 'chai';
import {productTable} from '../src/prueba';

describe('Tests del ejercicio de prueba', () => {
  it('productTable es una función', () => {
    expect(productTable).to.be.a('function');
  });
  it('productTable(2) retorna [[1, 2], [2, 4]]', () => {
    expect(productTable(2)).to.deep.equal([[1, 2], [2, 4]]);
  });
  it('productTable(0) retorna Error', () => {
    expect(productTable(0)).to.be.equal('Error');
  });
  it('productTable(3) retorna [[1, 2, 3], [2, 4, 6], [3, 6, 9]]', () => {
    expect(productTable(3)).to.deep.equal([[1, 2, 3], [2, 4, 6], [3, 6, 9]]);
  });
});
