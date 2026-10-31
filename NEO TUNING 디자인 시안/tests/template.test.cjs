const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=join(__dirname,'../dist');
class Element {
 constructor(tag='div'){this.tag=tag;this.children=[];this.hidden=false;this.dataset={};this.attrs={};this._text='';this.listeners={};this.classList={remove(){},toggle(){}};}
 set textContent(value){this._text=value;this.children=[];}
 get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}
 append(...els){this.children.push(...els);}
 replaceChildren(...els){this.children=els;}
 setAttribute(k,v){this.attrs[k]=v;}
 getAttribute(k){return this.attrs[k];}
 addEventListener(k,f){this.listeners[k]=f;}
 querySelectorAll(){return [];}
 focus(){this.focused=true;}
 scrollIntoView(){}
 showModal(){this.open=true;}
 close(){this.open=false;}
 setCustomValidity(value){this.validity=value;}
 reportValidity(){}
}
function run(config,app=false){
 const nodes=new Map(); const get=s=>{if(!nodes.has(s))nodes.set(s,new Element());return nodes.get(s);};
 const logos=[new Element('a'),new Element('a')],nav=[new Element('a')];
 const descendants=()=>[...get('.service-options').children.flatMap(l=>l.children)];
 const all=s=> s==='.logo'?logos:s==='[data-shop-nav]'?nav:s==='a[href="#services"]'?[get('serviceNav')]:s==='[data-service]'?[...get('.service-grid').children.map(a=>a.children.at(-1).children.at(-1)),get('.work-intro [data-service]')]:s.startsWith('input[name=service]')?descendants().filter(e=>e.name==='service'&&(!s.endsWith(':checked')||e.checked)):[];
 const document={createElement:t=>new Element(t),querySelector:s=>s==='input[name=service]'?all(s)[0]:s==='input[name=service]:checked'?all(s)[0]:get(s),querySelectorAll:all,addEventListener(){},body:new Element(),fonts:{load:async()=>[]}};
 const context={window:{SHOP_CONFIG:config},document,URL,Date,matchMedia:()=>({matches:false,addEventListener(){}})};
 vm.runInNewContext(readFileSync(join(root,'shop-template.js'),'utf8'),context);
 if(app)vm.runInNewContext(readFileSync(join(root,'app.js'),'utf8'),context);
 return {get,all,logos,nav};
}
let sample={};vm.runInNewContext(readFileSync(join(root,'shop-config.js'),'utf8'),{window:sample});
let r=run(sample.SHOP_CONFIG,true);
assert.equal(r.get('#shop').hidden,true);assert.equal(r.get('.service-grid').children.length,3);
assert.equal(r.all('input[name=service]').length,4);
r.get('#car').value='BMW 320i · 2022';r.get('#message').value='';
r.get('#quote-form').listeners.submit({preventDefault(){}});
assert.equal(r.get('#form-error').hidden,false);
const button=r.all('[data-service]')[0];button.listeners.click();
assert.equal(r.all('input[name=service]')[0].checked,true);
r.get('#quote-form').listeners.submit({preventDefault(){}});
assert.equal(r.get('#quote-dialog').open,true);assert.equal(r.get('#summary-services').textContent,'컬러 랩핑');
assert.equal(r.get('#summary-car').textContent,'BMW 320i · 2022');
r=run({name:'테스트 매장',introduction:'소개\n두 번째 줄',phone:'02-123-4567',address:'테스트 주소',hours:'예약제',visitNote:'주차 안내',mapUrl:'https://example.com/map',channels:[{label:'상담',url:'https://example.com/chat'},{label:'차단',url:'javascript:alert(1)'}],services:[{title:'PPF',description:'보호 필름'}]});
assert.equal(r.get('#shop').hidden,false);assert.equal(r.get('#shop-facts').children.length,4);assert.equal(r.get('#shop-channels').children.length,2);assert.equal(r.logos[0].textContent,'테스트 매장');
assert.equal(r.get('#shop-facts').children[0].children[1].children[0].href,'tel:021234567');
assert.equal(r.get('.service-grid').children.length,1);assert.equal(r.all('input[name=service]')[0].value,'PPF');
r=run({name:'',introduction:' ',services:[],channels:[{label:'',url:'https://example.com'},{label:'위험',url:'data:text/html,hi'}]});
assert.equal(r.get('#shop').hidden,true);assert.equal(r.get('#services').hidden,true);assert.equal(r.all('input[name=service]').length,1);assert.equal(r.logos[0].hidden,true);
r=run({introduction:'<img src=x onerror=alert(1)>',services:[{title:'<b>PPF</b>'}]});
assert.equal(r.get('#shop-description').children.length,0);assert.equal(r.get('#shop-description').textContent,'<img src=x onerror=alert(1)>');
console.log('PASS: default/filled/empty configuration, safe text/links, service synchronization, required selection, consultation preview');
