<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  heads: Array<string>,
  keys: Array<string>,
  data: Array<any>
}
const props = defineProps<Props>()
interface sc {
  start: Array<string>,
  middle: Array<string>,
  end: Array<string>
}
const sortClass = ref<sc>({
  start: [],
  middle: [],
  end: []
})
function sort(oriArray: Array<string>) {
  sortClass.value = {
    start: [],
    middle: [],
    end: []
  }
  oriArray.forEach((cl, index) => {
    if (index == 0) {
      sortClass.value.start.push(cl)
    } else if (index == oriArray.length - 1) {
      sortClass.value.end.push(cl)
    } else {
      sortClass.value.middle.push(cl)
    }
  });
}
onMounted(() => {
  sort(props.heads)
})
</script>
<template>
  <table class="部位">
    <thead id="部位ヘッダー">
      <th v-for="c in sortClass.start" class="部位左外">{{ c }}</th>
      <th v-for="c in sortClass.middle" class="部位中">{{ c }}</th>
      <th v-for="c in sortClass.end" class="部位右外">{{ c }}</th>
    </thead>
    <tbody>
      <tr v-for="part in props.data" class="各種部位">
        <td v-for="key in props.keys">
          <a v-if="key == 'core'">
            <a v-if="part[key]">コア</a>
          </a>
          <a v-else>
            {{ part[key] }}</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.部位 {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Arial', sans-serif;
}

#部位ヘッダー {
  background-color: #f2f2f2;
  border-bottom: 2px solid #ddd;
}

#部位ヘッダー th {
  padding: 10px;
  text-align: left;
  border-right: 1px solid #ddd;
}

#部位ヘッダー th:last-child {
  border-right: none;
}

.各種部位 {
  border-bottom: 1px solid #ddd;
}

.各種部位 td {
  padding: 8px;
  border-right: 1px solid #ddd;
}

.各種部位 td:last-child {
  border-right: none;
}
</style>