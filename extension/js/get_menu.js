/**
 * Created by Ruben on 1/24/14.
 */
var now = new Date();
var hours = now.getHours();
var day = now.getDay();
var leftIsDisabled = true;
var rightIsDisabled = false;

if(hours < 11 && day > 0 && day < 6)
    $('#meal').val('Breakfast');
else if(hours < 14) {
    if(day === 0 || day === 6)
        $('#meal').val('Brunch');
    else
        $('#meal').val('Lunch');
}
else $('#meal').val('Dinner');
load_menu();
$('body').keyup(function(e) { 
    if(e.which == 37) $('#back').trigger('click'); //Left Arrow
    else if(e.which == 39) $('#forward').trigger('click'); //Right Arrow
    else if(e.which == 77) $('#unit').val('48').trigger('change'); //M for Moulton
    else if(e.which == 84) $('#unit').val('49').trigger('change'); //T for THorne
});
$('#meal,#unit').change(function(){
    load_menu();
});
$('#hoursLink').click(function(){
    $('.menus').slideToggle();
    $('.hours').slideToggle();
		if($('#hoursLink').hasClass('ion-ios7-clock')) {
				$('#hoursLink').addClass('ion-fork').removeClass('ion-ios7-clock');
				$('select, #forward, #back').attr('disabled', true);
		}
		else {
				$('#hoursLink').addClass('ion-ios7-clock').removeClass('ion-fork');
				$('select').removeAttr('disabled');
				if(!leftIsDisabled)  $('#back').removeAttr('disabled');
				if(!rightIsDisabled) $('#forward').removeAttr('disabled');
		}
});
$('#back').click(function(){
    if($('#days').val() > 0) {
				if($('#days').val() == 1) {
						$('#back').attr('disabled', true);
						leftIsDisabled = true;
				}
				if($('#days').val() == 6) {
						$('#forward').removeAttr('disabled');
						rightIsDisabled = false;
				}
        $('#days').val($('#days').val() - 1);
        load_menu();
    }
});
$('#forward').click(function(){
    if($('#days').val() < 6) {
				if($('#days').val() == 0) {
						$('#back').removeAttr('disabled');
						leftIsDisabled = false;
				}
				if($('#days').val() == 5) {
						$('#forward').attr('disabled', true);
						rightIsDisabled = true;
				}
        $('#days').val(parseInt($('#days').val())+parseInt(1));
        load_menu();
    }
});
function load_menu() {
		var d2 = new Date(now);
		d2.setDate(d2.getDate() + parseInt($('#days').val()));
		var year 	= d2.getFullYear();
		var month = d2.getMonth();
		var day 	= d2.getDate();
		var stringDay = day_of_week(d2.getDay());
		$('.menus').html('<div class="spinner">B</div>');
		$.get('http://bowdoin-dining.herokuapp.com/extension/get_menu.php', 
					{ meal: $('#meal').val(), unit: $('#unit').val(), mo: month, dy: day, yr: year })
		 .done(function(data) {	
				var clean = $('<div>'+data.replace(/script/g, "noscript")+'</div>');
				clean.find('noscript, strong, hr, meta, title, div, style, p').remove();
				$('.menus').html('<h2 style=margin-top:5px>'+stringDay+'</h2>').append(clean);
		 });
}
function day_of_week(i) {
    var day;
    switch(i) {
        case 0:
            day = 'Sunday';
            break;
        case 1:
            day = 'Monday';
            break;
        case 2:
            day = 'Tuesday';
            break;
        case 3:
            day = 'Wednesday';
            break;
        case 4:
            day = 'Thursday';
            break;
        case 5:
            day = 'Friday';
            break;
        case 6:
            day = 'Saturday';
            break;
    }
    return day;
    
}