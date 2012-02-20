$(function(){

  // date and time picker for Fecha
  $.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '&#x3c;Ant',
    nextText: 'Sig&#x3e;',
    currentText: 'Hoy',
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
    dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
    dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };

  $.datepicker.setDefaults($.datepicker.regional['es']);

  $.timepicker.regional['es'] = {
    timeOnlyTitle: 'Tiempo',
    timeText: 'Tiempo',
    hourText: 'Hora',
    minuteText: 'Minuto',
    secondText: 'Segundo',
    millisecText: 'Milisegundo',
    currentText: 'Ahora',
    closeText: 'Hecho',
    ampm: false
  };

  $.timepicker.setDefaults($.timepicker.regional['es']);

  $('#text_happened_at, #image_happened_at, #video_happened_at').datetimepicker({
    dateFormat: 'yy-mm-dd',
    timeFormat: 'hh:mm:ss'
  });

  // autocomplete for tags
  $('#text_tags, #video_tags, #image_tags, #node_tags').tagit({ 
    tagSource: "/tags/search.json",
    removeConfirmation: true,
    allowSpaces: true
  });

});
