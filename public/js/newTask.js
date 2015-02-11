 'use strict';
 $(document).ready(function() {
	initializePage();
})

function initializePage() {
	console.log("Javascript connected!");
	$('.setTimeCheckBox').hide();
	$('.setLocationCheckBox').hide();
	$('.dateRepeatChecked').hide();
	$('.setLocationList').hide();
  $('#setTimeCheck').click(function() {
	$('.setTimeCheckBox')[this.checked ? "show" : "hide"]();	
  });
  
  $('#setLocation').click(function() {
	$('.setLocationCheckBox')[this.checked ? "show" : "hide"]();	
  });
  
  $('.repeated').click(function() {
	$('.dateRepeatChecked')[this.checked ? "show" : "hide"]();	
  });
  
  $('.setLocation').click(function() {
	$('.setLocationList')[this.checked ? "show" : "hide"]();
  });
}