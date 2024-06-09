<script setup lang="ts">
import { ref } from 'vue';

const partDatas = ref<Array<monster.common.part>>([])
function setPartDatas(parts: Array<monster.common.part>) {
  partDatas.value = parts
}
function partPlus() {
  partDatas.value.push({
    core: false,
    name: "",
    hit: 0,
    damage: 0,
    avoid: 0,
    protect: 0,
    hp: 0,
    mp: 0
  })
}
function partMinus() {
  partDatas.value.pop()
}
defineExpose({
  partDatas,
  setPartDatas
})
</script>

<template>
  <v-btn class="btn" v-on:click="partPlus()">部位＋</v-btn>
  <v-btn class="btn" v-on:click="partMinus()">部位－</v-btn>
  <table id="部位一覧">
    <tr>
      <td>
        <table class="部位">
          <tbody id="部位攻撃">
            <tr class="pTR" v-for="(_, index) in partDatas" :key="index">
              <td>
                コア
                <input type="checkbox" class="core部位" v-model="partDatas[index].core" />
              </td>
              <td>
                <v-text-field hide-details="auto" label="攻撃方法" type="text" width="250px" class=" 部位名"
                  v-model="partDatas[index].name" />
              </td>
              <td>
                <v-text-field hide-details="auto" label="命中力" type="number" width="80px" class=" hit"
                  v-model="partDatas[index].hit" />
              </td>
              <td>
                <v-text-field hide-details="auto" label="打撃点" type="number" width="80px" class=" damage"
                  v-model="partDatas[index].damage" />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <table class="部位">
          <tbody id="部位防御">
            <tr v-for="(_, index) in partDatas" :key="index">
              <td>
                <v-text-field hide-details="auto" label="回避力" type="number" width="80px" class=" avoid"
                  v-model="partDatas[index].avoid" />
              </td>
              <td>
                <v-text-field hide-details="auto" label="防護点" type="number" width="80px" class=" protect"
                  v-model="partDatas[index].protect" />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <table class="部位">
          <tbody id="部位ステータス">
            <tr v-for="(_, index) in partDatas" :key="index">
              <td>
                <v-text-field hide-details="auto" label="HP" type="number" width="80px" class=" hp"
                  v-model="partDatas[index].hp" />
              </td>
              <td>
                <v-text-field hide-details="auto" label="MP" type="test" width="80px" class=" mp"
                  v-model="partDatas[index].mp" />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
  <p>コア部位：
    <a v-if="partDatas.filter((d) => d.core).length == 0">なし</a>
    <a v-else>{{ partDatas.filter((d) => d.core).map((o) => o.name).join('、') }}</a>
  </p>
</template>

<style scoped>
#partForm {
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

#部位一覧 {
  border-collapse: collapse;
  margin-top: 20px;
}

.部位 {
  width: 100%;
}

.pTR {
  display: flex;
  align-items: center;
}

.v-text-field {
  margin-bottom: 0;
}

.v-text-field input {
  box-sizing: border-box;
}

.core部位 {
  margin-right: 10px;
}

td {
  text-align: center
}
</style>