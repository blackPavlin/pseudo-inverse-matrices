<template>
  <header>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item">
          <h1 class="title is-3">Метод Бен-Израэля</h1>
        </div>
      </div>
    </nav>
  </header>
  <main class="container is-fluid">
    <div class="notification is-danger is-light mt-5" v-if="showNotification">
      <button class="delete" @click="showNotification = false"></button>
      Количество столбцов должно быть <strong>больше</strong> или
      <strong>равно</strong> числу строк
    </div>

    <section class="mt-5">
      <form
        @submit.prevent="onSubmit"
        @keypress.enter.prevent="onSubmit"
        class="box"
      >
        <div class="field">
          <label class="label">Кол-во строк</label>
          <div class="control">
            <input
              class="input"
              type="number"
              min="1"
              v-model="lines"
              :disabled="showMatrix"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Кол-во столбцов</label>
          <div class="control">
            <input
              class="input"
              type="number"
              min="1"
              v-model="columns"
              :disabled="showMatrix"
            />
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-success" @click="ready">Ready</button>
          </div>

          <div class="control">
            <button class="button is-danger" @click="reset">Reset</button>
          </div>

          <div class="control" v-if="showMatrix">
            <button class="button is-info" @click="build">Build matrix</button>
          </div>
        </div>
      </form>
    </section>

    <section class="table-container mt-5">
      <table class="table is-bordered is-flex is-justify-content-center">
        <tbody>
          <tr v-for="(line, i) of matrix" :key="i">
            <td v-for="(column, j) of line" :key="getId(i, j)">
              <input
                type="number"
                class="input is-normal"
                v-model="matrix[i][j]"
                :disabled="showInverseMatrix"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table is-bordered is-flex is-justify-content-center">
        <tbody>
          <tr v-for="(line, i) of inverseMatrix" :key="i">
            <td v-for="(column, j) of line" :key="getId(i, j)">
              {{ Math.floor(column * 1000) / 1000 }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import Matrix from "@/assets/matrix";

export default defineComponent({
  name: "App",
  setup() {
    const lines = ref(1);
    const columns = ref(1);

    const showNotification = ref(false);
    const showMatrix = ref(false);
    const showInverseMatrix = ref(false);

    const matrix = computed(() =>
      showMatrix.value
        ? reactive<number[][]>(
            new Array(lines.value)
              .fill([])
              .map(() => new Array(columns.value).fill(0))
          )
        : []
    );

    const inverseMatrix = computed(() =>
      showInverseMatrix.value ? Matrix.calculateInverseMatrix(matrix.value) : []
    );

    const getId = (n: number, m: number): string => String(n) + String(m);

    const ready = (): void => {
      if (lines.value > columns.value) {
        showNotification.value = true;
        setTimeout(() => (showNotification.value = false), 5000);
        return;
      }

      showMatrix.value = true;
    };

    const reset = (): void => {
      lines.value = 1;
      columns.value = 1;
      showNotification.value = false;
      showMatrix.value = false;
      showInverseMatrix.value = false;
    };

    const build = (): void => {
      showInverseMatrix.value = true;
    };

    return {
      lines,
      columns,
      showNotification,
      showMatrix,
      showInverseMatrix,
      matrix,
      inverseMatrix,
      getId,
      ready,
      reset,
      build,
    };
  },
});
</script>

<style lang="scss">
@import "~bulma/css/bulma.min.css";
</style>
