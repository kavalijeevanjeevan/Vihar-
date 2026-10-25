const C='vihar-v2';
const A=['./','./index.html','./manifest.webmanifest','./content.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||!q.url.startsWith(self.location.origin))return;
e.respondWith(fetch(q).then(r=>{if(r.ok){const cp=r.clone(),u=new URL(q.url);u.search='';caches.open(C).then(x=>x.put(u.href,cp)).catch(()=>{})}return r}).catch(()=>caches.match(q,{ignoreSearch:true}).then(m=>m||caches.match('./index.html'))))});
