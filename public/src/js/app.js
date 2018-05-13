// SW registertion

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`/sw.js`).then( reg => {
        console.log(`service worker registered 0x1F39F`);
    } );
}

window.defferPropmt;

window.addEventListener('beforeinstallprompt', event => {
    console.log('user asked for it');
    event.preventDefault();
    window.defferPropmt = event;
    return false;
});