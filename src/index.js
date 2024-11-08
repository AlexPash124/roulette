import {App} from "./app/app";

const app = new App
await app.init({
    background: '#123',
    resizeTo: window,
    width: window.innerWidth,   // Ширина канвасу рівна ширині вікна браузера
    height: window.innerHeight, // Висота канвасу рівна висоті вікна браузера
    resolution: window.devicePixelRatio || 1, // Роздільна здатність для кращого вигляду на Retina екранах
    autoResize: true            // Включає автоматичне масштабування
});
document.body.appendChild(app.canvas);

globalThis.__PIXI_APP__ = app;