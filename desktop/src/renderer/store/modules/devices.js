const state = {
  status: {
    connected: false
  },
  // devices: [
  //   undefined,
  //   {uid: 1, name: "Button 1", type: 'Button', value: 0, oldValue: 1},
  //   {uid: 2, name: "Button 2", type: 'Button', value: 0, oldValue: undefined},
  //   {uid: 3, name: "Button 3", type: 'Button', value: 1, oldValue: 0},
  //   undefined,
  //   {uid: 5, name: "Button 4", type: 'Button', value: 1, oldValue: 1},
  //   undefined,
  //   undefined,
  //   {uid: 8, name: "Slider 1", type: 'Slider', value: 10, oldValue: 20},
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   {uid: 13, name: "Slider 2", type: 'Slider', value: 50, oldValue: 46},
  // ],
  devices: [
    {uid: 0, name: "Button 1", type: 'Button', value: undefined, oldValue: undefined},
    {uid: 1, name: "Button 2", type: 'Button', value: undefined, oldValue: undefined},
    {uid: 2, name: "Button 3", type: 'Button', value: undefined, oldValue: undefined},
    {uid: 3, name: "Button 4", type: 'Button', value: undefined, oldValue: undefined},
    {uid: 4, name: "Slider 1", type: 'Slider', value: undefined, oldValue: undefined},
    {uid: 5, name: "Slider 2", type: 'Slider', value: undefined, oldValue: undefined},
    {uid: 6, name: "Dial 1", type: 'Dial', value: undefined, oldValue: undefined},
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
  },
  storeGetB0xStatus (state) {
    return state.status
  }
}

const mutations = {
  storeDevice (state, payload) {
    if (!state.devices[payload.id]) {
      state.devices[payload.id] = {}
      state.devices[payload.id].uid = payload.id
      state.devices[payload.id].type = payload.type
      state.devices[payload.id].name = undefined
      state.devices[payload.id].value = payload.value
      state.devices[payload.id].oldValue = undefined
    } else {
      if (payload.name) {
        state.devices[payload.id].name = payload.name
      }
      if (payload.value !== undefined) {
        state.devices[payload.id].oldValue = state.devices[payload.id].value
        state.devices[payload.id].value = payload.value
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
