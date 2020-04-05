var drag = {
	isMouseDown : false,	
	offset : 0
}

$(function(){
	drag.offsety = $("#control_background").position().top + $("#control_bar").attr("height")/2
})


$(function(){
	$("#control_bar").mousedown(function(e){
		e.preventDefault();
		drag.isMouseDown = true;
	})
})


$(function(){	
	$("#control_background").mousemove(function(e){
		e.preventDefault();
		if (drag.isMouseDown == true) {
			let move_y = e.clientY - drag.offsety;
			if (move_y < 10) {
				move_y = 10;
			}else if (move_y > 370){
				move_y = 370;
			}
			move_y = Math.round((move_y-10)/30) * 30 + 10
			$("#control_bar").attr("y",move_y)
			let speed = -Math.round((move_y-10-180)/30)
			display_num = String(speed)
			if (speed == "6"){
				display_num = "MAX"
			}else if (speed == "-6"){
				display_num = "MIN"
			}
			$('#speed_setting').text(display_num);
		}

	})
})


$(function(){
	$("#control_bar").mouseup(function(e){
		e.preventDefault();
		sendSpeed()
		
	})
})

$(function(){
	$("#mascon").mouseleave(function(e){
		e.preventDefault();
		sendSpeed()
	})
})

var sendSpeed = function(){
	if (drag.isMouseDown == true) {
		console.log("call sendspeed")
		let speed = $("#speed_setting").text()
		if (speed == "MAX"){
			speed = "6"
		}else if (speed == "MIN"){
			speed = "-6"
		}
		$.ajax({
			contentType : "application/json",
			dataType : "json",
			type: "POST",
			data:JSON.stringify(
				{
					speed: speed,
				}
			),
			url　: "http://" + location.host + "/speed",
			success : function(json_data){console.log(json_data)},
			error : function(data) {console.log("error", data);},
			complete:function(){console.log("complete")},
		})

	}
	drag.isMouseDown = false;
}


$(function(){
	$("#play").click(function(e){
		$.ajax({
			type: "GET",
			url　: "http://" + location.host + "/sound/takanawa",
			success : function(r){console.log(r)},
			error : function(e) {console.log("error", e);},
			complete:function(){console.log("complete")},
		})
	})
})