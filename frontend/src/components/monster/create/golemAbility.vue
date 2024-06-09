<script setup lang="ts">
import { ref } from 'vue';
import { globals } from '../../../const/globals';

const kindArray = globals.kinds
const abiDatas = ref<monster.golem.abilitys>({
  max: 0,
  abilitys: []
})

function setAbiDatas(abis: monster.golem.abilitys) {
  abiDatas.value = abis
}

function abilityPlus() {
  abiDatas.value?.abilitys.push({
    using: false,
    item: "",
    kind: [],
    name: "",
    use: "",
    explain: ""
  })
}
function abilityMinus() {
  abiDatas.value?.abilitys.pop()
}

const dragIndex = ref<number | null>(null)
function dragStart(index: number) {
  dragIndex.value = index;
}
function dragEnter(index: number) {
  if (index == dragIndex.value) return
  const deleteElement = abiDatas.value.abilitys.splice(dragIndex.value!, 1)[0]
  abiDatas.value.abilitys.splice(index, 0, deleteElement)
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
    強化アイテム最大数: <v-text-field hide-details="auto" width="80px" id="先制値入力" type="number" min="0" v-model="abiDatas.max" />
    <v-btn class="btn" v-on:click="abilityPlus()">特殊能力＋</v-btn>
    <v-btn class="btn" v-on:click="abilityMinus()">特殊能力－</v-btn>
    <h3>特殊能力</h3>
    <table>
      <tbody>
        <tr v-for="(_, index) in abiDatas?.abilitys" :key="index" :draggable="true" @dragstart="dragStart(index)"
          @dragenter="dragEnter(index)" @dragover.prevent @dragend="dragEnd" :class="className(index)">
          <td>
            <v-text-field hide-details="auto" label="強化素材" variant="outlined" v-model="abiDatas.abilitys[index].item"
              class="強化アイテム" density="comfortable" />
          </td>
          <td>
            <v-container class="align-center アビKind">
              <v-row>
                <v-col class="py-0 px-2" v-for="kind in kindArray">
                  <label>{{ kind }}</label>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 px-2" v-for="kind in kindArray">
                  <input type="checkbox" :label="kind" :value="kind" v-model="abiDatas.abilitys[index].kind"
                    hide-details="auto"></input>
                </v-col>
              </v-row>
            </v-container>
          </td>
          <td>
            <v-text-field hide-details="auto" label="名前" variant="outlined" v-model="abiDatas.abilitys[index].name"
              class="アビName" density="comfortable" />
          </td>
          <td>
            <v-text-field hide-details="auto" label="使用能力・抵抗など" variant="outlined" height="20px"
              v-model="abiDatas.abilitys[index].use" class="アビUse" density="comfortable" />
          </td>
          <td>
            <v-textarea hide-details="auto" label="効果" variant="outlined" v-model="abiDatas.abilitys[index].explain"
              class="AbiexplainectText" auto-grow density="comfortable" :rows="1"></v-textarea>
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

.強化アイテム {
  width: 8em;
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