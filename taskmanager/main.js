!function(e){var t={};function a(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(n,s,function(t){return e[t]}.bind(null,s));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);class n{constructor(e){this.id=e.id,this.title=e.title||"",this.dueDate=new Date(e.due_date),this.tags=new Set(e.tags||[]),this.picture=e.picture||"",this.repeatingDays=e.repeating_days,this.color=e.color,this.isFavorite=Boolean(e.is_favorite),this.isDone=Boolean(e.is_done)}toRAW(){return{id:this.id,title:this.title,due_date:this.dueDate,tags:[...this.tags.values()],picture:this.picture,repeating_days:this.repeatingDays,color:this.color,is_favorite:this.isFavorite,is_done:this.isDone}}static parseTask(e){return new n(e)}static parseTasks(e){return e.map(n.parseTask)}}const s={GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE"},r=e=>{if(e.status>=200&&e.status<300)return e;throw new Error(`${e.status}: ${e.statusText}`)},i=e=>e.json();const l=e=>Object.keys(e).map(t=>e[t]);var o=class{constructor({api:e,store:t,generateId:a}){this._api=e,this._store=t,this._generateId=a}updateTask({id:e,data:t}){if(this._isOnline())return this._api.updateTask({id:e,data:t}).then(e=>(this._store.setItem({key:e.id,item:e.toRAW()}),e));{const e=t;return this._needSync=!0,this._store.setItem({key:e.id,item:e}),Promise.resolve(n.parseTask(e))}}createTask({task:e}){return this._isOnline()?this._api.createTask({task:e}).then(e=>(this._store.setItem({key:e.id,item:e.toRAW()}),e)):(e.id=this._generateId(),this._needSync=!0,this._store.setItem({key:e.id,item:e}),Promise.resolve(n.parseTask(e)))}deleteTask({id:e}){return this._isOnline()?this._api.deleteTask({id:e}).then(()=>{this._store.removeItem({key:e})}):(this._needSync=!0,this._store.removeItem({key:e}),Promise.resolve(!0))}getTasks(){if(this._isOnline())return this._api.getTasks().then(e=>(e.map(e=>this._store.setItem({key:e.id,item:e.toRAW()})),e));{const e=this._store.getAll(),t=l(e),a=n.parseTasks(t);return Promise.resolve(a)}}syncTasks(){return this._api.syncTasks({tasks:l(this._store.getAll())})}_isOnline(){return window.navigator.onLine}};var d=class{constructor({key:e,storage:t}){this._storage=t,this._storeKey=e}setItem({key:e,item:t}){const a=this.getAll();a[e]=t,this._storage.setItem(this._storeKey,JSON.stringify(a))}getItem({key:e}){return this.getAll()[e]}removeItem({key:e}){const t=this.getAll();delete t[e],this._storage.setItem(this._storeKey,JSON.stringify(t))}getAll(){const e={},t=this._storage.getItem(this._storeKey);if(!t)return e;try{return JSON.parse(t)}catch(a){return console.error(`Error parse items. Error: ${a}. Items: ${t}`),e}}},c=e=>{const t=document.createElement("div");return t.innerHTML=e,t.firstChild};const _={blue:"card--blue",black:"card--black",yellow:"card--yellow",green:"card--green",pink:"card--pink"};class h{constructor(){if(new.target===h)throw new Error("Can't instantiate BaseComponent, only concrete one.");this._element=null,this._state={}}get element(){return this._element}get template(){throw new Error("You have to define template.")}render(){return this._element=c(this.template),this.bind(),this._element}bind(){}unbind(){}unrender(){this.unbind(),this._element.remove(),this._element=null}}class u extends h{constructor(e){super(),this._title=e.title,this._dueDate=e.dueDate,this._tags=e.tags,this._picture=e.picture,this._repeatingDays=e.repeatingDays,this._onEdit=null,this._onEditButtonClick=this._onEditButtonClick.bind(this)}_isRepeated(){return Object.values(this._repeatingDays).some(e=>e)}_onEditButtonClick(){"function"==typeof this._onEdit&&this._onEdit()}set onEdit(e){this._onEdit=e}get template(){return`\n    <article class="card ${_[this._color]} ${this._isRepeated()?"card--repeat":""}">\n      <div class="card__inner">\n        <div class="card__control">\n          <button type="button" class="card__btn card__btn--edit">edit</button>\n          <button type="button" class="card__btn card__btn--archive">archive</button>\n          <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>\n        </div>\n\n        <div class="card__color-bar">\n          <svg class="card__color-bar-wave" width="100%" height="10">\n            <use xlink:href="#wave"></use>\n          </svg>\n        </div>\n\n        <div class="card__textarea-wrap">\n          <label>\n            <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>\n          </label>\n        </div>\n\n        <div class="card__settings">\n          <div class="card__details">\n            <div class="card__hashtag">\n              <div class="card__hashtag-list">\n                ${Array.from(this._tags).map(e=>`\n                  <span class="card__hashtag-inner">\n                    <input type="hidden" name="hashtag" value="${e}" class="card__hashtag-hidden-input" />\n                    <button type="button" class="card__hashtag-name">#${e}</button>\n                    <button type="button" class="card__hashtag-delete">delete</button>\n                  </span>`.trim()).join("")}\n              </div>\n          </div>\n     </article>`.trim()}bind(){this._element.querySelector(".card__btn--edit").addEventListener("click",this._onEditButtonClick)}unbind(){this._element.querySelector(".card__btn--edit").removeEventListener("click",this._onEditButtonClick)}update(e){this._title=e.title,this._tags=e.tags,this._color=e.color,this._repeatingDays=e.repeatingDays}}class p extends h{constructor(e){super(),this._id=e.id,this._title=e.title,this._tags=e.tags,this._repeatingDays=e.repeatingDays,this._color=e.color,this._dueDate=e.dueDate,this._onSubmitButtonClick=this._onSubmitButtonClick.bind(this),this._onSubmit=null,this._state.isDate=!1,this._state.isRepeated=!1,this._onChangeDate=this._onChangeDate.bind(this),this._onChangeRepeated=this._onChangeRepeated.bind(this),this._onDeleteButtonClick=this._onDeleteButtonClick.bind(this)}_processForm(e){const t={title:"",color:"",tags:new Set,dueDate:new Date,repeatingDays:{mo:!1,tu:!1,we:!1,th:!1,fr:!1,sa:!1,su:!1}},a=p.createMapper(t);for(const t of e.entries()){const[e,n]=t;a[e]&&a[e](n)}return t}_onSubmitButtonClick(e){e.preventDefault();const t=new FormData(this._element.querySelector(".card__form")),a=this._processForm(t);"function"==typeof this._onSubmit&&this._onSubmit(a),this.update(a)}_onDeleteButtonClick(e){"function"==typeof this._onDelete&&this._onDelete({id:this._id})}_onChangeDate(){this._state.isDate=!this._state.isDate,this.unbind(),this._partialUpdate(),this.bind()}_onChangeRepeated(){this._state.isRepeated=!this._state.isRepeated,this.unbind(),this._partialUpdate(),this.bind()}_isRepeated(){return Object.values(this._repeatingDays).some(e=>e)}_partialUpdate(){this._element.innerHTML=this.template}set onSubmit(e){this._onSubmit=e}set onDelete(e){this._onDelete=e}get template(){return`\n    <article class="card card--edit ${_[this._color]}  ${this._isRepeated()?"card--repeat":""}">\n      <form class="card__form" method="get">\n        <div class="card__inner">\n          <div class="card__control">\n            <button type="button" class="card__btn card__btn--edit">edit</button>\n            <button type="button" class="card__btn card__btn--archive">archive</button>\n            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>\n          </div>\n\n          <div class="card__color-bar">\n            <svg class="card__color-bar-wave" width="100%" height="10">\n              <use xlink:href="#wave"></use>\n            </svg>\n          </div>\n\n          <div class="card__textarea-wrap">\n            <label>\n              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>\n            </label>\n          </div>\n\n          <div class="card__settings">\n            <div class="card__details">\n              <div class="card__dates">\n                <button class="card__date-deadline-toggle" type="button">\n                  date: <span class="card__date-status">${this._state.isDate?"yes":"no"}</span>\n                </button>\n\n                <fieldset class="card__date-deadline" ${!this._state.isDate&&"disabled"}>\n                  <label class="card__input-deadline-wrap">\n                    <input class="card__date" type="text" placeholder="23 September" name="date" />\n                  </label>\n\n                  <label class="card__input-deadline-wrap">\n                    <input class="card__time" type="text" placeholder="11:15 PM" name="time" />\n                  </label>\n                </fieldset>\n\n                <button class="card__repeat-toggle" type="button">\n                  repeat: <span class="card__repeat-status">${this._state.isRepeated?"yes":"no"}</span>\n                </button>\n\n                <fieldset class="card__repeat-days" ${!this._state.isRepeated&&"disabled"}>\n                  <div class="card__repeat-days-inner">\n                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-5" name="repeat" value="mo" ${this._repeatingDays.mo&&"checked"}/>\n                    <label class="card__repeat-day" for="repeat-mo-5">mo</label>\n\n                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-5" name="repeat" value="tu" ${this._repeatingDays.tu&&"checked"} />\n                    <label class="card__repeat-day" for="repeat-tu-5">tu</label>\n\n                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-5" name="repeat" value="we" ${this._repeatingDays.we&&"checked"}/>\n                    <label class="card__repeat-day" for="repeat-we-5" >w</label>\n\n                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-5" name="repeat" value="th" ${this._repeatingDays.th&&"checked"} />\n                    <label class="card__repeat-day" for="repeat-th-5">th</label>\n\n                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-5" name="repeat" value="fr" ${this._repeatingDays.fr&&"checked"} />\n                    <label class="card__repeat-day" for="repeat-fr-5" >fr</label>\n\n                    <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-5" ${this._repeatingDays.sa&&"checked"} />\n                    <label class="card__repeat-day" for="repeat-sa-5">sa</label>\n\n                    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-5" name="repeat" value="su" ${this._repeatingDays.su&&"checked"} />\n                    <label class="card__repeat-day" for="repeat-su-5" >su</label>\n                  </div>\n                </fieldset>\n              </div>\n\n              <div class="card__hashtag">\n                <div class="card__hashtag-list">\n                  ${Array.from(this._tags).map(e=>`\n                    <span class="card__hashtag-inner">\n                      <input type="hidden" name="hashtag" value="${e}" class="card__hashtag-hidden-input" />\n                      <button type="button" class="card__hashtag-name">#${e}</button>\n                      <button type="button" class="card__hashtag-delete">delete</button>\n                    </span>`.trim()).join("")}\n                </div>\n\n                <label>\n                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />\n                </label>\n              </div>\n            </div>\n\n            <label class="card__img-wrap card__img-wrap--empty">\n              <input type="file" class="card__img-input visually-hidden" name="img" />\n            </label>\n\n            <div class="card__colors-inner">\n              <h3 class="card__colors-title">Color</h3>\n              <div class="card__colors-wrap">\n                <input type="radio" id="color-black-5" class="card__color-input card__color-input--black visually-hidden" name="color" value="black" ${"black"===this._color&&"checked"}/>\n                <label for="color-black-5" class="card__color card__color--black">black</label>\n\n                <input type="radio" id="color-yellow-5" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow" ${"yellow"===this._color&&"checked"} />\n                <label for="color-yellow-5" class="card__color card__color--yellow">yellow</label>\n\n                <input type="radio" id="color-blue-5" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue" ${"blue"===this._color&&"checked"} />\n                <label for="color-blue-5" class="card__color card__color--blue">blue</label>\n\n                <input type="radio" id="color-green-5" class="card__color-input card__color-input--green visually-hidden" name="color" value="green" ${"green"===this._color&&"checked"} />\n                <label for="color-green-5" class="card__color card__color--green">green</label>\n\n                <input type="radio" id="color-pink-5" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink" ${"pink"===this._color&&"checked"} />\n                <label for="color-pink-5" class="card__color card__color--pink">pink</label>\n              </div>\n            </div>\n          </div>\n\n          <div class="card__status-btns">\n            <button class="card__save" type="submit">save</button>\n            <button class="card__delete" type="button">delete</button>\n          </div>\n        </div>\n      </form>\n    </article>`.trim()}bind(){this._element.querySelector(".card__form").addEventListener("submit",this._onSubmitButtonClick),this._element.querySelector(".card__date-deadline-toggle").addEventListener("click",this._onChangeDate),this._element.querySelector(".card__repeat-toggle").addEventListener("click",this._onChangeRepeated),this._element.querySelector(".card__delete").addEventListener("click",this._onDeleteButtonClick),this._state.isDate&&(flatpickr(".card__date",{altInput:!0,altFormat:"j F",dateFormat:"j F"}),flatpickr(".card__time",{enableTime:!0,noCalendar:!0,altInput:!0,altFormat:"h:i K",dateFormat:"h:i K"}))}unbind(){this._element.querySelector(".card__form").removeEventListener("submit",this._onSubmitButtonClick),this._element.querySelector(".card__form").removeEventListener("submit",this._onSubmitButtonClick),this._element.querySelector(".card__date-deadline-toggle").removeEventListener("click",this._onChangeDate),this._element.querySelector(".card__repeat-toggle").removeEventListener("click",this._onChangeRepeated),this._element.querySelector(".card__delete").removeEventListener("click",this._onDeleteButtonClick)}update(e){this._title=e.title,this._tags=e.tags,this._color=e.color,this._repeatingDays=e.repeatingDays,this._dueDate=e.dueDate}static createMapper(e){return{hashtag:t=>e.tags.add(t),text:t=>e.title=t,color:t=>e.color=t,repeat:t=>e.repeatingDays[t]=!0,date:t=>e.dueDate[t]}}}const b=new o({api:new class{constructor({endPoint:e,authorization:t}){this._endPoint=e,this._authorization=t}getTasks(){return this._load({url:"tasks"}).then(i).then(n.parseTasks)}createTask({task:e}){return this._load({url:"tasks",method:s.POST,body:JSON.stringify(e),headers:new Headers({"Content-Type":"application/json"})}).then(i).then(n.parseTask)}updateTask({id:e,data:t}){return this._load({url:`tasks/${e}`,method:s.PUT,body:JSON.stringify(t),headers:new Headers({"Content-Type":"application/json"})}).then(i).then(n.parseTask)}deleteTask({id:e}){return this._load({url:`tasks/${e}`,method:s.DELETE}).then(()=>!0)}syncTasks({tasks:e}){return this._load({url:"tasks/sync",method:"POST",body:JSON.stringify(e),headers:new Headers({"Content-Type":"application/json"})}).then(i)}_load({url:e,method:t=s.GET,body:a=null,headers:n=new Headers}){return n.append("Authorization",this._authorization),fetch(`${this._endPoint}/${e}`,{method:t,body:a,headers:n}).then(r).catch(e=>{throw console.error(`fetch error: ${e}`),e})}}({endPoint:"https://es8-demo-srv.appspot.com/task-manager",authorization:`Basic ${(new Date).getHours()}`}),store:new d({key:"tasks-store-key",storage:localStorage}),generateId:()=>String(Date.now())});window.addEventListener("offline",()=>document.title=`${document.title}[OFFLINE]`),window.addEventListener("online",()=>{document.title=document.title.split("[OFFLINE]")[0],b.syncTasks()});const y=e=>{const t=document.querySelector(".board__tasks");t.innerHTML="";for(const a of e){const e=new u(a),n=new p(a);t.appendChild(e.render()),e.onEdit=(()=>{n.render(),t.replaceChild(n.element,e.element),e.unrender()}),n.onSubmit=(s=>{a.title=s.title,a.tags=s.tags,a.color=s.color,a.repeatingDays=s.repeatingDays,a.dueDate=s.dueDate,b.updateTask({id:a.id,data:a.toRAW()}).then(a=>{e.update(a),e.render(),t.replaceChild(e.element,n.element),n.unrender()})}),n.onDelete=(({id:e})=>{b.deleteTask({id:e}).then(()=>b.getTasks()).then(y).catch(alert)})}};b.getTasks().then(e=>{y(e)}).catch(alert)}]);