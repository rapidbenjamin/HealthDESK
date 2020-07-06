/*
	Name: Empathy
	Description: Responsive HTML5 vCard Template
	Version: 1.0.1
	Author: pixelwars
*/

/* global variables */
var classicLayout = false;
var portfolioKeyword;
var mapCanvas;


(function($) { "use strict"; 
	
	
	/* DOCUMENT LOAD */
	$(function() {
		
		
		// ------------------------------
		// start loader
		showLoader();
		// ------------------------------
		
		
		// ------------------------------
		// HOME TEXT TYPE EFFECT 
		var typist;
		typist = document.querySelector("#typist-element");
		new Typist(typist, {
		  letterInterval: 60,
		  textInterval: 3000
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// HEADER FUNCTIONS
		$('.search-toggle').on("click", function() {
            $('html').toggleClass('is-search-toggled-on');
			$( ".search-box input" ).trigger( "focus" );
        });
		
		$('.menu-toggle').on("click", function() {
            $('html').toggleClass('is-menu-toggled-on');
        });
		// ------------------------------
		
		
		
		// ------------------------------
		// remove click delay on touch devices
		FastClick.attach(document.body);
		// ------------------------------
		
		
					
		// ------------------------------
		// ONE PAGE LAYOUT FUNCTIONS
		if($('html').hasClass('one-page-layout')) {
			
			// ------------------------------
			// PORTFOLIO DETAILS
			// if url contains a portfolio detail url
			portfolioKeyword = $('section.portfolio').attr('id');
			var detailUrl = giveDetailUrl();
			// ------------------------------
			
			
			// ------------------------------
			// LAYOUT DETECT
			classicLayout = $('html').attr('data-classic-layout') === 'true';
			classicLayout = classicLayout || ($('html').attr('data-mobile-classic-layout') === 'true' && ($(window).width() < 1025));
			classicLayout = classicLayout || !Modernizr.cssanimations;
			
			if(classicLayout) { // CLASSIC LAYOUT
				$('html').addClass('classic-layout');	
				setActivePage();
				$.address.change(function() {
					setActivePage();
					$('html').removeClass('is-menu-toggled-on');
					});
			} else { // MODERN LAYOUT
				$('html').addClass('modern-layout');
				$.address.change(function() {
					setActivePage();
					$('html').removeClass('is-menu-toggled-on');	
					});
			}
			
			// don't change hash tag if isAnimating
			$('.nav-menu a').on("click", function() {
				if( window.isAnimating ) {
					return false;
				}
			});
			
			// FULL BROWSER BACK BUTTON SUPPORT 
			$.address.change(function() {
					var detailUrl = giveDetailUrl();
					if(detailUrl != -1 ) {
						showProjectDetails(detailUrl);
					} else {
						if ($.address.path().indexOf("/"+ portfolioKeyword)!=-1) {
							hideProjectDetails(true,false);
						}
					}
				}); 
		}
		// ------------------------------	
		
		
		
		
		// ------------------------------
		// SETUP
		setup();
		// ------------------------------
		
		
		
		// ------------------------------
		// PORTFOLIO DETAILS
		// Show details
		$(".one-page-layout a.ajax").live('click',function() {
			
			var url = $(this).attr('href');
			var baseUrl = $.address.baseURL();
		  
			if(url.indexOf(baseUrl) !== -1) { // full url
				var total = url.length;
				detailUrl = url.slice(baseUrl.length+1, total);	
				$.address.path('/' + detailUrl );
			} else { // relative url
				detailUrl = url;
				$.address.path(portfolioKeyword + '/' + detailUrl );
			}
		  
			return false;
			
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// FORM VALIDATION
		// comment form validation fix
		$('#commentform').addClass('validate-form');
		$('#commentform').find('input,textarea').each(function(index, element) {
            if($(this).attr('aria-required') === "true") {
				$(this).addClass('required');
			}
			if($(this).attr('name') === "email") {
				$(this).addClass('email');
			}
		});
		
		// validate form
		if($('.validate-form').length) {
			$('.validate-form').each(function() {
					$(this).validate();
				});
		}
		// ------------------------------
		
		
		// ------------------------------
		// FILL SKILL BARS
		fillBars();
		// ------------------------------
		
		
	
		
		// ------------------------------
		// GOOGLE MAP
		/*
			custom map with google api
			check out the link below for more information about api usage
			https://developers.google.com/maps/documentation/javascript/examples/marker-simple
		*/
		// When the window has finished loading create our google map below
			
		mapCanvas = $('#map-canvas');
		
		if(mapCanvas.length) {	
			google.maps.event.addDomListener(window, 'load', initializeMap);
		}
		// ------------------------------
				
		
		
		
		// ------------------------------
		/* jQuery Ajax Mail Send Script */	
		var contactForm = $( '#contact-form' );
		var $alert = $('.site-alert');
		var $submit = contactForm.find('.submit');
		
		contactForm.submit(function()
		{
			if (contactForm.valid())
			{
				NProgress.start();
				$submit.addClass("active loading");
				var formValues = contactForm.serialize();
				
				$.post(contactForm.attr('action'), formValues, function(data)
				{
					if ( data == 'success' ) {
						contactForm.clearForm();
					}
					else {
						$alert.addClass('error');
					}
					NProgress.done();
					$alert.show();
					setTimeout(function() { $alert.hide(); },6000)
				});
			}
			return false
		});

		$.fn.clearForm = function() {
		  return this.each(function() {
		    var type = this.type, tag = this.tagName.toLowerCase();
		    if (tag == 'form')
		      return $(':input',this).clearForm();
		    if (type == 'text' || type == 'password' || tag == 'textarea')
		      this.value = '';
		    else if (type == 'checkbox' || type == 'radio')
		      this.checked = false;
		    else if (tag == 'select')
		      this.selectedIndex = -1;
		  });
		};
		// ------------------------------
        
        
        
		// ------------------------------
		/* SOCIAL FEED WIDGET */
		var socialFeed = $('.social-feed');
		if(socialFeed.length) {
			socialFeed.each(function() {
				$(this).socialstream({
					socialnetwork: $(this).data("social-network"),
					limit: $(this).data("limit"),
					username: $(this).data("username")
				});
			});	
		}
		// ------------------------------
		
		
		
		
		// ------------------------------
		// PARALLAX BG VIDEO
		var video_parallax = $(".home-section");
		video_parallax.each(function(index, element) {
			if($(this).data('parallax-video')) {
				$(this).jarallax({
					speed: 0,
					zIndex: 1,
					videoSrc: $(this).data('parallax-video')
				});	
			}
        });
		// ------------------------------
		

		
	});
	// DOCUMENT READY
	


	
	// WINDOW ONLOAD
	window.onload = function() {
		
		hideLoader();
	
	};
	// WINDOW ONLOAD	
	
	
	
	 
	
	// ------------------------------
	// ------------------------------
		// FUNCTIONS
	// ------------------------------
	// ------------------------------
	
	
	// ------------------------------
	// SETUP : plugins
	function setup() {
		
		// MASONRY
		setupMasonry();
		
		// ------------------------------
		// LIGHTBOX
		setupLightbox();
		// ------------------------------

		
		// ------------------------------
		// TABS
		$('.tabs').each(function() {
			if(!$(this).find('.tab-titles li a.active').length) {
				$(this).find('.tab-titles li:first-child a').addClass('active');
				$(this).find('.tab-content > div:first-child').show();
			} else {
				$(this).find('.tab-content > div').eq($(this).find('.tab-titles li a.active').parent().index()).show();	
			}
		});
		
		$('.tabs .tab-titles li a').on("click", function() {
			if($(this).hasClass('active')) { return; }
			$(this).parent().siblings().find('a').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tabs').find('.tab-content > div').hide().eq($(this).parent().index()).show();
			return false;
		});
		// ------------------------------
		
		
		// ------------------------------
		// TOGGLES
		var toggleSpeed = 300;
		$('.toggle h4.active + .toggle-content').show();
	
		$('.toggle h4').on("click", function() {
			if($(this).hasClass('active')) { 
				$(this).removeClass('active');
				$(this).next('.toggle-content').stop(true,true).slideUp(toggleSpeed);
			} else {
				
				$(this).addClass('active');
				$(this).next('.toggle-content').stop(true,true).slideDown(toggleSpeed);
				
				//accordion
				if($(this).parents('.toggle-group').hasClass('accordion')) {
					$(this).parent().siblings().find('h4').removeClass('active');
					$(this).parent().siblings().find('.toggle-content').stop(true,true).slideUp(toggleSpeed);
				}
				
			}
			return false;
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// RESPONSIVE VIDEOS
		if($('iframe,video').length) {
			$("html").fitVids();
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// UNIFORM
		$("select:not([multiple]), input:checkbox, input:radio, input:file").uniform();
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		if(isAndroid) {
			$('html').addClass('android');
		}
		// ------------------------------
		

	}
	// setup()
	// ------------------------------
	
	
	
	
	// ------------------------------
	// MAP	
	function initializeMap() {
			var latitude = mapCanvas.data("latitude");
			var longitude = mapCanvas.data("longitude");
			var zoom = mapCanvas.data("zoom");
			var marker_image = mapCanvas.data("marker-image");
			
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				
				// How zoomed in you want the map to start at (always required)
				zoom: zoom,
				
				// disable zoom controls
				disableDefaultUI: true,

				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(latitude,longitude),

				// How you would like to style the map. 
				// This is where you would paste any style found on Snazzy Maps.
				styles: [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}]
			};

			// Get the HTML DOM element that will contain your map 
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById('map-canvas');
			//var mapElement = $('#map-canvas');
			//var myLatlng = new google.maps.LatLng(mapElement.data("latitude"),mapElement.data("longitude"));
			
			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);

			//CREATE A CUSTOM PIN ICON
			var marker_image = marker_image;
			var pinIcon = new google.maps.MarkerImage(marker_image,null,null, null,new google.maps.Size(120, 90));    
		
			var marker = new google.maps.Marker({
			   position: new google.maps.LatLng(latitude,longitude),
			  map: map,
			  icon: pinIcon,
			  title: 'Hey, I am here'
			});
		}
	// MAP
	// ------------------------------
		

		
		
	// ------------------------------
	// MASONRY - ISOTOPE
	function setupMasonry() {
		
		var masonry = $('.masonry, .gallery');
		if (masonry.length) {
			masonry.each(function(index, el) {
				
				// call isotope
				refreshMasonry();
				$(el).imagesLoaded(function() {
					$(el).isotope({
					  layoutMode : $(el).data('layout') ? $(el).data('layout') : 'masonry'
					});
					// set columns
					refreshMasonry();
				});
				
				if (!$(el).data('isotope')) {
					// filters
					var filters = $(el).siblings('.filters');
					if(filters.length) {
						filters.find('a').on("click", function() {
							var selector = $(this).attr('data-filter');
							  $(el).isotope({ filter: selector });
							  $(this).parent().addClass('current').siblings().removeClass('current');
							  return false;
							});
						}
				}
				
			}); //each
		}
	}			
	$(window).on('resize debouncedresize', function() {
    	refreshMasonry();
	});
	// ------------------------------
		
	// ------------------------------
	// REFRSH MASONRY - ISOTOPE
	function refreshMasonry() {
		
		var masonry = $('.masonry');
		if (masonry.length) {
			masonry.each(function(index, el) {
				
				// check if isotope initialized
				if ($(el).data('isotope')) {
					
					var itemW = $(el).data('item-width');
					var containerW = $(el).width();
					var items = $(el).children('.hentry');
					var columns = Math.round(containerW/itemW);
				
					// set the widths (%) for each of item
					items.each(function(index, element) {
						var multiplier = $(this).hasClass('x2') && columns > 1 ? 2 : 1;
						var itemRealWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
						$(this).css( 'width', itemRealWidth + '%' );
					});
				
					var columnWidth = Math.floor( containerW / columns );
					
					$(el).isotope( 'option', { masonry: { columnWidth: columnWidth } } );
					$(el).isotope('layout');
					}
				
			}); //each
		}
	}	
	// ------------------------------
	
	
	
	
	
	
	// ------------------------------
	// LIGHTBOX - applied to porfolio and gallery post format
	function setupLightbox() {	
		
		if($(".lightbox, .gallery").length) {
			
			$('.media-box, .gallery').each(function(index, element) {
				var $media_box = $(this);
				$media_box.magnificPopup({
				  delegate: '.lightbox, .gallery-item a',
				  type: 'image',
				  image: {
					  markup: '<div class="mfp-figure">'+
								'<div class="mfp-close"></div>'+
								'<div class="mfp-img"></div>'+
							  '</div>' +
							  '<div class="mfp-bottom-bar">'+
								'<div class="mfp-title"></div>'+
								'<div class="mfp-counter"></div>'+
							  '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
					
					  cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor. 
					  verticalFit: true, // Fits image in area vertically
					  tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
					},
					gallery: {
					  enabled:true,
					  tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
					},
				  iframe: {
					 markup: '<div class="mfp-iframe-scaler">'+
								'<div class="mfp-close"></div>'+
								'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
								'<div class="mfp-title">Some caption</div>'+
							  '</div>'
				  },
				  mainClass: 'mfp-zoom-in',
				  tLoading: '',
				  removalDelay: 300, //delay removal by X to allow out-animation
				  callbacks: {
					markupParse: function(template, values, item) {
						  var title = "";
						  if(item.el.parents('.gallery-item').length) {
							  title = item.el.parents('.gallery-item').find('.gallery-caption').text();	  
						  } else {
							  title = item.el.attr('title') == undefined ? "" : item.el.attr('title');
							  }
						  //return title;
					 	values.title = title;
					},
					imageLoadComplete: function() {
					  var self = this;
					  setTimeout(function() {
						self.wrap.addClass('mfp-image-loaded');
					  }, 16);
					},
					close: function() {
					  this.wrap.removeClass('mfp-image-loaded');
					},
					beforeAppend: function() {
						var self = this;
						this.content.find('iframe').on('load', function() {
						  setTimeout(function() {
							self.wrap.addClass('mfp-image-loaded');
						  }, 16);
						});
					 }
				  },
				  closeBtnInside: false,
				  closeOnContentClick: true,
				  midClick: true
				});
			});	
		}
	}
	// ------------------------------
	
	
	// ------------------------------
	// FILL PROGRESS BARS
	function fillBars() {
		$('.bar').each(function() {
			 var bar = $(this);
			 var percent = bar.attr('data-percent');
			 bar.find('.progress').css('width', percent + '%' ).html('<span>'+percent+'</span>');
			});
	}	
	// ------------------------------	


	
	
	// ------------------------------
	// AJAX PORTFOLIO DETAILS
	var pActive;
	
	function showProjectDetails(url) {
		
		showLoader();
		
		var p = $('.p-overlay:not(.active)').first();
		pActive = $('.p-overlay.active');
		
		// ajax : fill data
		p.empty().load(url + ' .portfolio-single', function() {	
			NProgress.set(0.5);
			
			// wait for images to be loaded
			p.imagesLoaded(function() {
				
				// for galleries in ajax pulled content
				setupMasonry();
				
				if(pActive.length) {
					hideProjectDetails();	  
				}
				
				hideLoader();
				
				$('html').addClass('p-overlay-on');
				
				$("body").scrollTop(0);
								
				// setup plugins
				setup();

				if(classicLayout) {
					p.show();	
				} else {
					p.removeClass('animate-in animate-out').addClass('animate-in').show();		
				}
				
				p.addClass('active');
				
			});
		});
	}
	
	function hideProjectDetails(forever, safeClose) {
		
		$("body").scrollTop(0);
		
		// close completely by back link.
		if(forever) {
			pActive = $('.p-overlay.active');
			
			$('html').removeClass('p-overlay-on');
			
			if(!safeClose) {
				// remove detail url
				$.address.path(portfolioKeyword);
			}
		}
		
		pActive.removeClass('active');
		
		if(classicLayout) {
			pActive.hide().empty();	
		} else {
			pActive.removeClass('animate-in animate-out').addClass('animate-out').show();	
			setTimeout(function() { pActive.hide().removeClass('animate-out').empty(); } ,10)	
		}
	}
	
	function giveDetailUrl() {
	
		var address = $.address.value();
		var detailUrl;
		
		if (address.indexOf("/"+ portfolioKeyword + "/")!=-1 && address.length > portfolioKeyword.length + 2 ) {
			var total = address.length;
			detailUrl = address.slice(portfolioKeyword.length+2,total);
		} else {
			detailUrl = -1;	
		}
		return detailUrl;
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// AJAX LOADER
	function showLoader() {
		NProgress.start();
	}
	function hideLoader() {
		NProgress.done();
	}
	// ------------------------------
	
	
	
	
	
	// ------------------------------
	// CHANGE PAGE
	function setActivePage() {
		
		var path = $.address.path();
		path = path.slice(1, path.length);
		path = giveDetailUrl() != -1 ? portfolioKeyword : path;
		
		
		if(path == "") {  // if hash tag doesnt exists - go to first page
			//alert("path is empty");
			var firstPage = $('.nav-menu li').first().find('a').attr('href');
			path = firstPage.slice(2,firstPage.length);
			
			
			if(classicLayout) {
				$('#'+ path).addClass( 'page-current' ).siblings().removeClass( 'page-current' );	
			} else {
				if(!($('.page-current').length)) { // first load - don't animate page change
					$('#'+ path).addClass( 'page-current' );
					current = $('#'+ path).index();
					setCurrentMenuItem();
				} else { // animate page change

						//console.log(giveDetailUrl());
						PageTransitions.nextPage( $('#'+ path).index() );

				}	
			}
	
			
			
			
			setCurrentMenuItem();

			//$.address.path(path);
			return false;
			}
		else { // show page change animation
				
				// change page only if url doesn't target portfolio single page
				if(giveDetailUrl() == -1){
					
					if(classicLayout) {
						$('#'+ path).addClass( 'page-current' ).siblings().removeClass( 'page-current' );	
						setCurrentMenuItem();
					} else {
						if(!($('.page-current').length)) { // first load - don't animate page change
							$('#'+ path).addClass( 'page-current' );
							current = $('#'+ path).index();
							setCurrentMenuItem();
						} else { // animate page change
							
								//console.log(giveDetailUrl());
								PageTransitions.nextPage( $('#'+ path).index() );
							
						}	
					}
						
				}
				
				
		}

		/*if(path.indexOf(portfolioKeyword) != -1) {
		} */
		
		// refresh masonry layouts
		refreshMasonry();
		setTimeout(function() { refreshMasonry(); }, 100);
		
	}	
	// ------------------------------
	
	
	
	// ------------------------------
	// SET CURRENT MENU ITEM
	function setCurrentMenuItem() {
		var activePageId = $('.pt-page.page-current').attr('id');
		// set default nav menu
		$('.nav-menu a[href$=' + activePageId +']').parent().addClass('current_page_item').siblings().removeClass('current_page_item');
	}	
	// ------------------------------
	
	
	
	// ------------------------------
	// PAGE TRANSITIONS : modern layout
	var current = 0;
	var inClass, outClass;
	window.nextAnimation = $('html').data("next-animation");
	window.prevAnimation = $('html').data("prev-animation");
	window.randomize = $('html').data("random-animation");
	window.isAnimating = false;
	var PageTransitions = (function() {

		var $main = $( '#main' ),
			$pages = $main.children( '.pt-page' ),
			$menuLinks = $('.nav-menu a'),
			animcursor = 1,
			endCurrPage = false,
			endNextPage = false,
			animEndEventNames = {
				'WebkitAnimation' : 'webkitAnimationEnd',
				'OAnimation' : 'oAnimationEnd',
				'msAnimation' : 'MSAnimationEnd',
				'animation' : 'animationend'
			},
			// animation end event name
			animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
			// support css animations
			support = Modernizr.cssanimations;
		
		
		// init()
		function init() {
	
			//$pages.each( function() {
				//var $page = $( this );
				//$page.attr('data-org-class-list', $page.attr( 'class' ) );
			//} );
		}
		// end init()
		
		// PAGE CHANGE FN
		function nextPage(nextPageIndex) {
			
			// DO NOTHING : if nextPage is same with the current page
			if(nextPageIndex === current) {
				return; 
				}
			
			var animation = nextPageIndex > current ? nextAnimation : prevAnimation;
			
			// random animation
			if(randomize) {
				if( animcursor > 67 ) {
					animcursor = 1;
				}
				animation = animcursor;
				++animcursor;	
			}
			
			if( window.isAnimating ) {
				return false;
			}
	
			window.isAnimating = true;
			
			var $currPage = $pages.eq( current );
			
			current = nextPageIndex; 

			var $nextPage = $pages.eq( current ).addClass( 'page-current' );
				
	
			switch( animation ) {
	
				case 1:
					outClass = 'pt-page-moveToLeft';
					inClass = 'pt-page-moveFromRight';
					break;
				case 2:
					outClass = 'pt-page-moveToRight';
					inClass = 'pt-page-moveFromLeft';
					break;
				case 3:
					outClass = 'pt-page-moveToTop';
					inClass = 'pt-page-moveFromBottom';
					break;
				case 4:
					outClass = 'pt-page-moveToBottom';
					inClass = 'pt-page-moveFromTop';
					break;
				case 5:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromRight pt-page-ontop';
					break;
				case 6:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromLeft pt-page-ontop';
					break;
				case 7:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromBottom pt-page-ontop';
					break;
				case 8:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromTop pt-page-ontop';
					break;
				case 9:
					outClass = 'pt-page-moveToLeftFade';
					inClass = 'pt-page-moveFromRightFade';
					break;
				case 10:
					outClass = 'pt-page-moveToRightFade';
					inClass = 'pt-page-moveFromLeftFade';
					break;
				case 11:
					outClass = 'pt-page-moveToTopFade';
					inClass = 'pt-page-moveFromBottomFade';
					break;
				case 12:
					outClass = 'pt-page-moveToBottomFade';
					inClass = 'pt-page-moveFromTopFade';
					break;
				case 13:
					outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
					inClass = 'pt-page-moveFromRight';
					break;
				case 14:
					outClass = 'pt-page-moveToRightEasing pt-page-ontop';
					inClass = 'pt-page-moveFromLeft';
					break;
				case 15:
					outClass = 'pt-page-moveToTopEasing pt-page-ontop';
					inClass = 'pt-page-moveFromBottom';
					break;
				case 16:
					outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
					inClass = 'pt-page-moveFromTop';
					break;
				case 17:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromRight pt-page-ontop';
					break;
				case 18:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromLeft pt-page-ontop';
					break;
				case 19:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromBottom pt-page-ontop';
					break;
				case 20:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromTop pt-page-ontop';
					break;
				case 21:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-scaleUpDown pt-page-delay300';
					break;
				case 22:
					outClass = 'pt-page-scaleDownUp';
					inClass = 'pt-page-scaleUp pt-page-delay300';
					break;
				case 23:
					outClass = 'pt-page-moveToLeft pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 24:
					outClass = 'pt-page-moveToRight pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 25:
					outClass = 'pt-page-moveToTop pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 26:
					outClass = 'pt-page-moveToBottom pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 27:
					outClass = 'pt-page-scaleDownCenter';
					inClass = 'pt-page-scaleUpCenter pt-page-delay400';
					break;
				case 28:
					outClass = 'pt-page-rotateRightSideFirst';
					inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
					break;
				case 29:
					outClass = 'pt-page-rotateLeftSideFirst';
					inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
					break;
				case 30:
					outClass = 'pt-page-rotateTopSideFirst';
					inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
					break;
				case 31:
					outClass = 'pt-page-rotateBottomSideFirst';
					inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
					break;
				case 32:
					outClass = 'pt-page-flipOutRight';
					inClass = 'pt-page-flipInLeft pt-page-delay500';
					break;
				case 33:
					outClass = 'pt-page-flipOutLeft';
					inClass = 'pt-page-flipInRight pt-page-delay500';
					break;
				case 34:
					outClass = 'pt-page-flipOutTop';
					inClass = 'pt-page-flipInBottom pt-page-delay500';
					break;
				case 35:
					outClass = 'pt-page-flipOutBottom';
					inClass = 'pt-page-flipInTop pt-page-delay500';
					break;
				case 36:
					outClass = 'pt-page-rotateFall pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 37:
					outClass = 'pt-page-rotateOutNewspaper';
					inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
					break;
				case 38:
					outClass = 'pt-page-rotatePushLeft';
					inClass = 'pt-page-moveFromRight';
					break;
				case 39:
					outClass = 'pt-page-rotatePushRight';
					inClass = 'pt-page-moveFromLeft';
					break;
				case 40:
					outClass = 'pt-page-rotatePushTop';
					inClass = 'pt-page-moveFromBottom';
					break;
				case 41:
					outClass = 'pt-page-rotatePushBottom';
					inClass = 'pt-page-moveFromTop';
					break;
				case 42:
					outClass = 'pt-page-rotatePushLeft';
					inClass = 'pt-page-rotatePullRight pt-page-delay180';
					break;
				case 43:
					outClass = 'pt-page-rotatePushRight';
					inClass = 'pt-page-rotatePullLeft pt-page-delay180';
					break;
				case 44:
					outClass = 'pt-page-rotatePushTop';
					inClass = 'pt-page-rotatePullBottom pt-page-delay180';
					break;
				case 45:
					outClass = 'pt-page-rotatePushBottom';
					inClass = 'pt-page-rotatePullTop pt-page-delay180';
					break;
				case 46:
					outClass = 'pt-page-rotateFoldLeft';
					inClass = 'pt-page-moveFromRightFade';
					break;
				case 47:
					outClass = 'pt-page-rotateFoldRight';
					inClass = 'pt-page-moveFromLeftFade';
					break;
				case 48:
					outClass = 'pt-page-rotateFoldTop';
					inClass = 'pt-page-moveFromBottomFade';
					break;
				case 49:
					outClass = 'pt-page-rotateFoldBottom';
					inClass = 'pt-page-moveFromTopFade';
					break;
				case 50:
					outClass = 'pt-page-moveToRightFade';
					inClass = 'pt-page-rotateUnfoldLeft';
					break;
				case 51:
					outClass = 'pt-page-moveToLeftFade';
					inClass = 'pt-page-rotateUnfoldRight';
					break;
				case 52:
					outClass = 'pt-page-moveToBottomFade';
					inClass = 'pt-page-rotateUnfoldTop';
					break;
				case 53:
					outClass = 'pt-page-moveToTopFade';
					inClass = 'pt-page-rotateUnfoldBottom';
					break;
				case 54:
					outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomLeftIn';
					break;
				case 55:
					outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomRightIn';
					break;
				case 56:
					outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomTopIn';
					break;
				case 57:
					outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomBottomIn';
					break;
				case 58:
					outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeLeftIn';
					break;
				case 59:
					outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeRightIn';
					break;
				case 60:
					outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeTopIn';
					break;
				case 61:
					outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeBottomIn';
					break;
				case 62:
					outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselLeftIn';
					break;
				case 63:
					outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselRightIn';
					break;
				case 64:
					outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselTopIn';
					break;
				case 65:
					outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselBottomIn';
					break;
				case 66:
					outClass = 'pt-page-rotateSidesOut';
					inClass = 'pt-page-rotateSidesIn pt-page-delay200';
					break;
				case 67:
					outClass = 'pt-page-rotateSlideOut';
					inClass = 'pt-page-rotateSlideIn';
					break;
	
			}
	
			$currPage.addClass( outClass ).on( animEndEventName, function() {
				$currPage.off( animEndEventName );
				endCurrPage = true;
				if( endNextPage ) {
					onEndAnimation( $currPage, $nextPage );
				}
			} );
	
			$nextPage.addClass( inClass ).on( animEndEventName, function() {
				$nextPage.off( animEndEventName );
				endNextPage = true;
				if( endCurrPage ) {
					onEndAnimation( $currPage, $nextPage );
				}
			} );
	
			if( !support ) {
				onEndAnimation( $currPage, $nextPage );
			}
	
		}
	
		function onEndAnimation( $outpage, $inpage ) {
			endCurrPage = false;
			endNextPage = false;
			resetPage( $outpage, $inpage );
			window.isAnimating = false;
			setCurrentMenuItem();
		}
	
		function resetPage( $outpage, $inpage ) {
			//$outpage.attr( 'class', $outpage.attr( 'data-org-class-list' ) );
			//$inpage.attr( 'class', $inpage.attr( 'data-org-class-list' ) + ' page-current' );
			$outpage.removeClass(outClass);
			$inpage.removeClass(inClass);
			//console.log("inClass = " + inClass);
			$pages.eq( current ).siblings().removeClass( 'page-current' );
		}
	
		init();
	
		return { 
			init : init,
			nextPage : nextPage
		};
	
	})();
	window.nextPage = function(index) {
		return new PageTransitions.nextPage(index);
		};
	// ------------------------------
	
	
	


})(jQuery);