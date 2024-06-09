<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { globals } from '../../../const/globals';

interface Props {
  data: any,
  race: string | undefined,
}
let props = defineProps<Props>()
const setData = ref<monster.common.status>(globals.commonStatus)
const Lang = ref('妖魔語')
const Habi = ref('さまざま')
function initial() {
  if (props.race == 'ファミリア') {
    setData.value = globals.familiaStatus
    setData.value.preem = props.data.preem
    setData.value.speed = props.data.speed
  } else if (props.race == 'ゴーレム') {
    setData.value = globals.golemStatus
    setData.value.pop = props.data.pop
    setData.value.weakValue = props.data.weakValue
    setData.value.weak = props.data.weak
    setData.value.preem = props.data.preem
    setData.value.speed = props.data.speed
    setData.value.life = props.data.life
    setData.value.mind = props.data.mind
  } else {
    setData.value = props.data
  }
  if (setData.value.lang != undefined) {
    Lang.value = setData.value.lang.join('、')
  }
  if (setData.value.habi != undefined) {
    Habi.value = setData.value.habi.join('、')
  }
}
onMounted(() => {
  initial()
})
</script>

<template>
  <div id="共通能力一覧">
    <div class="共通能力1">
      <a id="知能" class="能力">知能：{{ setData.int }}</a>
      <a id="知覚" class="能力">知覚：{{ setData.perc }}</a>
      <a v-if="props.race != '騎獣'" id="反応" class="能力">反応：{{ setData.reac }}</a>
      <a v-if="race !== 'ファミリア' && race !== 'ゴーレム' && race !== '騎獣'" id="穢れ" class="能力">穢れ：{{ setData.imp
        }}</a>
    </div>
    <div class="共通能力2">
      <a id="言語" class="能力">言語：{{ Lang }}</a>
    </div>
    <div class="共通能力3">
      <a id="生息地" class="能力">生息地：{{ Habi }}</a>
    </div>
    <div class="共通能力4">
      <a v-if="props.race != '騎獣'" id="知名度" class="能力">知名度/弱点：{{ setData.pop }}/{{ setData.weakValue }}</a>
      <a id="弱点" class="能力">弱点：{{ setData.weak }}</a>
    </div>
    <div class="共通能力5">
      <a v-if="props.race != '騎獣'" id="先制値" class="能力">先制値：{{ setData.preem }}</a>
      <a id="移動速度" class="能力">移動速度：{{ setData.speed }}</a>
    </div>
    <div v-if="props.race != 'ファミリア' && race !== '騎獣'" class="共通能力6">
      <a id="生命抵抗力" class="能力">生命抵抗力：{{ setData.life }}({{ Number(setData.life) + 7 }})</a>
      <a id="精神抵抗力" class="能力">精神抵抗力：{{ setData.mind }}({{ Number(setData.mind) + 7 }})</a>
    </div>
  </div>
</template>

<style scoped>
#共通能力一覧 {
  font-family: 'Arial', sans-serif;
  margin: 20px;
}

.共通能力1,
.共通能力2,
.共通能力3,
.共通能力4,
.共通能力5,
.共通能力6 {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.能力 {
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  min-width: 100px;
}
</style>