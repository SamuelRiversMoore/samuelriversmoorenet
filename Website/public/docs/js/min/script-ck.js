
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
		$('.selectBox').trigger('click');
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

var sources,
	current_next,
	current_prev,
	prev_proj,
	next_proj,
	current_proj = $('#repotitle'),
	objects,
	lastObject,
	counter,
	maxCount = 1,
	num = 1,
	number = 1,
	iframe,
	sources,
	$this;
	
jQuery(document).ready(function() {
	// images order
	$('#data').find('.child').each(function(){
		var images = $(this).find('ul');
		images.children('.image').each(function(i,li){images.prepend(li);});
		if ( $(this).find('.embed').length) { $(this).find('.embed').prependTo($(this).find('ul')); }
	});

	jQuery(".lazy").lazy({

			threshold: 20000,
			combined: true,
			delay: 3000,
			enableThrottle: true,
			throttle: 250,

		afterLoad: function(element) {
			element.removeClass("lazy");
		},
		onError: function(element) {
			var errorSrc = element.attr("data-src");
			element.attr("src",errorSrc).removeClass("lazy");
		}

	});

	// Load icons
	$('#data').find('tr.project').each(function(){
		var tags = $(this).find('.tags').text().toLowerCase();
		if (tags.indexOf(',') >= 0) {
			var tagLine = tags.split(',');
			tags = tagLine[0];
			console.log("tag = "+tags);
		}
		tags += ".png";
		$(this).find('.icon').attr("src", "./public/docs/icons/"+tags);
		$(".icon").error(function(){
			$(this).attr( "src", "./public/docs/icons/blank.png" );
		});
	});

	$('#data').find('tr.selected').each(function(){
		var tags = $(this).find('.tags');
		tags.append('<span class="star" title="selected project">•</span>');
	});

	$('.blog').each(function(){
		var texte = $(this);
		texte.html(texte.html().replace(/\n/g,'<br/>'));
	});

	$('.child').each(function(){
		if ($(this).find('.blog').length !== 0){
			$(this).find('.gallery').remove();
		}
	});
});

// Hide Before Load
$(document).ready(function() {
	$('#data').find('tr.project').addClass("hidden");
	$('#data').find('.child').hide().addClass("hidden");
	$('#about').hide();
	$('.infoSquare').hide().addClass('hidden');
	$('#otherProjects').hide();
	$('#aboutButton').addClass("aboutHidden");
	$(".hideBeforeLoad").removeClass("hideBeforeLoad");
	return false;
});

$(document).ready(function(){
	var monthDelay = 6;

	var d = new Date();
	var curr_day = ('0' + d.getDate()).slice(-2);
	var curr_month = ('0' + (d.getMonth() + 1)).slice(-2); //Months are zero based
	var curr_year = d.getFullYear();
	var today = curr_day + "-" + curr_month + "-" + curr_year;
	var exp_date;
	console.log("Today : "+today);

	if (curr_month < monthDelay) {
		exp_date = (curr_year - 1) + ("0" + (curr_month + 13 - monthDelay)).slice(-2) + curr_day;
		console.log("Expiration1 : "+exp_date);
	} else {
		exp_date = curr_year + ("0" + (curr_month - monthDelay)).slice(-2) + curr_day;
		console.log("Expiration2 : "+exp_date);
	}

	$('#data').find('tr.project').find('.dates').each(function(index) {
		var project_date = $(this).text();
		var p_date = new Date(project_date);
		var p_day = ('0' + p_date.getDate()).slice(-2);
		var p_month = ('0' + (p_date.getMonth() + 1)).slice(-2);
		var p_year = p_date.getFullYear();
		var each_date = p_year + p_month + p_day;
		console.log(each_date);

		if( each_date > exp_date ){
			$(this).append('<span class="new" > [NEW]</span>');
			}
	});

	// images nbr
	$('#data').find('tr.project').each(function(){
		var objects = $(this).nextUntil('tr.project').find(".gallery ul").children('.object');
		var maxCount = objects.length;
		if (maxCount <= 1){
			$(this).find('.sizes').text('1');
		} else {
			$(this).find('.sizes').text(maxCount);
		}
	});
});

var	id,
	surplus,
	superSurplus,
	verticalOffset,
	textOffset = 72,
	textHeight = ($('.gallery').height()) - 100,
	COMT = parseInt($('.contenu').css('margin-top').replace('px', '')),
	COMB = parseInt($('.contenu').css('margin-bottom').replace('px', '')),
	COPT = parseInt($('.contenu').css('padding-top').replace('px', '')),
	COPB = parseInt($('.contenu').css('padding-top').replace('px', '')),
	contenuOffset = COMT+COMB+COPT+COPB;

// Find all YouTube videos
var $allVideos = $("iframe");
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

	surplus = (($('tr.project:first').height()+2)*4) + $('#footer').height()-3;
	superSurplus = surplus + 35;
	verticalOffset = $('tr.project:first').height()-1 ;

	clearTimeout(id);
	function doneResizing(){

		if (($(window).height()) < 340) {
			$('.gallery').height(150);
			$('.gallery li').height(150);
			$('.text-box').css('max-height', (150-textOffset));
			$('.objectContent').height(124);
			$('.contenu').css('max-height',((150-textOffset)-contenuOffset));
		} else {
			$('.gallery').height($( window ).height()-surplus);
			$('.gallery li').height($( window ).height()-surplus);
			textHeight = $(window).height()-surplus-textOffset;
			$('.text-box').css('max-height', textHeight);
			$('.objectContent').height($( window ).height()-superSurplus);
			$('.contenu').css('max-height',(textHeight-contenuOffset));
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
	
$('#data').on('click','th',function(event){
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
				$('.aboutShown').trigger('click');
				setTimeout(function(){
					current_proj = $('#repotitle');
					//window.location.hash = '';
				},400);
			} else {
				if (current_proj.nextUntil('tr.project').find('.text.object').hasClass("infoShown")){
					current_proj.nextUntil('tr.project').find('.cross').trigger('click');
				} else {
					$('.shown').trigger('click');
					setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': 0 }, 300);},210);
					setTimeout(function(){
						current_proj = $('#repotitle');
						//window.location.hash = '';
					},400);
					return false;
				}
			}
		}
		if(key === 37) { // Left arrow key
			if ($(current_proj).hasClass('top') === false ) {
				$(current_prev).trigger('click');
			}
			return false;
		}
		if(key === 39) { // Right arrow key
			if ($(current_proj).hasClass('top') === false ) {
				$(current_next).trigger('click');
			}
			return false;
		}
		if(key === 38) { // Up arrow key
			setTimeout(function(){ if ( current_proj.nextUntil('tr.project').find('.video').length) { iframe.attr('src', ''); } },600);
			if($('.selectBox').is(":checked")) {
				if ( $(current_proj).hasClass('selectedFirst')) {
					$('.shown').trigger('click');
					setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': 0 }, 300);},210);
					setTimeout(function(){
						current_proj = $('#repotitle');
						window.location.hash = '';
					},400);
				} else {
					if ($(current_proj).hasClass('top') === true ) {
						$('.selected:last').prev().trigger('click');
					} else {
						$(current_proj).find('.sizes').text(maxCount);
						$(prev_proj).trigger('click');
					}
				}
			} else {
				if ( $(current_proj).is('tr.project:first-child')) {
					$('.shown').trigger('click');
					setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': 0 }, 300);},210);
					setTimeout(function(){
						current_proj = $('#repotitle');
						window.location.hash = '';
					},400);
				} else {
					if ($(current_proj).hasClass('top') === true ) {
						$('tr:last-child').prev().trigger('click');
					} else {
						$(current_proj).find('.sizes').text(maxCount);
						$(prev_proj).trigger('click');
					}
				}
			}
			event.preventDefault();
		}
		if(key === 40 || key === 32) { // Down arrow key OR spacebar
			setTimeout(function(){ if ( current_proj.nextUntil('tr.project').find('.video').length) { iframe.attr('src', ''); } },600);
			if($('.selectBox').is(":checked")) {
				if ($(current_proj).hasClass('top') === true ) {
					$('.selected:first').trigger('click');
				} else {
					if ($(current_proj).next().is('.selected:last')) {
						$('.shown').trigger('click');
						setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': 0 }, 300);},210);
						setTimeout(function(){
							current_proj = $('#repotitle');
							window.location.hash = '';
						},400);
					} else {
						$(current_proj).find('.sizes').text(maxCount);
						$(next_proj).trigger('click');
					}
				}
			} else {
				if ($(current_proj).hasClass('top') === true ) {
					$('tr.project:first-child').trigger('click');
				} else {
					if ($(current_proj).next().is(':last-child')) {
						$('.shown').trigger('click');
						setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': 0 }, 300);},210);
						setTimeout(function(){
							current_proj = $('#repotitle');
							window.location.hash = '';
						},400);
					} else {
						$(current_proj).find('.sizes').text(maxCount);
						$(next_proj).trigger('click');
					}
				}
			}
			event.preventDefault();
		}
	}
});

$('#data').on('click','th',function(event){
	setTimeout(function(){
		if($('.selectBox').is(":checked")) {
			$('.selectedFirst').removeClass('selectedFirst');
			$('.selected:first').addClass('selectedFirst');
			$('.selectedLast').removeClass('selectedLast');
			$('.selected:last').prev().addClass('selectedLast');
		}
	},20);
});

$('#data').on('click', 'tr.project', function(event){

	var hash = $(this).attr('id');
	var id = hash.replace(/^.*#/, '');
	var elem = document.getElementById(id);
	elem.id = id+'-tmp';
	window.location.hash = hash;
	elem.id = id;

	iframe = $(this).nextUntil('tr.project').find('.video');
	sources = iframe.attr('data-src');
	
	current_proj = $(this);
	current_next = $(this).nextUntil('tr.project').find('.next-image');
	current_prev = $(this).nextUntil('tr.project').find('.previous-image');

	if($('tr.selectBox').is(":checked")) {
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

	$('.first').removeClass('.first');
	$('.last').removeClass('.last');
	$('.text.object').removeClass('infoShown');

	if($('.infoBox').is(":checked")) {
		setTimeout(function(){
			$('.text.object.hidden').show();
			$('.infoSquare').hide();
		}, 500);
	} else {
		setTimeout(function(){
			$('.text.object.infoShown').hide();
			$('.infoSquare').show();
		}, 500);
	}

	$('#data').on('click','.cross',function(event){
		current_proj.nextUntil('tr.project').find('.text.object').fadeOut(200).addClass('hidden').removeClass('infoShown');
		current_proj.nextUntil('tr.project').find('.infoSquare').fadeIn(200);
	});
	$('#data').on('click','.infoSquare',function(event){
		current_proj.nextUntil('tr.project').find('.text.object').fadeIn(200).removeClass('hidden').addClass('infoShown');
		current_proj.nextUntil('tr.project').find('.infoSquare').fadeOut(200);
	});

	//img count
	objects = $(this).nextUntil('tr.project').find(".gallery ul").children('.object');
	lastObject = $('tr.project.shown').nextUntil('tr.project').find(".gallery ul").children('.object');
	maxCount = objects.length;
	counter = $(this).find('.sizes');
	$this = $(this);


	if($(this).hasClass("hidden")){
		current_proj.nextUntil('tr.project').find('.text.object').addClass('infoShown');
		var lastCount = $('tr.project.shown').nextUntil('tr.project').find(".gallery ul").children('.object').length;
		$('tr.project.shown').find('.sizes').text(lastCount);
		setTimeout(function(){ for (i=2; i<=lastCount; i++){ $("#n-"+i).insertAfter("#n-"+(i-1)); } $(lastObject).removeAttr('id'); }, 250);
		$('.child.shown').stop(false, true).slideUp(200);
		$('.shown').removeClass("shown").addClass( "hidden" );
		if($('.selectBox').is(":checked")) {
			setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, 300);},210);
		} else {
			setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, 300);},210);
		}
		$(this).removeClass("hidden").addClass( "shown" );
		$(this).nextUntil('tr.project').find('.child').stop(false, false).delay(180).stop(true, false).slideToggle(300).removeClass( "hidden" ).addClass( "shown" );
		setTimeout(function(){
			$(objects).each(function (i) { number = i+1; $(this).attr('id', 'n-'+number); });
			$('.video').attr('src', '');
			if ( current_proj.nextUntil('tr.project').find('.video').length) { if ( iframe.is(':first-child') === true ) { iframe.attr('src', sources); }}
		}, 400);
		num = 1;
		if ( maxCount <=1 ) {
			counter.text("1");
		} else {
			counter.text(num+"/"+maxCount);
		}
		$('#cale').animate({'height': $('.gallery').height() }, 180).animate({'height': 39 }, 300);

	}else{
		$('#data').find('.child.shown').stop(false, true).slideUp(200);
		$(this).removeClass("shown").addClass( "hidden" );
		$(this).nextUntil('tr.project').find('.child').removeClass( "shown" ).addClass( "hidden" );
		setTimeout(function(){
			for (i=2; i<=maxCount; i++){ $("#n-"+i).insertAfter("#n-"+(i-1)); } $(objects).removeAttr('id');
			if ( $(this).nextUntil('tr.project').find('.video').length) { iframe.attr('src', ''); }
		}, 450);

		current_proj = $('#repotitle');
		//window.location.hash = '';

		num = 1;
		if ( maxCount <=1 ) {
			counter.text("1");
		} else {
			counter.text(maxCount);
		}
	}
});

$('#data').on('click', 'ul', function(){
	$(current_next).trigger('click');
});

$('#data').on('click','.related',function(e){
	var related = $(this).children().attr('href');
	$("#"+related).trigger('click');
	console.log(related);
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

var movingObject = current_proj.nextUntil('tr.project').find("ul li:first-child");

$('#data').on('click','.next-image',function(){
	if ( maxCount <=1 ) {
		setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, 300);},210);
		counter.text("1");
		movingObject = $(this).parent().find("ul li:first-child");
		movingObject.stop(true, false).animate({"margin-left": -25}, 100).animate({"margin-left": 10}, 200).animate({"margin-left": 0}, 100);
	} else {
		setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, 300);},210);
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

		if ( current_proj.nextUntil('tr.project').find('.video').length) {
			setTimeout(function(){ if ( iframe.parent().is(':first-child') === true ) { iframe.attr('src', sources); } else { iframe.attr('src', ''); } }, 600);
		}
	}
});

$('#data').on('click','.previous-image',function(){
	if ( maxCount <=1 ) {
		setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, 300);},210);
		counter.text("1");
		movingObject = $(this).parent().find("ul li:last-child");
		movingObject.stop(true, false).animate({"margin-left": 25}, 100).animate({"margin-left": -10}, 200).animate({"margin-left": 0}, 100);
	} else {
		setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': $this.offset().top - verticalOffset }, 300);},210);
		movingObject.stop();
		movingObject = $(this).parent().find("ul li:last-child");
		movingObject.prependTo($(this).parent().find("ul")).css("margin-left", - $(this).parent().width()).stop().animate({"margin-left": 0}, 400).queue( function(next){
				movingObject.css("margin-left", 0);
				next();
			});
			num = parseInt($(this).parent().find("ul li:first-child").attr('id').match(/n-(\d+)/)[1], 10);
		counter.text(num+"/"+maxCount);

		if ( current_proj.nextUntil('tr.project').find('.video').length) {
			setTimeout(function(){ if ( iframe.parent().is(':first-child') === true ) { iframe.attr('src', sources); } else { iframe.attr('src', ''); }}, 600);
		}
	}
});

function selectionChanged() {
	if($('.selectBox').is(":checked")) {
		$('.selectedFirst').removeClass('selectedFirst');
		$('.shown').trigger('click');
		setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': 0 }, 300);},1000);

		var elements = $('.archived');
		var index = 0;
		var longueur = elements.length +1;
		$('#otherProjects').find('span').text(longueur-1);

		$('#otherProjects').unbind('click').on('click',function(e){
			$('.selectBox').trigger('click');
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
			current_proj = $('#repotitle');
			window.location.hash = '$';
		}, 20*(longueur*2));

	} else {
		selection = '';
		$('.selectedFirst').removeClass('selectedFirst');
		$('.shown').trigger('click');
		setTimeout(function(){$(document.body).stop(false, false).animate({'scrollTop': 0 }, 300);},1000);

		$('#otherProjects').fadeOut(200);
		setTimeout(function(){
			var elements = $('.archived');
			var index = 0;
			var longueur = elements.length +1;
			var interval = setInterval(function () {
				elements.eq(index).show(200);
				index++;
			}, 20);
			setTimeout(function(){
				clearInterval(interval);
				current_proj = $('#repotitle');
				window.location.hash = '';
			}, 20*(longueur*2));
		},200);
	}
}


function infoChanged() {
	if($('.infoBox').is(":checked")) {
		$('.text.object.hidden').fadeIn(200).removeClass('hidden').addClass('infoShown');
		$('.infoSquare').fadeOut(200);
	} else {
		$('.text.object').fadeOut(200).addClass('hidden').removeClass('infoShown');
		$('.infoSquare').fadeIn(200);
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