<template>
  <v-container app fluid>
    <v-card>
      <v-card-title>
        <h3>Connection</h3>
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" @click="closeB0x">Disconnect</v-btn>
        <v-text-field v-model="b0x.port" label="b0x Port"></v-text-field>
        <v-btn color="primary"  @click="connectToB0x">Connect</v-btn>
      </v-card-actions>
      <v-card-text>
        <v-layout>
          <v-flex xs12 sm6 md4 lg3 xl2>
            <h4>Status:</h4>
              <div v-if="b0x.status===2">
                <v-icon color="active">brightness_1</v-icon>
                Connected
              </div>
              <div v-if="b0x.status===1">
                <v-icon color="sleep">brightness_1</v-icon>
                Sleeping
              </div>
              <div v-if="b0x.status===0">
                <v-icon color="inactive">brightness_1</v-icon>
                Disconnected
              </div>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3 xl2>
            <h4>Packet Count:</h4>
            {{ b0x.packetCount }}
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import * as SerialPort from 'serialport'
  // var fs = require('fs');
  var cp = require('child_process');

  export default {
    components: {
    },
    data () {
      return {
        b0x: {
          port: 'COM3',
          status: 0,
          sleepTimer: undefined,
          inactiveTimer: undefined,
          packetCount: 0,
          input: '',
          sync: false,
          uid: 0,
        },
        connection: undefined
      }
    },
    mounted () {
      this.updateLocalData()
      // this.connectToB0x()
    },
    computed: {
      ...mapGetters({
        storeGetB0xStatus: 'storeGetB0xStatus',
        storeGetDevices: 'storeGetDevices',
        storeGetProfiles: 'storeGetProfiles',
        storeGetSettings: 'storeGetSettings',
        storeGetSelectedProfile: 'storeGetSelectedProfile',
      }),
    },
    methods: {
      ...mapMutations({
        storeDevice: 'storeDevice',
      }),

      resetStatusTimers() {
        var _this = this
        clearTimeout(this.b0x.sleepTimer)
        clearTimeout(this.b0x.inactiveTimer)
        this.b0x.sleepTimer = setTimeout(function () {
          _this.b0x.status = 1
        }, 5000)
        this.b0x.inactiveTimer = setTimeout(function () {
          _this.b0x.status = 0
        }, 10000)
      },
      
      updateLocalData () {
        this.b0xStatus = this.storeGetB0xStatus
      },

      connectToB0x () {
        const SerialPort = require('serialport')
        const Readline = require('@serialport/parser-readline')
        this.connection = new SerialPort('COM3', {
          baudRate: 115200,
        })
        const parser = this.connection.pipe(new Readline({ delimiter: '\r\n' }))
        parser.on('data', this.handleData)
      },

      handleData (data) {
        this.b0x.status = 2
        this.b0x.packetCount++
        this.resetStatusTimers()

        if (data.trim() === '$') {
          this.b0x.input = ''
          this.b0x.uid = 0
          this.b0x.sync = true
          return
        }
        if (this.b0x.sync) {
          var payload = {}
          payload.id = this.b0x.uid
          payload.value = data * 1
          this.storeDevice(payload)

          var devices = this.storeGetDevices
          var profile = this.storeGetProfiles
          var settings = this.storeGetSettings

          var curDev = {}
          // console.log(this.b0x.uid)
          curDev = devices[this.b0x.uid]
          if (curDev.type === 'Button') {
            if (curDev.value * 1 === 1 && curDev.oldValue * 1 === 0) {
              var selectedProfile = this.storeGetSelectedProfile
              var bindingType = profile[selectedProfile][this.b0x.uid].bindingType
              var binding = profile[selectedProfile][this.b0x.uid].binding
              var script = settings[devices[this.b0x.uid].type][bindingType][binding].script
              console.log('***************** Executing Script')
              console.log(script)
              var cpprocess = cp.spawn('./cppFiles/' + script)
            }
          } else if (curDev.type === 'Slider' || curDev.type === 'Dial') {
            if (curDev.value * 1 !== curDev.oldValue * 1) {
              // var oldV = curDev.oldValue * 100 / 255
              // var newV = curDev.newValue * 100 / 255
              // console.log('EXECUTING BINDING')
            }
          }
          this.b0x.uid++
        }
      },

      closeB0x() {
        this.connection.close()
      },
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>