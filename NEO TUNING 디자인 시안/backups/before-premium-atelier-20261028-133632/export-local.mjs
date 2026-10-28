import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const dist=path.join(root,'dist');
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const css=fs.readFileSync(path.join(dist,'style.css'),'utf8').replace(/url\('assets\/fonts\/([^']+)'\)/g,(_,name)=>"url('data:font/woff2;base64,"+fs.readFileSync(path.join(dist,'assets/fonts',name)).toString('base64')+"')");
const js=fs.readFileSync(path.join(dist,'app.js'),'utf8');
const license=fs.readFileSync(path.join(dist,'assets/fonts/OFL.txt'),'utf8');
html=html.replace(/\s*<link rel="preload"[^>]+>/g,'');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+css+'</style>');
html=html.replace('<script src="app.js" defer></script>','');
html=html.replace('</body>',()=>'<script>'+js+'</script><!-- Pretendard font license\n'+license.replace(/-->/g,'-- >')+'\n--></body>');
html=html.replace(/src="assets\/([^"]+)"/g,(_,name)=>'src="data:image/jpeg;base64,'+fs.readFileSync(path.join(dist,'assets',name)).toString('base64')+'"');
const variants=[['studio','A 스튜디오'],['atelier','B 아틀리에'],['precision','C 프리시전'],['gallery','D 갤러리']];
fs.writeFileSync(path.join(root,'NEO TUNING — 4가지 시안.html'),html);
for (const [key,name] of variants) {
  fs.writeFileSync(path.join(root,'NEO TUNING — '+name+'.html'),html.replace('data-concept="studio"','data-concept="'+key+'"'));
}
console.log('Exported 4 concepts and comparison file, including images, font, and font license.');
