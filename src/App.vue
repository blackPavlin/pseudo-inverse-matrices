<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item page-title">Метод Бен-Израэля</div>
      </div>
    </nav>

    <main class="main">
      <section class="conteiner">
        <div class="conteiner__header">
          <input class="input is-rounded" type="number" v-model="countLine" min="1" placeholder="Строки">
          <input class="input is-rounded" type="number" v-model="countColumn" min="1" placeholder="Столбцы">
          <button class="button is-success" @click="createTable">Готово</button>
          <button class="button is-danger is-outlined" @click="clearTable">Отмена</button>
        </div>

        <div class="conteiner__body">
          <table class="table is-bordered">
            <tbody>
              <tr v-for="m in Number(countLine)" v-bind:key="m">
                <td v-for="n in Number(countColumn)" v-bind:key="`${m}_${n}`">
                  <input class="number-field" :id="`${m}_${n}`">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="conteiner">
        <div class="conteiner__header">
          <div class="titie">Результат:</div>
        </div>
        <div class="conteiner__body">
          <table class="table is-bordered">
            <tbody>
              <tr v-for="(m, i) of resultMatrix" v-bind:key="i">
                <td v-for="(n, l) of m" v-bind:key="`${n}_${l}`">
                  {{ n.toFixed(3) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as matrix from "./assets/script"

export default Vue.extend({
  name: 'App',
  data() {
    return { 
      countLine: 1,
      countColumn: 1,
      resultMatrix: [[0]],
    }
  },
  methods: {
    createTable() {
      if (this.countLine > this.countColumn) {
        return alert("Количество столбцов должно быть больше или равно числу строк")
      }

      const mtx = matrix.CreateMatrix(this.countLine, this.countColumn)
      const beta = 0.6 / (matrix.NormOne(matrix.TransposingMatrix(mtx)) * matrix.NormInfinity(mtx))

      let Xk = matrix.MultiplyMatrixByNumber(matrix.TransposingMatrix(mtx), beta)
      let Xk1: number[][]
      let iteration = 0

      for (let err = 1; err >= 10e-7; Xk = Xk1) {
        Xk1 = matrix.MultiplyMatrix(Xk, matrix.DifferenceMatrix(matrix.UnitMatrix(mtx.length), matrix.MultiplyMatrix(mtx, Xk)))
        err = matrix.NormInfinity(matrix.DifferenceMatrix(Xk1, Xk)) / ( 1 + matrix.NormInfinity(Xk))
        iteration += 1
      }

      console.table(Xk)
      this.resultMatrix = Xk
    },
    clearTable() {
      this.countLine = 1
      this.countColumn = 1
      this.resultMatrix = [[0]]
    },
  }
});
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  body, html, #app {
    width: 100%;
    height: 100vh;
  }

  .navbar {
    border-bottom: 1px solid #dbdbdb;
  }

  .page-title {
    font-size: 30px;
  }

  .main {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .conteiner {
    width: 50%;
    height: 100%;
    padding: 1rem 0;
  }

  .conteiner__header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    & input, button {
      margin: 0.5rem
    }

    & .titie {
      font-size: 20px;
    }
  }

  .conteiner__body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto
  }

  .number-field {
    width: 45px;
    height: 30px;
    text-align: center;
  }
</style>
