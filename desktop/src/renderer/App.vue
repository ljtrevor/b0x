<template>
  <v-app dark id="home">
    <v-toolbar>
      <v-toolbar-title>
        <h1>b0x</h1>
      </v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <!-- <v-btn icon flat @click="minimize"><v-icon>minimize</v-icon></v-btn>
      <v-btn icon flat @click="maximize"><v-icon>maximize</v-icon></v-btn>
      <v-btn icon flat @click="close"><v-icon>close</v-icon></v-btn> -->
    </v-toolbar>
    <BOXBOYS v-if="boxBoys.show"></BOXBOYS>
    <BINDINGS v-if="bindings.show"></BINDINGS>
  </v-app>
</template>

<script>
  import Bindings from './components/Bindings.vue'
  import BoxBoys from './components/BoxBoys.vue'

  export default {
    components: {
      'BINDINGS': Bindings,
      'BOXBOYS': BoxBoys,
    },
    data () {
      return {
        bindings: {
          show: true,
        },
        boxBoys: {
          show: true,
        },
      }
    },
    computed: {

    },
    methods: {
      minimize () {
        this.window.minimize()
        console.log('to be implemented')
      },
      maximize () {
        this.$
        console.log('to be implemented')
      },
      close () {
        console.log('to be implemented')
      }
    },
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>
