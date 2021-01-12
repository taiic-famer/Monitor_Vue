const mqtt = require("mqtt");
const client = mqtt.connect("ws://192.168.61.31:1883"); //连接到mqtt服务端
//写个定时器定时每隔3秒定时推送消息
// client.publish("mission", 'msg', { qos: 0, retain: true });
const point = [
  { lng: 117.727725, lat: 39.042971 }, { lng: 117.727862, lat: 39.042956 },
  { lng: 117.727999, lat: 39.042942 }, { lng: 117.728117, lat: 39.042898 },
  { lng: 117.728235, lat: 39.042854 }, { lng: 117.728345, lat: 39.042821 },
  { lng: 117.728455, lat: 39.042788 }, { lng: 117.728535, lat: 39.042787 },
  { lng: 117.728616, lat: 39.042721 }, { lng: 117.728718, lat: 39.042669 },
  { lng: 117.728820, lat: 39.042617 }, { lng: 117.728919, lat: 39.042590 },
  { lng: 117.729018, lat: 39.042563 }, { lng: 117.729066, lat: 39.042527 },
  { lng: 117.729115, lat: 39.042492 }, { lng: 117.729268, lat: 39.042404 },
  { lng: 117.729421, lat: 39.042317 }, { lng: 117.729539, lat: 39.042250 },
  { lng: 117.729657, lat: 39.042184 }, { lng: 117.729734, lat: 39.042146 },
  { lng: 117.729812, lat: 39.042109 }, { lng: 117.729884, lat: 39.042054 },
  { lng: 117.729957, lat: 39.042000 }, { lng: 117.730035, lat: 39.041960 },
  { lng: 117.730113, lat: 39.041921 }, { lng: 117.730134, lat: 39.041858 },
  { lng: 117.730311, lat: 39.041796 }, { lng: 117.730423, lat: 39.041750 },
  { lng: 117.730536, lat: 39.041704 }, { lng: 117.730598, lat: 39.041681 },
  { lng: 117.730660, lat: 39.041659 }, { lng: 117.730764, lat: 39.041621 },
  { lng: 117.730869, lat: 39.041584 }, { lng: 117.730971, lat: 39.041536 },
  { lng: 117.731073, lat: 39.041488 }, { lng: 117.731180, lat: 39.041454 },
  { lng: 117.731287, lat: 39.041421 }, { lng: 117.731416, lat: 39.041398 },
  { lng: 117.731545, lat: 39.041375 }, { lng: 117.731636, lat: 39.041367 },
  { lng: 117.731727, lat: 39.041359 }, { lng: 117.731842, lat: 39.041338 },
  { lng: 117.731958, lat: 39.041317 }, { lng: 117.732060, lat: 39.041294 },
  { lng: 117.732162, lat: 39.041271 }, { lng: 117.732282, lat: 39.041258 },
  { lng: 117.732403, lat: 39.041246 }, { lng: 117.732505, lat: 39.041206 },
  { lng: 117.732607, lat: 39.041167 }, { lng: 117.732709, lat: 39.041104 },
  { lng: 117.732811, lat: 39.041042 }, { lng: 117.732869, lat: 39.040942 },
  { lng: 117.732927, lat: 39.040843 }, { lng: 117.732967, lat: 39.040763 },
  { lng: 117.733007, lat: 39.040684 }, { lng: 117.733007, lat: 39.040605 },
  { lng: 117.733007, lat: 39.040526 }, { lng: 117.732975, lat: 39.040426 },
  { lng: 117.732943, lat: 39.040326 }, { lng: 117.732902, lat: 39.040251 },
  { lng: 117.732862, lat: 39.040176 }, { lng: 117.732808, lat: 39.040109 },
  { lng: 117.732755, lat: 39.040043 }, { lng: 117.732709, lat: 39.039972 },
  { lng: 117.732664, lat: 39.039901 }, { lng: 117.732631, lat: 39.039813 },
  { lng: 117.732599, lat: 39.039726 }, { lng: 117.732575, lat: 39.039628 },
  { lng: 117.732551, lat: 39.039530 }, { lng: 117.732551, lat: 39.039438 },
  { lng: 117.732530, lat: 39.039347 }, { lng: 117.732556, lat: 39.039259 },
  { lng: 117.732562, lat: 39.039172 }, { lng: 117.732597, lat: 39.039067 },
  { lng: 117.732632, lat: 39.038963 }, { lng: 117.732666, lat: 39.038892 },
  { lng: 117.732701, lat: 39.038822 }, { lng: 117.732757, lat: 39.038720 },
  { lng: 117.732814, lat: 39.038618 }, { lng: 117.732859, lat: 39.038536 },
  { lng: 117.732905, lat: 39.038455 }, { lng: 117.732942, lat: 39.038374 },
  { lng: 117.732980, lat: 39.038293 }, { lng: 117.732991, lat: 39.038203 },
  { lng: 117.733002, lat: 39.038113 }, { lng: 117.733012, lat: 39.038040 },
  { lng: 117.733023, lat: 39.037968 }, { lng: 117.733017, lat: 39.037870 },
  { lng: 117.733012, lat: 39.037772 }, { lng: 117.732993, lat: 39.037707 },
  { lng: 117.732975, lat: 39.037643 }, { lng: 117.732951, lat: 39.037547 },
  { lng: 117.732927, lat: 39.037451 }, { lng: 117.732881, lat: 39.037369 },
  { lng: 117.732835, lat: 39.037288 }, { lng: 117.732776, lat: 39.037219 },
  { lng: 117.732717, lat: 39.037151 }, { lng: 117.732645, lat: 39.037084 },
  { lng: 117.732573, lat: 39.037018 }, { lng: 117.732497, lat: 39.036953 },
  { lng: 117.732422, lat: 39.036888 }, { lng: 117.732325, lat: 39.036823 },
  { lng: 117.732229, lat: 39.036759 }, { lng: 117.732138, lat: 39.036709 },
  { lng: 117.732047, lat: 39.036659 }, { lng: 117.731938, lat: 39.036612 },
  { lng: 117.731829, lat: 39.036565 }, { lng: 117.731706, lat: 39.036536 },
  { lng: 117.731583, lat: 39.036507 }, { lng: 117.731467, lat: 39.036494 },
  { lng: 117.731352, lat: 39.036482 }, { lng: 117.731248, lat: 39.036478 },
  { lng: 117.731144, lat: 39.036475 }, { lng: 117.730985, lat: 39.036483 },
  { lng: 117.730827, lat: 39.036491 }, { lng: 117.730701, lat: 39.036510 },
  { lng: 117.730575, lat: 39.036529 }, { lng: 117.730492, lat: 39.036560 },
  { lng: 117.730409, lat: 39.036591 }, { lng: 117.730325, lat: 39.036620 },
  { lng: 117.730242, lat: 39.036650 }, { lng: 117.730175, lat: 39.036677 },
  { lng: 117.730108, lat: 39.036704 }, { lng: 117.730001, lat: 39.036766 },
  { lng: 117.729894, lat: 39.036829 }, { lng: 117.729794, lat: 39.036887 },
  { lng: 117.729695, lat: 39.036946 }, { lng: 117.729609, lat: 39.037014 },
  { lng: 117.729523, lat: 39.037083 }, { lng: 117.729446, lat: 39.037139 },
  { lng: 117.729370, lat: 39.037196 }, { lng: 117.729311, lat: 39.037227 },
  { lng: 117.729252, lat: 39.037259 }, { lng: 117.729128, lat: 39.037319 },
  { lng: 117.729005, lat: 39.037379 }, { lng: 117.728892, lat: 39.037425 },
  { lng: 117.728780, lat: 39.037471 }, { lng: 117.728678, lat: 39.037500 },
  { lng: 117.728576, lat: 39.037529 }, { lng: 117.728474, lat: 39.037558 },
  { lng: 117.728372, lat: 39.037588 }, { lng: 117.728249, lat: 39.037611 },
  { lng: 117.728126, lat: 39.037634 }, { lng: 117.727997, lat: 39.037650 },
  { lng: 117.727868, lat: 39.037667 }, { lng: 117.727677, lat: 39.037679 },
  { lng: 117.727487, lat: 39.037692 }, { lng: 117.727398, lat: 39.037688 },
  { lng: 117.727310, lat: 39.037684 }, { lng: 117.727178, lat: 39.037667 },
  { lng: 117.727047, lat: 39.037650 }, { lng: 117.726958, lat: 39.037639 },
  { lng: 117.726870, lat: 39.037629 }, { lng: 117.726749, lat: 39.037612 },
  { lng: 117.726629, lat: 39.037596 }, { lng: 117.726548, lat: 39.037587 },
  { lng: 117.726468, lat: 39.037579 }, { lng: 117.726331, lat: 39.037581 },
  { lng: 117.726194, lat: 39.037584 }, { lng: 117.726057, lat: 39.037596 },
  { lng: 117.725921, lat: 39.037609 }, { lng: 117.725835, lat: 39.037629 },
  { lng: 117.725749, lat: 39.037650 }, { lng: 117.725663, lat: 39.037660 },
  { lng: 117.725578, lat: 39.037671 }, { lng: 117.725468, lat: 39.037706 },
  { lng: 117.725358, lat: 39.037742 }, { lng: 117.725221, lat: 39.037779 },
  { lng: 117.725084, lat: 39.037817 }, { lng: 117.725001, lat: 39.037863 },
  { lng: 117.724918, lat: 39.037909 }, { lng: 117.724851, lat: 39.037965 },
  { lng: 117.724784, lat: 39.038021 }, { lng: 117.724695, lat: 39.038085 },
  { lng: 117.724607, lat: 39.038150 }, { lng: 117.724553, lat: 39.038214 },
  { lng: 117.724499, lat: 39.038279 }, { lng: 117.724416, lat: 39.038371 },
  { lng: 117.724333, lat: 39.038463 }, { lng: 117.724284, lat: 39.038544 },
  { lng: 117.724236, lat: 39.038625 }, { lng: 117.724209, lat: 39.038683 },
  { lng: 117.724183, lat: 39.038742 }, { lng: 117.724129, lat: 39.038833 },
  { lng: 117.724076, lat: 39.038925 }, { lng: 117.724081, lat: 39.039008 },
  { lng: 117.724087, lat: 39.039091 }, { lng: 117.724105, lat: 39.039168 },
  { lng: 117.724124, lat: 39.039246 }, { lng: 117.724148, lat: 39.039346 },
  { lng: 117.724172, lat: 39.039446 }, { lng: 117.724220, lat: 39.039531 },
  { lng: 117.724269, lat: 39.039616 }, { lng: 117.724341, lat: 39.039674 },
  { lng: 117.724414, lat: 39.039733 }, { lng: 117.724481, lat: 39.039812 },
  { lng: 117.724548, lat: 39.039891 }, { lng: 117.724628, lat: 39.039958 },
  { lng: 117.724709, lat: 39.040025 }, { lng: 117.724781, lat: 39.040095 },
  { lng: 117.724854, lat: 39.040166 }, { lng: 117.724915, lat: 39.040226 },
  { lng: 117.724977, lat: 39.040287 }, { lng: 117.725041, lat: 39.040370 },
  { lng: 117.725106, lat: 39.040454 }, { lng: 117.725167, lat: 39.040541 },
  { lng: 117.725229, lat: 39.040629 }, { lng: 117.725266, lat: 39.040702 },
  { lng: 117.725304, lat: 39.040775 }, { lng: 117.725352, lat: 39.040858 },
  { lng: 117.725401, lat: 39.040941 }, { lng: 117.725452, lat: 39.041024 },
  { lng: 117.725503, lat: 39.041108 }, { lng: 117.725516, lat: 39.041198 },
  { lng: 117.725530, lat: 39.041288 }, { lng: 117.725556, lat: 39.041373 },
  { lng: 117.725583, lat: 39.041459 }, { lng: 117.725618, lat: 39.041555 },
  { lng: 117.725653, lat: 39.041651 }, { lng: 117.725731, lat: 39.041807 },
  { lng: 117.725809, lat: 39.041963 }, { lng: 117.725904, lat: 39.042040 },
  { lng: 117.725999, lat: 39.042117 }, { lng: 117.726019, lat: 39.042196 },
  { lng: 117.726039, lat: 39.042276 }, { lng: 117.726117, lat: 39.042351 },
  { lng: 117.726195, lat: 39.042426 }, { lng: 117.726283, lat: 39.042488 },
  { lng: 117.726372, lat: 39.042551 }, { lng: 117.726447, lat: 39.042613 },
  { lng: 117.726522, lat: 39.042676 }, { lng: 117.726620, lat: 39.042730 },
  { lng: 117.726719, lat: 39.042784 }, { lng: 117.726823, lat: 39.042802 },
  { lng: 117.726928, lat: 39.042856 }, { lng: 117.727056, lat: 39.042887 },
  { lng: 117.727185, lat: 39.042919 }, { lng: 117.727324, lat: 39.042937 },
  { lng: 117.727464, lat: 39.042956 }, { lng: 117.727594, lat: 39.042963 }
]
let i = 0;
setInterval(() => {
  if (i == 240) {
    i = 0;
  }
  message = '{' +
    `"IP": "192.168.61.3",` +
    `"altitude": 0,` +
    `"battery": 100,` +
    `"latitude":` + point[i].lat.toFixed(7) +
    `, "longitude":` + point[i].lng.toFixed(7) +
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
  i++
}, 100)


