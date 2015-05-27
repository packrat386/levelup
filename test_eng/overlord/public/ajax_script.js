$(document).ready(function () {
    console.log("READY!");
    $.get("/api/state", function (raw) {
	data = JSON.parse(raw);
	view_handler(data);
    })
});

$("#submit").click(function() {
    console.log("CLICKED");
    var acode = $("#acode").text();
    var dcode = $("#dcode").text();
    var url = $("#submit").attr("url")

    $.post(url,
	   {
	       activation_code: acode,
	       deactivation_code: dcode,
	   },
	   function (raw) {
	       data = JSON.parse(raw);
	       view_handler(data);
	   });
});

function view_handler (data) {
    console.log(data)

    if (data.success) {
	$("#bomb-msg").css("background", "#efd");
    } else {
	$("#bomb-msg").css("background", "#fde");
    }

    if (data.msg) {
	$("#bomb-msg").text(data.msg);
	$("#bomb-msg").show();
    } else {
	$("#bomb-msg").text("");
	$("#bomb-msg").hide();
    }

    $("#status").text(data.state)
    
    if (data.state == "unset") {
	view_boot(data);
    } else if (data.state == "booted") {
	view_activate(data);
    } else if (data.state == "activated") {
	view_deactivate(data);
    } else if (data.state == "defused") {
	view_reset(data);
    } else if (data.stat == "detonated") {
	view_reset(data);
    }
}

function view_boot (data) {
    $("#submit").text("BOOT");
    $("#submit").attr("url", "/api/boot");
    $("#acode-tr").show();
    $("#dcode-tr").show();
}

function view_activate (data) {
    $("#submit").text("ACTIVATE");
    $("#submit").attr("url", "/api/activate");
    $("#acode-tr").show();
    $("#dcode-tr").hide();
}

function view_deactivate (data) {
    $("#submit").text("DEACTIVATE");
    $("#submit").attr("url", "/api/deactivate");
    $("#acode-tr").hide();
    $("#dcode-tr").show();
}

function view_reset (data) {
    $("#submit").text("RESET");
    $("#submit").attr("url", "/api/reset");
    $("#acode-tr").hide();
    $("#dcode-tr").hide();
}
