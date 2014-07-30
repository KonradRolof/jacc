/*
 * jQuery jacc
 * Version 0.2
 * Copyright (c) 2014 Konrad Rolof (http://www.konrad-rolof.de)
 * requires jQuery
 * build under jQuery 1.10.1
 * Dual licensed under the MIT (below)
 * and GPL (http://www.gnu.org/licenses/gpl.txt) licenses.
 *

MIT License

Copyright (c) 2014 Konrad Rolof

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 *
 */
(function($){
	$.fn.jacc = function(options)
	{
		// compares user settings and default settings
		var ops = $.extend({}, $.fn.jacc.defaults, options);
		
		// add this object to ops array
		ops.elm = $(this);

		// start closing all togglerBoxes and may open one
		$.fn.jacc.startup(ops);

		// toggler click funktion
		ops.elm
			.children(ops.toggler)
			.click(function(e){
				// prevent page switch if toggler is an anch
				e.preventDefault();
				// set vars
				ops.this = $(this);
				ops.startOption = false;
				// starts function for closing and opening togglerBoxes
				$.fn.jacc.fxClose(ops);
				$.fn.jacc.fxOpen(ops);
			});	

		return this;
	};
	// open selectet togglerBox an add current-classes
	$.fn.jacc.fxOpen = function(ops)
	{
		if( ops.this.next(ops.togglerBox).is(":hidden") === true )
		{
			// add current class to toggler
			ops.this
				.addClass('current');
			// add current class to toggler an opens it
			ops.this
				.next(ops.togglerBox)
				.stop()
				.addClass('current')
				.slideDown(
				{
					duration: ops.fxSpeed,
					easing: ops.easingIn,
					complete: function()
					{
						// callback option
						if( typeof (ops.slideComplete) == 'function' )
						{
							ops.slideComplete();
						}
						// document slide to current toggler
						if( ops.focusSlide === true && ops.startOption === false )
						{
							$('html, body').animate({
								scrollTop: ops.this
									.offset()
									.top
									+ ops.focusOffset
							},ops.focusFxSpeed);
						}
					}
				});
		}
	}
	// close togglerBoxes and remove current-classes
	$.fn.jacc.fxClose = function(ops)
	{	
		// function parallel to slideUp
		if( typeof (ops.onSlideUp) == 'function' )
		{
			ops.onSlideUp();
		}
		// remove current class from toggler
		ops.elm
			.children(ops.toggler)
			.removeClass('current');
		// remove current class of togglerBox and close them
		ops.elm
			.children(ops.togglerBox)
			.removeClass('current')
			.slideUp(ops.fxSpeed,ops.easingOut);
	};
	// close all togglerBoxes on start
	$.fn.jacc.startup = function(ops)
	{
		// close all togglerBoxes
		ops.elm
			.children(ops.togglerBox)
			.hide();

		// opens first togglerBox
		if( ops.openFirst === true )
		{
			ops.this = ops.elm.children(ops.toggler).eq(0);
			ops.startOption = true;
			$.fn.jacc.fxOpen(ops);
		}
	};
	// default options
	$.fn.jacc.defaults =
	{
		toggler 		: '.toggler', // css class of toggler
		togglerBox 		: '.togglerBox', // css class of toggle container
		openFirst		: false, // opens first togglerBox on start
		fxSpeed			: 500, // speed of slideUp/Down animation
		easingIn		: '', // jQuery easing for slideDown
		easingOut		: '', // jQuery easing for slideUp
		focusSlide		: false, // scroll document to current toggler
		focusOffset		: -10, // move target point to scroll document
		focusFxSpeed 	: 500 // speed of scroll animation
	};
})(jQuery);