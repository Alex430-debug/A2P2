const CACHE='ap2-trainer-v2';
const ASSETS=['./','./index.html','./style.css','./app.js','./questions.js','./manifest.webmanifest',
'./assets/src24/p-04.png','./assets/src24/p-05.png','./assets/src24/p-06.png','./assets/src24/p-07.png','./assets/src24/p-08.png','./assets/src24/p-09.png','./assets/src24/p-10.png','./assets/src24/p-11.png',
'./assets/src24b/p-14.png','./assets/src24b/p-15.png','./assets/src24b/p-16.png','./assets/src24b/p-17.png','./assets/src24b/p-18.png','./assets/src24b/p-19.png','./assets/src24b/p-20.png','./assets/src24b/p-21.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
    if(resp && resp.ok && e.request.method==='GET'){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}
    return resp;
  }).catch(()=> e.request.mode==='navigate' ? caches.match('./index.html') : Response.error())));
});
