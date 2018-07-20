window.$ = window.jQuery = require('jquery');
require('popper.js');
require('bootstrap');

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");

const output = {
  input1:document.getElementById("output1"),
  input2:document.getElementById("output2"),
  input3:document.getElementById("output3")
}
var outputContext = output["input1"];

var spawn = require("child_process").spawn(__dirname + "/Hello.exe", {
  stdio: ["pipe", "pipe", "pipe"]
});
// 打开并重定向可执行程序的输入输出

spawn.stdin.pause();
spawn.stdout.on("data", function(data) {
  outputContext.innerText += data + "\n";
});
spawn.stderr.on("data", function(data) {
  outputContext.innerText += data;
});
spawn.once("close", function(code, signal) {
  let content = outputContext.innerText;
  outputContext.innerText = content.substr(
    0,
    content.length - 1
  );
  outputContext.innerText += "okay"
});

// 通过委托，监听三个输入框的回车事件，回车时将输入的内容传递给进程
document.getElementById('v-pills-tabContent').addEventListener("keypress", function(e) {
  if (e.keyCode==13&&e.target.tagName=="INPUT") {
    outputContext = output[e.target.id];
    let content = outputContext.innerText;
    outputContext.innerText = content.substr(
      0,
      content.length - 1
    );
    spawn.stdin.write(e.target.value);
    spawn.stdin.end("");
  }
});

$('#navId a').click(e => {
  e.preventDefault();
  $(this).tab('show');
});
