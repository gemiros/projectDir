<script setup lang="ts">
import { ref } from 'vue';
import { globals } from '../../../const/globals';

const kindArray = globals.kinds
const abiDatas = ref<Array<monster.common.ability>>([])
function setAbiDatas(abis: Array<monster.common.ability>) {
  abiDatas.value = abis
}

function abilityPlus() {
  abiDatas.value = abiDatas.value as Array<monster.common.ability>
  abiDatas.value.push({
    kind: [],
    name: "",
    use: "",
    explain: ""
  })
}
function abilityMinus() {
  abiDatas.value = abiDatas.value as Array<monster.common.ability>
  abiDatas.value.pop()
}

const dragIndex = ref<number | null>(null)
function dragStart(index: number) {
  dragIndex.value = index;
}
function dragEnter(index: number) {
  if (index == dragIndex.value) return
  const deleteElement = abiDatas.value.splice(dragIndex.value!, 1)[0]
  abiDatas.value.splice(index, 0, deleteElement)
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
  abiDatas,
  setAbiDatas
})
</script>
<template>
  <div id="特殊能力一覧">
    <v-btn class="btn" v-on:click="abilityPlus()">特殊能力＋</v-btn>
    <v-btn class="btn" v-on:click="abilityMinus()">特殊能力－</v-btn>
    <h3>特殊能力</h3>
    <table>
      <tbody>
        <tr v-for="(_, index) in abiDatas" :key="index" :draggable="true" @dragstart="dragStart(index)"
          @dragenter="dragEnter(index)" @dragover.prevent @dragend="dragEnd" :class="className(index)">
          <td>
            <v-container class="align-center アビKind">
              <v-row>
                <v-col class="py-0 px-2" v-for="kind in kindArray">
                  <label>{{ kind }}</label>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 px-2" v-for="kind in kindArray">
                  <input type="checkbox" :label="kind" :value="kind" v-model="abiDatas[index].kind"
                    hide-details></input>
                </v-col>
              </v-row>
            </v-container>
          </td>
          <td>
            <v-text-field hide-details="auto" label="名前" variant="outlined" v-model="abiDatas[index].name"
              class="アビName" density="comfortable" />
          </td>
          <td>
            <v-text-field hide-details="auto" label="使用能力・抵抗など" variant="outlined" height="20px"
              v-model="abiDatas[index].use" class="アビUse" density="comfortable" />
          </td>
          <td>
            <v-textarea label="効果" variant="outlined" v-model="abiDatas[index].explain" class="AbiexplainectText"
              auto-grow density="comfortable" hide-details :rows="1"></v-textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.dragging {
  background-color: #ddd;
}

#特殊能力一覧 {
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

.ability-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.ability-table td {
  padding: 10px;
  vertical-align: top;
}

.アビKind {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
}

.アビName {
  width: 8em;
}

.アビUse {
  width: 12em;

}

.AbiexplainectText {
  width: 25em;
}

.v-text-field,
.v-textarea {
  margin-bottom: 0;
}
</style>