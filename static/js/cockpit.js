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
		console.log()
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
			$("#control_bar").attr("y",move_y)
			let speed = -Math.round((move_y-190)*100/180)
			display_num = String(speed)
			$('#speed_setting').text(display_num);
		}

	})
})


$(function(){
	$("#control_background").mouseup(function(e){
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
}