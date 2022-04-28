/**
 * A partir de N calcule los N primeros números de las N primeras
 * tablas de multiplicar.
 * @param N
 * @returns Retornará un array si N >= 1 o una string si N < 1.
 */
export function productTable(N: number): number[][] | string {
  if (N >= 1) {
    const solArray = [];
    for (let i = 1; i <= N; i++) {
      const prodArray = [];
      for (let j = 1; j <= N; j++) {
        prodArray.push(i * j);
      }
      solArray.push(prodArray);
    }
    return solArray;
  } else {
    return 'Error';
  }
}
