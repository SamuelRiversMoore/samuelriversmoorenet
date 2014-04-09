$(document).ready(function() {
    $(document).keydown(function(event) {
        var key = event.which;
        if(key == 37) { // Left arrow key
            $('.previous-image').trigger('click');
        }
        if(key == 39) { //Right arrow key
            $('.next-image').trigger('click');
        }
    });
});



$(document).ready(function(){
	$("tbody").bind("keydown", ".project", hoverDown);
});

function hoverDown(e) {
    var curr_tr = $("#data").find(".project").first();
    
    if (e.keyCode == 40) { //down
        if (curr_tr.length == 0) {
			curr_tr = $("#data").find(".project").first();
			curr_tr.trigger('click');
        } else {
            curr_tr.removeClass("selected");
            curr_tr = curr_tr.next(".project");
        }
        curr_tr.addClass("selected");
    } else if (e.keyCode == 38) { //up
        if (curr_tr.length == 0) {
            curr_tr = $("#data").find(".project").last();
			curr_tr.trigger('click');

        } else {
            curr_tr.removeClass("selected");
            curr_tr = curr_tr.prev(".project");
        }
        curr_tr.addClass("selected");       
    } else if (e.keyCode == 13) { //enter
        if (curr_tr.length == 1) {
            window.location = curr_tr.find("a").attr("href");
        }
    }
}

// http://jsfiddle.net/7BcZA/2/
// http://jsfiddle.net/jzvDA/