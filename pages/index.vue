<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
        <v-col cols="12">
          <v-row
            :align="alignment"
            :justify="justify"
          >
            <v-text-field :rules="rules"></v-text-field>
            <v-btn color="primary" class="my-button">Go travel</v-btn>
          </v-row>
        </v-col>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    rules: [
      (value: string) => !!value || 'Required.',
      (value: string) => {
        const supported: Array<String> = ["HND"]
        return supported.includes(value) || '('+value+')対応していない空港です'
      },
    ],
  }),
});
</script>

<style lang="postcss" scoped>
.my-button{
}
</style>