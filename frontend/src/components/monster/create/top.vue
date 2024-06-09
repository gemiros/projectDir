<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { globals } from '../../../const/globals';

const races = globals.races
const tags = globals.tags
const tag = ref<Array<string>>(['main'])

const topData = ref<monster.common.top>({
  race: '',
  lv: 0,
  name: ''
})
function setTopData(topInt: monster.common.top) {
  topData.value = topInt
}
function setTagData(tags: Array<string>) {
  tag.value = tags
}
onMounted(() => {
})
defineExpose({
  topData,
  tag,
  setTopData,
  setTagData,
})
</script>

<template>
  <div id="トップ2" class="d-flex flex-row">
    <v-sheet width="150px">
      <v-select class="align-center" label="種族" :items="races" v-model="topData.race" hide-details />
    </v-sheet>
    <v-sheet width="100px" class="mx-5">
      <v-text-field hide-details="auto" label="Lv" id="レベル入力" type="number" min="0" v-model="topData.lv"
        class="getValue" />
    </v-sheet>
    <a>タグ: </a>
    <a v-for="d in tags">
      <input type="checkbox" :id="d[0]" v-model="tag" :value="d[0]">
      <label class="tagText" :for="d[0]">{{ d[1] }}</label>
    </a>
  </div>
  <v-sheet class="w-50">
    <a id="名前" class="d-flex"><v-text-field hide-details="auto" label="名前" id="名前入力" type="text" class="getValue"
        v-model="topData.name" /></a>
  </v-sheet>
</template>
