import Vue from "vue";
import Vuex from "vuex";
import playMode from "@/utils/playMode";
import router from "@/router/index.js";

Vue.use(Vuex);

const state = {
  audio: {
    ele: null,
    data: null,
    play: false,
    duration: 0,
    currentTime: 0
  },
  playMode: playMode.default.value,
  playList: []
};

const getters = {
  audio_progress: state => {
    return (
      ((state.audio.currentTime / state.audio.duration) * 100).toFixed(2) + "%"
    );
  }
};

const mutations = {
  SET_AUDIO_ELE(state, val) {
    state.audio.ele = val;
  },
  SET_AUDIO_DATA(state, val) {
    state.audio.data = val;
    const isHas = state.playList.find(n => n.sound.id === val.sound.id);
    if (!isHas) {
      state.playList.unshift(val);
    }
    // if (router.history.current.name === "detail") { 
    //   router.replace({ name: "detail", query: { id: val.sound.id } });
    // }
  },
  SET_AUDIO_STATUS(state, val) {
    state.audio.play = val;
  },
  SET_AUDIO_DURATION(state, val) {
    state.audio.duration = val;
  },
  SET_AUDIO_CURRENT_TIME(state, val) {
    state.audio.currentTime = val;
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
});
