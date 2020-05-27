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
        <v-card v-for="(r, i) in results" :key="r.flightNumbers[0]" class="mx-auto card">
          <v-card-text>
            <div>No.{{i}}</div>
            <p class="display-1 text--primary">
              to {{r.dest}}({{r.iata}})
            </p>
            <p>NH058</p>
            <div class="text--primary">
              flightNumber: NH058<br>
              originTime:11:30 -> destinationTime:13:05
            </div>
          </v-card-text>
        </v-card>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import dataSet from '@/assets/data.json'

export default Vue.extend({
  data: () => ({
    items: ['HND', 'ITM'],
    results: 
      dataSet.filter((d: any) => {
        return d['odpt:originAirport'] === "odpt.Airport:HND"
      }).map((d: any) => {
        return {
          dest: "羽田空港",
          iata: d['odpt:destinationAirport'].split(':').slice(-1)[0],
          flightNumbers: ["NH058"],
          originTime: '11:30',
          destTime: '13:05'
        }
      })
  }),
  mounted:()=>{
    console.log(dataSet.filter((d: any) => {
      return d['odpt:originAirport'] === "odpt.Airport:HND"
    }))
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