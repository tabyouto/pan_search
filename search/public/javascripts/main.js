(function () {
    'use strict';
    var params = {
        "sugSubmit": false
    };
    BaiduSuggestion.bind("search", params);
    $(function () {
	    $('#search').focus();
	    document.forms[0].onsubmit = function (e) {
		    e.preventDefault();
		    if (!$('#search').val()) {
			    $('#search').focus();
			    return false;
		    }
		    var url = '/s/' + encodeURIComponent($('#search').val());
		    window.location = url;
		    return false;
	    };
    });


	function mouseHover() {
		$('.hothead a').on('mouseover',function() {
			$(this).addClass('current').siblings().removeClass('current');
			$('.hot-resources').find('ul').eq($(this).data('id')-1).removeClass('hide').siblings('ul').addClass('hide');
		})
	}

	mouseHover()




})()