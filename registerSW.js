if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/youtube-loop/sw.js', { scope: '/youtube-loop/' })})}