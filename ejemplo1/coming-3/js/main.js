/*
  Template Name : Webso
  Author: Hardik N (nworld group)
  Version: v1.0
*/

/* Settings In main.js :
  1. Countdown
*/


/* -----------------------------------------------------------------------
Countdown
----------------------------------------------------------------------- */

$(function(){
	// Create a countdown instance. Change the launch day according to your needs.
	// The month ranges from 0 to 11. I specify the month from 1 to 12 and manually subtract the 1.
	var ts = new Date(2015, 12-1, 31); 
	$('#countdown').countdown({
		until: ts
	});
	
});



