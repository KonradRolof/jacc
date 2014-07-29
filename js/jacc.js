(function($){
	$.fn.jacc = function(options)
	{
		// compares user settings and default settings
		var ops = $.extend({}, $.fn.jacc.defaults, options);
		
		ops.elm = $(this);

		$.fn.jacc.startup(ops);

		ops.elm
			.children(ops.toggler)
			.click(function(){
				ops.this = $(this);
				$.fn.jacc.fxClose(ops);
				$.fn.jacc.fxOpen(ops);
			});	

		return this
	};
	// open selectet togglerBox an add current-classes
	$.fn.jacc.fxOpen = function(ops)
	{
		if( ops.this.next(ops.togglerBox).is(":hidden") === true )
		{
			ops.this
				.addClass('current');
			ops.this
				.next(ops.togglerBox)
				.addClass('current')
				.slideDown(ops.fxSpeed,ops.easingIn);
		}
	}
	// close togglerBoxes and remove current-classes
	$.fn.jacc.fxClose = function(ops)
	{	
		ops.elm
			.children(ops.toggler)
			.removeClass('current');
		ops.elm
			.children(ops.togglerBox)
			.removeClass('current')
			.slideUp(ops.fxSpeed,ops.easingOut);
	};
	// close all togglerBoxes on start
	$.fn.jacc.startup = function(ops)
	{
		ops.elm
			.children(ops.togglerBox)
			.hide();

		// opens first togglerBox
		if( ops.openFirst === true )
		{
			ops.this = ops.elm.children(ops.toggler).eq(0);
			$.fn.jacc.fxOpen(ops);
		}
	};
	// default options
	$.fn.jacc.defaults =
	{
		togglerBox 	: '.togglerBox',
		openFirst	: false,
		fxSpeed		: 500,
		easingIn	: '',
		easingOut	: '',
		focusSlide	: false,
		focusOffset	: 0
	};
})(jQuery);