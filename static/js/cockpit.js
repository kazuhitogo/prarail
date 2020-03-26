var drag = {
	isMouseDown : false,
	target : null,
	offsetx : 0,
	offsety : 0,
}
document.onmouseup = function () {
	$.ajax({
		contentType : "application/json",
		dataType : "json",
		type: "POST",
		data:JSON.stringify(
			{
				speed: $("#speed_setting").text(),
			}
		),
		url　: "http://192.168.21.20:5000/speed",
		success : function(json_data){console.log(json_data)},
		error : function(data) {console.log("error", data);},
		complete:function(){console.log("complete")},
	})
	drag.isMouseDown = false;
}

document.onmousemove = function( e ) {
    if (drag.isMouseDown == true) {
        let move_y = e.clientY - drag.offsety;
        if (move_y < 10) {
            move_y = 10;
        }else if (move_y > 370){
            move_y = 370;
		}
		drag.target.y.baseVal.value = move_y
		let speed = -Math.round((move_y-190)*100/180)
		display_num = String(speed)
        $('#speed_setting').text(display_num);
	}
}
function draggable( element ) {
	element.addEventListener('mousedown', function( e ) {
		e.preventDefault();
		var rect = element.getBoundingClientRect();
        drag.offsety = e.clientY - rect.top;
		drag.isMouseDown = true;
		return false;
	});
}
window.onload = function() {
	var control_bar = document.getElementById('control_bar');
	draggable(control_bar);
	drag.target = control_bar;
}

var ws = new WebSocket("ws://192.168.21.20:5000/img"); //接続
ws.onopen = wsOnOpen; //接続できたとき
ws.onerror = wsOnError; //接続エラーのとき
ws.onclose = wsOnClose; //接続を閉じたとき
ws.onmessage = wsOnMessage; //受け取った時

function wsOnMessage(message){
	$("#img").attr("src",message.data);
}

function wsOnOpen() {
	ws.send("ping")
	//接続できたときの処理..
}
function wsOnError() {
    //接続エラーのときの処理..
}
function wsOnClose() {
    //接続を閉じたときの処理..
}