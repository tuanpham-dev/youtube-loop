if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const f=e=>s(e,o),d={module:{uri:o},exports:c,require:f};i[o]=Promise.all(n.map((e=>d[e]||f(e)))).then((e=>(r(...e),c)))}}define(["./workbox-e0782b83"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-a98896ba.js",revision:null},{url:"assets/index-f4fcdb33.css",revision:null},{url:"index.html",revision:"b168856828af37ee8005a0d5a2df3f2b"},{url:"registerSW.js",revision:"6fff262fcd6dd0b9fe955e322c0eb98a"},{url:"favicon.ico",revision:"0c13f6647d2d87a9583eff5033a74637"},{url:"apple-touch-icon.png",revision:"7c818d73f697ce3e74e4aba17801d62e"},{url:"masked-icon.svg",revision:"d139f991b020cb764b5700c69cb2fc00"},{url:"pwa-192x192.png",revision:"28f33d24d093d8f31ba8df7019756c2a"},{url:"pwa-512x512.png",revision:"295340dd73f6396b850ac72d0ec8539c"},{url:"manifest.webmanifest",revision:"89fed565e3be3976757c06aca0b5acaf"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
