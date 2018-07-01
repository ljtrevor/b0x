<template>
  <v-container>
    <v-card>
      <h3>Binding Page</h3>
      <v-btn v-on:click="increment()">Increment</v-btn>
      <v-btn v-on:click="decrement()">Decrement</v-btn>
      <!-- <v-btn v-on:click="getCount()">Get Manual Count</v-btn> -->
      <div>{{ counter }}</div>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        counter: -420
      }
    },

    computed: {
      ...mapGetters({
        storeGetMain: 'storeGetMain'
      }),
      
      getCount() {
        this.counter = this.storeGetMain
      },
    },

    methods: {
      ...mapMutations({
        storeIncrement: 'storeIncrement',
        storeDecrement: 'storeDecrement'
      }),
      increment() {
        this.storeIncrement()
      },
      decrement() {
        this.storeDecrement()
      }
    }
  }
</script>

<style>
</style>