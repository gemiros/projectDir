<script setup lang="ts">
import { ref } from 'vue';

const bootyDatas = ref<Array<monster.common.booty>>([])
function setBootys(bootys: Array<monster.common.booty>) {
  bootyDatas.value = bootys
}
function bootyPlus() {
  bootyDatas.value.push({
    dice: "",
    item: ""
  })
}
function bootyMinus() {
  bootyDatas.value.pop()
}

const dragIndex = ref<number | null>(null)
function dragStart(index: number) {
  dragIndex.value = index;
}
function dragEnter(index: number) {
  if (index == dragIndex.value) return
  const deleteElement = bootyDatas.value.splice(dragIndex.value!, 1)[0]
  bootyDatas.value.splice(index, 0, deleteElement)
  dragIndex.value = index
}
function dragEnd() {
  console.log('drag end');

  dragIndex.value = null
}

function className(index: number) {
  return index === dragIndex.value ? 'dragging' : ''
}
defineExpose({
  bootyDatas,
  setBootys
})
</script>

<template>
  <div id="戦利品">
    <v-btn class="btn" v-on:click="bootyPlus()">戦利品＋</v-btn>
    <v-btn class="btn" v-on:click="bootyMinus()">戦利品－</v-btn>
    <h3>戦利品</h3>
    <table>
      <tbody id="戦利品テーブル">
        <tr v-for="(_, index) in bootyDatas" :key="index" :draggable="true" @dragstart="dragStart(index)"
          @dragenter="dragEnter(index)" @dragover.prevent @dragend="dragEnd" :class="className(index)">
          <td>
            <v-text-field hide-details="auto" label="出目" width="200px" type='text' class='bootyT bootyDice'
              v-model="bootyDatas[index].dice" />
          </td>
          <td>
            <v-text-field hide-details="auto" label="アイテム" width="600px" type='text' class='bootyT bootyItem'
              v-model="bootyDatas[index].item" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
#戦利品 {
  font-family: 'Arial', sans-serif;
  margin: 20px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  margin: 5px;
}

.btn:hover {
  background-color: #45a049;
}

h3 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.booty-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.booty-table td {
  padding: 10px;
  vertical-align: top;
}

.bootyT {
  width: 100%;
}

.v-text-field {
  margin-bottom: 0;
}

.v-text-field input {
  width: 100%;
  box-sizing: border-box;
}
</style>