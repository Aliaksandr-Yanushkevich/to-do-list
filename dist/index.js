!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="dist/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=0,o=1,a=function(e){var t=e.title,n=e.text,r=e.priority,o=e.date,a=document.createElement("div");a.classList.add("w-100","mr-2");var c=document.createElement("div");c.classList.add("d-flex","w-100","justify-content-between");var d=document.createElement("h5");d.classList.add("mb-1"),d.textContent=t,c.append(d);var u=document.createElement("div"),s=document.createElement("small");s.textContent="".concat(r," priority"),s.classList.add("mr-2"),u.append(s);var l=document.createElement("small");l.textContent=function(e){return"".concat(e.getHours(),":").concat(e.getMinutes(),":").concat(e.getSeconds()," ").concat(e.getDate(),".").concat(e.getMonth()+1,".").concat(e.getFullYear())}(o),u.append(l),c.append(u);var i=document.createElement("p");return i.textContent=n,i.classList.add("mb-1","w-100"),a.append(c),a.append(i),a},c=function(e){var t=e.id,n=document.createElement("div");n.classList.add("dropdown","m-2","dropleft");var r=document.createElement("button");r.classList.add("btn","btn-secondary","h-100"),r.type="button",r.dataset.toggle="dropdown",r.setAttribute("aria-haspopup",!0),r.setAttribute("aria-expanded",!1);var o=document.createElement("i");o.classList.add("fas","fa-ellipsis-v"),r.append(o);var a=document.createElement("div");a.classList.add("dropdown-menu","p-2","flex-column"),a.setAttribute("aria-labelledby","dropdownMenuItem1");var c=document.createElement("button");c.classList.add("btn","btn-success","w-100"),c.type="button",c.textContent="Complete",c.name="complete",c.dataset.id=t;var d=document.createElement("button");d.classList.add("btn","btn-info","w-100","my-2","edit"),d.type="button",d.textContent="Edit",d.name="edit",d.dataset.id=t;var u=document.createElement("button");return u.classList.add("btn","btn-danger","w-100","delete"),u.type="button",u.textContent="Delete",u.name="delete",u.dataset.id=t,a.append(c),a.append(d),a.append(u),n.append(r),n.append(a),n},d=function(e,t){e.textContent="";for(var n=0;n<t.length;n++){var o=t[n],d=document.createElement("li");d.classList.add("list-group-item","d-flex","w-100","mb-2"),d.style.background=o.color,d.append(a(o)),o.status===r&&d.append(c(o)),e.append(d)}},u=0,s=1,l=function(e,t){return t===u?e.sort((function(e,t){return e.id-t.id})):e.sort((function(e,t){return t.id-e.id}))};document.addEventListener("DOMContentLoaded",(function(){var e=localStorage.getItem("toDoList")||[],t=localStorage.getItem("completedList")||[],n=u,a=function(r){n=r,l(t,r),l(e,r),d(document.querySelector("#currentTasks"),e),d(document.querySelector("#completedTasks"),t)},c=document.querySelector("#toDoForm"),i=document.querySelector("#currentTasksCount"),m=document.querySelector("#completedTasksCount"),p=document.querySelector("#currentTasks"),f=document.querySelector("#ascSort"),b=document.querySelector("#descSort");c.addEventListener("submit",(function(t){t.preventDefault();var o=new FormData(t.target),a=new Date,u={id:+a,title:o.get("inputTitle"),text:o.get("inputText"),priority:o.get("gridRadios"),date:a,status:r,color:o.get("color")};e.push(u),l(e,n),d(document.querySelector("#currentTasks"),e),i.textContent=e.length,c.reset(),document.querySelector(".close").click()})),p.addEventListener("click",(function(r){var a=r.target.closest(".dropdown-menu button");if(a)switch(a.name){case"delete":for(var c=a.dataset.id,u=0;u<e.length;u++)e[u].id===Number(c)&&e.splice(u,1);a.closest("li").remove(),i.textContent=e.length;break;case"complete":for(var s,p=a.dataset.id,f=0;f<e.length;f++)e[f].id===Number(p)&&(s=e.splice(f,1)[0]);a.closest("li").remove(),s.status=o,t.push(s),l(t,n),d(document.querySelector("#completedTasks"),t),i.textContent=e.length,m.textContent=t.length}})),f.addEventListener("click",(function(){return a(u)})),b.addEventListener("click",(function(){return a(s)})),document.querySelector("#currentTasksCount").textContent=t.length,document.querySelector("#completedTasksCount").textContent=t.length}))}]);