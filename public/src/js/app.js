// SW registertion

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`/sw.js`).then( reg => {
        console.log(`service worker registered 0x1F39F`);
    } );
}