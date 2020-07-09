


// ------------------------------------------------------------
// IFRAME BREAKER

function FrameBreaker() {
	if ( top.location !== self.location ) {
		top.location = self.location;
		}
}
window.onload = FrameBreaker();
// ------------------------------------------------------------



(function($) { "use strict";


	// ------------------------------------------------------------
	// DOCUMENT READY
	$(function() {

		// ------------------------------
		// STICKY SIDEBARS
		sticky_regions();
		// ------------------------------



		// if(getUrlParameter('storefront') === "envato-elements") {
		// 	$('.hide-on-elements').hide();
		// 	$('.show-on-elements').show();
		// }



    });
    // DOCUMENT READY
	// ------------------------------------------------------------


	// ------------------------------------------------------------
	// WINDOW ONLOAD
	window.onload = function() {

		// ------------------------------
		// STICKY SIDEBARS
		sticky_regions();
		// ------------------------------

	};
	// WINDOW ONLOAD
	// ------------------------------------------------------------


	// ------------------------------------------------------------
	// FUNCTIONS


	// ------------------------------
	// STICKY REGIONS
	function sticky_regions() {
		$(".sidebar, .site-header, .theme-action").stick_in_parent();
		}
	// ------------------------------


	// ------------------------------------------------------------



	// ------------------------------
	// FN : GET URL PARAMETER - to check envato elements
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}
	// ------------------------------


})(jQuery);



// ------------------------------------------------------------
// PLUGINS


/*
 Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
*/
(function(){var c,f;c=this.jQuery||window.jQuery;f=c(window);c.fn.stick_in_parent=function(b){var A,w,B,n,p,J,k,E,t,K,q,L;null==b&&(b={});t=b.sticky_class;B=b.inner_scrolling;E=b.recalc_every;k=b.parent;p=b.offset_top;n=b.spacer;w=b.bottoming;null==p&&(p=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=c(document);null==w&&(w=!0);J=function(a){var b;return window.getComputedStyle?(a=window.getComputedStyle(a[0]),b=parseFloat(a.getPropertyValue("width"))+parseFloat(a.getPropertyValue("margin-left"))+
parseFloat(a.getPropertyValue("margin-right")),"border-box"!==a.getPropertyValue("box-sizing")&&(b+=parseFloat(a.getPropertyValue("border-left-width"))+parseFloat(a.getPropertyValue("border-right-width"))+parseFloat(a.getPropertyValue("padding-left"))+parseFloat(a.getPropertyValue("padding-right"))),b):a.outerWidth(!0)};K=function(a,b,q,C,F,u,r,G){var v,H,m,D,I,d,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));if(!g.length)throw"failed to find stick parent";
v=m=!1;(h=null!=n?n&&a.closest(n):c("<div />"))&&h.css("position",a.css("position"));x=function(){var d,f,e;if(!G&&(I=A.height(),d=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),b=parseInt(g.css("padding-bottom"),10),q=g.offset().top+d+f,C=g.height(),m&&(v=m=!1,null==n&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-p,u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:J(a),
height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,d=p,z=E,l=function(){var c,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+d>C+q,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:d}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,d=p,null==n&&("left"!==r&&"right"!==r||a.insertAfter(h),h.detach()),c={position:"",width:"",top:""},a.css(c).removeClass(t).trigger("sticky_kit:unstick")),
B&&(c=f.height(),u+p>c&&!v&&(d-=l,d=Math.max(c-u,d),d=Math.min(p,d),m&&a.css({top:d+"px"})))):e>F&&(m=!0,c={position:"fixed",top:d},c.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(c).addClass(t),null==n&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+d>C+q),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),a.css({position:"absolute",bottom:b,top:"auto"}).trigger("sticky_kit:bottom")},
y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("resize",y);c(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==n&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",y),c(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,
0)}};q=0;for(L=this.length;q<L;q++)b=this[q],K(c(b));return this}}).call(this);






// SmoothScroll for websites v1.4.0 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me.
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any
// extension for browsers or native application
// without getting a written permission first.

!function(){function e(){z.keyboardSupport&&m("keydown",a)}function t(){if(!A&&document.body){A=!0;var t=document.body,o=document.documentElement,n=window.innerHeight,r=t.scrollHeight;if(B=document.compatMode.indexOf("CSS")>=0?o:t,D=t,e(),top!=self)X=!0;else if(r>n&&(t.offsetHeight<=n||o.offsetHeight<=n)){var a=document.createElement("div");a.style.cssText="position:absolute; z-index:-10000; top:0; left:0; right:0; height:"+B.scrollHeight+"px",document.body.appendChild(a);var i;T=function(){i||(i=setTimeout(function(){L||(a.style.height="0",a.style.height=B.scrollHeight+"px",i=null)},500))},setTimeout(T,10),m("resize",T);var l={attributes:!0,childList:!0,characterData:!1};if(M=new V(T),M.observe(t,l),B.offsetHeight<=n){var c=document.createElement("div");c.style.clear="both",t.appendChild(c)}}z.fixedBackground||L||(t.style.backgroundAttachment="scroll",o.style.backgroundAttachment="scroll")}}function o(){M&&M.disconnect(),h(I,r),h("mousedown",i),h("keydown",a),h("resize",T),h("load",t)}function n(e,t,o){if(p(t,o),1!=z.accelerationMax){var n=Date.now(),r=n-R;if(r<z.accelerationDelta){var a=(1+50/r)/2;a>1&&(a=Math.min(a,z.accelerationMax),t*=a,o*=a)}R=Date.now()}if(q.push({x:t,y:o,lastX:0>t?.99:-.99,lastY:0>o?.99:-.99,start:Date.now()}),!P){var i=e===document.body,l=function(n){for(var r=Date.now(),a=0,c=0,u=0;u<q.length;u++){var d=q[u],s=r-d.start,f=s>=z.animationTime,m=f?1:s/z.animationTime;z.pulseAlgorithm&&(m=x(m));var h=d.x*m-d.lastX>>0,w=d.y*m-d.lastY>>0;a+=h,c+=w,d.lastX+=h,d.lastY+=w,f&&(q.splice(u,1),u--)}i?window.scrollBy(a,c):(a&&(e.scrollLeft+=a),c&&(e.scrollTop+=c)),t||o||(q=[]),q.length?_(l,e,1e3/z.frameRate+1):P=!1};_(l,e,0),P=!0}}function r(e){A||t();var o=e.target,r=u(o);if(!r||e.defaultPrevented||e.ctrlKey)return!0;if(w(D,"embed")||w(o,"embed")&&/\.pdf/i.test(o.src)||w(D,"object"))return!0;var a=-e.wheelDeltaX||e.deltaX||0,i=-e.wheelDeltaY||e.deltaY||0;return K&&(e.wheelDeltaX&&b(e.wheelDeltaX,120)&&(a=-120*(e.wheelDeltaX/Math.abs(e.wheelDeltaX))),e.wheelDeltaY&&b(e.wheelDeltaY,120)&&(i=-120*(e.wheelDeltaY/Math.abs(e.wheelDeltaY)))),a||i||(i=-e.wheelDelta||0),1===e.deltaMode&&(a*=40,i*=40),!z.touchpadSupport&&v(i)?!0:(Math.abs(a)>1.2&&(a*=z.stepSize/120),Math.abs(i)>1.2&&(i*=z.stepSize/120),n(r,a,i),e.preventDefault(),void l())}function a(e){var t=e.target,o=e.ctrlKey||e.altKey||e.metaKey||e.shiftKey&&e.keyCode!==N.spacebar;document.contains(D)||(D=document.activeElement);var r=/^(textarea|select|embed|object)$/i,a=/^(button|submit|radio|checkbox|file|color|image)$/i;if(r.test(t.nodeName)||w(t,"input")&&!a.test(t.type)||w(D,"video")||y(e)||t.isContentEditable||e.defaultPrevented||o)return!0;if((w(t,"button")||w(t,"input")&&a.test(t.type))&&e.keyCode===N.spacebar)return!0;var i,c=0,d=0,s=u(D),f=s.clientHeight;switch(s==document.body&&(f=window.innerHeight),e.keyCode){case N.up:d=-z.arrowScroll;break;case N.down:d=z.arrowScroll;break;case N.spacebar:i=e.shiftKey?1:-1,d=-i*f*.9;break;case N.pageup:d=.9*-f;break;case N.pagedown:d=.9*f;break;case N.home:d=-s.scrollTop;break;case N.end:var m=s.scrollHeight-s.scrollTop-f;d=m>0?m+10:0;break;case N.left:c=-z.arrowScroll;break;case N.right:c=z.arrowScroll;break;default:return!0}n(s,c,d),e.preventDefault(),l()}function i(e){D=e.target}function l(){clearTimeout(E),E=setInterval(function(){F={}},1e3)}function c(e,t){for(var o=e.length;o--;)F[j(e[o])]=t;return t}function u(e){var t=[],o=document.body,n=B.scrollHeight;do{var r=F[j(e)];if(r)return c(t,r);if(t.push(e),n===e.scrollHeight){var a=s(B)&&s(o),i=a||f(B);if(X&&d(B)||!X&&i)return c(t,$())}else if(d(e)&&f(e))return c(t,e)}while(e=e.parentElement)}function d(e){return e.clientHeight+10<e.scrollHeight}function s(e){var t=getComputedStyle(e,"").getPropertyValue("overflow-y");return"hidden"!==t}function f(e){var t=getComputedStyle(e,"").getPropertyValue("overflow-y");return"scroll"===t||"auto"===t}function m(e,t){window.addEventListener(e,t,!1)}function h(e,t){window.removeEventListener(e,t,!1)}function w(e,t){return(e.nodeName||"").toLowerCase()===t.toLowerCase()}function p(e,t){e=e>0?1:-1,t=t>0?1:-1,(Y.x!==e||Y.y!==t)&&(Y.x=e,Y.y=t,q=[],R=0)}function v(e){return e?(O.length||(O=[e,e,e]),e=Math.abs(e),O.push(e),O.shift(),clearTimeout(H),H=setTimeout(function(){window.localStorage&&(localStorage.SS_deltaBuffer=O.join(","))},1e3),!g(120)&&!g(100)):void 0}function b(e,t){return Math.floor(e/t)==e/t}function g(e){return b(O[0],e)&&b(O[1],e)&&b(O[2],e)}function y(e){var t=e.target,o=!1;if(-1!=document.URL.indexOf("www.youtube.com/watch"))do if(o=t.classList&&t.classList.contains("html5-video-controls"))break;while(t=t.parentNode);return o}function S(e){var t,o,n;return e*=z.pulseScale,1>e?t=e-(1-Math.exp(-e)):(o=Math.exp(-1),e-=1,n=1-Math.exp(-e),t=o+n*(1-o)),t*z.pulseNormalize}function x(e){return e>=1?1:0>=e?0:(1==z.pulseNormalize&&(z.pulseNormalize/=S(1)),S(e))}function k(e){for(var t in e)C.hasOwnProperty(t)&&(z[t]=e[t])}var D,M,T,E,H,C={frameRate:150,animationTime:300,stepSize:100,pulseAlgorithm:!0,pulseScale:4,pulseNormalize:1,accelerationDelta:50,accelerationMax:3,keyboardSupport:!0,arrowScroll:50,touchpadSupport:!1,fixedBackground:!0,excluded:""},z=C,L=!1,X=!1,Y={x:0,y:0},A=!1,B=document.documentElement,O=[],K=/^Mac/.test(navigator.platform),N={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},q=[],P=!1,R=Date.now(),j=function(){var e=0;return function(t){return t.uniqueID||(t.uniqueID=e++)}}(),F={};window.localStorage&&localStorage.SS_deltaBuffer&&(O=localStorage.SS_deltaBuffer.split(","));var I,_=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e,t,o){window.setTimeout(e,o||1e3/60)}}(),V=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,$=function(){var e;return function(){if(!e){var t=document.createElement("div");t.style.cssText="height:10000px;width:1px;",document.body.appendChild(t);var o=document.body.scrollTop;document.documentElement.scrollTop;window.scrollBy(0,3),e=document.body.scrollTop!=o?document.body:document.documentElement,window.scrollBy(0,-3),document.body.removeChild(t)}return e}}(),U=window.navigator.userAgent,W=/Edge/.test(U),G=/chrome/i.test(U)&&!W,J=/safari/i.test(U)&&!W,Q=/mobile/i.test(U),Z=(G||J)&&!Q;"onwheel"in document.createElement("div")?I="wheel":"onmousewheel"in document.createElement("div")&&(I="mousewheel"),I&&Z&&(m(I,r),m("mousedown",i),m("load",t)),k.destroy=o,window.SmoothScrollOptions&&k(window.SmoothScrollOptions),"function"==typeof define&&define.amd?define(function(){return k}):"object"==typeof exports?module.exports=k:window.SmoothScroll=k}();





// ----------------------------------------------------------------------------------------------------
// ScrollMe
// A jQuery plugin for adding simple scrolling effects to web pages
// http://scrollme.nckprsn.com
// ----------------------------------------------------------------------------------------------------
var scrollme=(function(a){var d={};var c=a(document);var b=a(window);d.body_height=0;d.viewport_height=0;d.viewport_top=0;d.viewport_bottom=0;d.viewport_top_previous=-1;d.elements=[];d.elements_in_view=[];d.property_defaults={opacity:1,translatex:0,translatey:0,translatez:0,rotatex:0,rotatey:0,rotatez:0,scale:1,scalex:1,scaley:1,scalez:1};d.scrollme_selector=".scrollme";d.animateme_selector=".animateme";d.update_interval=10;d.easing_functions={linear:function(e){return e},easeout:function(e){return e*e*e},easein:function(e){e=1-e;return 1-(e*e*e)},easeinout:function(e){if(e<0.5){return(4*e*e*e)}else{e=1-e;return 1-(4*e*e*e)}}};d.init_events=["ready","page:load","page:change"];d.init_if=function(){return true};d.init=function(){if(!d.init_if()){return false}d.init_elements();d.on_resize();b.on("resize orientationchange",function(){d.on_resize()});b.load(function(){setTimeout(function(){d.on_resize()},100)});setInterval(d.update,d.update_interval);return true};d.init_elements=function(){a(d.scrollme_selector).each(function(){var e={};e.element=a(this);var f=[];a(this).find(d.animateme_selector).addBack(d.animateme_selector).each(function(){var h={};h.element=a(this);h.when=h.element.data("when");h.from=h.element.data("from");h.to=h.element.data("to");if(h.element.is("[data-crop]")){h.crop=h.element.data("crop")}else{h.crop=true}if(h.element.is("[data-easing]")){h.easing=d.easing_functions[h.element.data("easing")]}else{h.easing=d.easing_functions.easeout}var g={};if(h.element.is("[data-opacity]")){g.opacity=h.element.data("opacity")}if(h.element.is("[data-translatex]")){g.translatex=h.element.data("translatex")}if(h.element.is("[data-translatey]")){g.translatey=h.element.data("translatey")}if(h.element.is("[data-translatez]")){g.translatez=h.element.data("translatez")}if(h.element.is("[data-rotatex]")){g.rotatex=h.element.data("rotatex")}if(h.element.is("[data-rotatey]")){g.rotatey=h.element.data("rotatey")}if(h.element.is("[data-rotatez]")){g.rotatez=h.element.data("rotatez")}if(h.element.is("[data-scale]")){g.scale=h.element.data("scale")}if(h.element.is("[data-scalex]")){g.scalex=h.element.data("scalex")}if(h.element.is("[data-scaley]")){g.scaley=h.element.data("scaley")}if(h.element.is("[data-scalez]")){g.scalez=h.element.data("scalez")}h.properties=g;f.push(h)});e.effects=f;d.elements.push(e)})};d.update=function(){window.requestAnimationFrame(function(){d.update_viewport_position();if(d.viewport_top_previous!=d.viewport_top){d.update_elements_in_view();d.animate()}d.viewport_top_previous=d.viewport_top})};d.animate=function(){var C=d.elements_in_view.length;for(var A=0;A<C;A++){var h=d.elements_in_view[A];var f=h.effects.length;for(var D=0;D<f;D++){var w=h.effects[D];switch(w.when){case"view":case"span":var r=h.top-d.viewport_height;var n=h.bottom;break;case"exit":var r=h.bottom-d.viewport_height;var n=h.bottom;break;default:var r=h.top-d.viewport_height;var n=h.top;break}if(w.crop){if(r<0){r=0}if(n>(d.body_height-d.viewport_height)){n=d.body_height-d.viewport_height}}var g=(d.viewport_top-r)/(n-r);var x=w.from;var j=w.to;var o=j-x;var k=(g-x)/o;var v=w.easing(k);var l=d.animate_value(g,v,x,j,w,"opacity");var t=d.animate_value(g,v,x,j,w,"translatey");var u=d.animate_value(g,v,x,j,w,"translatex");var s=d.animate_value(g,v,x,j,w,"translatez");var B=d.animate_value(g,v,x,j,w,"rotatex");var z=d.animate_value(g,v,x,j,w,"rotatey");var y=d.animate_value(g,v,x,j,w,"rotatez");var E=d.animate_value(g,v,x,j,w,"scale");var q=d.animate_value(g,v,x,j,w,"scalex");var p=d.animate_value(g,v,x,j,w,"scaley");var m=d.animate_value(g,v,x,j,w,"scalez");if("scale" in w.properties){q=E;p=E;m=E}w.element.css({opacity:l,transform:"translate3d( "+u+"px , "+t+"px , "+s+"px ) rotateX( "+B+"deg ) rotateY( "+z+"deg ) rotateZ( "+y+"deg ) scale3d( "+q+" , "+p+" , "+m+" )"})}}};d.animate_value=function(i,h,j,k,n,m){var g=d.property_defaults[m];if(!(m in n.properties)){return g}var e=n.properties[m];var f=(k>j)?true:false;if(i<j&&f){return g}if(i>k&&f){return e}if(i>j&&!f){return g}if(i<k&&!f){return e}var l=g+(h*(e-g));switch(m){case"opacity":l=l.toFixed(2);break;case"translatex":l=l.toFixed(0);break;case"translatey":l=l.toFixed(0);break;case"translatez":l=l.toFixed(0);break;case"rotatex":l=l.toFixed(1);break;case"rotatey":l=l.toFixed(1);break;case"rotatez":l=l.toFixed(1);break;case"scale":l=l.toFixed(3);break;default:break}return l};d.update_viewport_position=function(){d.viewport_top=b.scrollTop();d.viewport_bottom=d.viewport_top+d.viewport_height};d.update_elements_in_view=function(){d.elements_in_view=[];var f=d.elements.length;for(var e=0;e<f;e++){if((d.elements[e].top<d.viewport_bottom)&&(d.elements[e].bottom>d.viewport_top)){d.elements_in_view.push(d.elements[e])}}};d.on_resize=function(){d.update_viewport();d.update_element_heights();d.update_viewport_position();d.update_elements_in_view();d.animate()};d.update_viewport=function(){d.body_height=c.height();d.viewport_height=b.height()};d.update_element_heights=function(){var g=d.elements.length;for(var f=0;f<g;f++){var h=d.elements[f].element.outerHeight();var e=d.elements[f].element.offset();d.elements[f].height=h;d.elements[f].top=e.top;d.elements[f].bottom=e.top+h}};c.on(d.init_events.join(" "),function(){d.init()});return d})(jQuery);


// ------------------------------------------------------------
