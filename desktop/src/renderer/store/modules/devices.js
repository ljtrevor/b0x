const state = {
  devices: [
    undefined,
    {uid: 1, name: "Button 1", type: 'Button', value: 0, oldValue: 1},
    {uid: 2, name: "Button 2", type: 'Button', value: 0, oldValue: undefined},
    {uid: 3, name: "Button 3", type: 'Button', value: 1, oldValue: 0},
    undefined,
    {uid: 5, name: "Button 4", type: 'Button', value: 1, oldValue: 1},
    undefined,
    undefined,
    {uid: 8, name: "Slider 1", type: 'Slider', value: 10, oldValue: 20},
    undefined,
    undefined,
    undefined,
    undefined,
    {uid: 13, name: "Slider 2", type: 'Slider', value: 50, oldValue: 46},
  ],
}

const getters = {
  storeGetDevices (state) {
    return state.devices
  },
  storeGetDevice: (state) => (id) => {
    return state.devices[id]
  },
  storeGetDevicesNoUn (state) {
    var deviceNoUn = []
    for (var d in state.devices) {
      if (state.devices[d]) {
        deviceNoUn.push(state.devices[d])
      }
    }
    return deviceNoUn
  }
}

const mutations = {
  storeDevice (payload) {
    if (!this.state.devices[payload.id]) {
      this.state.devices[payload.id] = {}
      this.state.devices[payload.id].uid = payload.id
      this.state.devices[payload.id].type = payload.type
      this.state.devices[payload.id].name = undefined
      this.state.devices[payload.id].value = payload.value
      this.state.devices[payload.id].oldValue = undefined
    } else {
      if (payload.name) {
        this.state.devices[payload.id].name = payload.name
      }
      if (payload.value) {
        this.state.devices[payload.id].oldValue = payload.value
        this.state.devices[payload.id].value = payload.value
      }
    }
  },
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
