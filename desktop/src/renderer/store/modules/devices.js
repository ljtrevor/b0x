const state = {
  // 0: Button
  // 1: Switch
  // 2: Slider
  // the index represents each id, if the id is complex, add an object

  devices: [
    {uid: 0, name: "Button 1", type: 'Button'},
    {uid: 1, name: "Button 2", type: 'Button'},
    {uid: 2, name: "Slider 0", type: 'Slider'},
    {uid: 3, name: "Switch 0", type: 'Switch'},
    {uid: 4, name: "Button 0", type: 'Button'},
    {uid: 5, name: "Some Button", type: 'Button'},
    {uid: 6, name: "Slider 1", type: 'Slider'},
    {uid: 7, name: "Switch 1", type: 'Switch'},
  ],
  values: [
    {uid: 0, value: 0, oldValue: 0},
    {uid: 1, value: 1, oldValue: 0},
    {uid: 2, value: 4, oldValue: 24},
    {uid: 3, value: 1, oldValue: 1},
    {uid: 4, value: 0, oldValue: 1},
    {uid: 5, value: 1, oldValue: 1},
    {uid: 6, value: 50, oldValue: 48},
    {uid: 7, value: 1, oldValue: 1},
  ]
}

const getters = {
  storeGetDevices (state) {
    return state.devices
  },
  storeGetValues (state) {
    return state.values
  },
  storeGetDevice: (state) => (id) => {
    return state.devices[id]
  },
  storeGetValue: (state) => (id) => {
    return state.values[id]
  }
}

const mutations = {
  storeAddDevice (payload) {
    this.state.devices[payload.id] = {}
    this.state.devices[payload.id].uid = payload.id
    this.state.devices[payload.id].type = payload.type
    this.state.devices[payload.id].name = undefined
  },
  storeAddValue (payload) {
    this.state.values[payload.id] = {}
    this.state.devices[payload.id].uid = payload.id
    this.state.values[payload.id].value = payload.value
  },
  storeChangeDeviceName (state, payload) {
    state.devices[payload.id].name = payload.name
  },
  storeChangeValue (state, payload) {
    state.values[payload.id].value = payload.value
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
