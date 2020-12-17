export default {
  updateCurrentPlane(state, payload) {
    if (state.currentPlane.length != 0) {
      state.currentPlane == undefined
      state.currentPlane = new Array()
    }
    if (typeof (payload) === 'string' ? true : false) {
      state.currentPlane.push(payload)
    } else {
      state.currentPlane = payload
    }
    state.mapSize = 17

  },
  updatePlaneData(state, payload) {
    state.planeData = payload
  },
  updateMapSize(state) {
    state.mapSize = 17
  },
  updateCurrentCategory(state, payload) {
    state.currentCategory = payload
  },
  updateCurrentCheckedCategory(state, payload) {
    state.currentCheckedCategory = payload
  }
}