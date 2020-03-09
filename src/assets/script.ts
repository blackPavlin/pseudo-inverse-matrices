
/** Представление матрицы в виде массива массивов */
export function CreateMatrix(countLine: number, countColumn: number): Array<Array<number>> {
    const matrix = []

    for (let i = 0; i < countLine; ++i) {
        const string = []

        for (let k = 0; k < countColumn; ++k) {
            const element = <HTMLInputElement>document.getElementById(`${i + 1}_${k + 1}`)
            if (element !== null ) { 
                string[k] = Number(element.value)
            }
        }

        matrix[i] = string
    }
    return matrix
}

/** Транспонирование матрицы */
export function TransposingMatrix(matrix: Array<Array<number>>): Array<Array<number>> {
    return matrix[0].map((_, i) => matrix.map(r => r[i]))
}

/** Матричная норма при единице (norm1) */
export function NormOne(matrix: Array<Array<number>>): number {
    return Math.max.apply(null, matrix.map(arr => arr.reduce((a, b) => Math.abs(a) + Math.abs(b))))
}

/** Матричная норма при бесконечности (normi) */
export function NormInfinity(matrix: Array<Array<number>>): number {
    return Math.max.apply(null, matrix.reduce((a, b) => [...a, ...b]))
}

/** Умножение матриц */
export function MultiplyMatrix(matrix1: Array<Array<number>>, matrix2: Array<Array<number>>): Array<Array<number>> {
    const m2 = matrix2[0].map((_, i) => matrix2.map(r => r[i]))
    return m2.map((_, k) => m2.map(m => m.reduce((a, b, i) => a + b * matrix1[k][i], 0)))
}

/** Умножение матрицы на число */
export function MultiplyMatrixByNumber(matrix: Array<Array<number>>, number: number): Array<Array<number>> {
    return matrix.map(r => r.map(n => n * number))
}

/** Разнocnm матриц */
export function DifferenceMatrix(matrix1: Array<Array<number>>, matrix2: Array<Array<number>>): Array<Array<number>> {
    return matrix1.map((m, i) => m.map((n, l) => n - matrix2[i][l]))
}

/** Единичная матрица */
export function UnitMatrix(countColumn: number): Array<Array<number>> {
    return new Array(countColumn).fill(0).map((_, i) => (new Array(countColumn).fill(0)).map((_, l) => i === l ? 2 : 0))
}

