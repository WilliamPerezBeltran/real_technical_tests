document.addEventListener('DOMContentLoaded', function() {
	/**
	 * External Data
	 */
	let $thisJSScript =  $('script[src*=attachments]');

	const HASH_QUESTION_TAG = $thisJSScript.attr('data-HASH_QUESTION_TAG'),
		QUESTIONATTACHMENT_ERR_0 = $thisJSScript.attr('data-QUESTIONATTACHMENT_ERR_0'),
		WORD_ERROR = $thisJSScript.attr('data-WORD_ERROR'),
		WORD_SUCCESS = $thisJSScript.attr('data-WORD_SUCCESS');

	/**
	 * Attachment Data
	 */
	const $allowattachmentContentBox = $('.allowattachment_content_box > .droppable');

	$allowattachmentContentBox.on("dragover", function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).addClass('highlight');
	}).on("dragleave", function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).removeClass('highlight');
	}).on("drop", function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).removeClass('highlight');
	});

	$('.allowattachment_list').on('click', '.questionnaireinstanceattachment-del', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		let instanceId = $(this).data('questionnaireinstance-id'),
			questionId = $(this).data('question-id'),
			attachmentId = $(this).data('id'),
			filename = $(this).closest('li').find('i').text();

		$(this)
			.removeClass('glyphicon-remove')
			.removeClass('text-danger')
			.removeClass('questionnaireinstanceattachment-del')
			.addClass('glyphicon-refresh')
			.addClass('gly-spin')
			.addClass('text-default');

		$.ajax({
			method: 'POST',
			url: '/api/questionAttachmentDel/' + instanceId + '/' + questionId + '/' + attachmentId
		})
		.done(function(response) {
			if (!response) {
				bootbox.alert({
					title : '<span class="glyphicon glyphicon-remove text-danger"></span> ' + WORD_ERROR,
					message : QUESTIONATTACHMENT_ERR_0
				});

				$(this)
					.removeClass('glyphicon-refresh')
					.removeClass('gly-spin')
					.removeClass('text-default')
					.addClass('glyphicon-remove')
					.addClass('text-danger')
					.addClass('questionnaireinstanceattachment-del');

				return false;
			}

			if (response.code < 1) {
				$(
					'<div class="alert alert-danger alert-dismissible" role="alert" style="display:block;margin:10px 0;">' + 
					'<strong>' + WORD_ERROR + '</strong> ' + response.message + '. ' + filename +
					'<button type="button" class="close" data-dismiss="alert" aria-label="Close">' + 
					'<span aria-hidden="true">&times;</span>' +
					'</button>' +
					'</div>'
				).appendTo('#errorMsg_' + questionId).delay(30000).fadeOut();

				$(this)
					.removeClass('glyphicon-refresh')
					.removeClass('gly-spin')
					.removeClass('text-default')
					.addClass('glyphicon-remove')
					.addClass('text-danger')
					.addClass('questionnaireinstanceattachment-del');
			} else {
				$('#questionnaireinstanceattachment_' + attachmentId).remove();

				$(
					'<div class="alert alert-success alert-dismissible" role="alert" style="display:block;margin:10px 0;">' + 
					'<strong>' + WORD_SUCCESS + '</strong> ' + response.message + ' ' + filename +
					'<button type="button" class="close" data-dismiss="alert" aria-label="Close">' + 
					'<span aria-hidden="true">&times;</span>' +
					'</button>' +
					'</div>'
				).appendTo('#errorMsg_' + questionId).delay(15000).fadeOut();
			}
		})
		.fail(function(jqXHR) {
			bootbox.alert({
				title : '<span class="glyphicon glyphicon-remove text-danger"></span> ' + WORD_ERROR,
				message : QUESTIONATTACHMENT_ERR_0
			});
		});
	});

	$('.questionattachment-view').on('click', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		let $Object = $(this),
			questionId = $Object.data('question-id'),
			attachmentId = $Object.data('id'),
			filename = $Object.closest('li').find('i').text();

		$.ajax({
			method: 'POST',
			url: '/api/questionAttachmentView/-1/' + questionId + '/' + attachmentId + '/' + HASH_QUESTION_TAG
		})
		.done(function(response) {
			if (!response) {
				bootbox.alert({
					title : '<span class="glyphicon glyphicon-remove text-danger"></span> ' + WORD_ERROR,
					message : QUESTIONATTACHMENT_ERR_0
				});

				return false;
			}

			if (response.code < 1) {
				bootbox.alert({
					title : '<span class="glyphicon glyphicon-remove text-danger"></span> ' + WORD_ERROR,
					message : response.message + '. ' + filename
				});
			} else {
				let link = document.createElement("a");
				link.setAttribute('download', response.data.file_name);
				link.download = response.data.file_name;
				link.href = response.data.awsUrl;
				document.body.appendChild(link);
				link.click();
				link.remove();
			}

			loadingClose();
		})
		.fail(function(jqXHR) {
			bootbox.alert({
				title : '<span class="glyphicon glyphicon-remove text-danger"></span> ' + WORD_ERROR,
				message : QUESTIONATTACHMENT_ERR_0
			});
		});
	});
});
