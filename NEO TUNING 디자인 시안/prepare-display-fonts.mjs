import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('dist/assets/fonts');
const ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
async function get(url){const r=await fetch(url,{headers:{'User-Agent':ua},signal:AbortSignal.timeout(30000)});if(!r.ok)throw new Error(r.status+' '+url);return r;}
const titleText='컬러 랩핑 외장 튜닝 맞춤 커스텀 참고 갤러리 원하는 변화를 알려주세요 포르쉐 컬러 랩핑 전후 상담 내용 확인 사진 출처 색을 바꾸면 인상이 달라집니다';
const requests=[
 {family:'Cormorant Garamond:ital,wght@0,400;0,500;1,400;1,500',prefix:'Cormorant',text:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,&-'},
 {family:'Noto Serif KR:wght@500',prefix:'NotoSerifKR',text:titleText}
];
let localRules=[];
for(const request of requests){
 const url='https://fonts.googleapis.com/css2?family='+encodeURIComponent(request.family)+'&display=swap&text='+encodeURIComponent(request.text);
 const css=await (await get(url)).text();
 const blocks=css.match(/@font-face\s*\{[^}]+\}/g)||[];
 let index=0;
 for(const block of blocks){
  const remote=block.match(/url\(([^)]+)\)/)?.[1];
  if(!remote)continue;
  const binary=Buffer.from(await (await get(remote)).arrayBuffer());
  const format=binary.toString('ascii',0,4)==='wOF2'?'woff2':binary.toString('ascii',0,4)==='wOFF'?'woff':'ttf';
  const name=request.prefix+'-'+(++index)+'.'+format;
  await fs.writeFile(path.join(out,name),binary);
  localRules.push(block.replace(remote,'assets/fonts/'+name));
  console.log(name+': '+binary.length+' bytes');
 }
}
await fs.writeFile(path.join(out,'display-fonts.css'),localRules.join('\n'));
for(const [folder,name] of [['cormorantgaramond','Cormorant-OFL.txt'],['notoserifkr','NotoSerifKR-OFL.txt']]){
 const url='https://raw.githubusercontent.com/google/fonts/main/ofl/'+folder+'/OFL.txt';
 await fs.writeFile(path.join(out,name),await (await get(url)).text());
}
console.log('Fonts downloaded from Google Fonts, with OFL licenses.');
