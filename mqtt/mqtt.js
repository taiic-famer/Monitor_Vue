// const MongoClient = require("mongodb").MongoClient;
let http = require('http')
    , httpServer = http.createServer()
    , mosca = require('mosca')

// let ascoltatore = {
//     // using ascoltatore,
//     type: 'mongo',
//     url: 'mongodb://192.168.61.31:27017/mqtt1',
//     pubsubCollection: 'ascoltatori',
//     mongo: {}
// }
let settings = {
    port: 5112,
    // backend: ascoltatore
}

// const uri = 'mongodb://192.168.61.31:27017';

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect().then(db => {
//     console.log(111)
//     const changeStream = client.db("mqtt1").collection("ascoltatori").watch();
//     changeStream.on("change", next => {
//         console.log(next);
//     });
// });
let server = new mosca.Server(settings)

server.attachHttpServer(httpServer)
server.on('published', function (packet, client) {
    console.log('Published', packet.payload.toString());
})
httpServer.listen(1883)
server.on('ready', function () {
    console.log('server is running at port 1883');
})