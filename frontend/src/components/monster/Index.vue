<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
// @ts-ignore
import dummyData from '@/csv/dummyData.csv';
// @ts-ignore
import race from '@/csv/race.csv'

let dummy: Array<any> = []
let monsterKind: Array<string> = []
interface RaceMons {
  race: string,
  main: Array<any>,
  boss: Array<any>,
  origin: Array<any>
}
const RaceMonss = ref<Array<RaceMons>>([])
const compKey = ref(0)

function getData() {
  return new Promise((resolve) => {
    if (typeof google != 'undefined') {
      google.script.run
        .withSuccessHandler((result) => {
          resolve(result)
        }).withFailureHandler((error) => {
          resolve(error)
        }).doGetAllTmp();
    } else {
      dummy = []
      fetch(dummyData)
        .then(res => res.text())
        .then(dummyData => {
          let datas = dummyData.split(/\r\n/g)
          datas.forEach(data => {
            let dd = data.replace(/""/g, '___')
            dd = dd.replace(/"/g, "'")
            dd = dd.replace(/___/g, '"')
            dd = dd.replace(/','/g, "'',''")
            let ddA = dd.split("','")
            ddA.forEach((m, index) => {
              ddA[index] = m.replace(/'/g, "")
            });
            dummy.push(ddA)
          });
        }).then(() => {
          resolve(dummy)
        })
    }
  })
}
async function tmps() {
  const datas = await getData()

  let ar: Array<any> = []

  // @ts-ignore
  datas.forEach((ss, index) => {
    const t = JSON.parse(ss[0])
    const s = JSON.parse(ss[1])
    const p = JSON.parse(ss[2])
    const a = JSON.parse(ss[3])
    const b = JSON.parse(ss[4])
    const e = JSON.parse(ss[5])
    const ts = JSON.parse(ss[6])
    ar.push({
      ID: index,
      Top: t.Top,
      Status: s.Status,
      Parts: p.Parts,
      Abilitys: a.Abilitys,
      Bootys: b.Bootys,
      Explanation: e.Explanation,
      Tags: ts.Tags
    })
  });
  return ar
}

async function toMonster() {
  let ms: Array<any> = await tmps()
  localStorage.setItem('monsterData', JSON.stringify(ms))
  const ss = ms.sort((a, b) => {
    if (a.Top.name > b.Top.name) {
      return 1
    } else {
      return -1
    }
  })
  const lm = ss.sort((a, b) => a.Top.lv - b.Top.lv)
  return lm
}
async function classting(datas: Array<any>) {
  await getRace()
  RaceMonss.value = []
  monsterKind.forEach(kind => {
    let rm: RaceMons = {
      race: kind,
      main: [],
      boss: [],
      origin: []
    }
    datas.forEach(monster => {
      if (kind == monster.Top.race) {
        if (monster.Tags.indexOf('main') + 1) {
          rm.main.push(monster)
        }
        if (monster.Tags.indexOf('boss') + 1) {
          rm.boss.push(monster)
        }
        if (monster.Tags.indexOf('original') + 1) {
          rm.origin.push(monster)
        }
      }
    });
    RaceMonss.value.push(rm)
  });
}
async function setData() {
  let before = await localStorage.getItem('before')
  let isReload = await localStorage.getItem('isReload')
  let now = new Date()
  let comDate = now.getTime() - 600000
  let sortedData = []
  if (isReload == 'true' || comDate > Number(before)) {
    console.log('reload');
    sortedData = await toMonster()
    localStorage.setItem('before', String(now.getTime()))
    localStorage.setItem('isReload', 'false')
  } else {
    console.log('not reload');
    let dd = localStorage.getItem('monsterData')!
    const ddd: Array<any> = JSON.parse(dd)
    // @ts-ignore
    const ss = ddd.sort((a, b) => {
      if (a.Top.name > b.Top.name) {
        return
      } else {
        return -1
      }
    })
    sortedData = ss.sort((a, b) => a.Top.lv - b.Top.lv)
  }
  await classting(sortedData)
}
async function reloadData() {
  let now = new Date()
  await localStorage.setItem('before', String(now.getTime()))
  await localStorage.setItem('isReload', 'true')
  setData()
  compKey.value++
}

function getRace() {
  return new Promise((resolve) => {
    fetch(race)
      .then(res => res.text())
      .then(race => {
        let datas = race.split(/,/g)
        monsterKind = datas
      }).then(() => resolve(''))
  })
}
onMounted(() => {
  setData()
  compKey.value++
})
</script>

<template>
  <div id="app">
    <div id="カテゴリー">
      <v-btn class="btn" v-on:click="reloadData()" value="リロード">リロード</v-btn>
      <v-btn class="btn" value="作成" id="作成" v-on:click="() => { $router.push(`/monster/create`) }">作成</v-btn>
      <RouterLink to="/monster/preview/0"></RouterLink>
    </div>
    <div class="カテゴリー" v-for="(racesMonss) in RaceMonss">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <h1>{{ racesMonss.race }}</h1>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-bind:id="racesMonss.race">
              <a v-for="mon in racesMonss.main">
                <RouterLink :to="{ name: 'monsterPreview', params: { id: mon.ID } }">
                  <a class="モンスター">
                    Lv.{{ mon.Top.lv }} {{ mon.Top.name }}
                  </a>
                </RouterLink>
              </a>
              <hr>
              <div v-if="racesMonss.boss.length != 0">
                <h5>ボス級</h5>
                <a v-for="boss in racesMonss.boss">
                  <RouterLink :to="{ name: 'monsterPreview', params: { id: boss.ID } }">
                    <a class="モンスター">
                      Lv.{{ boss.Top.lv }} {{ boss.Top.name }}
                    </a>
                  </RouterLink>
                </a>
                <hr>
              </div>
              <div v-if="racesMonss.origin.length != 0">
                <h5>オリジナル</h5>
                <a v-for="ori in racesMonss.origin">
                  <RouterLink :to="{ name: 'monsterPreview', params: { id: ori.ID } }">
                    <a class="モンスター">Lv.{{ ori.Top.lv }} {{ ori.Top.name }}</a>
                  </RouterLink>
                </a>
                <hr>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <br>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  margin: 20px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  margin: 5px;
}

.btn:hover {
  background-color: #45a049;
}

.race-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.sub-title {
  color: #666;
  font-size: 18px;
  margin-top: 20px;
}

.モンスター {
  display: block;
  color: #2196F3;
  text-decoration: none;
  margin: 5px 0;
}

.モンスター:hover {
  text-decoration: underline;
  color: #0b7dda;
}

hr {
  border: 1px solid #ccc;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>