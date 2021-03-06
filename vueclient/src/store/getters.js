export default {
  getPlaneData(state) {
    return state.planeData.filter((p) => {
      let now = new Date()
      return (now.getTime() - p.time) <= 5000
    })
  },
  getPlaneDataByIP(state) {
    return state.planeData.find(p => p.IP == state.currentPlane[0])
  },
  getMissionDataByIP(state) {
    return state.missionData.find(p => p.IP == state.currentPlane[0])
  },
  getData(state) {
    let arr = []
    for (let i = 0; i < state.planeData.length; i++) {
      arr[i] = state.planeData[i]
      if (state.planeData[i].state == "mission") {
        for (let j = 0; j < state.missionData.length; j++) {
          if (state.planeData[i].IP == state.missionData[j].IP) {
            arr[i].state = state.missionData[j].mission.split('.')[0]
          }
        }
      }
    }
    return arr
  },
  getCategoryByClick(state) {
    let arr = []
    let Category = state.currentCategory
    for (let i = 0; i < state.planeData.length; i++) {
      if (Category == 'IP') {
        arr.push(state.planeData[i].IP)
      } else if (Category == 'type') {
        if (!arr.find(value => value == state.planeData[i].type)) {
          arr.push(state.planeData[i].type)
        }
      } else if (Category == 'state') {
        if (!arr.find(value => value == state.planeData[i].state)) {
          arr.push(state.planeData[i].state)
        }

      } else if (Category == 'mission') {
        if (!arr.find(value => value == state.missionData[i].mission)) {
          arr.push(state.missionData[i].mission)
        }
      }
      // } else if (Category == 'battery') {
      //   if (!arr.find(value => value == state.planeData[i].battery)) {
      //     arr.push(state.planeData[i].battery)
      //   }
      // }
    }
    return arr.sort()
  },
  getCategoryByBattery(state) {
    let arr = []
    let Category = state.currentCategory
    for (let i = 0; i < state.planeData.length; i++) {
      if (Category == 'battery') {
        if (!arr.find(value => value == state.planeData[i].battery)) {
          arr.push(state.planeData[i].battery)
        }
      }
    }
    return arr.sort()
  },
  getCategoryPlane(state) {
    let arr = []
    let Category = state.currentCategory
    let value = state.currentCheckedCategory
    if (Category == 'IP') {
      for (let i = 0; i < value.length; i++) {
        arr.push(state.planeData.filter(p => p.IP == value[i]))
      }
    } else if (Category == 'type') {
      for (let i = 0; i < value.length; i++) {
        arr.push(state.planeData.filter(p => p.type == value[i]))
      }
    } else if (Category == 'state') {
      for (let i = 0; i < value.length; i++) {
        arr.push(state.planeData.filter(p => p.state == value[i]))
      }

    } else if (Category == 'mission') {
      for (let i = 0; i < value.length; i++) {
        arr.push(state.missionData.filter(p => p.mission == value[i]))
      }
    } else if (Category == 'battery') {

      for (let i = 0; i < value.length; i++) {
        arr.push(state.planeData.filter(p => {
          if (value[i] == 80) {
            return p.battery >= 80
          } else {
            return p.battery >= value[i] && p.battery < value[i] + 20
          }
        }))
      }
    }
    let arrToOne = Array.prototype.concat.apply([], arr) // 将多维数组变成一维数组

    let arrByIP = []
    for (let i = 0; i < arrToOne.length; i++) {
      arrByIP.push(arrToOne[i].IP)
    }
    return arrByIP
  }
}