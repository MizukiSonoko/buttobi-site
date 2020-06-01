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
          label="Air Port"
          solo
        ></v-select>
        <v-btn color="primary" class="my-button">Go travel</v-btn>
      </v-col>
    </v-row>
        <v-card v-for="(r, i) in data" :key="r.flightNumbers" class="mx-auto card">
          <v-card-text>
            <div>No.{{i}}</div>
            <p class="display-1 text--primary">
              to {{r.dest}}({{r.iata}})
            </p>
            <p>NH058</p>
            <div class="text--primary">
              flightNumber: {{r.flightNumbers}}<br>
              originTime:{{r.originTime}} -> destinationTime:{{r.destTime}}
            </div>
          </v-card-text>
        </v-card>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import dataSet from '@/assets/data.json'
import mappingSet from '@/assets/mapping.json'
import { isBefore, isAfter } from 'date-fns'

interface StringKeyObject {
    [key: string]: string;
}

export default Vue.extend({
  data: () => {
    const iata2name: StringKeyObject = mappingSet
    return {
      items: ['HND'],
      data: [],
      dataLoaded: false,
      iata2name
    }
  },
  mounted:()=>{
    console.log(dataSet.filter((d: any) => {
      return d['odpt:originAirport'] === "odpt.Airport:HND"
    }))
  },
  methods: {
    getIataCode: function (airport: string): string {
      return this.iata2name[airport.split(':').slice(-1)[0]]
    },
    isValidAirport: function (airport: string): boolean {
      return this.iata2name[airport.split(':').slice(-1)[0]] !== undefined
    }
  },
  created() {
    const now = Date.now();
    try {
      this.data = dataSet.filter((d: any) => {
          return d['odpt:originAirport'] === "odpt.Airport:HND" && this.isValidAirport(d['odpt:destinationAirport'])
        }).flatMap((d: any) => {
          return d['odpt:flightScheduleObject'].filter((f: any) => {
            const from = Date.parse(f['odpt:isValidFrom'])
            const to = Date.parse(f['odpt:isValidTo'])
            return isAfter(now, from) && isBefore(now, to)
          }).map((f: any) => {
            return {
              dest: this.getIataCode(d['odpt:destinationAirport']),
              iata: d['odpt:destinationAirport'].split(':').slice(-1)[0],
              flightNumbers: f['odpt:flightNumber'][0],
              originTime: f['odpt:originTime'],
              destTime: f['odpt:destinationTime']
            }
          })
        })
      this.dataLoaded = true
    } finally {
    }
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