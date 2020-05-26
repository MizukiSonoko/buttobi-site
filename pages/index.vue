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
export default Vue.extend({
  data: () => ({
    items: ['HND', 'ITM'],
    results: [
      {
        dest: "羽田空港",
        iata: "HND",
        flightNumbers: ["NH058"],
        originTime: '11:30',
        destTime: '13:05'
      }
    ]
  }),
});
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