<script setup lang="ts">
import { ref } from 'vue';

const level = ref<number>(0)
const part = ref<number>(0)
const rideBeastPartDatas = ref<Array<monster.ride.level>>([])
function setRidePartDatas(parts: Array<monster.ride.level>) {
  rideBeastPartDatas.value = parts
  part.value = rideBeastPartDatas.value.length
  level.value = rideBeastPartDatas.value.length
  console.log(part.value);
  console.log(level.value);
}

function levelClear() {
  level.value = 0
  part.value = 0
  rideBeastPartDatas.value = []
}
function levelPlus() {
  level.value++
  let pushData = null
  if (part.value == 0) {
    pushData = {
      lv: 0,
      parts: [{
        core: false,
        name: "",
        hit: 0,
        damage: 0,
        avoid: 0,
        protect: 0,
        hp: 0,
        mp: 0,
        lifeRes: 0,
        mindRes: 0
      }]
    }
    part.value++
  } else {
    let parts = []
    for (let i = 0; i < part.value; i++) {
      parts.push({
        core: false,
        name: "",
        hit: 0,
        damage: 0,
        avoid: 0,
        protect: 0,
        hp: 0,
        mp: 0,
        lifeRes: 0,
        mindRes: 0
      })
    }
    pushData = {
      lv: 0,
      parts: parts
    }
  }

  rideBeastPartDatas.value.push(pushData)
}
function levelMinus() {
  level.value--
  if (level.value < 0) {
    level.value = 0
  }
  rideBeastPartDatas.value.pop()
}
function partPlus() {
  part.value++
  rideBeastPartDatas.value.forEach(levelData => {
    levelData.parts.push({
      core: false,
      name: "",
      hit: 0,
      damage: 0,
      avoid: 0,
      protect: 0,
      hp: 0,
      mp: 0,
      lifeRes: 0,
      mindRes: 0
    })
  });
}
function partMinus() {
  part.value--
  if (part.value < 0) {
    part.value = 0
    level.value = 0
    rideBeastPartDatas.value = []
  }
  rideBeastPartDatas.value.forEach(levelData => {
    levelData.parts.pop()
  });
}
defineExpose({
  rideBeastPartDatas,
  setRidePartDatas
})
</script>

<template>
  <v-btn class="btn" v-on:click="levelClear()">クリア</v-btn>
  <v-btn class="btn" v-on:click="levelPlus()">レベル＋</v-btn>
  <v-btn class="btn" v-on:click="levelMinus()">レベル－</v-btn>
  <v-btn class="btn" v-on:click="partPlus()">部位＋</v-btn>
  <v-btn class="btn" v-on:click="partMinus()">部位－</v-btn>
  <div>
    <v-row v-for="(_, index) in rideBeastPartDatas" :key="index">
      <v-sheet width="5em">
        <v-text-field hide-details="auto" label="レベル" type="number" class="level"
          v-model="rideBeastPartDatas[index].lv" />
      </v-sheet>
      <br>
      <table id="部位一覧">
        <tr>
          <td>
            <table class="部位">
              <tbody id="部位攻撃">
                <tr class="pTR" v-for="(_, index2) in rideBeastPartDatas[index].parts" :key="index2">
                  <td>
                    コア<br>
                    <input type="checkbox" class="core部位" v-model="rideBeastPartDatas[index].parts[index2].core" />
                  </td>
                  <td>
                    <v-text-field hide-details="auto" label="攻撃方法" type="text" width="250px" class=" 部位名"
                      v-model="rideBeastPartDatas[index].parts[index2].name" />
                  </td>
                  <td>
                    <v-text-field hide-details="auto" label="命中力" type="number" width="80px" class=" hit"
                      v-model="rideBeastPartDatas[index].parts[index2].hit" />
                  </td>
                  <td>
                    <v-text-field hide-details="auto" label="打撃点" type="number" width="80px" class=" damage"
                      v-model="rideBeastPartDatas[index].parts[index2].damage" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table class="部位">
              <tbody id="部位防御">
                <tr v-for="(_, index2) in rideBeastPartDatas[index].parts" :key="index2">
                  <td>
                    <v-text-field hide-details="auto" label="回避力" type="number" width="80px" class=" avoid"
                      v-model="rideBeastPartDatas[index].parts[index2].avoid" />
                  </td>
                  <td>
                    <v-text-field hide-details="auto" label="防護点" type="number" width="80px" class=" protect"
                      v-model="rideBeastPartDatas[index].parts[index2].protect" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table class="部位">
              <tbody id="部位ステータス">
                <tr v-for="(_, index2) in rideBeastPartDatas[index].parts" :key="index2">
                  <td>
                    <v-text-field hide-details="auto" label="HP" type="number" width="80px" class=" hp"
                      v-model="rideBeastPartDatas[index].parts[index2].hp" />
                  </td>
                  <td>
                    <v-text-field hide-details="auto" label="MP" type="test" width="80px" class=" mp"
                      v-model="rideBeastPartDatas[index].parts[index2].mp" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table class="部位">
              <tbody id="部位ステータス">
                <tr v-for="(_, index2) in rideBeastPartDatas[index].parts" :key="index2">
                  <td>
                    <v-text-field hide-details="auto" label="生命抵抗" type="number" width="80px" class=" hp"
                      v-model="rideBeastPartDatas[index].parts[index2].lifeRes" />
                  </td>
                  <td>
                    <v-text-field hide-details="auto" label="精神抵抗" type="test" width="80px" class=" mp"
                      v-model="rideBeastPartDatas[index].parts[index2].mindRes" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </v-row>
  </div>
  <p class="コア部位">コア部位：
    <a v-if="rideBeastPartDatas.length == 0 || rideBeastPartDatas[0].parts.filter((d) => d.core).length == 0">なし</a>
    <a v-else>
      {{ rideBeastPartDatas[0].parts.filter((d) => d.core).map((o) => o.name).join('、') }}
    </a>
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

.level {
  text-align: center;
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

.コア部位 {
  margin-top: 10px;
}
</style>