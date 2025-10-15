
$( document ).ready(function() {
	
	// Eliminamos el evento click del combobox
	$('.removeClick').click(function(e) {
		e.stopPropagation();
	});

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    
    bootbox.setDefaults({
	  locale: "es"
	});

	//buttons
	if($.fn.editableform) {
		$.fn.editableform.buttons = 
			'<button type="submit" class="btn btn-primary btn-xs editable-submit">'+
			'<i class="glyphicon glyphicon-floppy-disk"></i>'+
			'</button>'+
			'<button type="button" class="btn btn-default btn-xs editable-cancel">'+
			'<i class="glyphicon glyphicon-remove"></i>'+
			'</button>';   
	}

	// for popups
	if(window.opener) {
		$('#cmd_return').css('visibility', 'hidden');
	}

	if(localStorage.getItem("close") == "1") {
		if($('.alert.alert-success').length > 0) {
			localStorage.removeItem("close");
			setTimeout(function(){
				window.close();
			}, 1000);
		}
	}
});
