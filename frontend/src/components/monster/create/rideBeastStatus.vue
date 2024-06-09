<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { globals } from '../../../const/globals';
let lans: Array<string> = globals.langs
const toLans = ref<Array<Array<string>>>([])

const rideBeastStatus = ref<monster.ride.status>({
  value: '',
  int: 'なし',
  lang: [],
  perc: '五感',
  speed: '- / -',
  weak: '',
})
function setrideBeastStatus(statusInt: monster.ride.status) {
  console.log('a');

  rideBeastStatus.value = statusInt
}

function sliceArrayLang(num: number) {
  const length = Math.ceil(lans.length / num)
  toLans.value = []
  for (let i = 0; i < length; i++) {
    toLans.value.push(lans.slice(i * num, (i + 1) * num))
  }
}

defineExpose({
  rideBeastStatus,
  setrideBeastStatus
})

onMounted(() => {
  sliceArrayLang(5)
})
</script>
<template>
  <div>
    <v-text-field hide-details="auto" label="価格" suffix="G" width="160px" id="価格入力" type="text"
      v-model="rideBeastStatus.value" />
  </div>
  <div>
    知能:
    <input type="radio" id="知能なし" v-model="rideBeastStatus.int" value="なし">
    <label for="知能なし">なし</label>
    <input type="radio" id="動物並み" v-model="rideBeastStatus.int" value="動物並み">
    <label for="動物並み">動物並み</label>
    <input type="radio" id="低い" v-model="rideBeastStatus.int" value="低い">
    <label for="低い">低い</label>
    <input type="radio" id="人間並み" v-model="rideBeastStatus.int" value="人間並み">
    <label for="人間並み">人間並み</label>
    <input type="radio" id="高い" v-model="rideBeastStatus.int" value="高い">
    <label for="高い">高い</label>
    <input type="radio" id="命令を聞く" v-model="rideBeastStatus.int" value="命令を聞く">
    <label for="命令を聞く">命令を聞く</label>
  </div>
  <div>
    知覚:
    <input type="radio" id="五感" v-model="rideBeastStatus.perc" value="五感">
    <label for="五感">五感</label>
    <input type="radio" id="五感（暗視）" v-model="rideBeastStatus.perc" value="五感（暗視）">
    <label for="五感（暗視）">五感（暗視）</label>
    <input type="radio" id="五感（聴覚）" v-model="rideBeastStatus.perc" value="五感（聴覚）">
    <label for="五感（聴覚）">五感（聴覚）</label>
    <input type="radio" id="五感（嗅覚）" v-model="rideBeastStatus.perc" value="五感（嗅覚）">
    <label for="五感（嗅覚）">五感（嗅覚）</label>
    <input type="radio" id="魔法" v-model="rideBeastStatus.perc" value="魔法">
    <label for="魔法">魔法</label>
    <input type="radio" id="機械" v-model="rideBeastStatus.perc" value="機械">
    <label for="機械">機械</label>
  </div>
  <v-btn v-on:click="(() => { rideBeastStatus.lang = [] })">クリア</v-btn><br>
  言語: {{ rideBeastStatus.lang.join("、") }}
  <br>
  <table id="langTable">
    <tr v-for="(_, index) in toLans">
      <td class="commonStatusTd" v-for="ele in toLans[index]">
        <input type="checkbox" :id="ele" v-model="rideBeastStatus.lang" :value="ele">
        <label class="langText " :for="ele">{{ ele }}</label>
      </td>
    </tr>
  </table>
  <br>
  弱点: <v-text-field hide-details="auto" id="弱点入力" type="text" v-model="rideBeastStatus.weak" />
  <v-sheet max-width="400px" class="d-flex">
    移動速度: <v-text-field hide-details="auto" width="160px" id="移動速度入力" type="text" v-model="rideBeastStatus.speed" />
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
  padding: 10px;
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