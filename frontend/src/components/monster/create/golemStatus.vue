<script setup lang="ts">
import { ref } from 'vue';

const golemStatus = ref<monster.golem.status>({
  habi: ['さまざま'],
  int: '命令を聞く',
  lang: ['なし'],
  life: 0,
  mind: 0,
  perc: '魔法',
  pop: 0,
  preem: 0,
  reac: '命令による',
  speed: '- / -',
  weak: '',
  weakValue: ''
})
function setgolemStatus(statusInt: monster.golem.status) {
  golemStatus.value = statusInt
}

defineExpose({
  golemStatus,
  setgolemStatus
})

</script>
<template>
  <br>
  <v-sheet max-width="500px" class="d-flex flex-row">
    知名度/弱点値:　<v-text-field hide-details="auto" width="50px" id="知名度入力" type="number" min="0"
      v-model="golemStatus.pop" /> /
    <v-text-field hide-details="auto" width="200px" id="弱点値入力" type="text" v-model="golemStatus.weakValue" />
  </v-sheet>
  弱点: <v-text-field hide-details="auto" id="弱点入力" type="text" v-model="golemStatus.weak" />
  <v-sheet max-width="400px" class="d-flex">
    先制値: <v-text-field hide-details="auto" width="80px" id="先制値入力" type="number" min="0" v-model="golemStatus.preem" />
    移動速度: <v-text-field hide-details="auto" width="160px" id="移動速度入力" type="text" v-model="golemStatus.speed" />
  </v-sheet>
  <v-sheet max-width="600px" class="d-flex flex-row">
    生命抵抗力: <v-text-field hide-details="auto" class="w-25" type="number" min="0" v-model="golemStatus.life" />
    ({{ Number(golemStatus.life) + 7 }})
    　　精神抵抗力: <v-text-field hide-details="auto" class="w-25" type="number" min="0" v-model="golemStatus.mind" />
    ({{ Number(golemStatus.mind) + 7 }})
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