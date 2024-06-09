import { ref } from "vue";

export function sliceArrayLang(num: number, lans: Array<string>) {
  const toLans = ref<Array<Array<string>>>([]);
  const length = Math.ceil(lans.length / num);
  for (let i = 0; i < length; i++) {
    toLans.value.push(lans.slice(i * num, (i + 1) * num));
  }
  return toLans;
}
