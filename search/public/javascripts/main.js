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






})()