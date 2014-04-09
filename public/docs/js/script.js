
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	var viewportmeta = document.querySelector('meta[name="viewport"]');
	if (viewportmeta) {
		viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
		document.body.addEventListener('gesturestart', function () {
			viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
		}, false);
	}
}

	var result;
	var selection = '$';
	var $anchor;

$(window).load(function(){
	var pathname = document.location.pathname.substring(1);
	var parts = pathname.split(/\//);
	if (parts.length > 1 ) {
		result = parts[1];
	}
	var hashId = window.location.hash.replace('#', '');
	if (hashId.indexOf("$") >= 0) {
		$('#footer').find('input.selectBox').trigger('click');
		hashId = hashId.replace('$', '');
		setTimeout(function(){
			$anchor = $(document.getElementById(hashId));
			$anchor.trigger('click'); }, 1000);
	} else {
		$anchor = $(document.getElementById(hashId));
		setTimeout(function(){ $anchor.trigger('click'); }, 200);
	}
	return false;
});

var $data = $('#data'),
	sources,
	current_next,
	current_prev,
	prev_proj,
	next_proj,
	$this = $('#repotitle'),
	objects,
	lastObject,
	counter,
	maxCount = 1,
	num = 1,
	number = 1,
	iframe,
	$this,
	$this_child,
	movingObject,
	projectShown,
	childShown;
	
jQuery(document).ready(function() {
	// images order
	$data.find('tr.expand-child').each(function(){
		var images = $(this).find('ul');
		images.children('li.image').each(function(i,li){images.prepend(li);});
		if ( $(this).find('li.embed').length) { $(this).find('.embed').prependTo($(this).find('ul')); }
	});

	jQuery("img.lazy").lazy({

			threshold: 20000,
			combined: true,
			delay: 3000,
			enableThrottle: true,
			throttle: 800,
			visibleOnly: true,

		afterLoad: function(element) {
			element.removeClass("lazy");
		},
		onError: function(element) {
			var errorSrc = element.attr("data-src");
			element.attr("src",errorSrc).removeClass("lazy");
		}

	});

	// Load icons
	$data.find('tr.project').each(function(){
		var tags = $(this).find('td.tags').text().toLowerCase();
		if (tags.indexOf(',') >= 0) {
			var tagLine = tags.split(',');
			tags = tagLine[0];
		}
		tags += ".png";
		$(this).find('img.icon').attr("src", "./public/docs/icons/gray/"+tags);
		setTimeout(function(){ 
			$("img.icon").error(function(){
				$(this).attr( "src", "./public/docs/icons/gray/blank.png" );
			},500);
		});
	});

	$data.find('tr.selected').each(function(){
		var tags = $(this).find('td.tags');
		tags.append('<span class="star" title="selected project">•</span>');
	});

	$('div.blog').each(function(){
		var texte = $(this);
		texte.html(texte.html().replace(/\n/g,'<br/>'));
	});

	$data.find('div.child').each(function(){
		if ($(this).find('div.blog').length !== 0){
			$(this).find('div.gallery').remove();
		}
		var firstImg = $(this).find('ul li:first-child').find('img.lazy');
		var firstSrc = firstImg.attr("data-src");
			setTimeout(function(){ firstImg.attr("src",firstSrc).removeClass("lazy")},1000);
	});
	// hide informations
	$('#footer').find('input.infoBox').trigger('click');
});

// Hide Before Load
$(document).ready(function() {
	$data.find('tr.project').addClass("hidden");
	$data.find('tr.expand-child').find('.child').hide().addClass("hidden");
	$('#about').hide();
	$data.find('div.infoSquare').hide().addClass('hidden');
	$('#otherProjects').hide();
	$('#aboutButton').addClass("aboutHidden");
	$(".hideBeforeLoad").removeClass("hideBeforeLoad");
	return false;
});

$(document).ready(function(){
	var monthDelay = 9;

	var d = new Date();
	var curr_day = ('0' + d.getDate()).slice(-2);
	var curr_month = ('0' + (d.getMonth() + 1)).slice(-2); //Months are zero based
	var curr_year = d.getFullYear();
	var today = curr_day + "-" + curr_month + "-" + curr_year;
	var exp_date;

	if (curr_month < monthDelay) {
		exp_date = (curr_year - 1) + ("0" + (curr_month + 13 - monthDelay)).slice(-2) + curr_day;
	} else {
		exp_date = curr_year + ("0" + (curr_month - monthDelay)).slice(-2) + curr_day;
	}

	var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	
	$data.find('tr.project').find('.dates').each(function(index) {
		var project_date = $(this).text().split("-").join(" ");
		var p_date = new Date(project_date);
		var p_day = ('0' + p_date.getDate()).slice(-2);
		var p_month = ('0' + (p_date.getMonth() + 1)).slice(-2);
		var p_year = p_date.getFullYear();
		var each_date = (p_year + p_month + p_day);
		if( each_date > exp_date ){
			$(this).append('<span class="new" > [NEW]</span>');
			}
	});

});

var	id,
	surplus,
	superSurplus,
	verticalOffset,
	textOffset = 72,
	textHeight = ($data.find('div.gallery').height()) - 100,
	divText = $data.find('div.gallery').find('div.text div.contenu'),
	COMT = parseInt(divText.css('margin-top').replace('px', '')),
	COMB = parseInt(divText.css('margin-bottom').replace('px', '')),
	COPT = parseInt(divText.css('padding-top').replace('px', '')),
	COPB = parseInt(divText.css('padding-top').replace('px', '')),
	contenuOffset = COMT+COMB+COPT+COPB;

// Find all YouTube videos
var $allVideos = $("iframe.video");
var frameRatio = 0.9;

// Figure out and save aspect ratio for each video
$allVideos.each(function() {
	$(this)
		.data('aspectRatioW', this.width / this.height)
		.data('aspectRatioH', this.height / this.width)

		// and remove the hard coded width/height
		.removeAttr('height')
		.removeAttr('width');
});

$(document).ready(function(){ setTimeout(function(){ $(window).resize(); },400); });

$(window).bind("load resize", function() {

	surplus = (($data.find('tr.project:first').height()+2)*4) + $('#footer').height()-3;
	superSurplus = surplus + 35;
	verticalOffset = ($data.find('tr.project:first').height()-1) ;

	clearTimeout(id);
	function doneResizing(){

		if (($(window).height()) < 340) {
			$data.find('div.gallery').height(150);
			$data.find('div.gallery li').height(150);
			$data.find('div.text-box').css('max-height', (150-textOffset));
			$data.find('div.objectContent').height(124);
			$data.find('div.contenu').css('max-height',((150-textOffset)-contenuOffset));
		} else {
			$data.find('div.gallery').height($( window ).height()-surplus);
			$data.find('div.gallery li').height($( window ).height()-surplus);
			textHeight = $(window).height()-surplus-textOffset;
			$data.find('div.text-box').css('max-height', textHeight);
			$data.find('div.objectContent').height($( window ).height()-superSurplus);
			$data.find('div.contenu').css('max-height',(textHeight-contenuOffset));
		}

		var newHeight = ($( window ).height()-surplus)*frameRatio;
		var newWidth = $('body').width()*frameRatio;

		// Resize all videos according to their own aspect ratio
		$allVideos.each(function() {
			var $el = $(this);
			if ($el.width() >= newWidth - 20){
				$el
				.height(newWidth * $el.data('aspectRatioH'))
				.width(newWidth);
			} else {
				$el
				.height(newHeight)
				.width(newHeight * $el.data('aspectRatioW'));
			}
		});
	}
	id = setTimeout(doneResizing, 30);
});

// About section
$('#aboutButton').on('click',function(event){
	$('#about').slideToggle("slow");
	if ($(this).hasClass("aboutShown")) {
		$(this).removeClass("aboutShown").addClass("aboutHidden").text("About");
	} else {
		$(this).removeClass("aboutHidden").addClass("aboutShown").text("Close");
	}
});
	
$data.on('click','th',function(event){
	setTimeout(function(){
		prev_proj = $('.shown').prevAll('tr.project:first');
		next_proj = $('.shown').nextAll('tr.project:first');
	},100);
});

$('#keyboard').bind({
	'click': function() {
		$(this).toggleClass( "noKeyboard" );
		var src = ($(this).attr('src') === 'keyboardNot.gif')
			? 'keyboardOk.gif'
			: 'keyboardNot.gif';
		$(this).attr('src', src);
		var title = ($(this).attr('title') === 'keyboard navigation disabled')
			? 'keyboard navigation enabled'
			: 'keyboard navigation disabled';
		$(this).attr('title', title);
	}
});


$(document).on('keydown',function(event) {
	if ($('#keyboard').hasClass("noKeyboard")) { /*do nothing*/ } else {
		var key = event.which;
		if(key === 27) { // Escape key
			if($("#aboutButton").hasClass("aboutShown")){
				$('#footer span.aboutShown').trigger('click');
				setTimeout(function(){
					$this = $('#repotitle');
				},400);
			} else {
				if ($this_child.find('.text.object').hasClass("infoShown")){
					$this_child.find('.cross').trigger('click');
				} else {
					$data.find('tr.shown').trigger('click');
					setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': 0 }, { duration: 310, queue: false });},240);
					setTimeout(function(){
						$this = $('#repotitle');
					},400);
					return false;
				}
			}
		}
		if(key === 37) { // Left arrow key
			if ($($this).hasClass('top') === false ) {
				$(current_prev).trigger('click');
			}
			return false;
		}
		if(key === 39) { // Right arrow key
			if ($($this).hasClass('top') === false ) {
				$(current_next).trigger('click');
			}
			return false;
		}
		if(key === 38) { // Up arrow key
			if($('#footer').find('input.selectBox').is(":checked")) {
				if ( $($this).hasClass('selectedFirst')) {
					$data.find('tr.shown').trigger('click');
					setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': 0 }, { duration: 310, queue: false });},240);
					setTimeout(function(){
						$this = $('#repotitle');
						window.location.hash = '';
					},400);
				} else {
					if ($($this).hasClass('top') === true ) {
						$data.find('tr.selected:last').prev().trigger('click');
					} else {
						$($this).find('td.sizes').text(maxCount);
						$(prev_proj).trigger('click');
					}
				}
			} else {
				if ( $($this).is('tr.project:first-child')) {
					$data.find('tr.shown').trigger('click');
					setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': 0 }, { duration: 310, queue: false });},240);
					setTimeout(function(){
						$this = $('#repotitle');
						window.location.hash = '';
					},400);
				} else {
					if ($($this).hasClass('top') === true ) {
						$data.find('tr:last-child').prev().trigger('click');
					} else {
						$($this).find('.sizes').text(maxCount);
						$(prev_proj).trigger('click');
					}
				}
			}
			event.preventDefault();
		}
		if(key === 40 || key === 32) { // Down arrow key OR spacebar
			if($('#footer').find('input.selectBox').is(":checked")) {
				if ($($this).hasClass('top') === true ) {
					$data.find('tr.selected:first').trigger('click');
				} else {
					if ($($this).next().is('.selected:last')) {
						$data.find('tr.shown').trigger('click');
						setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': 0 }, { duration: 310, queue: false });},240);
						setTimeout(function(){
							$this = $('#repotitle');
							window.location.hash = '';
						},400);
					} else {
						$($this).find('td.sizes').text(maxCount);
						$(next_proj).trigger('click');
					}
				}
			} else {
				if ($($this).hasClass('top') === true ) {
					$('tr.project:first-child').trigger('click');
				} else {
					if ($($this).next().is(':last-child')) {
						$data.find('tr.shown').trigger('click');
						setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': 0 }, { duration: 310, queue: false });},240);
						setTimeout(function(){
							$this = $('#repotitle');
							window.location.hash = '';
						},400);
					} else {
						$($this).find('td.sizes').text(maxCount);
						$(next_proj).trigger('click');
					}
				}
			}
			event.preventDefault();
		}
	}
});

$data.on('click','th',function(event){
	setTimeout(function(){
		if($('#footer').find('input.selectBox').is(":checked")) {
			$data.find('tr.selectedFirst').removeClass('selectedFirst');
			$data.find('tr.selected:first').addClass('selectedFirst');
			$data.find('tr.selectedLast').removeClass('selectedLast');
			$data.find('tr.selected:last').prev().addClass('selectedLast');
		}
	},20);
});


// PROJECT CLICK
$data.on('click', 'tr.project', function(event){

	var hash = $(this).attr('id');
	var id = hash.replace(/^.*#/, '');
	var elem = document.getElementById(id);
	elem.id = id+'-tmp';
	window.location.hash = hash;
	elem.id = id;
	
	$this = $(this);
	$this_child = $this.nextUntil('tr.project');
	current_next = $this_child.find('div.next-image');
	current_prev = $this_child.find('div.previous-image');
	movingObject = $this_child.find("ul li:first-child");
	projectShown = $data.find('tr.project.shown');
	childShown = projectShown.nextUntil('tr.project');

	if($this_child.find('iframe.video').length){
		iframe = $this_child.find('iframe.video');
		sources = iframe.attr('data-src');
	}
	
	if($('#footer').find('input.selectBox').is(":checked")) {
		$('tr.selectedFirst').removeClass('selectedFirst');
		$('tr.selected:first').addClass('selectedFirst');
		$('tr.selectedLast').removeClass('selectedLast');
		$('tr.selected:last').prev().addClass('selectedLast');
		prev_proj = $(this).prevAll('tr.project.selected:first');
		next_proj = $(this).nextAll('tr.project.selected:first');
	} else {
		prev_proj = $(this).prevAll('tr.project:first');
		next_proj = $(this).nextAll('tr.project:first');
	}

	if($('#footer').find('input.infoBox').is(":checked")) {
		setTimeout(function(){
			$data.find('div.text.object.hidden').show();
			$data.find('div.infoSquare').hide();
		}, 500);
	} else {
		setTimeout(function(){
			$data.find('div.text.object.infoShown').hide();
			$data.find('div.infoSquare').show();
		}, 500);
	}

	$data.on('click','.cross',function(event){
		$this_child.find('.text.object').fadeOut(200).addClass('hidden').removeClass('infoShown');
		$data.find('div.infoSquare').fadeIn(200);
	});
	$data.on('click','.infoSquare',function(event){
		$this_child.find('.text.object').fadeIn(200).removeClass('hidden').addClass('infoShown');
		$data.find('div.infoSquare').fadeOut(200);
	});

	//img count
	objects = $this_child.find("div.gallery ul").children('li.object');
	lastObject = childShown.find("div.gallery ul").children('li.object');
	maxCount = objects.length;
	counter = $(this).find('td.sizes');


	if($(this).hasClass("hidden")){
		$this_child.find('.text.object').addClass('infoShown');
		var lastCount = childShown.find("div.gallery ul").children('li.object').length;
		projectShown.find('td.sizes').text(lastCount);
		setTimeout(function(){ for (var i=2; i<=lastCount; i++){ $("#n-"+i).insertAfter("#n-"+(i-1)); } lastObject.removeAttr('id'); }, 250);
		childShown.find('div.child.shown').stop(false, true).slideUp(200);
		$('.shown').removeClass("shown").addClass( "hidden" );
		if($('#footer').find('input.selectBox').is(":checked")) {
			setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, { duration: 310, queue: false });},240);
		} else {
			setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, { duration: 310, queue: false });},240);
		}
		$this.removeClass("hidden").addClass( "shown" );
		$this_child.find('.child').stop(false, false).delay(180).stop(true, false).slideToggle(300).removeClass( "hidden" ).addClass( "shown" );
		setTimeout(function(){
			$(objects).each(function (i) { number = i+1; $(this).attr('id', 'n-'+number); });
			if ( $data.find('iframe.play').length) {
				setTimeout(function(){ $data.find('iframe.play').removeClass('play').attr('src', '').addClass('stop');}, 500);
			}
			setTimeout(function(){
				if ( $this_child.find('iframe.video').length) { if ( iframe.is(':first-child') === true ) { iframe.removeClass('stop').attr('src', sources).addClass('play'); }}
			}, 600);
		}, 400);
		num = 1;
		if ( maxCount <=1 ) {
			counter.text("1");
		} else {
			counter.text(num+"/"+maxCount);
		}
		$('#cale').animate({'height': $('.gallery').height() }, 180).animate({'height': 39 }, 300);

	}else{
		$data.find('div.child.shown').stop(false, true).slideUp(200);
		$this.removeClass("shown").addClass( "hidden" );
		$this_child.find('div.child').removeClass( "shown" ).addClass( "hidden" );
		setTimeout(function(){
			for (var i=2; i<=maxCount; i++){ $("#n-"+i).insertAfter("#n-"+(i-1)); } $(objects).removeAttr('id');
			if ( $this_child.find('iframe.video').length) { setTimeout(function(){  iframe.removeClass('play').attr('src', '').addClass('stop');}, 200); }
		}, 450);

		$this = $('#repotitle');

		num = 1;
		if ( maxCount <=1 ) {
			counter.text("1");
		} else {
			counter.text(maxCount);
		}
	}
});

$data.on('click', 'ul', function(){
	current_next.trigger('click');
});

$data.on('click','.related',function(e){
	var related = $(this).children().attr('href').replace('#', '');
	$("#"+related).trigger('click');
	e.preventDefault();
});


/*	var objIndex = waitingObject.index()+1;
	var animationRatio = 400 //3000*objIndex;
	if (movingObject.hasClass('moving') === true ){
		waitingObject.addClass("moving").animate({"margin-left": - $(this).parent().width()}, animationRatio);
		setTimeout( function(){
			if (movingObject.css("margin-left").replace('px', '') === marginLeft) {
				movingObject.appendTo(movingObject.parent());
				$('.moving').removeClass("moving");
				$('.object').css("margin-left", 0);
			}
		}, animationRatio);
	} else {
	movingObject.addClass("moving").animate({"margin-left": - $(this).parent().width()}, animationRatio);
		setTimeout( function(){
			if (movingObject.css("margin-left").replace('px', '') <= marginLeft/2) {
				movingObject.appendTo(movingObject.parent()).removeClass("moving");
				$('.object').css("margin-left", 0);
			}
		}, animationRatio);
	}

	setTimeout(function(){
		$(this).parent().find(".object").each(function(){
			if ($(this).css("margin-left").replace('px', '') === marginLeft) {
				$(this).appendTo($(this).parent());
				$('.moving').removeClass("moving");
				$(this).css("margin-left", 0);
			}
		});
	}, animationRatio); */

$data.on('click','.next-image',function(){
	if ( maxCount <=1 ) {
		setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, { duration: 310, queue: false });},240);
		counter.text("1");
		movingObject = $(this).parent().find("ul li:first-child");
		movingObject.stop(true, false).animate({"margin-left": -25}, 100).animate({"margin-left": 10}, 200).animate({"margin-left": 0}, 100);
	} else {
		setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, { duration: 310, queue: false });},240);
		movingObject = $(this).parent().find("ul li:first-child");
		var marginLeft = 0 - $('body').width();

		movingObject.animate({"margin-left": - $(this).parent().width()}, 400).queue( function(next){
				if (movingObject.css("margin-left").replace('px', '') == marginLeft) {
					movingObject.appendTo(movingObject.parent());
					$('.object').css("margin-left", 0);
				}
			next();
		});
		num = parseInt($(this).parent().find("li").eq(1).attr('id').match(/n-(\d+)/)[1], 10);
		counter.text(num+"/"+maxCount);

		if ( $this_child.find('iframe.video').length) {
			setTimeout(function(){ if ( iframe.parent().is(':first-child') === true ) { iframe.removeClass('stop').attr('src', sources).addClass('play'); } else { iframe.removeClass('play').attr('src', '').addClass('stop'); } }, 600);
		}
	}
});

$data.on('click','.previous-image',function(){
	if ( maxCount <=1 ) {
		setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, { duration: 310, queue: false });},240);
		counter.text("1");
		movingObject = $(this).parent().find("ul li:last-child");
		movingObject.stop(true, false).animate({"margin-left": 25}, 100).animate({"margin-left": -10}, 200).animate({"margin-left": 0}, 100);
	} else {
		setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, { duration: 310, queue: false });},240);
		movingObject.stop();
		movingObject = $(this).parent().find("ul li:last-child");
		movingObject.prependTo($(this).parent().find("ul")).css("margin-left", - $(this).parent().width()).stop().animate({"margin-left": 0}, 400).queue( function(next){
				movingObject.css("margin-left", 0);
				next();
			});
			num = parseInt($(this).parent().find("ul li:first-child").attr('id').match(/n-(\d+)/)[1], 10);
		counter.text(num+"/"+maxCount);

		if ( $this_child.find('iframe.video').length) {
			setTimeout(function(){ if ( iframe.parent().is(':first-child') === true ) {  iframe.removeClass('stop').attr('src', sources).addClass('play'); } else { iframe.removeClass('play').attr('src', '').addClass('stop'); }}, 600);
		}
	}
});

function selectionChanged() {
	if($('#footer').find('input.selectBox').is(":checked")) {
		$data.find('tr.selectedFirst').removeClass('selectedFirst');
		$data.find('tr.shown').trigger('click');
		setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': 0 }, { duration: 310, queue: false });},1000);

		var elements = $data.find('tr.archived');
		var index = 0;
		var longueur = elements.length +1;
		$('#otherProjects').find('span').text(longueur-1);

		$('#otherProjects').unbind('click').on('click',function(e){
			$('#footer').find('input.selectBox').trigger('click');
			e.stopPropagation();
			e.preventDefault();
			return false;
		});

		var interval = setInterval(function () {
			elements.eq(index).hide(200);
			index++;
		}, 20);
		setTimeout(function(){
			$('#otherProjects').delay(200).fadeIn(200);
			clearInterval(interval);
			$this = $('#repotitle');
			window.location.hash = '$';
		}, 20*(longueur*2));

	} else {
		selection = '';
		$data.find('tr.selectedFirst').removeClass('selectedFirst');
		$data.find('tr.shown').trigger('click');
		setTimeout(function(){$('html,body').stop(false, false).animate({'scrollTop': 0 }, { duration: 310, queue: false });},1000);

		$('#otherProjects').fadeOut(200);
		setTimeout(function(){
			var elements = $data.find('tr.archived');
			var index = 0;
			var longueur = elements.length +1;
			var interval = setInterval(function () {
				elements.eq(index).show(200);
				index++;
			}, 20);
			setTimeout(function(){
				clearInterval(interval);
				$this = $('#repotitle');
				window.location.hash = '';
			}, 20*(longueur*2));
		},200);
	}
}


function infoChanged() {
	if($('#footer').find('input.infoBox').is(":checked")) {
		$data.find('div.text.object.hidden').fadeIn(200).removeClass('hidden').addClass('infoShown');
		$data.find('div.infoSquare').fadeOut(200);
	} else {
		$data.find('div.text.object').fadeOut(200).addClass('hidden').removeClass('infoShown');
		$data.find('div.infoSquare').fadeIn(200);
	}
}

/*
$('.titres').mouseover(function() {
	$('#thumber').show();
	var thumb = $(this).parent().find('.thumb').attr('src');
	$('#thumber').children().attr('src', thumb)
	e.preventDefault();
});

$('.titres').mouseleave(function() {
	$('#thumber').hide();
});


$('.titres').bind('mousemove', function(e){
$('#thumber').offset({
	left: e.pageX +15,
	top: e.pageY +20
	});
});

*/

/*
jQuery('.gallery').on('swipeleft', function(e) {
	$(current_prev).trigger('click');
})
jQuery('.gallery').on('swiperight', function(e) {
	$(current_prev).trigger('click');
});
*/

/*
$(function() {
	$(".gallery").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
				$(current_next).trigger('click');
				//$(".gallery .gallery-navigation").click(function(){ return false; });
				//$(".gallery .gallery-navigation").click(false);
				$(".previous-image").unbind( "click", event );
				//event.preventDefault();
				//event.stopImmediatePropagation();
				console.log('swipe next');
				//$(".previous-image").bind( "click", event );
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
				$(current_prev).trigger('click');
				$(".next-image").click(function(){ return false; });
				$(".next-image").click(false);
				$(".next-image").unbind( "click", event );
			event.preventDefault();
				event.stopImmediatePropagation();
				console.log('swipe previous');
				//$(".next-image").bind( "click", event );
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold: 75
	});
});
*/

/*
// touch event
$(document).ready(function(){
	$(document).on('swipeleft swiperight swipedown swipeup',function(event, data){
	event.stopImmediatePropagation();
		jQuery(".gallery .previous-image .next-image").click(function(){ return false; });
	alert('(document).Stop prop: You just ' + event.type + 'ed!');
	event.preventDefault();
	});
});

$(".gallery").on("swiperight",function(event, data){
	jQuery(".gallery .previous-image .next-image").click(function(){ return false; });
	event.stopImmediatePropagation();
	$(current_prev).trigger('click');
	event.stopImmediatePropagation();
});

$(".gallery").on("swipeleft",function(event, data){
	jQuery(".gallery .previous-image .next-image").click(function(){ return false; });
	event.stopImmediatePropagation();
	$(current_next).trigger('click');
	event.stopImmediatePropagation();
});
*/