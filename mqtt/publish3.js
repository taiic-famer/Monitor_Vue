const mqtt = require("mqtt");
const client = mqtt.connect("ws://192.168.61.31:1883"); //连接到mqtt服务端
//写个定时器定时每隔3秒定时推送消息
// client.publish("mission", 'msg', { qos: 0, retain: true });
const lng = 118


setInterval(() => {
  let value = Math.ceil(Math.random() * 10)
  let lngvalue = lng + value / 10
  message = '{' +
    `"IP": "192.168.61.3",` +
    `"altitude": 0,` +
    `"battery": 100,` +
    `"latitude": 39,` +
    `"longitude":` + lngvalue +
    `, "name": "plane3",` +
    `"speed": 0,` +
    `"state": "idle",` +
    `"type": "四旋翼",` +
    `"verticalSpeed": 0,` +
    `"pitch": 0,` +
    `"roll": 0,` +
    `"yaw": 0` +
    '}'
  client.publish("plane", message.toString(), { qos: 0, retain: true });
}, 2000)

