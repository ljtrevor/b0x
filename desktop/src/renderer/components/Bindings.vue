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
            <v-text-field v-model="newProfile.name" placeholder="name">
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
            v-for="device in devices"
            :key="device.uid"
            lazy
          >
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <v-text-field
                placeholder="Device ID"
                disabled
                v-model="device.uid"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <v-text-field
                placeholder="Device Name"
                v-model="device.name"
                lazy
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <v-text-field
                placeholder="Device Type"
                v-model="device.type"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <v-select
                :items="Object.keys(settings[device.type])"
                placeholder="Binding Type"
                v-model="profiles[selectedProfile][device.uid].bindingType"
                lazy
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 pa-3>
              <div
                v-if="profiles[selectedProfile][device.uid].bindingType === 'Key_Binding'"
              >
                <v-text-field
                  placeholder="Binding"
                  v-model="profiles[selectedProfile][device.uid].binding"
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
        storeGetValues: 'storeGetValues',
        storeGetProfiles: 'storeGetProfiles',
        storeGetSettings: 'storeGetSettings',
      }),
    },

    methods: {
      ...mapMutations({
        storeAddProfile: 'storeAddProfile',
        storeProfileBind: 'storeProfileBind',
        // storeAddProfileDevice: 'storeAddProfileDevice',
      }),

      updateLocalBindings() {
        this.devices = this.storeGetDevices
        this.values = this.storeGetValues
        this.profiles = this.storeGetProfiles
        this.settings = this.storeGetSettings
      },

      discardStoreBindings() {
        this.devices = this.storeGetDevices
        this.values = this.storeGetValues
        this.profiles = this.storeGetProfiles
        this.settings = this.storeGetSettings
        this.$forceUpdate()
      },

      updateStoreBindings() {
        for (var p in this.profiles) {
          for (var id in this.profiles[p]) {
            var payload = {}
            payload.name = p
            payload.id = id
            payload.bindingType = this.profiles[p][id].bindingType
            payload.binding = this.profiles[p][id].binding
            this.storeProfileBind(payload)
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
        this.storeAddProfile(payload)
        for (var id in this.devices) {
          payload = {}
          payload.name = this.newProfile.name
          payload.id = id
          payload.uid = this.devices[id].uid
          payload.bindingType = undefined
          payload.binding = undefined
          this.storeProfileBind(payload)
        }
      }
    }
  }
</script>

<style>
</style>