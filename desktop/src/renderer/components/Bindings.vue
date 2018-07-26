<template>
  <v-container>
    <v-card>
      <h3>Binding Page</h3>
      <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
        <v-select
          v-if="profiles"
          :items="Object.keys(profiles)"
          label="Profile"
          v-model="selectedProfile"
        ></v-select>
      </v-flex>
      <v-btn @click="newProfileDialogOpen">New Profile</v-btn>
      <v-dialog v-model="newProfile.dialog">
        <v-card>
          <v-card-title>
            <h3>New Profile</h3>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="newProfile.name" placeholder="New Profile Name">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="newProfile.dialog=false">Cancel</v-btn>
            <v-btn @click="createNewProfile">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div
        v-if="selectedProfile"
      >
        <v-list>
          <v-list-tile>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <h3>Device ID</h3>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <h3>Device Nickname</h3>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <h3>Device Type</h3>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <h3>Binding Type</h3>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <h3>Binding Function</h3>
            </v-flex>
          </v-list-tile>

          <v-list-tile
            v-for="device in devicesNoUn"
            :key="device.uid"
            lazy
          >
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <v-text-field
                placeholder="Device ID"
                disabled
                v-model="devices[device.uid].uid"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <v-text-field
                placeholder="Device Name"
                v-model="devices[device.uid].name"
                lazy
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <v-text-field
                placeholder="Device Type"
                v-model="devices[device.uid].type"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <v-select
                :items="Object.keys(settings[device.type])"
                placeholder="Binding Type"
                v-model="profiles[selectedProfile][device.uid].bindingType"
                lazy
                v-on:change="updateDOM"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <div
                v-if="profiles[selectedProfile][device.uid].bindingType === 'Text_Binding'"
              >
                <v-text-field
                  v-model="profiles[selectedProfile][device.uid].binding"
                  v-on:change="updateDOM"
                  lazy
                ></v-text-field>
              </div>
              <div
                v-else-if="profiles[selectedProfile][device.uid].bindingType"
              >
                <v-select
                  :items="Object.keys(settings[device.type][profiles[selectedProfile][device.uid].bindingType])"
                  placeholder="Binding"
                  v-model="profiles[selectedProfile][device.uid].binding"
                  lazy
                  v-on:change="updateDOM"
                ></v-select>
              </div>
              <div
                v-else
              >
                <v-select
                  placeholder="Binding"
                  disabled
                ></v-select>
              </div>
            </v-flex>
          </v-list-tile>
          <v-btn @click="updateStoreBindings()">Update Changes</v-btn>
        </v-list>
      </div>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        newBind: {
          selected: {
            device: undefined,
            bind: undefined
          },
        },
        devices: undefined,
        devicesNoUn: undefined,
        values: undefined,
        profiles: undefined,
        settings: undefined,
        selectedProfile: undefined,
        selectedBindingType: undefined,
        selectedBinding: undefined,

        newProfile: {
          dialog: false,
          name: undefined,
        }
      }
    },

    mounted() {
      this.updateLocalBindings()
    },

    computed: {
      ...mapGetters({
        storeGetDevices: 'storeGetDevices',
        storeGetProfiles: 'storeGetProfiles',
        storeGetSettings: 'storeGetSettings',
        storeGetDevicesNoUn: 'storeGetDevicesNoUn',
      }),
    },

    methods: {
      ...mapMutations({
        storeCreateNewProfile: 'storeCreateNewProfile',
        storeCreateNewProfileDevice: 'storeCreateNewProfileDevice',
        storeUpdateProfile: 'storeUpdateProfile',
      }),

      updateLocalBindings() {
        this.devices = this.storeGetDevices
        this.devicesNoUn = this.storeGetDevicesNoUn
        this.profiles = this.storeGetProfiles
        this.settings = this.storeGetSettings
      },

      updateStoreBindings() {
        for (var n in this.profiles) {
          if (this.profiles[n]) {
            for (var i in this.profiles[n]) {
              if (this.profiles[n][i]) {
                var payload = {}
                payload.name = n
                payload.id = this.profiles[n][i].uid
                payload.bindingType = this.profiles[n][i].bindingType
                payload.binding = this.profiles[n][i].binding
                this.storeUpdateProfile(payload)
              }
            }
          }
        }
      },

      updateDeviceNames() {
        for (var d in this.devices) {
          var payload = {}
          payload.name = this.devices[d].name
          payload.id = d
          payload.uid = this.devices[d].uid
        }
      },

      newProfileDialogOpen () {
        this.newProfile.dialog = true
      },

      createNewProfile () {
        this.newProfile.dialog = false
        var payload = {}
        payload.name = this.newProfile.name
        this.storeCreateNewProfile(payload)
        for (var id in this.devices) {
          if (this.devices[id]) {
            payload = {}
            payload.name = this.newProfile.name
            payload.id = this.devices[id].uid
            payload.uid = this.devices[id].uid
            payload.bindingType = undefined
            payload.binding = undefined
            this.storeCreateNewProfileDevice(payload)
          }
        }
      },

      updateDOM () {
        this.$forceUpdate()
      }
    }
  }
</script>

<style>
</style>