<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { globals } from '../../../const/globals';
import { sliceArrayLang } from '../util/util';
let lans: Array<string> = globals.langs
const toLans = sliceArrayLang(5, lans)

let habiss: Array<Array<string>> = globals.habiss
const commonStatus = ref<monster.common.status>(globals.commonStatus)
function setCommonStatus(statusInt: monster.common.status) {
  commonStatus.value = statusInt
}

defineExpose({
  commonStatus,
  setCommonStatus
})

onMounted(() => {
  const tmp = sliceArrayLang(5, lans)
  toLans.value = tmp.value
  commonStatus.value = globals.commonStatus
})

</script>
<template>
  <div>
    知能:
    <a v-for="int in globals.intArray">
      <input type="radio" :id="int" v-model="commonStatus.int" :value="int">
      <label :for="int">{{ int }}</label>
    </a>
  </div>
  <div>
    知覚:
    <a v-for="perc in globals.percArray">
      <input type="radio" :id="perc" v-model="commonStatus.perc" :value="perc">
      <label :for="perc">{{ perc }}</label>
    </a>
  </div>
  <div>
    反応:
    <a v-for="reac in globals.reacArray">
      <input type="radio" :id="reac" v-model="commonStatus.reac" :value="reac">
      <label :for="reac">{{ reac }}</label>
    </a>
  </div>
  <v-sheet width="100px">
    <a class="d-flex">穢れ:　<v-text-field hide-details="auto" id="穢れ入力" type="number" min="0"
        v-model="commonStatus.imp" /></a>
  </v-sheet>
  <v-btn class="btn" v-on:click="(() => { commonStatus.lang = [] })">クリア</v-btn><br>
  言語: {{ commonStatus.lang.join("、") }}
  <br>
  <table id="langTable">
    <tr v-for="(_, index) in toLans">
      <td class="commonStatusTd" v-for="ele in toLans[index]">
        <input type="checkbox" :id="ele" v-model="commonStatus.lang" :value="ele">
        <label class="langText " :for="ele">{{ ele }}</label>
      </td>
    </tr>
  </table>
  <br>
  <v-btn class="btn" v-on:click="(() => { commonStatus.habi = [] })">クリア</v-btn><br>
  生息地: {{ commonStatus.habi.join("、") }}<br>
  <table>
    <tr v-for="habis in habiss">
      <td class="commonStatusTd" v-for="habi in habis">
        <input type="checkbox" :id="'checkBodx' + habi" v-model="commonStatus.habi" :value="habi">
        <label class="habiText" :for="'checkBodx' + habi">{{ habi }}</label>
      </td>
    </tr>
  </table>
  <br>
  <v-sheet max-width="500px" class="d-flex flex-row">
    知名度/弱点値:　<v-text-field hide-details="auto" width="50px" id="知名度入力" type="number" min="0"
      v-model="commonStatus.pop" /> /
    <v-text-field hide-details="auto" width="200px" id="弱点値入力" type="text" v-model="commonStatus.weakValue" />
  </v-sheet>
  弱点: <v-text-field hide-details="auto" id="弱点入力" type="text" v-model="commonStatus.weak" />
  <v-sheet max-width="400px" class="d-flex">
    先制値: <v-text-field hide-details="auto" width="80px" id="先制値入力" type="number" min="0" v-model="commonStatus.preem" />
    移動速度: <v-text-field hide-details="auto" width="160px" id="移動速度入力" type="text" v-model="commonStatus.speed" />
  </v-sheet>
  <v-sheet max-width="600px" class="d-flex flex-row">
    生命抵抗力: <v-text-field hide-details="auto" class="w-25" type="number" min="0" v-model="commonStatus.life" />
    ({{ Number(commonStatus.life) + 7 }})
    　　精神抵抗力: <v-text-field hide-details="auto" class="w-25" type="number" min="0" v-model="commonStatus.mind" />
    ({{ Number(commonStatus.mind) + 7 }})
  </v-sheet>
</template>

<style scoped>
/* Status */
#statusForm {
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

input[type="radio"] {
  margin-right: 5px;
}

label {
  margin-right: 15px;
}

table {
  border-collapse: collapse;
  margin-top: 10px;
}

.commonStatusTd {
  text-align: left;
  padding: 5px;
  vertical-align: top;
}

.v-text-field {
  margin-bottom: 0;
}

.v-text-field input {
  box-sizing: border-box;
}

#langTable td {
  padding: 5px;
}

#langTable label {
  margin-left: 5px;
}

.d-flex {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.v-sheet {
  margin-top: 10px;
}

#弱点入力 {
  width: 25em;
}
</style>