<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  md: monster.monster
  lev?: string | null
}>()

const foundationText = ref<monster.foundation>({
  kind: 'character',
  data: {
    name: '',
    memo: '',
    status: [],
    params: [],
    active: true,
    secret: true,
    invisible: false,
    hideStatus: false,
    commands: ''
  },
})

// 型アノテーションを追加
const createLabel = (type: 'param' | 'status', name: string, value: any) => {
  if (type === 'param') {
    return { label: name, value: value }
  }
  return { label: name, value: value, max: value }
}

function paramCreate() {
  const { Status } = props.md;
  if (props.lev !== null && 'parts' in props.md.Parts) {
    // @ts-ignore
    parts = props.md.Parts[props.lev - props.md.Top.lv].parts
  }

  foundationText.value.data.name = props.md.Top.name;
  foundationText.value.data.params = [];
  if ('preem' in Status) {
    foundationText.value.data.params.push(createLabel('param', '先制値', Status.preem))
  }
  if ('pop' in Status) {
    foundationText.value.data.params.push(
      createLabel('param', '知名度', `${Status.pop}/${Status.weakValue}`)
    )
  }
  if ('life' in Status) {
    foundationText.value.data.params.push(...[
      createLabel('param', '生命抵抗', Status.life),
      createLabel('param', '精神抵抗', Status.mind)
    ])
  }
  foundationText.value.data.params.push(createLabel('param', '移動速度', Status.speed))
}
function partData() {
  const { Parts } = props.md

  if (props.lev !== null) {
    const levels: monster.ride.level[] = Parts as unknown as Array<monster.ride.level>;
    const parts = levels[Number(props.lev)! - props.md.Top.lv].parts;

    updateFoundationTextStatus(parts)
  } else {
    const parts = Parts as Array<monster.common.part>
    updateFoundationTextStatus(parts)
  }
}
function updateFoundationTextStatus(parts: Array<monster.common.part> | Array<monster.ride.part>) {
  foundationText.value.data.status = [];

  parts.forEach(part => {
    let partName = part.name;
    if (parts.length == 1) {
      partName = '';
    }
    foundationText.value.data.params.push(...[
      createLabel('param', partName + '命中力', part.hit),
      createLabel('param', partName + '打撃点', part.damage),
      createLabel('param', partName + '回避力', part.avoid),
      createLabel('param', partName + '防護点', part.protect),
    ])
    foundationText.value.data.status.push(...[
      createLabel('status', partName + 'HP', part.hp),
      createLabel('status', partName + 'MP', part.mp)
    ])
  });
  if ('lifeRes' in parts[0]) {
    foundationText.value.data.params.push(...[
      createLabel('param', '生命抵抗', String(parts[0].lifeRes)),
      createLabel('param', '精神抵抗', String(parts[0].mindRes)),
    ])
  }
}

function commandCreate() {
  const { Parts, Abilitys } = props.md
  let parts = null;

  if (props.lev !== null) {
    const levels = Parts as unknown as Array<monster.ride.level>;
    parts = levels[Number(props.lev)! - props.md.Top.lv].parts;
  } else if ('Parts' in props.md) {
    parts = props.md.Parts as Array<monster.common.part>
  }
  let fixedFlag = 1;
  const isFixeds = document.getElementsByName('fixedValue');
  for (let i = 0; i < isFixeds.length; i++) {
    const isF = isFixeds[i];
    // @ts-ignore
    if (isF.checked) {
      fixedFlag = Number(i) + 1;
      break;
    }
  }

  const partLength = parts?.length;
  let text = "＝＝＝＝＝ステータス＝＝＝＝＝\n";
  let partStatusText = "";
  let partButtleText = "";
  let partButtleCommandText = "";
  let partButtleCommandFixedText = "";
  parts?.forEach(part => {
    let partName = part.name;
    if (partLength == 1) {
      partName = '';
    }
    partStatusText += `{${partName}HP} 【${partName}HP】\n{${partName}MP} 【${partName}MP】\n`;
    partButtleText += `{${partName}命中力} 【${partName}命中力】\n{${partName}打撃点} 【${partName}打撃点】\n{${partName}回避力} 【${partName}回避力】\n{${partName}防護点} 【${partName}防護点】\n`;
    partButtleCommandText += `＝＝＝＝＝${partName}判定＝＝＝＝＝\n` + `2d6+{${partName}命中力} 命中力\n2d6+{${partName}打撃点} ${partName}攻撃\n2d6+{${partName}回避力} 回避力\n`;
    partButtleCommandFixedText += `＝＝＝＝＝${partName}判定（固定値）＝＝＝＝＝ \n` + `c(7+{${partName}命中力}) 命中力\nc(7+{${partName}打撃点}) ${partName}攻撃\nc(7+{${partName}回避力}) 回避力\n`;
  });

  text += partStatusText;
  text += `＝＝＝＝＝パラメータ＝＝＝＝＝\n{先制値} 【先制値】\n{知名度}【知名度/弱点】\n{移動速度} 【移動1/移動2】\n{生命抵抗} 【生命抵抗力】\n{精神抵抗} 【精神抵抗力】\n`;
  text += partButtleText;
  if (fixedFlag == 2 || fixedFlag == 3) {
    text += `＝＝＝＝＝抵抗判定＝＝＝＝＝ \n2d6+{生命抵抗} 生命抵抗力 \n2d6+{精神抵抗} 精神抵抗力 \n`;
  }
  if (fixedFlag == 1 || fixedFlag == 3) {
    text += `＝＝＝＝＝抵抗判定（固定値）＝＝＝＝＝ \nc(7+{生命抵抗}) 生命抵抗力 \nc(7+{精神抵抗}) 精神抵抗力 \n`;
  }
  if (fixedFlag == 2 || fixedFlag == 3) {
    text += `＝＝＝＝＝部位判定＝＝＝＝＝ \n` + partButtleCommandText;
  }
  if (fixedFlag == 1 || fixedFlag == 3) {
    text += `＝＝＝＝＝部位判定（固定値）＝＝＝＝＝ \n` + partButtleCommandFixedText;
  }
  text += `\n＝＝＝＝＝特殊能力＝＝＝＝＝ \n`;
  let abis = null
  if ('max' in Abilitys) {
    abis = Abilitys.abilitys
  } else {
    abis = Abilitys as Array<monster.golem.ability>
  }
  abis?.forEach(ability => {
    if (ability.item != undefined && ability.item != '' && !ability.using) {
      return
    }
    text += `${ability.kind.join('')}${ability.name}${ability.use}|${ability.explain}\n`;
  });
  foundationText.value.data.commands = text;
}

function copyButton() {
  paramCreate();
  partData();
  commandCreate();
  const message = document.getElementById('message')!;

  const messageActive = function () {
    message.classList.add('is-active');
    setTimeout(() => {
      message.classList.remove('is-active');
    }, 1600);
  }

  const json = JSON.stringify(foundationText.value);
  const value = json;

  if (navigator.clipboard) {
    return navigator.clipboard.writeText(value).then(() => {
      messageActive();
    });
  } else {
    messageActive();
  }
}
</script>

<template>
  <input id="tagText" type="text" value hidden readonly />
  <div id="dice">
    <fieldset>
      <input type="radio" name="fixedValue" id="fixedValue" value="1" checked />
      <label for="fixedValue">固定値で振る</label>
      <input type="radio" name="fixedValue" id="diceValue" value="2" />
      <label for="diceValue">ダイスで振る</label>
      <input type="radio" name="fixedValue" id="bothValue" value="3" />
      <label for="bothValue">両方</label>
    </fieldset>
  </div>
  <v-btn id="copyButton" @click="copyButton">ココフォリア駒作成</v-btn>
  <p id="message">クリップボードにコピーしました！</p>
</template>


<style scoped>
#message {
  opacity: 0;
  margin-top: 10px;
  color: #4CAF50;
  font-weight: bold;

  &.is-active {
    opacity: 1;
  }
}

div {
  font-family: 'Arial', sans-serif;
}

#dice {
  /* margin: 20px 0; */
  width: 23em;
}

fieldset {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
}

input[type="radio"] {
  margin-right: 5px;
}

label {
  margin-right: 20px;
}

#copyButton {
  background-color: #4CAF50;
  color: white;
  /* margin-top: 20px; */
}
</style>
