const mqtt = require("mqtt");
const client = mqtt.connect("ws://192.168.61.31:1883"); //连接到mqtt服务端

setInterval(() => {
  
  let value1 = Math.ceil(Math.random() * 4)
  message = '{' +
    `"IP": "192.168.61.2",` +
    `"mission": "subtree_task.xml",` +
    `"node": ` + value1 +
    `, "description": "subtree_task.xml"` +
    '}'
  client.publish("missionData", message.toString(), { qos: 0, retain: true });
}, 5000)

