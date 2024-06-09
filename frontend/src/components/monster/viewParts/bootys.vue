<script setup lang="ts">
interface Props {
  bootys: Array<monster.common.booty> | null
}
const props = defineProps<Props>()
</script>

<template>
  <div id="戦利品">
    <hr>
    <h3>戦利品</h3>
    <table id="戦利品テーブル">
      <tr v-for="booty in props.bootys">
        <td class="戦利品出目">{{ booty.dice }}</td>
        <td class="戦利品中身">{{ booty.item }}</td>
      </tr>
    </table>
    <hr>
  </div>
</template>

<style scoped>
#戦利品 {
  font-family: 'Arial', sans-serif;
  margin: 20px;
}

h3 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
}

hr {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
}

#戦利品テーブル {
  width: 100%;
  border-collapse: collapse;
  width: fit-content;
}

#戦利品テーブル tr:nth-child(even) {
  background-color: #f2f2f2;
}

#戦利品テーブル td {
  padding: 8px;
  border: 1px solid #ddd;
}

.戦利品出目 {
  width: 4em;
  text-align: center;
  font-weight: bold;
}

.戦利品中身 {
  width: 25em;
}
</style>