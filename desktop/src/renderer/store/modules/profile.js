const state = {
    // 0: Button
    // 1: Switch
    // 2: Slider
    // key represents the id
    // all keys must be carried accross properly in this file
    // available types:
    // key-binding
    // spotify
    // windows
    profiles: {
      Default: [
        {uid: 0, bindingType: 'Windows', binding: 'Paste'},
        {uid: 1, bindingType: 'Key_Binding', binding: 'helloWorld'},
        {uid: 2, bindingType: undefined, binding: undefined},
        {uid: 3, bindingType: undefined, binding: undefined},
        {uid: 4, bindingType: 'Media', binding: 'Mute'},
        {uid: 5, bindingType: undefined, binding: undefined},
        {uid: 6, bindingType: 'Spotify', binding: 'Play_Pause'},
        {uid: 7, bindingType: undefined, binding: undefined},
      ]
    },

    settings: {
      Button: {
        Key_Binding: {
        },
        Windows: {
          Copy: {script: 'copy.exe'},
          Paste: {script: 'paste.exe'},
          Switch_Window: {script: 'switchWindow.exe'}
        },
        Media: {
          Play_Pause: {script: 'play.exe'},
          Stop: {script: 'stop.exe'},
          Next: {script: 'nextTrack.exe'},
          Previous_Track: {script: 'previousTrack.exe'},
          Volume_Up: {script: 'volumeUp.exe'},
          Volume_Down: {script: 'volumeDown.exe'},
          Mute: {script: 'mute.exe'},
        },
        Spotify: {
          Play_Pause: {script: 'play.exe'},
          Stop: {script: 'stop.exe'},
          Next: {script: 'nextTrack.exe'},
          Previous_Track: {script: 'previousTrack.exe'},
          Volume_Up: {script: 'volumeUp.exe'},
          Volume_Down: {script: 'volumeDown.exe'},
          Mute: {script: 'mute.exe'},
        },
        Browser: {
          New_Tab: {script: 'newTab.exe'},
          Cycle_Tabs: {script: 'cycleTabs.exe'},
        }
      },
      Switch: {
        Media: {
          Play_Pause: {script: 'play.exe'},
          Stop: {script: 'stop.exe'},
          Next: {script: 'nextTrack.exe'},
          Previous_Track: {script: 'previousTrack.exe'},
          Volume_Up: {script: 'volumeUp.exe'},
          Volume_Down: {script: 'volumeDown.exe'},
          Mute: {script: 'mute.exe'},
        },
      },
      Slider: {
        Spotify: {
          Play_Pause: {script: 'play.exe'},
          Stop: {script: 'stop.exe'},
          Next: {script: 'nextTrack.exe'},
          Previous_Track: {script: 'previousTrack.exe'},
          Volume_Up: {script: 'volumeUp.exe'},
          Volume_Down: {script: 'volumeDown.exe'},
          Mute: {script: 'mute.exe'},
        },
      }
    }
  }
  
  const getters = {
    storeGetProfiles (state) {
      return state.profiles
    },
    storeGetSettings (state) {
      return state.settings
    }
  }
  
  const mutations = {
    storeAddProfile (state, payload) {
      state.profiles[payload.name] = []
    },
    storeProfileBind (state, payload) {
      state.profiles[payload.name][payload.id] = {}
      state.profiles[payload.name][payload.id].uid = payload.id
      state.profiles[payload.name][payload.id].bindingType = payload.bindingType
      state.profiles[payload.name][payload.id].binding = payload.binding
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
  