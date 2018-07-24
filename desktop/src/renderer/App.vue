<template>
  <div>
    <v-app dark id="home">
      <h4>Hello, This is the home page</h4>
      <v-btn v-on:click="page.bindings=true">Bindings</v-btn>
      <v-btn v-on:click="doStuff()">Read</v-btn>
      <bindings v-if="page.bindings"></bindings>
    </v-app>
  </div>
</template>

<script>
  import Bindings from './components/Bindings.vue'
  import * as SerialPort from 'serialport'
  // var fs = require('fs');
  var cp = require('child_process');

  export default {
    name: 'b0x_home',
    components: {
      'bindings': Bindings
    },
    data () {
      return {
        page: {
          bindings: false
        },
        repeat: undefined
      }
    },
    computed: {

    },
    methods: {
      doStuff () {
        var cprocess = cp.spawn('./cppFiles/helloWorld.exe');

      // fs.readFile('inputfilename',function (err, data){
      //   if(err) throw err;

      //   //redirect standard input from inputfile
      //   cprocess.stdin.write(data);

      //   //end of standard input
      //   cprocess.stdin.end(function(){
      //       console.log('end of stdin');
      //   });

      //   //listen on your cprocess closing 
      //   cprocess.on('close',function (code){
      //       console.log('ps process exited with code ' + code);
      //     });
      //   });
        // var sp = new SerialPort('COM3')
        // console.log(sp)
        // console.log(sp.read())
        // setInterval(function () {
        //   console.log(sp.read())
        // }, 1000)

      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>
