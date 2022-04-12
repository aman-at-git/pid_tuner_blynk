var Blynk = require('blynk-library');
const arduino = require("./encoded-serial");
const f2b = require("./float-to-bytes");

var AUTH = "AUTH-TOKEN";
const IP_ADDR = "blynk-cloud.com";
const PORT = 8442;

const params = { kp: 0, ki: 1, kd: 2, power: 3 };

function connectBlynk() {
  return new Blynk.Blynk(AUTH, options = {
    connector : new Blynk.TcpClient(
      options = {
        port: PORT,
        addr: IP_ADDR,
      }),
  }).on("error", function() {
    console.log("Unable to connect to Blynk server..Retrying in 20s..");
    var now = new Date().getTime();
    while (new Date().getTime() < now + 20000) {
      /* wait */
    }
  });
}

const blynk = connectBlynk();

blynk.on("connect", function() {
  console.log("Connected to Blynk Server.");
  Object.keys(params).forEach(function(key) {
    blynk.virtualWrite(params[key], 0);
  });
});

blynk.on("disconnect", function() {
  console.log("DISCONNECTED");
});

var virt_pins = [];
var values = [0.0, 0.0, 0.0, 0];
var x = 3.0;
for (var i = 0; i < 4; i++) {
  virt_pins.push(new blynk.VirtualPin(i));
}
values[params.power] = 0;

virt_pins[params.kp].on("write", function(param) {
  values[params.kp] = parseFloat(param[0]);
});

virt_pins[params.ki].on("write", function(param) {
  values[params.ki] = parseFloat(param[0]);
});

virt_pins[params.kd].on("write", function(param) {
  values[params.kd] = parseFloat(param[0]);
});

virt_pins[params.power].on("write", function(param) {
  values[params.power] = parseInt(param[0]);
  console.log('power:', param[0]);
});

function printValues() {
  console.log(
    values[params.kp],
    values[params.ki],
    values[params.kd],
    values[params.power]
  );
}

arduino.port.on("data", function(data) {
  if (String.fromCharCode(data[0]) === "z") {
    var toSend = [values[params.power]];
    toSend = toSend.concat(f2b.toFloat32(values[params.kp]));
    toSend = toSend.concat(f2b.toFloat32(values[params.ki]));
    toSend = toSend.concat(f2b.toFloat32(values[params.kd]));
    arduino.sendToArduino(toSend);
  }
});
