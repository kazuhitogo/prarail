var drag = {
	isMouseDown : false,	
	offsety : 40
}

$(function(){
	$("#control_bar").mousedown(function(e){
		e.preventDefault();
		drag.isMouseDown = true;
	})
})

$(function(){	
	$(window).mousemove(function(e){
		if (drag.isMouseDown == true) {
			let move_y = e.clientY - drag.offsety;
			if (move_y < 10) {
				move_y = 10;
			}else if (move_y > 370){
				move_y = 370;
			}
			$("#control_bar").attr("y",move_y)
			let speed = -Math.round((move_y-190)*100/180)
			display_num = String(speed)
			$('#speed_setting').text(display_num);
		}

	})
})

$(function(){
	$("#body").mouseup(function(e){
		if (drag.isMouseDown == true) {
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
		}
		drag.isMouseDown = false;
	})
})


var ws = new WebSocket("ws://192.168.21.20:5000/img");
ws.onopen = function(){
	$("#img").attr("src",message.data);
}
ws.onerror = function(){
	console.log("websocket error");
}
ws.onclose = function(){
	console.log("websocket close");
}
ws.onmessage = function(message){
	console.log(message);
}
