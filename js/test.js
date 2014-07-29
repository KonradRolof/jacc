/*
 * jQuery advancedPagination
 * Version 1.0
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
	$.fn.advancedPagination = function(options)
	{
		// compares user settings and default settings
		var opts = $.extend({}, $.fn.advancedPagination.defaults, options);

		return this.each(function(){
			opts.elm = $(this);
			opts.page = opts.elm.children('.'+opts.pageClass);

			// build page navigation and prepares pages
			$.fn.advancedPagination.paginationBuild(opts);
			// init prev/next page function
			$.fn.advancedPagination.prevPage(opts);
			$.fn.advancedPagination.nextPage(opts);
			// pagination link click function
			$(opts.paginaContainer +' a').click(function(){
				opts.targetPage = $(this).attr('href');
				$(opts.paginaContainer +' a').removeClass('current');
				$(this).addClass('current');
				$.fn.advancedPagination.pageSwitch(opts);
				return false;
			});
		});
	};
	$.fn.advancedPagination.paginationBuild = function(opts)
	{
		var opts = opts;
		var paginationNum = opts.elm.attr('data-pagination');
		// prepare all pages with css-id
		opts.page.each(function(){
			var pageIndex = 'page_' + ( $(this).index() + 1 );
			// extended id for multiple paginations on one site
			if( paginationNum != undefined )
			{
				pageIndex += ('_wrap_'+paginationNum);
			}
			$(this).attr({'id':pageIndex});
		});
		// show first page and hide all other
		opts.page.hide();
		opts.page.first().addClass('currentPage').show();

		// build pagination navigation anches
		for( var i=0; i<opts.page.length; i++ )
		{
			var targetIndex = i + 1;
				// extended anch for multiple paginations on one site
				if( paginationNum != undefined )
				{
					targetIndex += ('_wrap_'+paginationNum);
				}
			// throw out numbers or text to pagination links
			if( !opts.paginaAnchText )
			{
				var anchText = i + 1;
			}
			else
			{
				var anchText = opts.page.eq(i).attr('data-text');
			}
			// build and display links for pagination navigation
			var anch = '<a href="#page_' + targetIndex + '">' + anchText + '</a>';
			$(opts.paginaContainer).append(anch);
		}
		// set first link to current displayed page
		$(opts.paginaContainer +' a').first().addClass('current');
	};
	$.fn.advancedPagination.prevPage = function(opts)
	{
		// hide current page an show page before
		var opts = opts;
		$(opts.prevLink).click(function(){
			// check if function is not overide
			if( typeof opts.onPrev != "function" )
			{
				// default function for preview-button
				opts.targetPage = '#' + $(opts.elm).children('.currentPage').prev('.' + opts.pageClass).attr('id');
				var nextPageIndex = $(opts.elm).children('.currentPage').index() - 1;
				// execute function not for first page
				if( nextPageIndex >= 0 )
				{
					$(opts.paginaContainer + ' a').removeClass('current');
					$(opts.paginaContainer + ' a').eq(nextPageIndex).addClass('current');
					$.fn.advancedPagination.pageSwitch(opts);
				}
			}
			else
			{
				// alternative function from user
				opts.onPrev();
			}
			return false;
		});		
	}
	$.fn.advancedPagination.nextPage = function(opts)
	{
		// hide current page and show next page
		var opts = opts;
		$(opts.nextLink).click(function(){
			// check if function is not overide
			if( typeof opts.onNext != "function" )
			{
				// default function for next-button
				opts.targetPage = '#' + $(opts.elm).children('.currentPage').next('.' + opts.pageClass).attr('id');
				var nextPageIndex = $(opts.elm).children('.currentPage').index() + 1;
				// execute function not for last page
				if( nextPageIndex <= ($(opts.elm).children('.currentPage').length + 2) )
				{
					$(opts.paginaContainer + ' a').removeClass('current');
					$(opts.paginaContainer + ' a').eq(nextPageIndex).addClass('current');
					$.fn.advancedPagination.pageSwitch(opts);
				}
			}
			else
			{
				// alternative function from user
				opts.onNext();
			}			
			return false;
		});		
	}
	$.fn.advancedPagination.pageSwitch = function(opts)
	{
		var opts = opts;
		// show selected page and hide all other pages
		$(opts.elm).children('.' + opts.pageClass).removeClass('currentPage').hide();
		// select page switch animation fade or slide
		if( opts.pageAnnimation === 'fade' )
		{
			$(opts.elm).children(opts.targetPage).addClass('currentPage').fadeIn(opts.animationSpeed,opts.easing,function(){
				// on complete page switch callback
				if( typeof opts.afterSwitch == "function" ){ opts.afterSwitch(); }
			});
			// functions parallel to page switch
			if( typeof opts.onSwitch == "function" ){ opts.onSwitch(); }
		}
		else if( opts.pageAnnimation === 'slide' )
		{
			$(opts.elm).children(opts.targetPage).addClass('currentPage').slideDown(opts.animationSpeed,opts.easing,function(){
				// on complete page switch callback
				if( typeof opts.afterSwitch == "function" ){ opts.afterSwitch(); }
			});
			// functions parallel to page switch
			if( typeof opts.onSwitch == "function" ){ opts.onSwitch(); }
		}
	};
	$.fn.advancedPagination.defaults =
	{
		// default options
		pageClass       : 'page', // css class for pages container
		paginaContainer : '#paginaNav', // parent element for pagination links
		paginaAnchText  : false, // display text to pagination links instead of numbers
		pageAnnimation  : 'fade', // animation for page switch
		animationSpeed  : 250, // speed of page switch animation
		easing          : '', // jQuery easing effect for page switch animation
		prevLink        : '.prevPage', // css class for preview-page-button
		nextLink        : '.nextPage', // css class for next-page-button
		onPrev          : 0, // alternative function for preview-page-button
		onNext          : 0, // alternative function for next-page-button
		onSwitch        : 0, // custom function parallel to page switch
		afterSwitch     : 0 // callback of page switch function
	};
})(jQuery);