<template>
  <div>
    <div style="padding: 10px">
      <select v-model="selected1" class="child2">
        <option v-for="option in option1s" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
      <a-button class="child2 button" @click="action">执行动作</a-button>
      <a-button class="child2 button">自动</a-button>
    </div>
    <div style="padding: 10px">
      <select v-model="selected2" class="child2">
        <option v-for="option in option2s" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
      <a-button class="child2 button" @click="setPoint">设置航点</a-button>
      <a-button class="child2 button">手动</a-button>
    </div>
    <div style="padding: 10px">
      <select v-model="selected3" class="child2">
        <option v-for="option in option3s" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
      <a-button class="child2 button" @click="setMode">设置模式</a-button>
      <a-button class="child2 button">返航</a-button>
    </div>
    <div style="padding: 10px">
      <select v-model="selected4" class="child2">
        <option v-for="option in option4s" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
      <a-button class="child2 button" @click="setPayLoad">设置挂载</a-button>
      <a-button class="child2 button">摇杆</a-button>
    </div>
    <div style="padding: 10px">
      <a-button style="height: 40px; width: 40%; margin-left: 5%"
        >设置家的高度</a-button
      >
      <a-button style="height: 40px; width: 40%; margin-left: 5%"
        >重新开始任务</a-button
      >
    </div>
    <div style="padding: 10px">
      <a-button style="height: 40px; width: 40%; margin-left: 5%"
        >查看原始传感器</a-button
      >
      <a-button style="height: 40px; width: 40%; margin-left: 5%"
        >Abort Loiter</a-button
      >
    </div>
    <div style="padding: 10px">
      <a-input-number
        class="child2"
        v-model="numSpeed"
        @change="numSpeedChange"
        :min="0"
        :max="100"
        label="Change Speed"
      ></a-input-number>
      <a-button class="child2 button">Change Speed</a-button>
      <a-button class="child2 button">解锁/锁定</a-button>
    </div>
    <div style="padding: 10px">
      <a-input-number
        class="child2"
        v-model="numAlt"
        @change="numAltChange"
        :min="0"
        :max="100"
        label="Change Alt"
      ></a-input-number>
      <a-button class="child2 button">Change Alt</a-button>
      <a-button class="child2 button">恢复任务</a-button>
    </div>
    <div style="padding: 10px">
      <a-input-number
        class="child2"
        v-model="numLoiter"
        @change="numLoiterChange"
        :min="0"
        :max="100"
        label="Set Loiter"
      ></a-input-number>
      <a-button class="child2 button">Set Loiter</a-button>
      <a-button class="child2 button">清除轨迹</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected1: {},
      option1s: [
        {
          text: 'LOITER_UNLIM',
          value: 1,
        },
        {
          text: 'RETURN_TO_LAUNCH',
          value: 2,
        },
        {
          text: 'PREFLIGHT_CALIBRATION',
          value: 3,
        },
        {
          text: 'MISSION_START',
          value: 4,
        },
        {
          text: 'PREFLIGHT_REBOOT_SHUTDOWN',
          value: 5,
        },
        {
          text: 'TRIGGER_CAMERA_NOW',
          value: 6,
        },
        {
          text: 'SYSTEM_TIME',
          value: 7,
        },
      ],
      selected2: {},
      option2s: [
        {
          text: '0(Home)',
          value: 1,
        },
      ],
      selected3: {},
      option3s: [
        {
          text: 'Stabilize',
          value: 1,
        },
        {
          text: 'Acro',
          value: 2,
        },
        {
          text: 'AltHold',
          value: 3,
        },
        {
          text: 'Guided',
          value: 4,
        },
        {
          text: 'Loiter',
          value: 5,
        },
        {
          text: 'RTL',
          value: 6,
        },
        {
          text: 'Circle',
          value: 7,
        },
        {
          text: 'Drift',
          value: 8,
        },
        {
          text: 'Sport',
          value: 9,
        },
        {
          text: 'Flip',
          value: 10,
        },
        {
          text: 'AutoTune',
          value: 11,
        },
        {
          text: 'PostHold',
          value: 12,
        },
        {
          text: 'Brake',
          value: 13,
        },
        {
          text: 'Throw',
          value: 14,
        },
        {
          text: 'Avoid_ADSB',
          value: 15,
        },
        {
          text: 'Guide_NoGPS',
          value: 16,
        },
        {
          text: 'Smart_RTL',
          value: 17,
        },
        {
          text: 'FlowHold',
          value: 18,
        },
        {
          text: 'Follow',
          value: 19,
        },
        {
          text: 'ZigZag',
          value: 20,
        },
        {
          text: 'SystemID',
          value: 21,
        },
        {
          text: 'Heli_Autorot',
          value: 22,
        },
      ],
      selected4: {},
      option4s: [
        {
          text: 'Retracted',
          value: 1,
        },
        {
          text: 'Neutral',
          value: 2,
        },
        {
          text: 'MavLink Targ',
          value: 3,
        },
        {
          text: 'RC Targeting',
          value: 4,
        },
        {
          text: 'GPS Point',
          value: 5,
        },
      ],
      numSpeed: 100,
      numAlt: 100,
      numLoiter: 100,
    }
  },
  methods: {
    action() {
      console.log('action')
    },
    setPoint() {
      console.log('setPoint')
    },
    setMode() {
      console.log('setMode')
    },
    setPayLoad() {
      console.log('setPayLoad')
    },
    numSpeedChange(value) {
      console.log(value)
    },
    numAltChange(value) {
      console.log(value)
    },
    numLoiterChange(value) {
      console.log(value)
    },
  },
}
</script>
<style scoped>
.child2 {
  height: 40px;
  width: 30%;
}
.button {
  vertical-align: top;
  margin-left: 3%;
}
</style>