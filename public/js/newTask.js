  $('#setTimeCheckBox').live('change', function(){
      if ( $(this).is(':checked') ) {
         $('#date').show();
     } else {
         $('#date').hide();
     }
 });