<script setup lang="ts">
import top from './create/top.vue';
import parts from './create/parts.vue';
import commonStatus from './create/commonStatus.vue';
import familiaStatus from './create/familiaStatus.vue';
import ability from './create/ability.vue';
import booty from './create/booty.vue';
import explain from './create/explain.vue';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import golemStatus from './create/golemStatus.vue';
import rideBeastStatus from './create/rideBeastStatus.vue';
import rideBeastParts from './create/rideBeastParts.vue';
import golemAbility from './create/golemAbility.vue';

const router = useRouter()
const route = useRoute()
const topComp = ref<InstanceType<typeof top> | null>(null)
const topData = ref()
const tagData = ref()
const commonStatusComp = ref<InstanceType<typeof commonStatus> | null>(null)
const statusData = ref()
const golemStatusComp = ref<InstanceType<typeof golemStatus> | null>(null)
const familiaStatusComp = ref<InstanceType<typeof familiaStatus> | null>(null)
const rideBeastStatusComp = ref<InstanceType<typeof rideBeastStatus> | null>(null)
const partsComp = ref<InstanceType<typeof parts> | null>(null)
const ridePartsComp = ref<InstanceType<typeof rideBeastParts> | null>(null)
const partsData = ref()
const abilityComp = ref<InstanceType<typeof ability> | null>(null)
const golemAbilityComp = ref<InstanceType<typeof golemAbility> | null>(null)
const abilityData = ref()
const bootyComp = ref<InstanceType<typeof booty> | null>(null)
const bootyData = ref()
const explainComp = ref<InstanceType<typeof explain> | null>(null)
const explainData = ref()

const isRide = ref<boolean>(true)
const isGolem = ref<boolean>(true)
const isFamilia = ref<boolean>(true)
const isElse = ref<boolean>(true)
const isPartElse = ref<boolean>(true)
const isAbilityElse = ref<boolean>(true)
const isBootyElse = ref<boolean>(true)

const golemString: string = 'ゴーレム'
const familiaString: string = 'ファミリア'
const rideBeastString: string = '騎獣'

const usePath = ref<string>('create')
const btnStr = ref<string>('作成')
const counter = ref<number>(0)
async function saveData() {
  topData.value = topComp.value?.topData
  tagData.value = topComp.value?.tag
  if (topData.value.race == golemString) {
    statusData.value = golemStatusComp.value?.golemStatus
  } else if (topData.value.race == familiaString) {
    statusData.value = familiaStatusComp.value?.familiaStatus
  } else if (topData.value.race == rideBeastString) {
    statusData.value = rideBeastStatusComp.value?.rideBeastStatus
  } else {
    statusData.value = commonStatusComp.value?.commonStatus
  }

  if (topData.value.race == rideBeastString) {
    partsData.value = ridePartsComp.value?.rideBeastPartDatas
  } else {
    partsData.value = partsComp.value?.partDatas
  }

  if (topData.value.race == golemString) {
    abilityData.value = golemAbilityComp.value?.abiDatas
  } else {
    abilityData.value = abilityComp.value?.abiDatas
  }
  bootyData.value = bootyComp.value?.bootyDatas
  explainData.value = explainComp.value?.inputExp
  const datas = [
    JSON.stringify({ 'Top': topData.value }),
    JSON.stringify({ 'Status': statusData.value }),
    JSON.stringify({ 'Parts': partsData.value }),
    JSON.stringify({ 'Abilitys': abilityData.value }),
    JSON.stringify({ 'Bootys': bootyData.value }),
    JSON.stringify({ 'Explanation': explainData.value }),
    JSON.stringify({ 'Tags': tagData.value })
  ];
  new Promise<any>((resolve) => {
    if (typeof google != 'undefined') {
      if (usePath.value == 'edit') {
        const idPath = route.params.id
        google.script.run.withSuccessHandler((result) => {
          console.log(result);
          alert(`保存成功しました`)
          localStorage.setItem('isReload', 'true')
          router.push('/')
          resolve(result)
        }).withFailureHandler((error) => {
          console.log(error);
          alert(`保存に失敗しました　${error}`)
          resolve(error)
          // @ts-ignore
        }).doEditMonster(datas, idPath)
      } else {
        google.script.run.withSuccessHandler((result) => {
          resolve(result)
          alert(`保存成功しました`)
          localStorage.setItem('isReload', 'true')
          router.push('/')
        }).withFailureHandler((error) => {
          console.log(error);
          alert(`保存に失敗しました　${error}`)
          resolve(error)
        }).doSetMonster(datas)

      }
    } else {
      alert(`保存成功しました ローカル`)
      localStorage.setItem('isReload', 'true')
      console.log(datas);
      // router.push('/')
    }
  })
}

async function getData(id: string) {
  const lsValue = localStorage.getItem('monsterData')!
  const monsters: Array<monster.monster> = await JSON.parse(lsValue)
  const mons = await monsters.filter(function (item: any) {
    if (item.ID == Number(id)) {
      return true
    }
  })

  const monsterData = await mons[0]
  return monsterData
}

function setData() {

  const idPath = route.params.id
  const path = route.path
  if (path.includes('duplicate')) {
    usePath.value = 'duplicate'
  } else if (path.includes('edit')) {
    usePath.value = 'edit'
    btnStr.value = '編集'
  }

  if (idPath == undefined) {
    isRide.value = false
    isGolem.value = false
    isFamilia.value = false
    isElse.value = false
    isPartElse.value = false
    isBootyElse.value = false
    isAbilityElse.value = false
    return
  }
  getData(idPath.toString()).then((monsterData) => {
    if (monsterData.Top.race == rideBeastString) {
      isRide.value = true
      isGolem.value = false
      isFamilia.value = false
      isElse.value = false
      isPartElse.value = false
      isBootyElse.value = false
    } else if (monsterData.Top.race == golemString) {
      isRide.value = false
      isGolem.value = true
      isFamilia.value = false
      isElse.value = false
      isAbilityElse.value = false
    } else if (monsterData.Top.race == familiaString) {
      isRide.value = false
      isGolem.value = false
      isFamilia.value = true
      isElse.value = false
      isBootyElse.value = false
    } else {
      isRide.value = false
      isGolem.value = false
      isFamilia.value = false
    }
    // TOP
    topComp.value?.setTopData(monsterData.Top)
    // STATUS
    if (monsterData.Top.race == familiaString) {
      const st = monsterData.Status as monster.familia.status
      familiaStatusComp.value?.setfamiliaStatus(st)
    } else if (monsterData.Top.race == golemString) {
      const st = monsterData.Status as monster.golem.status
      golemStatusComp.value?.setgolemStatus(st)
    } else if (monsterData.Top.race == rideBeastString) {
      const st = monsterData.Status as monster.ride.status
      rideBeastStatusComp.value?.setrideBeastStatus(st)
    } else {
      const st = monsterData.Status as monster.common.status
      commonStatusComp.value?.setCommonStatus(st)
    }
    // PARTS
    if (monsterData.Top.race == rideBeastString) {
      const parts = monsterData.Parts as unknown as Array<monster.ride.level>
      ridePartsComp.value?.setRidePartDatas(parts)
    } else {
      const parts = monsterData.Parts as unknown as Array<monster.common.part>
      partsComp.value?.setPartDatas(parts)
    }
    // ABILITYS
    if (monsterData.Top.race == golemString) {
      const abi = monsterData.Abilitys as unknown as monster.golem.abilitys
      golemAbilityComp.value?.setAbiDatas(abi)
    } else {
      const abi = monsterData.Abilitys as unknown as Array<monster.common.ability>
      abilityComp.value?.setAbiDatas(abi)
    }
    // BOOTYS
    if (monsterData.Bootys != null && 'Bootys' in monsterData) {
      bootyComp.value?.setBootys(monsterData.Bootys)
    }
    // EXPLANATION
    explainComp.value?.setExplanations(monsterData.Explanation)
  })
}
(() => {
  setData()
})()

</script>

<template>
  <top ref="topComp" />
  <div>
    <div :key="counter">
      <golemStatus v-if="isGolem || topComp?.topData.race == golemString" ref="golemStatusComp" />
      <familiaStatus v-if="isFamilia || topComp?.topData.race == familiaString" ref="familiaStatusComp" />
      <rideBeastStatus v-if="isRide || topComp?.topData.race == rideBeastString" ref="rideBeastStatusComp" />
      <commonStatus
        v-if="isElse || !(topComp?.topData.race == golemString || topComp?.topData.race == familiaString || topComp?.topData.race == rideBeastString)"
        ref="commonStatusComp" />
    </div>
    <div>
      <rideBeastParts v-if="isRide || topComp?.topData.race == rideBeastString" ref="ridePartsComp" />
      <parts v-if="isPartElse || topComp?.topData.race != rideBeastString" ref="partsComp" />
    </div>
    <br>
    <hr>
    <div>
      <golemAbility v-if="isGolem || topComp?.topData.race == golemString" ref="golemAbilityComp" />
      <ability v-if="isAbilityElse || topComp?.topData.race != golemString" ref="abilityComp" />
    </div>
    <div v-if="isBootyElse || (topComp?.topData.race != rideBeastString && topComp?.topData.race != familiaString)">
      <br>
      <hr>
      <booty ref="bootyComp" />
    </div>
    <br>
    <explain ref="explainComp" />
  </div>
  <v-btn v-on:click="saveData()">{{ btnStr }}</v-btn>
</template>