import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawColor: '#ff4500',
    dragColor: '#ff8c00',
    tool: '',
  },
  mutations: {
    setDrawColor(state, newColor){
      state.drawColor = newColor;
    },
    setDragColor(state, newColor){
      state.dragColor = newColor;
    },
    setTool(state, newTool) {
      state.tool = newTool;
    }
  },
  actions: {

  }
})
