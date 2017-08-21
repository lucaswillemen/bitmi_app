function ClearForm(id) {
    $(id)[0].reset()
    $(id).data('formValidation').resetForm();
    $('.form-group').each(function() {
        $(this).addClass('is-empty');
    })
}

function CheckInputs() {
	setTimeout(function() {
    $('input[value!=""]').each(function() {
        if ($(this).val() != "") {
        		$(this).trigger('change')
        }
    });
		
	}, 10);
}