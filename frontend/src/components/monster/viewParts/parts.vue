<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import PartComp from './partComp.vue';
import { globals } from '../../../const/globals';

// Propsの型定義
interface Props {
  parts: Array<monster.common.part | monster.ride.level>
  isRide: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (event: 'setLevel', lv: number): void
}>()

// コア部位の名前を保持するためのref
const isCore = ref<Array<string>>([])

// モンスターのレベルを管理するためのref
const levelArray = ref<Array<number>>([])
const ul = ref<number>(0)
const useLevel = ref<monster.ride.level | null>(null)

// コア部位をチェックする関数
function checkCoreParts(parts: Array<monster.common.part | monster.ride.part>) {
  isCore.value = parts.filter(part => part.core).map(part => part.name)
}

// パーツの初期化
function initializeParts() {
  if (props.isRide) {
    levelArray.value = (props.parts as Array<monster.ride.level>).map(level => level.lv)
    useLevel.value = (props.parts as Array<monster.ride.level>)[0]
    ul.value = (props.parts as Array<monster.ride.level>)[0].lv
    checkCoreParts(useLevel.value.parts)
  } else {
    checkCoreParts(props.parts as Array<monster.common.part>)
  }
}

// レベル変更時の処理
function changeLevel() {
  const levels = props.parts as Array<monster.ride.level>
  const selectedLevel = levels.find(level => level.lv === ul.value)
  if (selectedLevel) {
    useLevel.value = selectedLevel
    checkCoreParts(selectedLevel.parts)
    emit('setLevel', ul.value)
  }
}

// 初期化処理
onMounted(() => {
  initializeParts()
})

// レベルの監視
watch(ul, changeLevel)

</script>

<template>
  <div v-if="props.isRide">
    <v-select label="レベル" :items="levelArray" v-model="ul" width="100px" />
    <table>
      <tr>
        <td v-for="(_, index) in globals.rideHeads" :key="index">
          <PartComp v-if="useLevel" :data="useLevel.parts" :heads="globals.rideHeads[index]"
            :keys="globals.rideKeys[index]" />
        </td>
      </tr>
    </table>
  </div>
  <div v-else>
    <table>
      <tr>
        <td v-for="(_, index) in globals.commonHeads" :key="index">
          <PartComp :data="props.parts" :heads="globals.commonHeads[index]" :keys="globals.commonKeys[index]" />
        </td>
      </tr>
    </table>
  </div>
  <p> コア部位：
    <a v-if="isCore.length === 0">なし</a>
    <a v-else>{{ isCore.join('、') }}</a>
  </p>
</template>

<style scoped>
.部位テーブル {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
}

.部位テーブル td {
  padding: 10px;
  border: 1px solid #ddd;
}

.部位テーブル tr:nth-child(even) {
  background-color: #f9f9f9;
}

.部位テーブル tr:hover {
  background-color: #f1f1f1;
}

.部位テーブル th {
  padding: 12px;
  background-color: #f2f2f2;
  border-bottom: 2px solid #ddd;
  text-align: left;
}

p {
  font-family: 'Arial', sans-serif;
  font-size: 1em;
  color: #333;
}
</style>