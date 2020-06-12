<template>
  <v-layout
    column
    justify-center
    class="main"
  >
    <v-row
        justify="center"
        class="header"
        align-content="center"
    >
      <v-col class="d-flex" cols="12" sm="8" md="6" lg="6" >
        <v-select
          :items="items"
          item-text="label"
          item-value="value"
          v-model="originAirport"
          label="Air Port"
          solo
          return-object
        ></v-select>
        <v-btn color="primary" class="my-button" @click="changeOriginAirport" :click="changeOriginAirport">Go travel</v-btn>
      </v-col>
    </v-row>
    <div class="result">
      <transition-group name="item" tag="v-card">
        <v-card v-for="(r, i) in data"
          :key="r.flightNumbers"
          :color="getCardColor(i)"
          :dark="isDarkCard(i)" class="mx-auto card">
          <v-card-text>
            <div>ID.{{r.flightNumbers}}</div>
            <v-card-title
              class="headline">
              🛬   {{r.dest}}({{r.iata}})
            </v-card-title>
            <v-card-subtitle>
              出発時間:{{r.originTime}}
            </v-card-subtitle>
          </v-card-text>
        </v-card>
      </transition-group>
    </div>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import dataSet from '@/assets/data.json'
import currentSet from '@/assets/current.json'
import mappingSet from '@/assets/mapping.json'
import { isPast, isFuture, getDay, parse, sub } from 'date-fns'

interface StringKeyObject {
    [key: string]: string;
}

export default Vue.extend({
  data: function () {
    const iata2name: StringKeyObject = mappingSet
    const supportedAirports = ['HND','ITM','FUK','OKA']
    return {
      items: supportedAirports.map((iata: string) => {
        return { label: '🛫' + iata2name[iata]+' ('+iata+')', value: iata }
      }),
      originAirport: { label: iata2name['HND']+' (HND)', value: 'HND' },
      data: [] as Array<any>,
      dataLoaded: false,
      iata2name
    }
  },
  mounted: function (){},
  methods: {
    getIataCode: function (airport: string): string {
      return this.iata2name[airport.split(':').slice(-1)[0]]
    },
    getWeek: function (weekName: string): Date{
      return parse(weekName.split(':').slice(-1)[0], 'cccc', new Date())
    },
    isValidAirport: function (airport: string): boolean {
      return this.iata2name[airport.split(':').slice(-1)[0]] !== undefined
    },
    getCardColor(index: number): string{
      if(index === 0){
        return '#c62828';
      }else if(index === 1){
        return '#ff8f00';
      }else if(index === 2){
        return '#558b2f';
      }
      return '#fff';
    },
    isDarkCard(index: number): boolean{
      return index < 3;
    },
    changeOriginAirport: function () {
      var scs = this.getAirplainsFrom(this.originAirport.value);
      const newSchedules = this.shuffleSchedule(scs);
      this.data.splice(newSchedules.length)
      Array.prototype.forEach.call(newSchedules, (s: any,i: number) => {
        Vue.set(this.data, i, s)
      })
    },
    shuffleSchedule(schedules: any[]):any[] {
      // Ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      var currentIndex = schedules.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = schedules[currentIndex];
        schedules[currentIndex] = schedules[randomIndex];
        schedules[randomIndex] = temporaryValue;
      }
      return schedules;
    },
    getAirplainsFrom: function (iata: string):any[] {
      const now = Date.now();
      const destSet = new Set();
      return currentSet.filter((d: any):boolean => {
        const departureAirport: string = d['odpt:departureAirport']? d['odpt:departureAirport'] : undefined
        const flightStatus: string = d['odpt:flightStatus']? d['odpt:flightStatus'] : undefined
        const destination: string = d['odpt:destinationAirport']? d['odpt:destinationAirport'] : undefined
        if(departureAirport === undefined || destination === undefined || flightStatus === undefined){
          return false
        }
        if(destSet.has(d['odpt:destinationAirport'])){
          return false;
        }
        if((departureAirport === "odpt.Airport:"+iata &&
            this.isValidAirport(destination) &&
            flightStatus !== "odpt.FlightStatus:Cancelled") &&
            isFuture(
              sub(parse(d['odpt:scheduledDepartureTime'], 'kk:mm', new Date()), {minutes: 60})
            )){
          destSet.add(d['odpt:destinationAirport']);
          return true;
        }
        return false;
      }).map((d: any) => {
        return {
          dest: this.getIataCode(d['odpt:destinationAirport']),
          iata: d['odpt:destinationAirport'].split(':').slice(-1)[0],
          flightNumbers: d['odpt:flightNumber'][0],
          originTime: d['odpt:scheduledDepartureTime'],
        }
      });
    },
    getAirplainsScheduleFrom: function (iata: string):any[] {
      const now = Date.now();
      return dataSet.filter((d: any):boolean => {
        const origin: string = d['odpt:originAirport']? d['odpt:originAirport'] : undefined
        const destination: string = d['odpt:destinationAirport']? d['odpt:destinationAirport'] : undefined
        const calendar: string = d['odpt:calendar']? d['odpt:calendar'] : undefined
        if(origin === undefined || calendar === undefined || destination === undefined){
          return false
        }
        return (origin === "odpt.Airport:"+iata &&
            this.isValidAirport(destination) &&
            getDay(this.getWeek(calendar)) === getDay(now));
      }).flatMap((d: any) => {
        return d['odpt:flightScheduleObject'].filter((f: any) => {
          const from = Date.parse(f['odpt:isValidFrom'])
          const to = Date.parse(f['odpt:isValidTo'])
          return isPast(from) && isFuture(to) &&
            isFuture(
              sub(parse(f['odpt:originTime'], 'kk:mm', new Date()), {minutes: 60}));
        }).map((f: any) => {
          return {
            dest: this.getIataCode(d['odpt:destinationAirport']),
            iata: d['odpt:destinationAirport'].split(':').slice(-1)[0],
            flightNumbers: f['odpt:flightNumber'][0],
            originTime: f['odpt:originTime'],
            destTime: f['odpt:destinationTime']
          }
        })
      });
    }
  },
});

</script>

<style lang="postcss" scoped>
.main{
  background: linear-gradient(#b3e5fc, #0288d1);

  .header {
    min-height: 300px;
  }
  .my-button {
    margin: 6px 8px;
  }
  .card { 
    margin: 8px 0px; 
    width: 600px;
  }
  .item-enter-active {
    transition: all 2s;
  }
  .item-enter{
    opacity: 0;
    transform: translateY(30px);
  }
  .result {
    margin-bottom: 128px;
  }
  .theme--light.v-card {
    background-color: #0000;
    box-shadow: none;
  }
  .theme--light.v-sheet {
    background-color: #0000;
  }
}

</style>