<template>
  <v-layout
    column
    justify-center
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
        <v-card v-for="(r, i) in data" :key="r.flightNumbers" :color="getCardColor(i)" :dark="isDarkCard(i)" class="mx-auto card">
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
        return '#952175';
      }else if(index === 1){
        return '#1F7087';
      }else if(index === 2){
        return '#385F73';
      }
      return '#fff';
    },
    isDarkCard(index: number): boolean{
      return index < 3;
    },
    changeOriginAirport: function () {
      var scs = this.getAirplainsFrom(this.originAirport.value);
      const newSchedules = this.shuffleSchedule(scs);
      console.log(newSchedules);
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
      return currentSet.filter((d: any):boolean => {
        const departureAirport: string = d['odpt:departureAirport']? d['odpt:departureAirport'] : undefined
        const flightStatus: string = d['odpt:flightStatus']? d['odpt:flightStatus'] : undefined
        const destination: string = d['odpt:destinationAirport']? d['odpt:destinationAirport'] : undefined
        if(departureAirport === undefined || destination === undefined || flightStatus === undefined){
          return false
        }
        return (departureAirport === "odpt.Airport:"+iata &&
            this.isValidAirport(destination) &&
            flightStatus !== "odpt.FlightStatus:Cancelled") &&
            isFuture(
              sub(parse(d['odpt:scheduledDepartureTime'], 'kk:mm', new Date()), {minutes: 60})
            );
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
  created() {
    const now = Date.now();
    this.data = this.getAirplainsFrom('HND');
    this.dataLoaded = true

    console.log(currentSet)
  }  
});

  /*
0:
  @context: "http://vocab.odpt.org/context_odpt.jsonld"
  @id: "urn:ucode:_00001C000000000000010000032896D4"
  @type: "odpt:FlightSchedule"
  dc:date: "2020-05-21T17:00:00+09:00"
  odpt:calendar: "odpt.Calendar:Sunday"
  odpt:destinationAirport: "odpt.Airport:ISG"
  odpt:flightScheduleObject: [
    0: { 
      odpt:aircraftType: "772"
      odpt:airline: "odpt.Operator:ANA"
      odpt:destinationTime: "09:10"
      odpt:flightNumber: ["NH089"]
      odpt:isValidFrom: "2020-05-01T00:00:00+09:00"
      odpt:isValidTo: "2020-05-09T23:59:59+09:00"
      odpt:originTime: "06:10"
    }
    1: {
      odpt:aircraftType: "321"
      odpt:airline: "odpt.Operator:ANA"
      odpt:destinationTime: "09:20"
      odpt:flightNumber: ["NH089"]
      odpt:isValidFrom: "2020-05-10T00:00:00+09:00"
      odpt:isValidTo: "2020-05-31T23:59:59+09:00"
      odpt:originTime: "06:10"
    }
    2: {odpt:airline: "odpt.Operator:ANA", odpt:isValidTo: "2020-06-30T23:59:59+09:00", odpt:originTime: "06:15", odpt:isValidFrom: "2020-06-01T00:00:00+09:00", odpt:aircraftType: "763", …}
    3: {odpt:airline: "odpt.Operator:ANA", odpt:isValidTo: "2020-05-31T23:59:59+09:00", odpt:originTime: "11:25", odpt:isValidFrom: "2020-05-01T00:00:00+09:00", odpt:aircraftType: "788/772", …}
    4: {odpt:airline: "odpt.Operator:ANA", odpt:isValidTo: "2020-06-30T23:59:59+09:00", odpt:originTime: "11:25", odpt:isValidFrom: "2020-06-01T00:00:00+09:00", odpt:aircraftType: "321", …}
  ]
  odpt:operator: "odpt.Operator:ANA"
  odpt:originAirport: "odpt.Airport:HND"
  owl:sameAs: "odpt.FlightSchedule:ANA.HND.ISG.Sunday"
  */
</script>

<style lang="postcss" scoped>
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

</style>