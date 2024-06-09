<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  top: monster.common.top
}
let props = defineProps<Props>()
let race = ref('蛮族')
let monsterLv = ref(0)
let monsterName = ref('テストモンスター')
function initial() {
  race.value = props.top.race
  monsterLv.value = props.top.lv
  monsterName.value = props.top.name
}
onMounted(() => {
  initial()
})
</script>
<template>
  <div id="トップ">
    <a id="種族" class="トップ">{{ race }}</a>
    <a id="レベル" class="トップ">Lv{{ monsterLv }}</a>
    <a id="名前" class="トップ">{{ monsterName }}</a>
  </div>
</template>


<style scoped>
#トップ {
  display: flex;
  justify-content: space-around;
  align-items: left;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: 'Arial', sans-serif;
  margin-left: 2em;
  width: fit-content;
}

.トップ {
  padding: 10px;
  margin: 5px;
  text-align: center;
  font-size: 16px;
  text-decoration: none;
  width: fit-content;
}
</style>