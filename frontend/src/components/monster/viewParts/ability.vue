<script setup lang="ts">

interface Props {
  abilitys: any
}
const props = defineProps<Props>()
</script>

<template>
  <div id="特殊能力一覧">
    <hr>
    <h3>特殊能力 <a v-if="props.abilitys.max != undefined">最大値={{ props.abilitys.max }}</a></h3>
    <hr>
    <p v-if="props.abilitys.length == 0">なし</p>
    <div v-if="props.abilitys.max == undefined" v-for="abi in props.abilitys" class="特殊能力詳細 特殊能力">
      <a class="種別">{{ abi.kind.join(' ') }} {{ abi.name }}
        {{ abi.use }}</a>
      <p>{{ abi.explain }}</p>
    </div>
    <div v-else v-for="abi in props.abilitys.abilitys" class="特殊能力詳細 特殊能力">
      <a class="種別">
        <a v-if="abi.item != ''"><input type="checkbox" v-model="abi.using">{{ abi.item }} </a>{{ abi.kind.join('') }}
        {{ abi.name }}
        {{ abi.use }}</a>
      <p>{{ abi.explain }}</p>
      <br>
    </div>
  </div>
</template>

<style scoped>
#特殊能力一覧 {
  font-family: 'Arial', sans-serif;
  margin: 20px;
  width: 50em;
}

h3 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
}

hr {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
}

p {
  color: #555;
  line-height: 1.6;
}

.特殊能力詳細 {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.特殊能力 {
  display: flex;
  flex-direction: column;
}

.種別 {
  font-weight: bold;
  font-size: 1.2em;
  color: #555;
}

input[type="checkbox"] {
  margin-right: 5px;
}
</style>