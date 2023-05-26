/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function n(){n=function(){return e};var e={},r=Object.prototype,o=r.hasOwnProperty,i=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var o=e&&e.prototype instanceof d?e:d,a=Object.create(o.prototype),c=new O(r||[]);return i(a,"_invoke",{value:x(t,n,c)}),a}function v(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var h={};function d(){}function p(){}function y(){}var m={};s(m,c,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(j([])));b&&b!==r&&o.call(b,c)&&(m=b);var _=y.prototype=d.prototype=Object.create(m);function L(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function w(e,n){function r(i,a,c,u){var l=v(e[i],e,a);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==t(f)&&o.call(f,"__await")?n.resolve(f.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):n.resolve(f).then((function(t){s.value=t,c(s)}),(function(t){return r("throw",t,c,u)}))}u(l.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new n((function(n,o){r(t,e,n,o)}))}return a=a?a.then(o,o):o()}})}function x(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=E(a,n);if(c){if(c===h)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=v(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}function E(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),h;var o=v(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function j(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:N}}function N(){return{value:void 0,done:!0}}return p.prototype=y,i(_,"constructor",{value:y,configurable:!0}),i(y,"constructor",{value:p,configurable:!0}),p.displayName=s(y,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,l,"GeneratorFunction")),t.prototype=Object.create(_),t},e.awrap=function(t){return{__await:t}},L(w.prototype),s(w.prototype,u,(function(){return this})),e.AsyncIterator=w,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new w(f(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(_),s(_,l,"Generator"),s(_,c,(function(){return this})),s(_,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=j,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;k(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:j(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),h}},e}function r(t,e,n,r,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function c(t){r(a,o,i,c,u,"next",t)}function u(t){r(a,o,i,c,u,"throw",t)}c(void 0)}))}}function i(t){localStorage.setItem("allTasks",JSON.stringify(t))}function a(t){return c.apply(this,arguments)}function c(){return(c=o(n().mark((function t(e){return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,null==(e=localStorage.getItem("allTasks"))){t.next=6;break}return t.next=5,JSON.parse(e);case 5:return t.abrupt("return",t.sent);case 6:t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),console.warn("Не удалось прочитать список задач",t.t0),localStorage.removeItem("allTasks");case 12:return t.abrupt("return",[]);case 13:case"end":return t.stop()}}),t,null,[[0,8]])})))).apply(this,arguments)}function u(t,n,r){n.innerHTML="";var o,i=function(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){u=!0,a=t},f:function(){try{c||null==r.return||r.return()}finally{if(u)throw a}}}}(t);try{for(i.s();!(o=i.n()).done;){var a=o.value,c=r.content.cloneNode(!0),u=c.querySelector("li"),l=c.querySelector(".list__task-text");a.isDone&&u.classList.add("list__task_completed"),u.id=a.id,l.textContent=a.inputValue,n.append(c)}}catch(t){i.e(t)}finally{i.f()}}function l(t){if(""===t||""===t.trim())return alert("Введите текст задачи"),!0}function s(t,e){return t.find((function(t){return t.id===e}))}function f(t,e,n){var r=s(n,t);r.isDone=!r.isDone}function v(t,e,n,r){var o=document.createElement("input");o.classList.add("list__task-input"),o.value=t.innerText,o.setAttribute("maxlength","180"),e.replaceChild(o,t),n.classList.remove("button_variant_edit"),n.classList.add("button_variant_confirm"),n.classList.add("button_visible"),r.classList.remove("button_variant_delete"),r.classList.add("button_variant_cancel"),r.classList.add("button_visible"),o.focus(),e.classList.add("list__task_active")}function h(t,e,n){document.querySelector(".list__task-input").addEventListener("keyup",(function(r){13===r.keyCode&&m(r.target,r.target.parentElement,t,e,n)}))}function d(t,e,n){s(n,t).inputValue=e,i(n)}function p(t,e){return e.filter((function(e){return e.id!==t}))}function y(t,e,n,r){t.value&&!l(t.value)?(function(t,e){var n={id:([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(t){return(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)})),inputValue:t,isDone:!1};e.push(n)}(t.value,e),i(e),function(t){t.value=""}(t),u(e,n,r),t.focus()):t.value||alert("Введите текст задачи")}function m(t,e,n,r,o){t.value&&!l(t.value)?(d(e.id,t.value,n),u(n,r,o)):t.value||alert("Введите текст задачи")}function g(t,e,n,r,o,i,a){var c=o.querySelector(".list__task-input");if(c){var u=document.createElement("p"),l=c.parentElement,s=c.nextElementSibling,f=c.nextElementSibling.nextElementSibling;u.classList.add("list__task-text"),l.replaceChild(u,c),u.textContent=c.value,d(l.id,c.value,i),s.classList.remove("button_variant_confirm"),s.classList.add("button_variant_edit"),s.classList.remove("button_visible"),f.classList.remove("button_variant_cancel"),f.classList.add("button_variant_delete"),f.classList.remove("button_visible"),l.classList.remove("list__task_active"),v(t,e,n,r),h(i,o,a)}else v(t,e,n,r),h(i,o,a)}o(n().mark((function t(){var e,r,o,c,l,s;return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=document.querySelector(".button_variant_add"),r=document.querySelector(".form__text"),o=document.querySelector(".list"),c=document.querySelector(".form"),l=document.querySelector("#template"),s=[],t.next=8,a(s);case 8:(s=t.sent).length>0&&u(s,o,l),e.addEventListener("click",(function(){y(r,s,o,l)})),c.addEventListener("submit",(function(t){t.preventDefault(),y(r,s,o,l)})),o.addEventListener("click",(function(t){var e=t.target,n=e.classList.contains("list__checkbox-toggle"),r=e.classList.contains("button_variant_delete"),a=e.classList.contains("button_variant_edit"),c=e.classList.contains("button_variant_confirm"),v=e.classList.contains("button_variant_cancel");if(n){e.previousElementSibling.checked;f(e.parentElement.parentElement.id,0,s),i(s),u(s,o,l)}else if(r){var h=p(e.parentElement.id,s);s=h,i(h),u(h,o,l)}else if(a){var d=e.parentElement;g(e.previousElementSibling,d,e,e.nextElementSibling,o,s,l)}else c?m(e.previousElementSibling,e.parentElement,s,o,l):v&&u(s,o,l)})),o.addEventListener("dblclick",(function(t){t.target.classList.contains("list__task-text")&&g(t.target,t.target.parentElement,t.target.nextElementSibling,t.target.nextElementSibling.nextElementSibling,o,s,l)}));case 14:case"end":return t.stop()}}),t)})))()})();