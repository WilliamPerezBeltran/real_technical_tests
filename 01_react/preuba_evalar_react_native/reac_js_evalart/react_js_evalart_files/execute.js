/**
 * Execute.js
 * @version 1.0
 */
let err = false,
	mandatory_array = [],
	msg = "",
	timeup = false,
	$rootwizard = $('#rootwizard')
	executeErrMsng = {};

$(function() {
	$rootwizard.find('.js-mandatory').each(function(index, el) {
		let $t = $(this);

		$t.find('.js-input, .js-radio input').on('focus', function() {
			$('#tab_li_' + $t.data('page')).removeClass('error');
		});
	});

	let $_modal = $('#myModal'),
		initial_text = $_modal.find('.js-alert').html();

	$_modal.on('show.bs.modal', function() {
		mandatory_array = [];
		err = false;

		$rootwizard.find('.js-mandatory').each(function() {
			let $el = $(this),
				q = $el.data('question'),
				val,
				$input = $el.find('.js-input, .js-radio input'),
				isRanked = $el.find('div[data-sortable="1"]').length;

			switch ($input.attr('type')) {
				case 'checkbox':
					if (isRanked) {
						val = $el.find('input[class="real-js-input"]').val();
						val = val === 'true' ? 'true' : '';
						break;
					}
				case 'radio':
					val = $el.find('input:checked').val();
					break;
				default:
					val = $input.val();
			}

			if (val && val !== "") {
				$('#tab_li_' + q).removeClass('error');
			} else {
				let mandatoryQ = q.split('_');

				mandatory_array.push(mandatoryQ[0]);

				$('#tab_li_' + q).addClass('error');

				err = true;
			}
		});

		if (err && !timeup) {
			msg = execute_lang.requiredQuestions.replace('{#}', mandatory_array.join(', '));

			$('#flashmenu').show();
			$(this).find('.js-alert').html(msg);
			$('#fin, #fin2').hide();
		} else {
			$(this).find('.js-alert').html(initial_text);
			$('#fin, #fin2').show();
		}
	});

    $('#rootwizard').find('.js-input').change(function() {controlTab(this);});
    $("#rootwizard .js-radio .js-btn").click(function() {controlTab($(this).find('input'));});

	let $flashmenu = $('#flashmenu'),
		$flashLeyend = $('#flashLeyend'),
		$icon = $flashLeyend.find('.js-icon');

	$flashLeyend.click(function(e) {
		if ($flashmenu.is(":visible")) {
			$flashmenu.slideUp();
			$icon.removeClass('icon_up');
		} else {
			$flashmenu.slideDown();
			$icon.addClass('icon_up');
		}

		return false;
	});

	$('.labelRadio').click(function(event) {
		if ($(this).children('input:radio').prop("checked")) {
			$(this).children('input:radio').removeAttr("checked");
			$(this).children('input:radio').removeAttr("selected");
			$(this).removeClass("active");

			return false;
		}
	});

	$("#bugsave").submit(function(e) {
		loadingOpen();
		
		try {
			$.ajax({
				type: "POST",
				url: savebug_url,
				data: $("#bugsave").serialize(), // serializes the form's elements.
				success: function (data) {
					loadingClose();

					$("#modalBug").modal('hide');
					$('.bugsuccess').modal('show');
					$("#rbugDetalle").val("");
					// alert("Registro Exitoso!"); // show response from the php script.
				},
				error: function (request, status, error) {
					// alert(request.responseText);
					loadingClose();

					$("#rbugDetalle").val("");
					$("#modalBug").modal('hide');
					// alert("Ocurrio un error al almacenar el registro");
				}
			});
		} catch (err) {
			console.log('Error al realizar el envio por ajax');
		}
		
		e.preventDefault(); // avoid to execute the actual submit of the form.
	});

	$('.answered-by-user').each(function() {
		$('#tab_li_' + $(this).closest('.js-answer_panel').data('question')).addClass('answered');
	});

	// equal height
	$('.js-item').matchHeight();

	/** 
	 * Prevent Copy
	 */
	$('.js-answer_panel .list-group').bind("cut copy", function(e) {
		e.preventDefault();
	});

	$('.js-answer_panel .list-group').on("contextmenu", function(e) {
		e.preventDefault();
		return false;
	});
});

/**
 * 
 * @param {*} input 
 */
function controlTab(input)
{
	let $input = $(input),
		$answer_panel = $input.closest('.js-answer_panel'),
		page = $answer_panel.data('question'),
		type = $input.attr("type"),
		$tab = $('#tab_li_' + page),
		checked = 0;

	switch (type) {
		case 'radio':
			checked = !$input.parent().find('input:radio:checked').length;
			break;
		case 'checkbox':
			checked = $answer_panel.find('input:checked').length;
			break;
		default:
			if ($input.val() !== '') {
				checked = 1;
			}

			break;
	}

	if (checked) {
		$tab.addClass('answered');
		$tab.removeClass('error');
	} else {
		$tab.removeClass("answered");

		if ($answer_panel.hasClass('js-mandatory')) {
			$tab.addClass('error');
		}
	}
}

/**
 * 
 * @param {*} instid 
 * @param {*} questid 
 * @param {*} answer 
 */
function validatequestion(instid, questid, answer, outputOnly, moduleId)
{
	let this_js_script = $('script[src*=execute]'),
		exec_error = this_js_script.attr('data-exec_error'),
		format_error = this_js_script.attr('data-format_error'),
		format_error_tt = this_js_script.attr('data-format_error_tt'),
		format_success_tt = this_js_script.attr('data-format_success_tt'),
		exec_success = this_js_script.attr('data-exec_success'),
		answer_not_accepted = this_js_script.attr('data-answer_not_accepted'),
		answer_accepted = this_js_script.attr('data-answer_accepted'),
		labelYourAnswer = this_js_script.attr('data-labelYourAnswer'),
		labelRightAnswer = this_js_script.attr('data-labelRightAnswer');

	if (typeof exec_error === "undefined" ) {
		exec_error = 'Execution Error';
	}

	if (typeof exec_success === "undefined" ) {
		exec_success = 'Execution Succesful';
	}

	if (typeof answer_not_accepted === "undefined" ) {
	   answer_not_accepted = 'Answer not Accepted';
	}

	if (typeof format_error === "undefined" ) {
		format_error = 'Format Error';
	}

	if (typeof answer_accepted === "undefined" ) {
		answer_accepted = 'Answer Accepted';
	}
	answer = utf8_to_b64(answer);

	loadingOpen();

	let answerdata = {program: answer, moduleId},
		$output_id = $("#outputbox_" + questid);

	$.ajax({
		method: "POST",
		data: answerdata,
		url: validate_question_url + "api/validatequestion/" + instid + "/" + questid,
	}).done(function(datajson) {
		loadingClose();

		if (datajson.status == 0) {
			$output_id.val(datajson.message);
		} else {
			$output_id.val(datajson.output);
		}

		let $compiled_id = $("#span_compiled_" + questid),
			$validated_id = $("#span_validated_" + questid);

		let textExec = '',
			textVal = '';

		let title = '';
		switch (datajson.status) {
			case 0:
				labelExec = labelVal = 'label-danger';
				if(outputOnly){
					textExec = format_error;
					title = format_error_tt;
				}
				else{
					textExec = exec_error;
				}
				textVal = answer_not_accepted;
				break;
			case 1:
				labelExec = 'label-success';
				labelVal = 'label-danger';
				textExec = exec_success;
				if(outputOnly){
					title = format_success_tt;
				}
				textVal = answer_not_accepted;
				break;
			case 2:
				labelExec = 'label-success';
				labelVal = 'label-success';
				textExec = exec_success;
				if(outputOnly){
					title = format_success_tt;
				}
				textVal = answer_accepted;
				break;
			default:
				labelExec = labelVal = 'label-danger';
				textExec = textVal = 'Internal Error';
		}

		$compiled_id
			.removeClass("label-danger label-success")
			.addClass(labelExec)
			.text(textExec);

		if (outputOnly) {
			$compiled_id.attr('data-original-title', title);
		}

		$validated_id
			.removeClass("label-danger label-success")
			.addClass(labelVal)
			.text(textVal);

		if (datajson.status == 1 && typeof executeErrMsng['qid_' + questid] === 'undefined') {
			if (!window['alreadyValidated_' + questid]) {
				window['alreadyValidated_' + questid] = true;
				bootbox.alert({
					title   : $validated_id.text(),
					message : '<div class="row"><div class="col-sm-6 mb-2"><h4>' + labelYourAnswer + '</h4><textarea class="form-control" rows="8" readonly>' + datajson.output.toString().replace(/!X!/g, "\n") + '</textarea></div><div class="col-sm-6 mb-2"><h4>' + labelRightAnswer + '</h4><textarea class="form-control" rows="8" readonly>' + datajson.bootbox.rightanswer.toString().replace(/!X!/g, "\n") + '</textarea></div><div class="col-sm-12 mb-2"><small>' + datajson.bootbox.explanation + '</small></div></div>' 
				});
			}

			executeErrMsng['qid_' + questid] = [];
			executeErrMsng['qid_' + questid]['answerarray'] = datajson.answerarray;
			executeErrMsng['qid_' + questid]['message'] = datajson.message;
			executeErrMsng['qid_' + questid]['output'] = datajson.output;
			executeErrMsng['qid_' + questid]['score'] = datajson.score;
			executeErrMsng['qid_' + questid]['status'] = datajson.status;
			executeErrMsng['qid_' + questid]['bootbox'] = [];
			executeErrMsng['qid_' + questid]['bootbox']['explanation'] = datajson.bootbox.explanation;
			executeErrMsng['qid_' + questid]['bootbox']['rightanswer'] = datajson.bootbox.rightanswer;
			executeErrMsng['qid_' + questid]['bootbox']['userAnswer'] = datajson.bootbox.userAnswer;
			executeErrMsng['qid_' + questid]['labelExec'] = labelExec;
			executeErrMsng['qid_' + questid]['labelVal'] = labelVal;
			executeErrMsng['qid_' + questid]['textExec'] = textExec;
			executeErrMsng['qid_' + questid]['textVal'] = textVal;
		}

		if (datajson.status == 2 && typeof executeErrMsng['qid_' + questid] !== 'undefined') {
			delete executeErrMsng['qid_' + questid];
		}
	}).fail(function(datajson) {
		console.log('Error in execution');
		console.log(datajson);

		loadingClose();

		$output_id.val("Internal Error (js1)");
	});
}

/**
 * 
 * @param {*} deletinstance 
 */
$(document).on('click', '.reShowError', function(e) {
	e.preventDefault()
	e.stopImmediatePropagation();

	let this_js_script = $('script[src*=execute]'),
		labelYourAnswer = this_js_script.attr('data-labelYourAnswer'),
		labelRightAnswer = this_js_script.attr('data-labelRightAnswer'),
		questid = $(this).data('qid'),
		datajson = executeErrMsng['qid_' + questid];

	if (typeof datajson !== 'undefined') {
		bootbox.alert({
			title : datajson.textVal,
			message : '<div class="row"><div class="col-sm-6 mb-2"><h4>' + labelYourAnswer + '</h4><textarea class="form-control" rows="8" readonly>' + datajson.output.toString().replace(/!X!/g, "\n") + '</textarea></div><div class="col-sm-6 mb-2"><h4>' + labelRightAnswer + '</h4><textarea class="form-control" rows="8" readonly>' + datajson.bootbox.rightanswer.toString().replace(/!X!/g, "\n") + '</textarea></div><div class="col-sm-12 mb-2"><small>' + datajson.bootbox.explanation + '</small></div></div>' 
		});
	}
});

/**
 * 
 * @param {*} deletinstance 
 */
function submitform(deletinstance)
{
	if (typeof deletinstance === 'undefined') {
		deletinstance = 0;
	}

	$('<input>').attr({
		type: 'hidden',
		id: 'deleteinstance',
		name: 'deleteinstance',
		value: deletinstance
	}).appendTo(document.evaluacion);

	if (!err || timeup) {
		loadingOpen();
		document.evaluacion.submit();
	}

	$('#myModal').modal('hide');
}

/**
 * Security Complement to avoid server treat as Injection
 */

/**
 * UTF-8 to Base64
 * @param {*} str 
 */
function utf8_to_b64(str)
{
	return window.btoa(unescape(encodeURIComponent(str)));
}

/**
 * Base64 to UTF-8
 * @param {*} str 
 */
function b64_to_utf8(str)
{
	return decodeURIComponent(escape(window.atob(str)));
}
