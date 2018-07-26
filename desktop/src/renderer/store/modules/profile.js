const state = {
    profiles: {
      Default: [
        undefined,
        {uid: 1, bindingType: 'Windows', binding: 'Paste'},
        {uid: 2, bindingType: 'Text_Binding', binding: 'I Love You'},
        {uid: 3, bindingType: 'Media', binding: 'Play_Pause'},
        undefined,
        {uid: 5, bindingType: 'Windows', binding: 'Switch_Window'},
        undefined,
        undefined,
        {uid: 8, bindingType: 'Media', binding: 'Volume'},
        undefined,
        undefined,
        undefined,
        undefined,
        {uid: 13, bindingType: 'Spotify', binding: 'Volume'},
      ]
    },

    settings: {
      Button: {
        Text_Binding: {
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
      Slider: {
        Spotify: {
          Volume: {script: 'volume.exe'},
        },
        Media: {
          Volume: {script: 'volume.exe'},
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
    },
    storeGetProfile: (state) => (profile, id) => {
      return state.profiles[profile][id]
    },
    // storeGetProfilesNoUn: (state) => (profile) => {
    //   var profilesNoUn = []
    //   for (var p in state.profiles) {
    //     for (var i in state.profiles[p]) {
    //       if (state.profiles[p][i]) {
    //         profilesNoUn.push(state.)
    //       }
    //     }
    //   }
    // }
  }
  
  const mutations = {
    storeCreateNewProfile (state, payload) {
      state.profiles[payload.name] = []
    },
    storeCreateNewProfileDevice (state, payload) {
      state.profiles[payload.name][payload.id] = {}
      state.profiles[payload.name][payload.id].uid = payload.id
      state.profiles[payload.name][payload.id].bindingType = payload.bindingType
      state.profiles[payload.name][payload.id].binding = payload.binding
    },
    storeUpdateProfile (state, payload) {
      state.profiles[payload.name][payload.id].bindingType = payload.bindingType
      state.profiles[payload.name][payload.id].binding = payload.binding
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
  