document.addEventListener('DOMContentLoaded', function() {
	/**
	 * External Data
	 */
	let $thisJSScript =  $('script[src*=video]');
	const ERROR_UNSUPPORTED_BROWSER = $thisJSScript.attr('data-ERROR_UNSUPPORTED_BROWSER'),
		HASH_VIDEO_TAG = $thisJSScript.attr('data-HASH_VIDEO_TAG'),
		QUESTIONNAIREINSTANCEID = $thisJSScript.attr('data-QUESTIONNAIREINSTANCEID'),
		QUESTIONATTACHMENT_ERR_0 = $thisJSScript.attr('data-QUESTIONATTACHMENT_ERR_0'),
		VIDEOANSWER_BEFORE_UPLOAD_BTN_CANCEL = $thisJSScript.attr('data-VIDEOANSWER_BEFORE_UPLOAD_BTN_CANCEL'),
		VIDEOANSWER_BEFORE_UPLOAD_BTN_UPLOAD = $thisJSScript.attr('data-VIDEOANSWER_BEFORE_UPLOAD_BTN_UPLOAD'),
		VIDEOANSWER_BEFORE_UPLOAD_MESSAGE = $thisJSScript.attr('data-VIDEOANSWER_BEFORE_UPLOAD_MESSAGE'),
		VIDEOANSWER_BEFORE_UPLOAD_TITLE = $thisJSScript.attr('data-VIDEOANSWER_BEFORE_UPLOAD_TITLE'),
		VIDEOANSWER_DANGER_NOT_ASWERED = $thisJSScript.attr('data-VIDEOANSWER_DANGER_NOT_ASWERED'),
		VIDEOANSWER_DELETE_REC = $thisJSScript.attr('data-VIDEOANSWER_DELETE_REC'),
		VIDEOANSWER_PREVIEW_REC = $thisJSScript.attr('data-VIDEOANSWER_PREVIEW_REC'),
		VIDEOANSWER_SAVE_REC = $thisJSScript.attr('data-VIDEOANSWER_SAVE_REC'),
		VIDEOANSWER_START_REC = $thisJSScript.attr('data-VIDEOANSWER_START_REC'),
		VIDEOANSWER_STATUS_RECORDING = $thisJSScript.attr('data-VIDEOANSWER_STATUS_RECORDING'),
		VIDEOANSWER_STATUS_SENT = $thisJSScript.attr('data-VIDEOANSWER_STATUS_SENT'),
		VIDEOANSWER_STATUS_UPLOAD_ERR = $thisJSScript.attr('data-VIDEOANSWER_STATUS_UPLOAD_ERR'),
		VIDEOANSWER_STATUS_UPLOADING = $thisJSScript.attr('data-VIDEOANSWER_STATUS_UPLOADING'),
		VIDEOANSWER_STOP_REC = $thisJSScript.attr('data-VIDEOANSWER_STOP_REC'),
		VIDEOANSWER_STATUS_STOPED = $thisJSScript.attr('data-VIDEOANSWER_STATUS_STOPED'),
		VIDEOANSWER_WARNING_TIMEOUT = $thisJSScript.attr('data-VIDEOANSWER_WARNING_TIMEOUT'),
		VIDEOANSWER_WARNING_SAVE = $thisJSScript.attr('data-VIDEOANSWER_WARNING_SAVE'),
		WORD_ERROR = $thisJSScript.attr('data-WORD_ERROR'),
		WORD_SUCCESS = $thisJSScript.attr('data-WORD_SUCCESS'),
		WORD_WARNING = $thisJSScript.attr('data-WORD_WARNING');

	/**
	 * Video Data
	 */
	let cameraEnable = null;
	let cameraRecorder = null;
	let cameraMime = 'video/webm';
	let videoRecIntval = null;
	let videoBlob = null;
	let videoStopMessage = VIDEOANSWER_WARNING_SAVE;

	async function checkCameraStatus()
	{
		navigator.getMedia = (navigator.getUserMedia || 
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia);

		if (!navigator.getMedia) {
			cameraEnable = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
			cameraMime = 'video/mp4';
		} else {
			cameraEnable = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
		}

		if (cameraEnable) {
			$('.answerCamEnable').hide();
		} else {
			bootbox.alert({
				title : '<span class="glyphicon glyphicon-remove text-danger"></span> ' + WORD_ERROR,
				message : ERROR_UNSUPPORTED_BROWSER
			});
			$('.answerCamEnable').show();
		}
	}

	$('body').on('click', '.answerCamEnable', async function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		await checkCameraStatus();

		videoBlob = null;

		let activeCameras = $('.answerCamWrapper');

		activeCameras.each(function (i, o) {
			activeCameras[i].setAttribute('autoplay', '');
			activeCameras[i].setAttribute('muted', '');
			activeCameras[i].setAttribute('playsinline', '');
			activeCameras[i].srcObject = cameraEnable;
			activeCameras[i].play();
		});
	});

	$('body').on('click', '.answerCamStart', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		let $thisObject = $(this);
		let questionId = $thisObject.data('id');
		let blobs_recorded = [];

		videoBlob = null;

		clearInterval(videoRecIntval);

		$('#saveCam_' + questionId).hide();
		$('.answerCamSave, .answerCamPreview').attr('data-href', 'blob:').hide();
		$('.answerCamStart span').removeClass('glyphicon-remove').addClass('glyphicon-record');

		// set MIME type of recording as video/webm
		cameraRecorder = new MediaRecorder(cameraEnable, {mimeType: cameraMime});

		// event : new recorded video blob available 
		cameraRecorder.addEventListener('dataavailable', function(e) {
			blobs_recorded.push(e.data);
		});

		// event : recording stopped & all blobs sent
		cameraRecorder.addEventListener('stop', function() {
			// create local object URL from the recorded video blobs
			videoBlob = new Blob(blobs_recorded, {type: cameraMime});
			let videoUrl = URL.createObjectURL(videoBlob);

			$('.answerCamSave[data-id=' + questionId + ']').attr('data-href', videoUrl);
			$('.answerCamPreview[data-id=' + questionId + ']').attr('data-href', videoUrl);
		});

		// start recording with each recorded blob having 1 second video
		cameraRecorder.start(1000);

		$('.vidAnswerControlItemBar p.itm').attr('data-title', VIDEOANSWER_STATUS_RECORDING)
			.attr('title', VIDEOANSWER_STATUS_RECORDING);

		$thisObject.find('span.glyphicon').removeClass('glyphicon-remove').removeClass('glyphicon-record').addClass('glyphicon-cd').addClass('rec');
		$thisObject.data('status', 'record').removeClass('answerCamStart').addClass('answerCamStop');
		$thisObject.attr('data-title', VIDEOANSWER_STOP_REC)
			.attr('title', VIDEOANSWER_STOP_REC);

		let timeLimit = 120000,
			timeSpent = 0,
			tlMinutes = Math.floor((timeLimit/1000) / 60),
			tlSeconds = (timeLimit/1000) - tlMinutes * 60,
			tlLabel = (tlMinutes < 10 ? '0' + tlMinutes : tlMinutes) + ':' + (tlSeconds < 10 ? '0' + tlSeconds : tlSeconds),
			dots = '.';

		videoStopMessage = VIDEOANSWER_WARNING_SAVE;

		videoRecIntval = setInterval(function() {
			timeSpent = timeSpent + 1;

			let minutes = Math.floor((timeSpent) / 60);
			let seconds = (timeSpent) - minutes * 60;
			let label = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
			let statusLabel = VIDEOANSWER_STATUS_RECORDING;

			if (dots.length < 4) {
				dots += '.';
			} else {
				dots = '.';
			}

			$('#timetCam_' + questionId).text(label + ' / ' + tlLabel);
			$('.vidAnswerControlItemBar p.itm').text(statusLabel + dots);

			// If the count down is finished, write some text
			if ((timeSpent * 1000) >= timeLimit) {
				videoStopMessage = VIDEOANSWER_WARNING_TIMEOUT;
				$('.answerCamStop').trigger('click');
			}
		}, 1000);
	});

	$('body').on('click', '.answerCamStop', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		let questionId = $(this).data('id');

		clearInterval(videoRecIntval);

		if (cameraRecorder && cameraRecorder.state != 'inactive') {
			cameraRecorder.stop();
		}

		$(this).find('span.glyphicon').addClass('glyphicon-remove').removeClass('glyphicon-cd').removeClass('rec');
		$(this).data('status', 'stop').addClass('answerCamRemove').removeClass('answerCamStop');
		$(this).attr('data-title', VIDEOANSWER_DELETE_REC)
			.attr('title', VIDEOANSWER_DELETE_REC);
		$('.vidAnswerControlItemBar p.itm').text(VIDEOANSWER_STATUS_STOPED)
			.attr('data-title', VIDEOANSWER_STATUS_STOPED);
		$('.answerCamSave[data-id=' + questionId + ']').show();
		$('.answerCamPreview[data-id=' + questionId + ']').show();

		bootbox.alert({
			title : '<span class="glyphicon glyphicon-exclamation-sign text-warning"></span> ' + WORD_WARNING,
			message : videoStopMessage
		});
	});

	$('body').on('click', '.answerCamRemove', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		let questionId = $(this).data('id');
		let time = $('.vidAnswerControlItemTime p.itm').text().toString().split('/');

		videoBlob = null;

		$(this).addClass('answerCamStart').removeClass('answerCamRemove');
		$(this).attr('title', VIDEOANSWER_START_REC)
			.attr('data-title', VIDEOANSWER_START_REC)
		$(this).find('span.glyphicon').addClass('glyphicon-record').removeClass('glyphicon-remove');

		$('.vidAnswerControlItemBar p.itm').text('');
		$('.vidAnswerControlItemTime p.itm').text('00:00 / ' + time[1]);
		$('.answerCamSave[data-id=' + questionId + ']').hide();
		$('.answerCamPreview[data-id=' + questionId + ']').hide();
	});

	$('body').on('mouseover', '.answerCamStop', function() {
		$('.vidAnswerControlItemBar p.itm').text(VIDEOANSWER_STOP_REC);
	});

	$('body').on('mouseover', '.answerCamSave', function() {
		$('.vidAnswerControlItemBar p.itm').text(VIDEOANSWER_SAVE_REC);
	});

	$('body').on('mouseover', '.answerCamStart', function() {
		$('.vidAnswerControlItemBar p.itm').text(VIDEOANSWER_START_REC);
	});

	$('body').on('mouseover', '.answerCamPreview', function() {
		$('.vidAnswerControlItemBar p.itm').text(VIDEOANSWER_PREVIEW_REC);
	});

	$('body').on('mouseover', '.answerCamRemove', function() {
		$('.vidAnswerControlItemBar p.itm').text(VIDEOANSWER_DELETE_REC);
	});

	$('body').on('mouseout', '.answerCamStop, .answerCamSave, .answerCamStart, .answerCamPreview, .answerCamRemove', function() {
		let defaultTitle = $('.vidAnswerControlItemBar p.itm').attr('data-title');
		$('.vidAnswerControlItemBar p.itm').html(defaultTitle);
	});

	$('body').on('click', '.answerCamPreview', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		bootbox.alert({
			title: '<span class="glyphicon glyphicon-eye-open"></span> ' + VIDEOANSWER_PREVIEW_REC,
			message: '<video width="200" height="200" src="' + $(this).attr('data-href') + '" controls style="height: auto; width: 100%;" />'
		});
	});

	$('body').on('click', '.answerCamSave', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();

		let questionId = $(this).data('id');
		let fData = new FormData();

		bootbox.confirm({
			title : VIDEOANSWER_BEFORE_UPLOAD_TITLE, 
			message : VIDEOANSWER_BEFORE_UPLOAD_MESSAGE, 
			buttons: {
				confirm: {
					label: VIDEOANSWER_BEFORE_UPLOAD_BTN_UPLOAD, 
					className: 'btn btn-primary'
				}, 
				cancel: {
					label: VIDEOANSWER_BEFORE_UPLOAD_BTN_CANCEL,
					className: 'btn btn-default'
				}
			},
			callback : function(result) {
				if (!result) {
					return true;
				}

				$('.answerCamProgress[data-id=' + questionId + ']').removeClass('hidden');
				$('.vidAnswerControlItemBar p.itm')
					.attr('title', '<span class="glyphicon glyphicon-refresh gly-spin"></span> ' + VIDEOANSWER_STATUS_UPLOADING)
					.attr('data-title', '<span class="glyphicon glyphicon-refresh gly-spin"></span> ' + VIDEOANSWER_STATUS_UPLOADING)
					.html('<span class="glyphicon glyphicon-refresh gly-spin"></span> ' + VIDEOANSWER_STATUS_UPLOADING);
				$('.answerCamStop, .answerCamSave, .answerCamStart, .answerCamPreview', function() {
					$(this).addClass('hidden');
				});

				fData.append('video_check', true);
				fData.append('mime', cameraMime);
				fData.append('extension', cameraMime == 'video/webm' ? 'webm' : 'mp4');
				fData.append('video_answer', videoBlob);

				$.ajax({
					xhr: function() {
						let xhr = new window.XMLHttpRequest();

						xhr.upload.addEventListener("progress", function(evt) {
							if (evt.lengthComputable) {
								let percentComplete = Math.ceil((evt.loaded / evt.total) * 100);
								$('.answerCamProgress[data-id=' + questionId + '] span.label').text(percentComplete + '%');
							}
						}, false);

						return xhr;
					},
					method: 'POST',
					url: '/api/saveVideoAnswer/' + QUESTIONNAIREINSTANCEID + '/' + questionId + '/' + HASH_VIDEO_TAG,
					enctype: 'multipart/form-data',
					data: fData,
					processData: false,
					contentType: false
				})
				.done(function(response) {
					$('.answerCamProgress[data-id=' + questionId + ']').addClass('hidden');
					$('input[type=hidden]#cuestion' + questionId).val('');
					$('input[type=hidden]#cuestion' + questionId).attr('class', 'js-video js-input');

					$('.vidAnswerControlItemBar p.itm')
						.attr('title', VIDEOANSWER_STATUS_STOPED)
						.attr('data-title', VIDEOANSWER_STATUS_STOPED)
						.html(VIDEOANSWER_STATUS_STOPED);

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
							message : response.message + '. '
						});

						$('.vidAnswerControlItemBar p.itm')
							.text(VIDEOANSWER_STATUS_UPLOAD_ERR);
					} else {
						bootbox.alert({
							title : '<span class="glyphicon glyphicon-ok text-success"></span> ' + WORD_SUCCESS,
							message : response.message + '. '
						});

						$('input[type=hidden]#cuestion' + questionId).attr('class', 'js-video js-input js-answered');
						$('input[type=hidden]#cuestion' + questionId).val(window.btoa(unescape(encodeURIComponent('Completed'))));
						$('#uniqVideoAnswerWrapper_' + questionId).html('<div style="text-align: center;"><h3>' + VIDEOANSWER_STATUS_SENT + '</h3></div>');
					}
				})
				.fail(function(jqXHR) {
					$('.answerCamProgress[data-id=' + questionId + ']').addClass('hidden');

					bootbox.alert({
						title : '<span class="glyphicon glyphicon-remove text-danger"></span> ' + WORD_ERROR,
						message : QUESTIONATTACHMENT_ERR_0
					});

					$('.vidAnswerControlItemBar p.itm')
						.text(VIDEOANSWER_STATUS_UPLOAD_ERR);
				});
			}
		});
	});

	$('#myModal').on('show.bs.modal', function (e) {
		let anyEmpty = false;

		$(document).find('input[type=hidden].js-video').each(function(i, o) {
			if (o.value === '') {
				anyEmpty = true;
				return;
			}
		});

		if (videoBlob !== null && anyEmpty) {
			$(this).find('.modal-body .js-video-error').html(
				'<div class="alert alert-danger">' + VIDEOANSWER_DANGER_NOT_ASWERED + '</div>'
			);
		} else {
			$(this).find('.modal-body .js-video-error').html('');
		}
	});
});
