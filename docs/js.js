if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

const MOBILE = /Mobile|Android/.test(navigator.userAgent);
if (MOBILE) {
    document.getElementById('online').querySelector('h2').innerText = 'Enable Airplane Mode.';
}

window.addEventListener('online', function() {
    var d=document.documentElement;
    d.className=d.className.replace(/\boffline\b/, "online");
});
window.addEventListener('offline', function() {
    var d=document.documentElement;
    d.className=d.className.replace(/\bonline\b/, "offline");
});

console.log('But how does it work?');
console.log("Check out https://github.com/dracos/offline (if you're online!)");
console.log("Spoiler: window.addEventListener with 'online' and 'offline'");
console.log("If it isn't working for you, maybe your browser isn't supported - http://caniuse.com/#feat=online-status.");
console.log("If that's the case, run window.help() for the spoiler.");
window.help = function() {
	console.log("OK, let's make this easier. just run window.dispatchEvent(new Event('offline'))");
	console.log("Still didn't work? Damn. I'm just really sorry.");
};
