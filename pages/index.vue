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
  data: () => {
    const iata2name = {
      "HND":"羽田空港",
      "NRT":"成田空港",
      "KIX":"関西空港",
      "FUK":"福岡空港",
      "CTS":"新千歳空港",
      "ITM":"伊丹空港",
      "NGO":"名古屋/中部空港",
      "KOJ":"鹿児島空港",
      "OKA":"那覇空港",
      "UKB":"神戸空港",
      "KMQ":"小松空港",
      "SDJ":"仙台空港",
      "TTJ":"鳥取空港",
      "KCZ":"高知空港",
      "TAK":"高松空港",
      "FSZ":"静岡空港",
      "AOJ":"青森空港",
      "OKI":"隠岐の島空港",
      "NGS":"長崎空港",
      "KUH":"釧路空港",
      "IBR":"茨城空港",
      "HNA":"花巻空港",
      "NTQ":"穴水空港",
      "MBE":"紋別空港",
      "YGJ":"米子空港",
      "TNE":"種子島空港",
      "WKJ":"稚内空港",
      "AXT":"秋田空港",
      "FUJ":"福江島空港",
      "FKS":"福島空港",
      "IWJ":"石見空港",
      "KMJ":"熊本空港",
      "OKE":"沖永良部空港",
      "MMJ":"松本空港",
      "MYJ":"松山空港",
      "AKJ":"旭川空港",
      "ISG":"石垣島空港",
      "KIJ":"新潟空港",
      "TKS":"徳島空港",
      "TKN":"徳之島空港",
      "SYO":"庄内空港",
      "HIJ":"広島空港",
      "OBO":"帯広空港",
      "IWK":"岩国空港",
      "OKJ":"岡山空港",
      "GAJ":"山形空港",
      "UBJ":"山口宇部空港",
      "KUM":"屋久島空港",
      "NKM":"名古屋/小牧空港",
      "TSJ":"対馬市空港",
      "TOY":"富山空港",
      "KMI":"宮崎空港",
      "MMY":"宮古島空港",
      "MMB":"女満別/網走空港",
      "OIR":"奥尻町空港",
      "ASJ":"奄美大島空港",
      "AXJ":"天草空港",
      "ONJ":"大館能代空港",
      "OIT":"大分空港",
      "TRA":"多良間島空港",
      "IKI":"壱岐市空港",
      "KKX":"喜界空港",
      "SHM":"白浜町空港",
      "MMD":"南大東空港",
      "KTD":"北大東空港",
      "KKJ":"北九州空港",
      "RIS":"利尻富士町空港",
      "HKD":"函館空港",
      "IZO":"出雲空港",
      "HAC":"八丈町空港",
      "HSG":"佐賀空港",
      "TJH":"豊岡市空港",
      "UEO":"久米島空港",
      "SHB":"中標津町空港",
      "OKD":"札幌/丘珠空港",
      "OGN":"与那国空港",
      "RNJ":"与論空港",
      "SHI":"下地島空港",
      "MSJ":"三沢空港",
      "FKJ":"福井市空港",
      "RBJ":"礼文町空港",
      "OIM":"大島町空港",
      "SDS":"佐渡市空港",
      "MYE":"三宅村空港"
    }
    return {
      items: ['HND'],
      results: 
        dataSet.filter((d: any) => {
          return d['odpt:originAirport'] === "odpt.Airport:HND" &&
            d['odpt:destinationAirport'].split(':').slice(-1)[0] in iata2name
        }).flatMap((d: any) => {
          return {
            dest: iata2name[d['odpt:destinationAirport'].split(':').slice(-1)[0]],
            iata: d['odpt:destinationAirport'].split(':').slice(-1)[0],
            flightNumbers: ["NH058"],
            originTime: '11:30',
            destTime: '13:05'
          }
        })
      }
  },
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