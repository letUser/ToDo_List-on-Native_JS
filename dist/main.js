!function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(i,a,function(e){return t[e]}.bind(null,a));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);n(1);let i=[];class a{constructor(t,e,n,i){this.text=t,this.elem=e,this.important=n,this.initDate=i}showTask(){let t=document.createElement("li"),e=document.createElement("span"),n=document.createElement("input"),a=document.createElement("input"),o=document.createElement("div");s.value="",e.textContent=this.text,e.classList.add("liText"),t.classList.add("li"),u.prepend(t),n.setAttribute("type","button"),n.setAttribute("value","[x]"),n.classList.add("ulRemove"),a.setAttribute("type","button"),a.setAttribute("value","[!]"),a.classList.add("importantBttn"),o.classList.add("liDate"),null===this.initDate&&(this.initDate=this.createDate()),o.textContent=this.initDate,t.append(e),t.append(a),t.append(n),t.append(o),this.elem=t,n.onclick=this.removeBranch.bind(this),a.onclick=this.importantBranch.bind(this),!0===this.important&&this.elem.classList.add("importantTask"),i.push(this)}importantBranch(){!1===this.important?(this.important=!0,this.elem.classList.add("importantTask")):!0===this.important&&(this.important=!1,this.elem.classList.remove("importantTask"))}removeBranch(){this.elem.remove();for(let t of i)t.text===this.text&&i.splice(i.indexOf(t),1)}createDate(){let t=new Date,e=t.getDate();e<10&&(e="0"+e);let n=t.getMonth()+1;n<10&&(n="0"+n);let i=t.getFullYear(),a=t.getHours();a<10&&(a="0"+a);let s=t.getMinutes();return s<10&&(s="0"+s),`${e}.${n}.${i}. ${a}:${s}`}}let s=document.createElement("input"),o=document.createElement("input"),r=document.createElement("div"),l=document.createElement("div"),u=document.createElement("ul");r.classList.add("main"),document.body.append(r),l.classList.add("header"),r.append(l),s.setAttribute("type","text"),s.setAttribute("placeholder","Введите название задачи..."),s.classList.add("input"),l.append(s),o.setAttribute("type","button"),o.setAttribute("value","Добавить задачу"),o.classList.add("bttn"),l.append(o),u.classList.add("list"),r.append(u),o.onclick=function(){if(!1===c()){new a(s.value,null,!1,null).showTask()}else d()},s.addEventListener("keyup",(function(t){if(t.preventDefault(),13===t.keyCode)if(!1===c()){new a(s.value,null,!1,null).showTask()}else d()}));let c=()=>""===s.value.trim(),d=()=>{let t=document.createElement("div");t.classList.add("alert"),t.textContent="Вы ничего не написали!",document.body.append(t),setTimeout(()=>t.remove(),3e3)};window.onunload=function(){localStorage.setItem("tasks",JSON.stringify(i))},window.onload=function(){0!==localStorage.length&&function(t){for(let e of t)e=Object.assign(new a(e.text,e.elem,e.important,e.initDate),e),s.value="/",e.showTask()}(JSON.parse(localStorage.getItem("tasks")))}},function(t,e){}]);