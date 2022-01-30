export default class Matrix {
  static calculateInverseMatrix(matrix: number[][]): number[][] {
    const beta =
      0.6 /
      (Matrix.normOne(Matrix.transposingMatrix(matrix)) *
        Matrix.normInfinity(matrix));

    let Xk = Matrix.multiplyMatrixByNumber(
      Matrix.transposingMatrix(matrix),
      beta
    );

    for (let err = 1, Xk1: number[][] = []; err >= 10e-7; Xk = Xk1) {
      Xk1 = Matrix.multiplyMatrix(
        Xk,
        Matrix.differenceMatrix(
          Matrix.unitMatrix(matrix.length),
          Matrix.multiplyMatrix(matrix, Xk)
        )
      );

      err =
        Matrix.normInfinity(Matrix.differenceMatrix(Xk1, Xk)) /
        (1 + Matrix.normInfinity(Xk));
    }

    console.table(Xk);

    return Xk;
  }

  /** Транспонирование матрицы */
  static transposingMatrix(matrix: number[][]): number[][] {
    return matrix[0].map((_, i) => matrix.map((r) => r[i]));
  }

  /** Матричная норма при единице (norm1) */
  static normOne(matrix: number[][]): number {
    return Math.max.apply(
      null,
      matrix.map((arr) => arr.reduce((a, b) => Math.abs(a) + Math.abs(b)))
    );
  }

  /** Матричная норма при бесконечности (normi) */
  static normInfinity(matrix: number[][]): number {
    return Math.max.apply(
      null,
      matrix.reduce((a, b) => [...a, ...b])
    );
  }

  /** Умножение матриц */
  static multiplyMatrix(matrix1: number[][], matrix2: number[][]): number[][] {
    const m2 = matrix2[0].map((_, i) => matrix2.map((r) => r[i]));
    return m2.map((_, k) =>
      m2.map((m) => m.reduce((a, b, i) => a + b * matrix1[k][i], 0))
    );
  }

  /** Умножение матрицы на число */
  static multiplyMatrixByNumber(
    matrix: number[][],
    number: number
  ): number[][] {
    return matrix.map((r) => r.map((n) => n * number));
  }

  /** Разнocnm матриц */
  static differenceMatrix(
    matrix1: number[][],
    matrix2: number[][]
  ): number[][] {
    return matrix1.map((m, i) => m.map((n, l) => n - matrix2[i][l]));
  }

  /** Единичная матрица */
  static unitMatrix(countColumn: number): number[][] {
    return new Array(countColumn)
      .fill(0)
      .map((_, i) =>
        new Array(countColumn).fill(0).map((_, l) => (i === l ? 2 : 0))
      );
  }
}
