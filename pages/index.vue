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
      <v-col class="d-flex" cols="6">
        <v-select
          :items="items"
          label="Air Port"
          solo
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="4">
        <v-btn color="primary" class="my-button">Go travel</v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    items: ['HND', 'ITM'],
  }),
});
</script>

<style lang="postcss" scoped>
.header{
  min-height: 300px;
}
.my-button{
  margin: 6px 0px;
}

</style>