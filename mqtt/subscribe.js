const mqtt = require("mqtt");
// const mqtt = require('./node_modules/mqtt/dist/mqtt.min.js')
const client = mqtt.connect("mqtt://192.168.61.31:5112"); //指定服务端地址和端口

client.on("connect", function () {
    console.log("服务器连接成功");
    // connected = client.connected
    client.subscribe("mission", { qos: 1 }); //订阅主题为mission的消息
});
client.on("message", function (top, message) {
    console.log("当前topic：", top);
    console.log("当前任务：", message.toString());
});