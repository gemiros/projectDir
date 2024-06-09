<script setup lang="ts">
import status from './viewParts/status.vue';
import parts from './viewParts/parts.vue';
import ability from './viewParts/ability.vue';
import booty from './viewParts/bootys.vue';
import top from './viewParts/top.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CreatePiece from './viewParts/createPiece.vue';
import { globals } from '../../const/globals';

const rideLv = ref<string | null>(null)
const id = ref(useRoute().params.id)
const monster = ref({})
const statusComponentKey = ref(0)
const md = ref<monster.monster>({
  Top: globals.commonTop,
  Status: globals.commonStatus,
  Parts: [],
  Abilitys: [],
  Bootys: null,
  Explanation: ''
})
let explain = ref('')
async function setData() {
  monster.value = {}
  const idPath = useRoute().params.id
  const lsValue = localStorage.getItem('monsterData')!
  const monsters = JSON.parse(lsValue)
  const mons = monsters.filter(function (item: any) {
    if (item.ID == Number(idPath)) {
      return true
    }
  })
  const monsterData = mons[0]
  md.value.Top = monsterData.Top
  md.value.Status = monsterData.Status
  md.value.Parts = monsterData.Parts
  md.value.Abilitys = monsterData.Abilitys
  md.value.Bootys = monsterData.Bootys
  md.value.Explanation = monsterData.Explanation
  explain.value = md.value.Explanation
  statusComponentKey.value++
}

onMounted(() => {
  setData()
})

function setLevel(lv: number): void {
  rideLv.value = String(lv)
}
</script>

<template>
  <div>
    <v-btn value="編集" id="編集" v-on:click="() => { $router.push(`/monster/edit/${id}`) }">編集</v-btn>
    <v-btn value="データモチーフ" id="データモチーフ" v-on:click="() => { $router.push(`/monster/duplicate/${id}`) }">データモチーフ</v-btn>
  </div>
  <CreatePiece v-bind:md="md" v-bind:lev="rideLv" />
  <top v-bind:top="md.Top" :key="statusComponentKey" />
  <status v-bind:race="md.Top.race" v-bind:data="md.Status" :key="statusComponentKey" />
  <parts v-bind:parts="md.Parts" v-bind:isRide="md.Top.race === '騎獣'" v-on:setLevel="setLevel"
    :key="statusComponentKey" />
  <ability v-bind:abilitys="md.Abilitys" :key="statusComponentKey" />
  <div v-if="!(md.Top.race == 'ファミリア' || md.Top.race == '騎獣')">
    <booty v-bind:bootys="md.Bootys" :key="statusComponentKey" />
  </div>
  <div id="解説">
    <hr>
    <h3>解説</h3>
    <hr>
    <div id="解説本文" v-html="explain.replace('\n', '<br>')"></div>
  </div>
</template>


<style scoped>
div {
  font-family: 'Arial', sans-serif;
}

v-btn {
  margin: 10px;
}

#編集 {
  background-color: #4CAF50;
  color: white;
}

#データモチーフ {
  background-color: #2196F3;
  color: white;
}

#解説 {
  margin-top: 20px;
}

#解説本文 {
  margin-bottom: 10px;
  padding-left: 10px;
  border-radius: 4px;
  width: 50em;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}
</style>