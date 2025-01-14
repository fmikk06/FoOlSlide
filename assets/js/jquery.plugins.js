(function() {
	if (window.__twitterIntentHandler) return;
	var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
	windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
	width = 550,
	height = 420,
	winHeight = screen.height,
	winWidth = screen.width;

	function handleIntent(e) {
		e = e || window.event;
		var target = e.target || e.srcElement,
		m, left, top;

		while (target && target.nodeName.toLowerCase() !== 'a') {
			target = target.parentNode;
		}

		if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
			m = target.href.match(intentRegex);
			if (m) {
				left = Math.round((winWidth / 2) - (width / 2));
				top = 0;

				if (winHeight > height) {
					top = Math.round((winHeight / 2) - (height / 2));
				}

				window.open(target.href, 'intent', windowOptions + ',width=' + width +
					',height=' + height + ',left=' + left + ',top=' + top);
				e.returnValue = false;
				e.preventDefault && e.preventDefault();
			}
		}
	}

	if (document.addEventListener) {
		document.addEventListener('click', handleIntent, false);
	} else if (document.attachEvent) {
		document.attachEvent('onclick', handleIntent);
	}
	window.__twitterIntentHandler = true;
}());
			
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

var messages = [];
function create_message(code, timeout, message, image) {
	messages[code] = {};
	jQuery("#messages").append("<div onClick='delete_message(\""+code+"\")' class='message "+code+"' style='display:none'>"+message+"</div>");
	jQuery("#messages ."+code).fadeIn(500);
	if(timeout != 0)
		messages[code].timeout = setTimeout('delete_message("'+code+'")', timeout);
	return false;
}

function delete_message(code) {
	if(messages[code] != undefined)
		clearTimeout(messages[code].timeout);
	jQuery("#messages ."+code).fadeOut(500, function(){
		jQuery("#messages ."+code).remove();
	});
	return false;
}
			
/**
 * jQuery.Preload - Multifunctional preloader
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com
 * Dual licensed under MIT and GPL.
 * Date: 3/25/2009
 * @author Ariel Flesler
 * @version 1.0.8
 */
;(function($){var h=$.preload=function(c,d){if(c.split)c=$(c);d=$.extend({},h.defaults,d);var f=$.map(c,function(a){if(!a)return;if(a.split)return d.base+a+d.ext;var b=a.src||a.href;if(typeof d.placeholder=='string'&&a.src)a.src=d.placeholder;if(b&&d.find)b=b.replace(d.find,d.replace);return b||null}),data={loaded:0,failed:0,next:0,done:0,total:f.length};if(!data.total)return finish();var g=$(Array(d.threshold+1).join('<img/>')).load(handler).error(handler).bind('abort',handler).each(fetch);function handler(e){data.element=this;data.found=e.type=='load';data.image=this.src;data.index=this.index;var a=data.original=c[this.index];data[data.found?'loaded':'failed']++;data.done++;if(d.enforceCache)h.cache.push($('<img/>').attr('src',data.image)[0]);if(d.placeholder&&a.src)a.src=data.found?data.image:d.notFound||a.src;if(d.onComplete)d.onComplete(data);if(data.done<data.total)fetch(0,this);else{if(g&&g.unbind)g.unbind('load').unbind('error').unbind('abort');g=null;finish()}};function fetch(i,a,b){if(a.attachEvent&&data.next&&data.next%h.gap==0&&!b){setTimeout(function(){fetch(i,a,1)},0);return!1}if(data.next==data.total)return!1;a.index=data.next;a.src=f[data.next++];if(d.onRequest){data.index=a.index;data.element=a;data.image=a.src;data.original=c[data.next-1];d.onRequest(data)}};function finish(){if(d.onFinish)d.onFinish(data)}};h.gap=14;h.cache=[];h.defaults={threshold:2,base:'',ext:'',replace:''};$.fn.preload=function(a){h(this,a);return this}})(jQuery);




/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);




/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


			/*
https://github.com/balupton/History.js

Copyright (c) 2011, Benjamin Arthur Lupton
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  Neither the name of Benjamin Arthur Lupton nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
			 */
			if ( typeof window.JSON === 'undefined' ) {
				var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(b&&typeof b!="function"&&(typeof b!="object"||typeof b.length!="number"))throw new Error("JSON.stringify");return str("",{"":a})}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}();
								}

								(function(a,b){function d(a,d){var e=d.__amplify__?JSON.parse(d.__amplify__):{};c.addType(a,function(f,g,h){var i=g,j=(new Date).getTime(),k,l;if(!f){i={};for(f in e)k=d[f],l=k?JSON.parse(k):{expires:-1},l.expires&&l.expires<=j?(delete d[f],delete e[f]):i[f.replace(/^__amplify__/,"")]=l.data;d.__amplify__=JSON.stringify(e);return i}f="__amplify__"+f;if(g===b){if(e[f]){k=d[f],l=k?JSON.parse(k):{expires:-1};if(l.expires&&l.expires<=j)delete d[f],delete e[f];else return l.data}}else if(g===null)delete d[f],delete e[f];else{l=JSON.stringify({data:g,expires:h.expires?j+h.expires:null});try{d[f]=l,e[f]=!0}catch(m){c[a]();try{d[f]=l,e[f]=!0}catch(m){throw c.error()}}}d.__amplify__=JSON.stringify(e);return i})}JSON.stringify=JSON.stringify||JSON.encode,JSON.parse=JSON.parse||JSON.decode;var c=a.store=function(a,b,d,e){var e=c.type;d&&d.type&&d.type in c.types&&(e=d.type);return c.types[e](a,b,d||{})};c.types={},c.type=null,c.addType=function(a,b){c.type||(c.type=a),c.types[a]=b,c[a]=function(b,d,e){e=e||{},e.type=a;return c(b,d,e)}},c.error=function(){return"amplify.store quota exceeded"};for(var e in{localStorage:1,sessionStorage:1})try{window[e].getItem&&d(e,window[e])}catch(f){}window.globalStorage&&(d("globalStorage",window.globalStorage[window.location.hostname]),c.type==="sessionStorage"&&(c.type="globalStorage")),function(){var a=document.createElement("div"),d="amplify",e;a.style.display="none",document.getElementsByTagName("head")[0].appendChild(a),a.addBehavior&&(a.addBehavior("#default#userdata"),a.load(d),e=a.getAttribute(d)?JSON.parse(a.getAttribute(d)):{},c.addType("userData",function(f,g,h){var i=g,j=(new Date).getTime(),k,l,m;if(!f){i={};for(f in e)k=a.getAttribute(f),l=k?JSON.parse(k):{expires:-1},l.expires&&l.expires<=j?(a.removeAttribute(f),delete e[f]):i[f]=l.data;a.setAttribute(d,JSON.stringify(e)),a.save(d);return i}f=f.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-");if(g===b){if(f in e){k=a.getAttribute(f),l=k?JSON.parse(k):{expires:-1};if(l.expires&&l.expires<=j)a.removeAttribute(f),delete e[f];else return l.data}}else g===null?(a.removeAttribute(f),delete e[f]):(m=a.getAttribute(f),l=JSON.stringify({data:g,expires:h.expires?j+h.expires:null}),a.setAttribute(f,l),e[f]=!0);a.setAttribute(d,JSON.stringify(e));try{a.save(d)}catch(n){m===null?(a.removeAttribute(f),delete e[f]):a.setAttribute(f,m),c.userData();try{a.setAttribute(f,l),e[f]=!0,a.save(d)}catch(n){m===null?(a.removeAttribute(f),delete e[f]):a.setAttribute(f,m);throw c.error()}}return i}))}(),d("memory",{})})(this.amplify=this.amplify||{});
								(function(a,b){var c=a.History=a.History||{},d=a.jQuery;if(typeof c.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");c.Adapter={bind:function(a,b,c){d(a).bind(b,c)},trigger:function(a,b){d(a).trigger(b)},onDomLoad:function(a){d(a)}},typeof c.init!="undefined"&&c.init()})(window);

								/**
								 * History.js Core
								 * @author Benjamin Arthur Lupton <contact@balupton.com>
								 * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
								 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
								 */

								(function(window,undefined){
									"use strict";

									// --------------------------------------------------------------------------
									// Initialise

									// Localise Globals
									var
									console = window.console||undefined, // Prevent a JSLint complain
									document = window.document, // Make sure we are using the correct document
									navigator = window.navigator, // Make sure we are using the correct navigator
									amplify = window.amplify||false, // Amplify.js
									setTimeout = window.setTimeout,
									clearTimeout = window.clearTimeout,
									setInterval = window.setInterval,
									clearInterval = window.clearInterval,
									JSON = window.JSON,
									History = window.History = window.History||{}, // Public History Object
									history = window.history; // Old History Object

									// MooTools Compatibility
									JSON.stringify = JSON.stringify||JSON.encode;
									JSON.parse = JSON.parse||JSON.decode;

									// Check Existence
									if ( typeof History.init !== 'undefined' ) {
										throw new Error('History.js Core has already been loaded...');
									}

									// Initialise History
									History.init = function(){
										// Check Load Status of Adapter
										if ( typeof History.Adapter === 'undefined' ) {
											return false;
										}

										// Check Load Status of Core
										if ( typeof History.initCore !== 'undefined' ) {
											History.initCore();
										}

										// Check Load Status of HTML4 Support
										if ( typeof History.initHtml4 !== 'undefined' ) {
											History.initHtml4();
										}

										// Return true
										return true;
									};

									// --------------------------------------------------------------------------
									// Initialise Core

									// Initialise Core
									History.initCore = function(){
										// Initialise
										if ( typeof History.initCore.initialized !== 'undefined' ) {
											// Already Loaded
											return false;
										}
										else {
											History.initCore.initialized = true;
										}

										// ----------------------------------------------------------------------
										// Options

										/**
										 * History.options
										 * Configurable options
										 */
										History.options = History.options||{};

										/**
										 * History.options.hashChangeInterval
										 * How long should the interval be before hashchange checks
										 */
										History.options.hashChangeInterval = History.options.hashChangeInterval || 100;

										/**
										 * History.options.safariPollInterval
										 * How long should the interval be before safari poll checks
										 */
										History.options.safariPollInterval = History.options.safariPollInterval || 500;

										/**
										 * History.options.doubleCheckInterval
										 * How long should the interval be before we perform a double check
										 */
										History.options.doubleCheckInterval = History.options.doubleCheckInterval || 500;

										/**
										 * History.options.storeInterval
										 * How long should we wait between store calls
										 */
										History.options.storeInterval = History.options.storeInterval || 1000;

										/**
										 * History.options.busyDelay
										 * How long should we wait between busy events
										 */
										History.options.busyDelay = History.options.busyDelay || 250;

										/**
										 * History.options.debug
										 * If true will enable debug messages to be logged
										 */
										History.options.debug = History.options.debug || false;

										/**
										 * History.options.initialTitle
										 * What is the title of the initial state
										 */
										History.options.initialTitle = History.options.initialTitle || document.title;


										// ----------------------------------------------------------------------
										// Interval record

										/**
										 * History.intervalList
										 * List of intervals set, to be cleared when document is unloaded.
										 */
										History.intervalList = [];

										/**
										 * History.clearAllIntervals
										 * Clears all setInterval instances.
										 */
										History.clearAllIntervals = function(){
											var i, il = History.intervalList;
											if (typeof il !== "undefined" && il !== null) {
												for (i = 0; i < il.length; i++) {
													clearInterval(il[i]);
												}
												History.intervalList = null;
											}
										};
										History.Adapter.bind(window,"beforeunload",History.clearAllIntervals);
										History.Adapter.bind(window,"unload",History.clearAllIntervals);


										// ----------------------------------------------------------------------
										// Debug

										/**
										 * History.debug(message,...)
										 * Logs the passed arguments if debug enabled
										 */
										History.debug = function(){
											if ( (History.options.debug||false) ) {
												History.log.apply(History,arguments);
											}
										};

										/**
										 * History.log(message,...)
										 * Logs the passed arguments
										 */
										History.log = function(){
											// Prepare
											var
											consoleExists = !(typeof console === 'undefined' || typeof console.log === 'undefined' || typeof console.log.apply === 'undefined'),
											textarea = document.getElementById('log'),
											message,
											i,n
											;

											// Write to Console
											if ( consoleExists ) {
												var args = Array.prototype.slice.call(arguments);
												message = args.shift();
												if ( typeof console.debug !== 'undefined' ) {
													console.debug.apply(console,[message,args]);
												}
												else {
													console.log.apply(console,[message,args]);
												}
											}
											else {
												message = ("\n"+arguments[0]+"\n");
											}

											// Write to log
											for ( i=1,n=arguments.length; i<n; ++i ) {
												var arg = arguments[i];
												if ( typeof arg === 'object' && typeof JSON !== 'undefined' ) {
													try {
														arg = JSON.stringify(arg);
													}
													catch ( Exception ) {
														// Recursive Object
													}
												}
												message += "\n"+arg+"\n";
											}

											// Textarea
											if ( textarea ) {
												textarea.value += message+"\n-----\n";
												textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
											}
											// No Textarea, No Console
											else if ( !consoleExists ) {
												alert(message);
											}

											// Return true
											return true;
										};

										// ----------------------------------------------------------------------
										// Emulated Status

										/**
										 * History.getInternetExplorerMajorVersion()
										 * Get's the major version of Internet Explorer
										 * @return {integer}
										 * @license Public Domain
										 * @author Benjamin Arthur Lupton <contact@balupton.com>
										 * @author James Padolsey <https://gist.github.com/527683>
										 */
										History.getInternetExplorerMajorVersion = function(){
											var result = History.getInternetExplorerMajorVersion.cached =
												(typeof History.getInternetExplorerMajorVersion.cached !== 'undefined')
												?	History.getInternetExplorerMajorVersion.cached
											:	(function(){
												var v = 3,
												div = document.createElement('div'),
												all = div.getElementsByTagName('i');
												while ( (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->') && all[0] ) {}
												return (v > 4) ? v : false;
											})()
											;
											return result;
										};

										/**
										 * History.isInternetExplorer()
										 * Are we using Internet Explorer?
										 * @return {boolean}
										 * @license Public Domain
										 * @author Benjamin Arthur Lupton <contact@balupton.com>
										 */
										History.isInternetExplorer = function(){
											var result =
												History.isInternetExplorer.cached =
												(typeof History.isInternetExplorer.cached !== 'undefined')
												?	History.isInternetExplorer.cached
											:	Boolean(History.getInternetExplorerMajorVersion())
											;
											return result;
										};

										/**
										 * History.emulated
										 * Which features require emulating?
										 */
										History.emulated = {
											pushState: !Boolean(
											window.history && window.history.pushState && window.history.replaceState
												&& !(
											(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i).test(navigator.userAgent) /* disable for versions of iOS before version 4.3 (8F190) */
												|| (/AppleWebKit\/5([0-2]|3[0-2])/i).test(navigator.userAgent) /* disable for the mercury iOS browser, or at least older versions of the webkit engine */
										)
										),
											hashChange: Boolean(
												!(('onhashchange' in window) || ('onhashchange' in document))
												||
												(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8)
										)
										};

										/**
										 * History.enabled
										 * Is History enabled?
										 */
										History.enabled = !History.emulated.pushState;

										/**
										 * History.bugs
										 * Which bugs are present
										 */
										History.bugs = {
											/**
											 * Safari 5 and Safari iOS 4 fail to return to the correct state once a hash is replaced by a `replaceState` call
											 * https://bugs.webkit.org/show_bug.cgi?id=56249
											 */
											setHash: Boolean(!History.emulated.pushState && navigator.vendor === 'Apple Computer, Inc.' && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),

											/**
											 * Safari 5 and Safari iOS 4 sometimes fail to apply the state change under busy conditions
											 * https://bugs.webkit.org/show_bug.cgi?id=42940
											 */
											safariPoll: Boolean(!History.emulated.pushState && navigator.vendor === 'Apple Computer, Inc.' && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),

											/**
											 * MSIE 6 and 7 sometimes do not apply a hash even it was told to (requiring a second call to the apply function)
											 */
											ieDoubleCheck: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8),

											/**
											 * MSIE 6 requires the entire hash to be encoded for the hashes to trigger the onHashChange event
											 */
											hashEscape: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 7)
										};

										/**
										 * History.isEmptyObject(obj)
										 * Checks to see if the Object is Empty
										 * @param {Object} obj
										 * @return {boolean}
										 */
										History.isEmptyObject = function(obj) {
											for ( var name in obj ) {
												return false;
											}
											return true;
										};

										/**
										 * History.cloneObject(obj)
										 * Clones a object
										 * @param {Object} obj
										 * @return {Object}
										 */
										History.cloneObject = function(obj) {
											var hash,newObj;
											if ( obj ) {
												hash = JSON.stringify(obj);
												newObj = JSON.parse(hash);
											}
											else {
												newObj = {};
											}
											return newObj;
										};

										// ----------------------------------------------------------------------
										// URL Helpers

										/**
										 * History.getRootUrl()
										 * Turns "http://mysite.com/dir/page.html?asd" into "http://mysite.com"
										 * @return {String} rootUrl
										 */
										History.getRootUrl = function(){
											// Create
											var rootUrl = document.location.protocol+'//'+(document.location.hostname||document.location.host);
											if ( document.location.port||false ) {
												rootUrl += ':'+document.location.port;
											}
											rootUrl += '/';

											// Return
											return rootUrl;
										};

										/**
										 * History.getBaseHref()
										 * Fetches the `href` attribute of the `<base href="...">` element if it exists
										 * @return {String} baseHref
										 */
										History.getBaseHref = function(){
											// Create
											var
											baseElements = document.getElementsByTagName('base'),
											baseElement = null,
											baseHref = '';

											// Test for Base Element
											if ( baseElements.length === 1 ) {
												// Prepare for Base Element
												baseElement = baseElements[0];
												baseHref = baseElement.href.replace(/[^\/]+$/,'');
											}

											// Adjust trailing slash
											baseHref = baseHref.replace(/\/+$/,'');
											if ( baseHref ) baseHref += '/';

											// Return
											return baseHref;
										};

										/**
										 * History.getBaseUrl()
										 * Fetches the baseHref or basePageUrl or rootUrl (whichever one exists first)
										 * @return {String} baseUrl
										 */
										History.getBaseUrl = function(){
											// Create
											var baseUrl = History.getBaseHref()||History.getBasePageUrl()||History.getRootUrl();

											// Return
											return baseUrl;
										};

										/**
										 * History.getPageUrl()
										 * Fetches the URL of the current page
										 * @return {String} pageUrl
										 */
										History.getPageUrl = function(){
											// Fetch
											var
											State = History.getState(false,false),
											stateUrl = (State||{}).url||document.location.href;

											// Create
											var pageUrl = stateUrl.replace(/\/+$/,'').replace(/[^\/]+$/,function(part,index,string){
												return (/\./).test(part) ? part : part+'/';
											});

											// Return
											return pageUrl;
										};

										/**
										 * History.getBasePageUrl()
										 * Fetches the Url of the directory of the current page
										 * @return {String} basePageUrl
										 */
										History.getBasePageUrl = function(){
											// Create
											var basePageUrl = document.location.href.replace(/[#\?].*/,'').replace(/[^\/]+$/,function(part,index,string){
												return (/[^\/]$/).test(part) ? '' : part;
											}).replace(/\/+$/,'')+'/';

											// Return
											return basePageUrl;
										};

										/**
										 * History.getFullUrl(url)
										 * Ensures that we have an absolute URL and not a relative URL
										 * @param {string} url
										 * @param {Boolean} allowBaseHref
										 * @return {string} fullUrl
										 */
										History.getFullUrl = function(url,allowBaseHref){
											// Prepare
											var fullUrl = url, firstChar = url.substring(0,1);
											allowBaseHref = (typeof allowBaseHref === 'undefined') ? true : allowBaseHref;

											// Check
											if ( /[a-z]+\:\/\//.test(url) ) {
												// Full URL
											}
											else if ( firstChar === '/' ) {
												// Root URL
												fullUrl = History.getRootUrl()+url.replace(/^\/+/,'');
											}
											else if ( firstChar === '#' ) {
												// Anchor URL
												fullUrl = History.getPageUrl().replace(/#.*/,'')+url;
											}
											else if ( firstChar === '?' ) {
												// Query URL
												fullUrl = History.getPageUrl().replace(/[\?#].*/,'')+url;
											}
											else {
												// Relative URL
												if ( allowBaseHref ) {
													fullUrl = History.getBaseUrl()+url.replace(/^(\.\/)+/,'');
												} else {
													fullUrl = History.getBasePageUrl()+url.replace(/^(\.\/)+/,'');
												}
												// We have an if condition above as we do not want hashes
												// which are relative to the baseHref in our URLs
												// as if the baseHref changes, then all our bookmarks
												// would now point to different locations
												// whereas the basePageUrl will always stay the same
											}

											// Return
											return fullUrl.replace(/\#$/,'');
										};

										/**
										 * History.getShortUrl(url)
										 * Ensures that we have a relative URL and not a absolute URL
										 * @param {string} url
										 * @return {string} url
										 */
										History.getShortUrl = function(url){
											// Prepare
											var shortUrl = url, baseUrl = History.getBaseUrl(), rootUrl = History.getRootUrl();

											// Trim baseUrl
											if ( History.emulated.pushState ) {
												// We are in a if statement as when pushState is not emulated
												// The actual url these short urls are relative to can change
												// So within the same session, we the url may end up somewhere different
												shortUrl = shortUrl.replace(baseUrl,'');
											}

											// Trim rootUrl
											shortUrl = shortUrl.replace(rootUrl,'/');

											// Ensure we can still detect it as a state
											if ( History.isTraditionalAnchor(shortUrl) ) {
												shortUrl = './'+shortUrl;
											}

											// Clean It
											shortUrl = shortUrl.replace(/^(\.\/)+/g,'./').replace(/\#$/,'');

											// Return
											return shortUrl;
										};

										// ----------------------------------------------------------------------
										// State Storage

										/**
										 * History.store
										 * The store for all session specific data
										 */
										History.store = amplify ? (amplify.store('History.store')||{}) : {};
										History.store.idToState = History.store.idToState||{};
										History.store.urlToId = History.store.urlToId||{};
										History.store.stateToId = History.store.stateToId||{};

										/**
										 * History.idToState
										 * 1-1: State ID to State Object
										 */
										History.idToState = History.idToState||{};

										/**
										 * History.stateToId
										 * 1-1: State String to State ID
										 */
										History.stateToId = History.stateToId||{};

										/**
										 * History.urlToId
										 * 1-1: State URL to State ID
										 */
										History.urlToId = History.urlToId||{};

										/**
										 * History.storedStates
										 * Store the states in an array
										 */
										History.storedStates = History.storedStates||[];

										/**
										 * History.savedStates
										 * Saved the states in an array
										 */
										History.savedStates = History.savedStates||[];

										/**
										 * History.getState()
										 * Get an object containing the data, title and url of the current state
										 * @param {Boolean} friendly
										 * @param {Boolean} create
										 * @return {Object} State
										 */
										History.getState = function(friendly,create){
											// Prepare
											if ( typeof friendly === 'undefined' ) { friendly = true; }
											if ( typeof create === 'undefined' ) { create = true; }

											// Fetch
											var State = History.getLastSavedState();

											// Create
											if ( !State && create ) {
												State = History.createStateObject();
											}

											// Adjust
											if ( friendly ) {
												State = History.cloneObject(State);
												State.url = State.cleanUrl||State.url;
											}

											// Return
											return State;
										};

										/**
										 * History.getIdByState(State)
										 * Gets a ID for a State
										 * @param {State} newState
										 * @return {String} id
										 */
										History.getIdByState = function(newState){

											// Fetch ID
											var id = History.extractId(newState.url);
											if ( !id ) {
												// Find ID via State String
												var str = History.getStateString(newState);
												if ( typeof History.stateToId[str] !== 'undefined' ) {
													id = History.stateToId[str];
												}
												else if ( typeof History.store.stateToId[str] !== 'undefined' ) {
													id = History.store.stateToId[str];
												}
												else {
													// Generate a new ID
													/**
													 *	Added a counter not to create infinite loops...
													 *	@author Woxxy
													 */
													var counter = 0;
													while ( true  && counter < 20) {
														id = String(Math.floor(Math.random()*1000));
														if ( typeof History.idToState[id] === 'undefined' && typeof History.store.idToState[id] === 'undefined' ) {
															break;
														}
														counter++;
													}

													// Apply the new State to the ID
													History.stateToId[str] = id;
													History.idToState[id] = newState;
												}
											}

											// Return ID
											return id;
										};

										/**
										 * History.normalizeState(State)
										 * Expands a State Object
										 * @param {object} State
										 * @return {object}
										 */
										History.normalizeState = function(oldState){
											// Prepare
											if ( !oldState || (typeof oldState !== 'object') ) {
												oldState = {};
											}

											// Check
											if ( typeof oldState.normalized !== 'undefined' ) {
												return oldState;
											}

											// Adjust
											if ( !oldState.data || (typeof oldState.data !== 'object') ) {
												oldState.data = {};
											}

											// ----------------------------------------------------------------------

											// Create
											var newState = {};
											newState.normalized = true;
											newState.title = oldState.title||'';
											newState.url = History.getFullUrl(History.unescapeString(oldState.url||document.location.href));
											newState.hash = History.getShortUrl(newState.url);
											newState.data = History.cloneObject(oldState.data);

											// Fetch ID
											newState.id = History.getIdByState(newState);

											// ----------------------------------------------------------------------

											// Clean the URL
											newState.cleanUrl = newState.url.replace(/\??\&_suid.*/,'');
											newState.url = newState.cleanUrl;

											// Check to see if we have more than just a url
											var dataNotEmpty = !History.isEmptyObject(newState.data);

											// Apply
											if ( newState.title || dataNotEmpty ) {
												// Add ID to Hash
												newState.hash = History.getShortUrl(newState.url).replace(/\??\&_suid.*/,'');
												if ( !/\?/.test(newState.hash) ) {
													newState.hash += '?';
												}
												newState.hash += '&_suid='+newState.id;
											}

											// Create the Hashed URL
											newState.hashedUrl = History.getFullUrl(newState.hash);

											// ----------------------------------------------------------------------

											// Update the URL if we have a duplicate
											if ( (History.emulated.pushState || History.bugs.safariPoll) && History.hasUrlDuplicate(newState) ) {
												newState.url = newState.hashedUrl;
											}

											// ----------------------------------------------------------------------

											// Return
											return newState;
										};

										/**
										 * History.createStateObject(data,title,url)
										 * Creates a object based on the data, title and url state params
										 * @param {object} data
										 * @param {string} title
										 * @param {string} url
										 * @return {object}
										 */
										History.createStateObject = function(data,title,url){
											// Hashify
											var State = {
												'data': data,
												'title': title,
												'url': url
											};

											// Expand the State
											State = History.normalizeState(State);

											// Return object
											return State;
										};

										/**
										 * History.getStateById(id)
										 * Get a state by it's UID
										 * @param {String} id
										 */
										History.getStateById = function(id){
											// Prepare
											id = String(id);

											// Retrieve
											var State = History.idToState[id] || History.store.idToState[id] || undefined;

											// Return State
											return State;
										};

										/**
										 * Get a State's String
										 * @param {State} passedState
										 */
										History.getStateString = function(passedState){
											// Prepare
											var State = History.normalizeState(passedState);

											// Clean
											var cleanedState = {
												data: State.data,
												title: passedState.title,
												url: passedState.url
											};

											// Fetch
											var str = JSON.stringify(cleanedState);

											// Return
											return str;
										};

										/**
										 * Get a State's ID
										 * @param {State} passedState
										 * @return {String} id
										 */
										History.getStateId = function(passedState){
											// Prepare
											var State = History.normalizeState(passedState);

											// Fetch
											var id = State.id;

											// Return
											return id;
										};

										/**
										 * History.getHashByState(State)
										 * Creates a Hash for the State Object
										 * @param {State} passedState
										 * @return {String} hash
										 */
										History.getHashByState = function(passedState){
											// Prepare
											var hash, State = History.normalizeState(passedState);

											// Fetch
											hash = State.hash;

											// Return
											return hash;
										};

										/**
										 * History.extractId(url_or_hash)
										 * Get a State ID by it's URL or Hash
										 * @param {string} url_or_hash
										 * @return {string} id
										 */
										History.extractId = function ( url_or_hash ) {
											// Prepare
											var id;

											// Extract
											var parts,url;
											parts = /(.*)\&_suid=([0-9]+)$/.exec(url_or_hash);
											url = parts ? (parts[1]||url_or_hash) : url_or_hash;
											id = parts ? String(parts[2]||'') : '';

											// Return
											return id||false;
										};

										/**
										 * History.isTraditionalAnchor
										 * Checks to see if the url is a traditional anchor or not
										 * @param {String} url_or_hash
										 * @return {Boolean}
										 */
										History.isTraditionalAnchor = function(url_or_hash){
											// Check
											var isTraditional = !(/[\/\?\.]/.test(url_or_hash));

											// Return
											return isTraditional;
										};

										/**
										 * History.extractState
										 * Get a State by it's URL or Hash
										 * @param {String} url_or_hash
										 * @return {State|null}
										 */
										History.extractState = function(url_or_hash,create){
											// Prepare
											var State = null;
											create = create||false;

											// Fetch SUID
											var id = History.extractId(url_or_hash);
											if ( id ) {
												State = History.getStateById(id);
											}

											// Fetch SUID returned no State
											if ( !State ) {
												// Fetch URL
												var url = History.getFullUrl(url_or_hash);

												// Check URL
												id = History.getIdByUrl(url)||false;
												if ( id ) {
													State = History.getStateById(id);
												}

												// Create State
												if ( !State && create && !History.isTraditionalAnchor(url_or_hash) ) {
													State = History.createStateObject(null,null,url);
												}
											}

											// Return
											return State;
										};

										/**
										 * History.getIdByUrl()
										 * Get a State ID by a State URL
										 */
										History.getIdByUrl = function(url){
											// Fetch
											var id = History.urlToId[url] || History.store.urlToId[url] || undefined;

											// Return
											return id;
										};

										/**
										 * History.getLastSavedState()
										 * Get an object containing the data, title and url of the current state
										 * @return {Object} State
										 */
										History.getLastSavedState = function(){
											return History.savedStates[History.savedStates.length-1]||undefined;
										};

										/**
										 * History.getLastStoredState()
										 * Get an object containing the data, title and url of the current state
										 * @return {Object} State
										 */
										History.getLastStoredState = function(){
											return History.storedStates[History.storedStates.length-1]||undefined;
										};

										/**
										 * History.hasUrlDuplicate
										 * Checks if a Url will have a url conflict
										 * @param {Object} newState
										 * @return {Boolean} hasDuplicate
										 */
										History.hasUrlDuplicate = function(newState) {
											// Prepare
											var hasDuplicate = false;

											// Fetch
											var oldState = History.extractState(newState.url);

											// Check
											hasDuplicate = oldState && oldState.id !== newState.id;

											// Return
											return hasDuplicate;
										};

										/**
										 * History.storeState
										 * Store a State
										 * @param {Object} newState
										 * @return {Object} newState
										 */
										History.storeState = function(newState){
											// Store the State
											History.urlToId[newState.url] = newState.id;

											// Push the State
											History.storedStates.push(History.cloneObject(newState));

											// Return newState
											return newState;
										};

										/**
										 * History.isLastSavedState(newState)
										 * Tests to see if the state is the last state
										 * @param {Object} newState
										 * @return {boolean} isLast
										 */
										History.isLastSavedState = function(newState){
											// Prepare
											var isLast = false;

											// Check
											if ( History.savedStates.length ) {
												var
												newId = newState.id,
												oldState = History.getLastSavedState(),
												oldId = oldState.id;

												// Check
												isLast = (newId === oldId);
											}

											// Return
											return isLast;
										};

										/**
										 * History.saveState
										 * Push a State
										 * @param {Object} newState
										 * @return {boolean} changed
										 */
										History.saveState = function(newState){
											// Check Hash
											if ( History.isLastSavedState(newState) ) {
												return false;
											}

											// Push the State
											History.savedStates.push(History.cloneObject(newState));

											// Return true
											return true;
										};

										/**
										 * History.getStateByIndex()
										 * Gets a state by the index
										 * @param {integer} index
										 * @return {Object}
										 */
										History.getStateByIndex = function(index){
											// Prepare
											var State = null;

											// Handle
											if ( typeof index === 'undefined' ) {
												// Get the last inserted
												State = History.savedStates[History.savedStates.length-1];
											}
											else if ( index < 0 ) {
												// Get from the end
												State = History.savedStates[History.savedStates.length+index];
											}
											else {
												// Get from the beginning
												State = History.savedStates[index];
											}

											// Return State
											return State;
										};

										// ----------------------------------------------------------------------
										// Hash Helpers

										/**
										 * History.getHash()
										 * Gets the current document hash
										 * @return {string}
										 */
										History.getHash = function(){
											var hash = History.unescapeHash(document.location.hash);
											return hash;
										};

										/**
										 * History.unescapeString()
										 * Unescape a string
										 * @param {String} str
										 * @return {string}
										 */
										History.unescapeString = function(str){
											// Prepare
											var result = str;

											// Unescape hash
											var tmp;
											while ( true ) {
												tmp = window.unescape(result);
												if ( tmp === result ) {
													break;
												}
												result = tmp;
											}

											// Return result
											return result;
										};

										/**
										 * History.unescapeHash()
										 * normalize and Unescape a Hash
										 * @param {String} hash
										 * @return {string}
										 */
										History.unescapeHash = function(hash){
											// Prepare
											var result = History.normalizeHash(hash);

											// Unescape hash
											result = History.unescapeString(result);

											// Return result
											return result;
										};

										/**
										 * History.normalizeHash()
										 * normalize a hash across browsers
										 * @return {string}
										 */
										History.normalizeHash = function(hash){
											var result = hash.replace(/[^#]*#/,'').replace(/#.*/, '');

											// Return result
											return result;
										};

										/**
										 * History.setHash(hash)
										 * Sets the document hash
										 * @param {string} hash
										 * @return {History}
										 */
										History.setHash = function(hash,queue){
											// Handle Queueing
											if ( queue !== false && History.busy() ) {
												// Wait + Push to Queue
												//History.debug('History.setHash: we must wait', arguments);
												History.pushQueue({
													scope: History,
													callback: History.setHash,
													args: arguments,
													queue: queue
												});
												return false;
											}

											// Log
											//History.debug('History.setHash: called',hash);

											// Prepare
											var adjustedHash = History.escapeHash(hash);

											// Make Busy + Continue
											History.busy(true);

											// Check if hash is a state
											var State = History.extractState(hash,true);
											if ( State && !History.emulated.pushState ) {
												// Hash is a state so skip the setHash
												//History.debug('History.setHash: Hash is a state so skipping the hash set with a direct pushState call',arguments);

												// PushState
												History.pushState(State.data,State.title,State.url,false);
											}
											else if ( document.location.hash !== adjustedHash ) {
												// Hash is a proper hash, so apply it

												// Handle browser bugs
												if ( History.bugs.setHash ) {
													// Fix Safari Bug https://bugs.webkit.org/show_bug.cgi?id=56249

													// Fetch the base page
													var pageUrl = History.getPageUrl();

													// Safari hash apply
													History.pushState(null,null,pageUrl+'#'+adjustedHash,false);
												}
												else {
													// Normal hash apply
													document.location.hash = adjustedHash;
												}
											}

											// Chain
											return History;
										};

										/**
										 * History.escape()
										 * normalize and Escape a Hash
										 * @return {string}
										 */
										History.escapeHash = function(hash){
											var result = History.normalizeHash(hash);

											// Escape hash
											result = window.escape(result);

											// IE6 Escape Bug
											if ( !History.bugs.hashEscape ) {
												// Restore common parts
												result = result
												.replace(/\%21/g,'!')
												.replace(/\%26/g,'&')
												.replace(/\%3D/g,'=')
												.replace(/\%3F/g,'?');
											}

											// Return result
											return result;
										};

										/**
										 * History.getHashByUrl(url)
										 * Extracts the Hash from a URL
										 * @param {string} url
										 * @return {string} url
										 */
										History.getHashByUrl = function(url){
											// Extract the hash
											var hash = String(url)
											.replace(/([^#]*)#?([^#]*)#?(.*)/, '$2')
											;

											// Unescape hash
											hash = History.unescapeHash(hash);

											// Return hash
											return hash;
										};

										/**
										 * History.setTitle(title)
										 * Applies the title to the document
										 * @param {State} newState
										 * @return {Boolean}
										 */
										History.setTitle = function(newState){
											// Prepare
											var title = newState.title;

											// Initial
											if ( !title ) {
												var firstState = History.getStateByIndex(0);
												if ( firstState && firstState.url === newState.url ) {
													title = firstState.title||History.options.initialTitle;
												}
											}

											// Apply
											try {
												document.getElementsByTagName('title')[0].innerHTML = title.replace('<','&lt;').replace('>','&gt;').replace(' & ',' &amp; ');
											}
											catch ( Exception ) { }
											document.title = title;

											// Chain
											return History;
										};

										// ----------------------------------------------------------------------
										// Queueing

										/**
										 * History.queues
										 * The list of queues to use
										 * First In, First Out
										 */
										History.queues = [];

										/**
										 * History.busy(value)
										 * @param {boolean} value [optional]
										 * @return {boolean} busy
										 */
										History.busy = function(value){
											// Apply
											if ( typeof value !== 'undefined' ) {
												//History.debug('History.busy: changing ['+(History.busy.flag||false)+'] to ['+(value||false)+']', History.queues.length);
												History.busy.flag = value;
											}
											// Default
											else if ( typeof History.busy.flag === 'undefined' ) {
												History.busy.flag = false;
											}

											// Queue
											if ( !History.busy.flag ) {
												// Execute the next item in the queue
												clearTimeout(History.busy.timeout);
												var fireNext = function(){
													if ( History.busy.flag ) return;
													for ( var i=History.queues.length-1; i >= 0; --i ) {
														var queue = History.queues[i];
														if ( queue.length === 0 ) continue;
														var item = queue.shift();
														History.fireQueueItem(item);
														History.busy.timeout = setTimeout(fireNext,History.options.busyDelay);
													}
												};
												History.busy.timeout = setTimeout(fireNext,History.options.busyDelay);
											}

											// Return
											return History.busy.flag;
										};

										/**
										 * History.fireQueueItem(item)
										 * Fire a Queue Item
										 * @param {Object} item
										 * @return {Mixed} result
										 */
										History.fireQueueItem = function(item){
											return item.callback.apply(item.scope||History,item.args||[]);
										};

										/**
										 * History.pushQueue(callback,args)
										 * Add an item to the queue
										 * @param {Object} item [scope,callback,args,queue]
										 */
										History.pushQueue = function(item){
											// Prepare the queue
											History.queues[item.queue||0] = History.queues[item.queue||0]||[];

											// Add to the queue
											History.queues[item.queue||0].push(item);

											// Chain
											return History;
										};

										/**
										 * History.queue (item,queue), (func,queue), (func), (item)
										 * Either firs the item now if not busy, or adds it to the queue
										 */
										History.queue = function(item,queue){
											// Prepare
											if ( typeof item === 'function' ) {
												item = {
													callback: item
												};
											}
											if ( typeof queue !== 'undefined' ) {
												item.queue = queue;
											}

											// Handle
											if ( History.busy() ) {
												History.pushQueue(item);
											} else {
												History.fireQueueItem(item);
											}

											// Chain
											return History;
										};

										/**
										 * History.clearQueue()
										 * Clears the Queue
										 */
										History.clearQueue = function(){
											History.busy.flag = false;
											History.queues = [];
											return History;
										};


										// ----------------------------------------------------------------------
										// IE Bug Fix

										/**
										 * History.stateChanged
										 * States whether or not the state has changed since the last double check was initialised
										 */
										History.stateChanged = false;

										/**
										 * History.doubleChecker
										 * Contains the timeout used for the double checks
										 */
										History.doubleChecker = false;

										/**
										 * History.doubleCheckComplete()
										 * Complete a double check
										 * @return {History}
										 */
										History.doubleCheckComplete = function(){
											// Update
											History.stateChanged = true;

											// Clear
											History.doubleCheckClear();

											// Chain
											return History;
										};

										/**
										 * History.doubleCheckClear()
										 * Clear a double check
										 * @return {History}
										 */
										History.doubleCheckClear = function(){
											// Clear
											if ( History.doubleChecker ) {
												clearTimeout(History.doubleChecker);
												History.doubleChecker = false;
											}

											// Chain
											return History;
										};

										/**
										 * History.doubleCheck()
										 * Create a double check
										 * @return {History}
										 */
										History.doubleCheck = function(tryAgain){
											// Reset
											History.stateChanged = false;
											History.doubleCheckClear();

											// Fix IE6,IE7 bug where calling history.back or history.forward does not actually change the hash (whereas doing it manually does)
											// Fix Safari 5 bug where sometimes the state does not change: https://bugs.webkit.org/show_bug.cgi?id=42940
											if ( History.bugs.ieDoubleCheck ) {
												// Apply Check
												History.doubleChecker = setTimeout(
												function(){
													History.doubleCheckClear();
													if ( !History.stateChanged ) {
														//History.debug('History.doubleCheck: State has not yet changed, trying again', arguments);
														// Re-Attempt
														tryAgain();
													}
													return true;
												},
												History.options.doubleCheckInterval
											);
											}

											// Chain
											return History;
										};

										// ----------------------------------------------------------------------
										// Safari Bug Fix

										/**
										 * History.safariStatePoll()
										 * Poll the current state
										 * @return {History}
										 */
										History.safariStatePoll = function(){
											// Poll the URL

											// Get the Last State which has the new URL
											var
											urlState = History.extractState(document.location.href),
											newState;

											// Check for a difference
											if ( !History.isLastSavedState(urlState) ) {
												newState = urlState;
											}
											else {
												return;
											}

											// Check if we have a state with that url
											// If not create it
											if ( !newState ) {
												//History.debug('History.safariStatePoll: new');
												newState = History.createStateObject();
											}

											// Apply the New State
											//History.debug('History.safariStatePoll: trigger');
											History.Adapter.trigger(window,'popstate');

											// Chain
											return History;
										};

										// ----------------------------------------------------------------------
										// State Aliases

										/**
										 * History.back(queue)
										 * Send the browser history back one item
										 * @param {Integer} queue [optional]
										 */
										History.back = function(queue){
											//History.debug('History.back: called', arguments);

											// Handle Queueing
											if ( queue !== false && History.busy() ) {
												// Wait + Push to Queue
												//History.debug('History.back: we must wait', arguments);
												History.pushQueue({
													scope: History,
													callback: History.back,
													args: arguments,
													queue: queue
												});
												return false;
											}

											// Make Busy + Continue
											History.busy(true);

											// Fix certain browser bugs that prevent the state from changing
											History.doubleCheck(function(){
												History.back(false);
											});

											// Go back
											history.go(-1);

											// End back closure
											return true;
										};

										/**
										 * History.forward(queue)
										 * Send the browser history forward one item
										 * @param {Integer} queue [optional]
										 */
										History.forward = function(queue){
											//History.debug('History.forward: called', arguments);

											// Handle Queueing
											if ( queue !== false && History.busy() ) {
												// Wait + Push to Queue
												//History.debug('History.forward: we must wait', arguments);
												History.pushQueue({
													scope: History,
													callback: History.forward,
													args: arguments,
													queue: queue
												});
												return false;
											}

											// Make Busy + Continue
											History.busy(true);

											// Fix certain browser bugs that prevent the state from changing
											History.doubleCheck(function(){
												History.forward(false);
											});

											// Go forward
											history.go(1);

											// End forward closure
											return true;
										};

										/**
										 * History.go(index,queue)
										 * Send the browser history back or forward index times
										 * @param {Integer} queue [optional]
										 */
										History.go = function(index,queue){
											//History.debug('History.go: called', arguments);

											// Prepare
											var i;

											// Handle
											if ( index > 0 ) {
												// Forward
												for ( i=1; i<=index; ++i ) {
													History.forward(queue);
												}
											}
											else if ( index < 0 ) {
												// Backward
												for ( i=-1; i>=index; --i ) {
													History.back(queue);
												}
											}
											else {
												throw new Error('History.go: History.go requires a positive or negative integer passed.');
											}

											// Chain
											return History;
										};


										// ----------------------------------------------------------------------
										// Initialise

										/**
										 * Create the initial State
										 */
										History.saveState(History.storeState(History.extractState(document.location.href,true)));

										/**
										 * Bind for Saving Store
										 */
										if ( amplify ) {
											History.onUnload = function(){
												// Prepare
												var
												currentStore = amplify.store('History.store')||{},
												item;

												// Ensure
												currentStore.idToState = currentStore.idToState || {};
												currentStore.urlToId = currentStore.urlToId || {};
												currentStore.stateToId = currentStore.stateToId || {};

												// Sync
												for ( item in History.idToState ) {
													if ( !History.idToState.hasOwnProperty(item) ) {
														continue;
													}
													currentStore.idToState[item] = History.idToState[item];
												}
												for ( item in History.urlToId ) {
													if ( !History.urlToId.hasOwnProperty(item) ) {
														continue;
													}
													currentStore.urlToId[item] = History.urlToId[item];
												}
												for ( item in History.stateToId ) {
													if ( !History.stateToId.hasOwnProperty(item) ) {
														continue;
													}
													currentStore.stateToId[item] = History.stateToId[item];
												}

												// Update
												History.store = currentStore;

												// Store
												amplify.store('History.store',currentStore);
											};
											// For Internet Explorer
											History.intervalList.push(setInterval(History.onUnload,History.options.storeInterval));
											// For Other Browsers
											History.Adapter.bind(window,'beforeunload',History.onUnload);
											History.Adapter.bind(window,'unload',History.onUnload);
											// Both are enabled for consistency
										}


										// ----------------------------------------------------------------------
										// HTML5 State Support

										if ( History.emulated.pushState ) {
											/*
											 * Provide Skeleton for HTML4 Browsers
											 */

											// Prepare
											var emptyFunction = function(){};
											History.pushState = History.pushState||emptyFunction;
											History.replaceState = History.replaceState||emptyFunction;
										}
										else {
											/*
											 * Use native HTML5 History API Implementation
											 */

											/**
											 * History.onPopState(event,extra)
											 * Refresh the Current State
											 */
											History.onPopState = function(event){
												// Reset the double check
												History.doubleCheckComplete();

												// Check for a Hash, and handle apporiatly
												var currentHash	= History.getHash();
												if ( currentHash ) {
													// Expand Hash
													var currentState = History.extractState(currentHash||document.location.href,true);
													if ( currentState ) {
														// We were able to parse it, it must be a State!
														// Let's forward to replaceState
														//History.debug('History.onPopState: state anchor', currentHash, currentState);
														History.replaceState(currentState.data, currentState.title, currentState.url, false);
													}
													else {
														// Traditional Anchor
														//History.debug('History.onPopState: traditional anchor', currentHash);
														History.Adapter.trigger(window,'anchorchange');
														History.busy(false);
													}

													// We don't care for hashes
													History.expectedStateId = false;
													return false;
												}

												// Prepare
												var newState = false;

												// Prepare
												event = event||{};
												if ( typeof event.state === 'undefined' ) {
													// jQuery
													if ( typeof event.originalEvent !== 'undefined' && typeof event.originalEvent.state !== 'undefined' ) {
														event.state = event.originalEvent.state||false;
													}
													// MooTools
													else if ( typeof event.event !== 'undefined' && typeof event.event.state !== 'undefined' ) {
														event.state = event.event.state||false;
													}
												}

												// Ensure
												event.state = (event.state||false);

												// Fetch State
												if ( event.state ) {
													// Vanilla: Back/forward button was used
													newState = History.getStateById(event.state);
												}
												else if ( History.expectedStateId ) {
													// Vanilla: A new state was pushed, and popstate was called manually
													newState = History.getStateById(History.expectedStateId);
												}
												else {
													// Initial State
													newState = History.extractState(document.location.href);
												}

												// The State did not exist in our store
												if ( !newState ) {
													// Regenerate the State
													newState = History.createStateObject(null,null,document.location.href);
												}

												// Clean
												History.expectedStateId = false;

												// Check if we are the same state
												if ( History.isLastSavedState(newState) ) {
													// There has been no change (just the page's hash has finally propagated)
													//History.debug('History.onPopState: no change', newState, History.savedStates);
													History.busy(false);
													return false;
												}

												// Store the State
												History.storeState(newState);
												History.saveState(newState);

												// Force update of the title
												History.setTitle(newState);

												// Fire Our Event
												History.Adapter.trigger(window,'statechange');
												History.busy(false);

												// Return true
												return true;
											};
											History.Adapter.bind(window,'popstate',History.onPopState);

											/**
											 * History.pushState(data,title,url)
											 * Add a new State to the history object, become it, and trigger onpopstate
											 * We have to trigger for HTML4 compatibility
											 * @param {object} data
											 * @param {string} title
											 * @param {string} url
											 * @return {true}
											 */
											History.pushState = function(data,title,url,queue){
												//History.debug('History.pushState: called', arguments);

												// Check the State
												if ( History.getHashByUrl(url) && History.emulated.pushState ) {
													throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
												}

												// Handle Queueing
												if ( queue !== false && History.busy() ) {
													// Wait + Push to Queue
													//History.debug('History.pushState: we must wait', arguments);
													History.pushQueue({
														scope: History,
														callback: History.pushState,
														args: arguments,
														queue: queue
													});
													return false;
												}

												// Make Busy + Continue
												History.busy(true);

												// Create the newState
												var newState = History.createStateObject(data,title,url);

												// Check it
												if ( History.isLastSavedState(newState) ) {
													// Won't be a change
													History.busy(false);
												}
												else {
													// Store the newState
													History.storeState(newState);
													History.expectedStateId = newState.id;

													// Push the newState
													history.pushState(newState.id,newState.title,newState.url);

													// Fire HTML5 Event
													History.Adapter.trigger(window,'popstate');
												}

												// End pushState closure
												return true;
											};

											/**
											 * History.replaceState(data,title,url)
											 * Replace the State and trigger onpopstate
											 * We have to trigger for HTML4 compatibility
											 * @param {object} data
											 * @param {string} title
											 * @param {string} url
											 * @return {true}
											 */
											History.replaceState = function(data,title,url,queue){
												//History.debug('History.replaceState: called', arguments);

												// Check the State
												if ( History.getHashByUrl(url) && History.emulated.pushState ) {
													throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
												}

												// Handle Queueing
												if ( queue !== false && History.busy() ) {
													// Wait + Push to Queue
													//History.debug('History.replaceState: we must wait', arguments);
													History.pushQueue({
														scope: History,
														callback: History.replaceState,
														args: arguments,
														queue: queue
													});
													return false;
												}

												// Make Busy + Continue
												History.busy(true);

												// Create the newState
												var newState = History.createStateObject(data,title,url);

												// Check it
												if ( History.isLastSavedState(newState) ) {
													// Won't be a change
													History.busy(false);
												}
												else {
													// Store the newState
													History.storeState(newState);
													History.expectedStateId = newState.id;

													// Push the newState
													history.replaceState(newState.id,newState.title,newState.url);

													// Fire HTML5 Event
													History.Adapter.trigger(window,'popstate');
												}

												// End replaceState closure
												return true;
											};

											// Be aware, the following is only for native pushState implementations
											// If you are wanting to include something for all browsers
											// Then include it above this if block

											/**
											 * Setup Safari Fix
											 */
											if ( History.bugs.safariPoll ) {
												History.intervalList.push(setInterval(History.safariStatePoll, History.options.safariPollInterval));
											}

											/**
											 * Ensure Cross Browser Compatibility
											 */
											if ( navigator.vendor === 'Apple Computer, Inc.' || (navigator.appCodeName||'') === 'Mozilla' ) {
												/**
												 * Fix Safari HashChange Issue
												 */

												// Setup Alias
												History.Adapter.bind(window,'hashchange',function(){
													History.Adapter.trigger(window,'popstate');
												});

												// Initialise Alias
												if ( History.getHash() ) {
													History.Adapter.onDomLoad(function(){
														History.Adapter.trigger(window,'hashchange');
													});
												}
											}

										} // !History.emulated.pushState

									}; // History.initCore

									// Try and Initialise History
									History.init();

								})(window);


								(function(a,b){"use strict";var c=a.document,d=a.setTimeout||d,e=a.clearTimeout||e,f=a.setInterval||f,g=a.History=a.History||{};if(typeof g.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");g.initHtml4=function(){if(typeof g.initHtml4.initialized!="undefined")return!1;g.initHtml4.initialized=!0,g.enabled=!0,g.savedHashes=[],g.isLastHash=function(a){var b=g.getHashByIndex(),c=a===b;return c},g.saveHash=function(a){if(g.isLastHash(a))return!1;g.savedHashes.push(a);return!0},g.getHashByIndex=function(a){var b=null;typeof a=="undefined"?b=g.savedHashes[g.savedHashes.length-1]:a<0?b=g.savedHashes[g.savedHashes.length+a]:b=g.savedHashes[a];return b},g.discardedHashes={},g.discardedStates={},g.discardState=function(a,b,c){var d=g.getHashByState(a),e={discardedState:a,backState:c,forwardState:b};g.discardedStates[d]=e;return!0},g.discardHash=function(a,b,c){var d={discardedHash:a,backState:c,forwardState:b};g.discardedHashes[a]=d;return!0},g.discardedState=function(a){var b=g.getHashByState(a),c=g.discardedStates[b]||!1;return c},g.discardedHash=function(a){var b=g.discardedHashes[a]||!1;return b},g.recycleState=function(a){var b=g.getHashByState(a);g.discardedState(a)&&delete g.discardedStates[b];return!0},g.emulated.hashChange&&(g.hashChangeInit=function(){g.checkerFunction=null;var b="";if(g.isInternetExplorer()){var d="historyjs-iframe",e=c.createElement("iframe");e.setAttribute("id",d),e.style.display="none",c.body.appendChild(e),e.contentWindow.document.open(),e.contentWindow.document.close();var h="",i=!1;g.checkerFunction=function(){if(i)return!1;i=!0;var c=g.getHash()||"",d=g.unescapeHash(e.contentWindow.document.location.hash)||"";c!==b?(b=c,d!==c&&(h=d=c,e.contentWindow.document.open(),e.contentWindow.document.close(),e.contentWindow.document.location.hash=g.escapeHash(c)),g.Adapter.trigger(a,"hashchange")):d!==h&&(h=d,g.setHash(d,!1)),i=!1;return!0}}else g.checkerFunction=function(){var c=g.getHash();c!==b&&(b=c,g.Adapter.trigger(a,"hashchange"));return!0};f(g.checkerFunction,g.options.hashChangeInterval);return!0},g.Adapter.onDomLoad(g.hashChangeInit)),g.emulated.pushState&&(g.onHashChange=function(b){var d=b&&b.newURL||c.location.href,e=g.getHashByUrl(d),f=null,h=null,i=null;if(g.isLastHash(e)){g.busy(!1);return!1}g.doubleCheckComplete(),g.saveHash(e);if(e&&g.isTraditionalAnchor(e)){g.Adapter.trigger(a,"anchorchange"),g.busy(!1);return!1}f=g.extractState(g.getFullUrl(e||c.location.href,!1),!0);if(g.isLastSavedState(f)){g.busy(!1);return!1}h=g.getHashByState(f);var j=g.discardedState(f);if(j){g.getHashByIndex(-2)===g.getHashByState(j.forwardState)?g.back(!1):g.forward(!1);return!1}g.pushState(f.data,f.title,f.url,!1);return!0},g.Adapter.bind(a,"hashchange",g.onHashChange),g.pushState=function(b,d,e,f){if(g.getHashByUrl(e))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(f!==!1&&g.busy()){g.pushQueue({scope:g,callback:g.pushState,args:arguments,queue:f});return!1}g.busy(!0);var h=g.createStateObject(b,d,e),i=g.getHashByState(h),j=g.getState(!1),k=g.getHashByState(j),l=g.getHash();g.storeState(h),g.expectedStateId=h.id,g.recycleState(h),g.setTitle(h);if(i===k){g.busy(!1);return!1}if(i!==l&&i!==g.getShortUrl(c.location.href)){g.setHash(i,!1);return!1}g.saveState(h),g.Adapter.trigger(a,"statechange"),g.busy(!1);return!0},g.replaceState=function(a,b,c,d){if(g.getHashByUrl(c))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(d!==!1&&g.busy()){g.pushQueue({scope:g,callback:g.replaceState,args:arguments,queue:d});return!1}g.busy(!0);var e=g.createStateObject(a,b,c),f=g.getState(!1),h=g.getStateByIndex(-2);g.discardState(f,e,h),g.pushState(e.data,e.title,e.url,!1);return!0},g.getHash()&&!g.emulated.hashChange&&g.Adapter.onDomLoad(function(){g.Adapter.trigger(a,"hashchange")}))},g.init()})(window);

								/**
								 * ScrollView - jQuery plugin 0.1
								 *
								 * This plugin supplies contents view by grab and drag scroll.
								 *
								 * Copyright (c) 2009 Toshimitsu Takahashi
								 *
								 * Released under the MIT license.
								 *
								 * == Usage =======================
								 *   // apply to block element.
								 *   $("#map").scrollview();
								 *   
								 *   // with setting grab and drag icon urls.
								 *   //   grab: the cursor when mouse button is up.
								 *   //   grabbing: the cursor when mouse button is down.
								 *   //
								 *   $("#map".scrollview({
								 *     grab : "images/openhand.cur",
								 *     grabbing : "images/closedhand.cur"
								 *   });
								 * ================================
								 */
								(function() {
									function ScrollView(){ this.initialize.apply(this, arguments) }
									ScrollView.prototype = {
										initialize: function(container, config){
											// setting cursor.
											var gecko = navigator.userAgent.indexOf("Gecko/") != -1;
											var opera = navigator.userAgent.indexOf("Opera/") != -1;
											var mac = navigator.userAgent.indexOf("Mac OS") != -1;
											if (opera) {
												this.grab = "default";
												this.grabbing = "move";
											} else if (!(mac && gecko) && config) {
												if (config.grab) {
													this.grab = "url(\"" + config.grab + "\"),default";
												}
												if (config.grabbing) {
													this.grabbing = "url(" + config.grabbing + "),move";
												}
											} else if (gecko) {
												this.grab = "-moz-grab";
												this.grabbing = "-moz-grabbing";
											} else {
												this.grab = "default";
												this.grabbing = "move";
											}
                
											// Get container and image.
											this.m = $(container);
											this.i = this.m.children().css("cursor", this.grab);
                
											this.isgrabbing = false;
                
											// Set mouse events.
											var self = this;
											this.i.mousedown(function(e){
												self.startgrab();
												this.xp = e.pageX;
												this.yp = e.pageY;
												return false;
											}).mousemove(function(e){
												if (!self.isgrabbing) return true;
												self.scrollTo(this.xp - e.pageX, this.yp - e.pageY);
												this.xp = e.pageX;
												this.yp = e.pageY;
												return false;
											})
											.mouseout(function(){ self.stopgrab() })
											.mouseup(function(){ self.stopgrab() })
											.dblclick(function(){
												var _m = self.m;
												var off = _m.offset();
												var dx = this.xp - off.left - _m.width() / 2;
												if (dx < 0) {
													dx = "+=" + dx + "px";
												} else {
													dx = "-=" + -dx + "px";
												}
												var dy = this.yp - off.top - _m.height() / 2;
												if (dy < 0) {
													dy = "+=" + dy + "px";
												} else {
													dy = "-=" + -dy + "px";
												}
												_m.animate({ scrollLeft:  dx, scrollTop: dy },
												"normal", "swing");
											});
                
											this.centering();
										},
										centering: function(){
											var _m = this.m;
											var w = this.i.width() - _m.width();
											var h = this.i.height() - _m.height();
											_m.scrollLeft(w / 2).scrollTop(h / 2);
										},
										startgrab: function(){
											this.isgrabbing = true;
											this.i.css("cursor", this.grabbing);
										},
										stopgrab: function(){
											this.isgrabbing = false;
											this.i.css("cursor", this.grab);
										},
										scrollTo: function(dx, dy){
											var _m = this.m;
											var x = _m.scrollLeft() + dx;
											var y = _m.scrollTop() + dy;
											_m.scrollLeft(x).scrollTop(y);
										}
									};
    
									jQuery.fn.scrollview = function(config){
										return this.each(function(){
											new ScrollView(this, config);
										});
									};
								})(jQuery);