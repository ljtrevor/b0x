const state = {
    selectedProfile: 'Default',
    profiles: {
      Default: [
        {uid: 0, bindingType: 'Windows', binding: 'Paste'},
        {uid: 1, bindingType: 'Text_Binding', binding: 'I Love You'},
        {uid: 2, bindingType: 'Media', binding: 'Play_Pause'},
        {uid: 3, bindingType: 'Windows', binding: 'Switch_Window'},
        {uid: 4, bindingType: 'Media', binding: 'Volume'},
        {uid: 5, bindingType: 'Spotify', binding: 'Volume'},
        {uid: 6, bindingType: 'Spotify', binding: 'Volume'},
      ]
    },

    settings: {
      Button: {
        Text_Binding: {
          Text_Binding: {script: 'textBinding.exe'}
        },
        Windows: {
          Copy: {script: 'copy.exe'},
          Paste: {script: 'paste.exe'},
          Switch_Window: {script: 'switchWindow.exe'},
        },
        Browser: {
          New_Tab: {script: 'newTab.exe'},
          Close_Tab: {script: 'closeTab.exe'},
          Cycle_Tabs: {script: 'cycleTab.exe'},
          Next_Tab: {script: 'nextTab.exe'},
          Previous_Tab: {script: 'previousTab.exe'},
          Refresh: {script: 'refresh.exe'}
        },
        Media: {
          Play_Pause: {script: 'playPause.exe'},
          Stop: {script: 'stop.exe'},
          Next: {script: 'nextTrack.exe'},
          Previous_Track: {script: 'previousTrack.exe'},
          Volume_Up: {script: 'volumeUp.exe'},
          Volume_Down: {script: 'volumeDown.exe'},
          Mute: {script: 'mute.exe'},
        },
        Spotify: {
          Play_Pause: {script: 'playPause.exe'},
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
          Volume: {script: 'volume.exe'},
        },
        Media: {
          Volume: {script: 'volume.exe'},
        },
      },
      Dial: {
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
    storeGetSelectedProfile (state) {
      return state.selectedProfile
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
    storeSelectProfile (state, payload) {
      state.selectedProfile = payload
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
  