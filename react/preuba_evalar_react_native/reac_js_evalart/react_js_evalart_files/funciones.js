/**
 *Retorna la fecha y hora actual de la PC
 **/
function getDate(){
	var fecha = new Date();
	return fecha.getFullYear() + "/" + formatDate(fecha.getMonth()+1)  + "/" + formatDate(fecha.getDate()) + " " + formatDate(fecha.getHours()) + ":" + formatDate(fecha.getMinutes())+ ":" + formatDate(fecha.getSeconds()) ;
}
/**
 * Retorna la fecha y hora actual de la PC y un tiempo adicional indicado
 * @param adicion
 * @returns {String}
 */
function getDate(adicion){
	var fecha = new Date();
	fecha.setSeconds(fecha.getSeconds()+adicion);
	return fecha.getFullYear() + "/" + formatDate(fecha.getMonth()+1)  + "/" + formatDate(fecha.getDate()) + " " + formatDate(fecha.getHours()) + ":" + formatDate(fecha.getMinutes())+ ":" + formatDate(fecha.getSeconds()) ; 
}

/**
 * Normaliza los datos de dias y mes para las fechas adicionando un cero por delante para los valores menores a 10
 * @param valor
 * @returns
 */
function formatDate(valor){
	cadena=valor.toString();
	if(cadena.length==1){
		return "0"+cadena;
	}else{
		return valor.toString();
	}
}


function changeWidthQuestion(id){
	valor=0;
	switch (id) {
		case 'SML':
			valor=400;
			break;
		case 'MED':
			valor=550;
			break;
		case 'LRG':
			valor=700;
			break;
		case 'XLG':
			valor=850;
			break;
		case 'FUL':
			valor='100%';
			break;
		default:
			valor=400;
		break;
	}
	return valor+'px';
}


function scr(dat)
{
	let request = $.ajax({
		url: "/api/scr?v=1.0",
		method: "POST",
		data: dat,
		dataType: "html"
	});

	request.done(function(msg) {
		//alert(msg);
	});

	request.fail(function(jqXHR, textStatus) {
		//alert( "Request failed: " + textStatus );
	});
}

function typeInTextarea(el, newText) {
	var start = el.prop("selectionStart");
	var end = el.prop("selectionEnd");
	var text = el.val();
	var before = text.substring(0, start);
	var after  = text.substring(end, text.length);
	el.val(before + newText + after);
	el[0].selectionStart = el[0].selectionEnd = start + newText.length;
	el.focus();
	return false;
}

function isInt(value) {
		return !isNaN(value) && 
     	parseInt(Number(value)) == value && 
     	!isNaN(parseInt(value, 10));
}