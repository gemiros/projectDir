<script setup lang="ts">
import { ref } from 'vue';

const inputExp = ref('')
function setExplanations(exp: string) {
  inputExp.value = exp
}

defineExpose({
  inputExp,
  setExplanations
})
</script>

<template>
  <div id="解説">
    <hr>
    <h3>解説</h3>
    <hr>
    <!-- <textarea style="height: 1em;width: 50em;" id="解説本文" class="getValue" v-model="inputExp"
      ref="expTextArea"></textarea> -->
    <v-textarea style="width: 50em; resize: none;" id="解説本文" class="getValue" v-model="inputExp" rows="1"
      auto-grow></v-textarea>
  </div>
</template>