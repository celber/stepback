"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var Kjs={};Kjs.config={fx:{animations:!0,duration:1},map:{apiKey:String}},Kjs.namespace=function(t){var e,n=t.split("."),s=this;for(e=0;e<n.length;++e)s[n[e]]||(s[n[e]]={}),s=s[n[e]];return s},Kjs.clone=function(t){var e=Object();for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},Kjs.extend=function(t,e){for(var n in e)e[n]instanceof Array?(void 0===t[n]&&(t[n]=[]),t[n]=t[n].concat(e[n])):"object"==_typeof(e[n])&&"object"==_typeof(t[n])&&null!==t[n]?(void 0===t[n]&&(t[n]={}),this.extend(t[n],e[n])):t[n]=e[n]},Kjs.formatString=function(t,e){for(var n in e)t=t.replace("{"+n+"}",e[n]);return t},Kjs.ComponentManager=function(){},function(t){t.registry={},t.register=function(t,e){this.registry[t]&&new Error("Component "+t+" already exists in Component Managers!"),this.registry[t]=e},t.get=function(t){return this.registry[t]||new Error("Component "+t+" does not exists in Component Managers!"),this.registry[t]},t.create=function(e){return new(t.get(e.componentType))(e)}}(Kjs.ComponentManager.prototype),Kjs.ComponentManager=new Kjs.ComponentManager,Kjs.Component=function(t){var e=t||{};Kjs.extend(this,e),e.id||(this.id=Kjs.Component.getId())},Kjs.Component.NEXT_ID=1,Kjs.Component.getId=function(){return"kjs-"+Kjs.Component.NEXT_ID++},function(t){t.id,t.el,t.rendered=!1,t.parent,t.baseClass="kjs-component",t.classList=[t.baseClass],t.template="<div></div>",t.templateData={},t.renderTo=function(t){return this.el=this.el||Kjs.Element.render(Kjs.formatString(this.template,this.templateData)),this.el.setAttribute("id",this.id),this.classList.length&&this.el.addClass.apply(this.el,this.classList),this.parent=t,t.append(this.el),this.rendered=!0,this},t.addClass=function(t){this.el.addClass(t),this.classList.push(t)},t.removeClass=function(t){this.el.removeClass(t),this.classList=this.classList.filter(function(e){return e!==t})}}(Kjs.Component.prototype),Kjs.ComponentManager.register("component",Kjs.Component),Kjs.Container=function(t){for(var e in Kjs.Component.call(this,t),this.items)this.items[e]=this.createItem(this.items[e])},function(t){Kjs.extend(t,Kjs.Component.prototype),t.classList=t.classList.concat(["kjs-container"]),t.layout=null,t.containerEl=null,t.items=[],t.addItem=function(t){this.items.push(this.createItem(t)),this.renderTo(this.parent)},t.getContainerEl=function(){return this.el},t.createItem=function(t){return Kjs.ComponentManager.create(t)},t.renderTo=function(t){for(var e in Kjs.Component.prototype.renderTo.call(this,t),this.containerEl=this.getContainerEl(),this.items)this.items[e].rendered||this.items[e].renderTo(this.containerEl)}}(Kjs.Container.prototype),Kjs.ComponentManager.register("container",Kjs.Container),Kjs.Element=function(t,e){this.nativeElement=t,Kjs.extend(this.config,e)},Kjs.Element.render=function(t){var e,n=document.createElement("template"),s=t.trim();return n.innerHTML=s,(e=new Kjs.Element(document.adoptNode(n.content.firstChild))).template=t,e},function(t){t.id=null,t.nativeElement=null,t.config={},t.listeners={},t.template=null,t.hasClass=function(t){return-1!==Array.prototype.indexOf.call(this.nativeElement.classList,t)},t.addClass=function(t){this.nativeElement.classList.add.apply(this.nativeElement.classList,arguments)},t.removeClass=function(t){this.nativeElement.classList.remove(t)},t.toggleClass=function(t){this[this.hasClass(t)?"removeClass":"addClass"](t)},t.on=function(t,e){this.nativeElement.addEventListener(t,e)},t.off=function(t,e){this.nativeElement.removeEventListener(t,e)},t.hide=function(t){this.addClass(t?"invisible":"hidden")},t.show=function(){this.removeClass("hidden"),this.removeClass("invisible")},t.toggle=function(t){this.toggleClass(t?"invisible":"hidden")},t.append=function(t){this.nativeElement.appendChild(t.nativeElement)},t.setAttribute=function(t,e){this.nativeElement.setAttribute(t,e)}}(Kjs.Element.prototype),Kjs.queryOne=function(t){return new Kjs.Element(document.querySelector(t))},Kjs.queryAll=function(t){return Array.prototype.map.call(document.querySelectorAll(t),function(t){return new Kjs.Element(t)})},Kjs.namespace("layout"),Kjs.layout.Fit=function(t){Kjs.Container.call(this,t)},function(t){Kjs.extend(t,Kjs.Container.prototype),t.classList=t.classList.concat(["kjs-fit-container"]),t.template="<div></div>"}(Kjs.layout.Fit.prototype),Kjs.ComponentManager.register("fit",Kjs.layout.Fit),Kjs.namespace("zendesk"),Kjs.zendesk.Button=function(t){Kjs.Component.call(this,t),this.templateData.text=t.text},function(t){Kjs.extend(t,Kjs.Component.prototype),t.baseClass="kjs-zen-button",t.text=null,t.classList=t.classList.concat([t.baseClass]),t.template='<div class="c-btn">{text}</div>',t.renderTo=function(t){Kjs.Component.prototype.renderTo.call(this,t)}}(Kjs.zendesk.Button.prototype),Kjs.ComponentManager.register("zen:button",Kjs.zendesk.Button);