let loadingLayer: HTMLDivElement | null = null;

interface KLoadingConfig {
    text?: string;
    background?: string;
}

export function registerKLoading() {
    const loader = document.querySelector('#loading-layer');
    if (loader instanceof HTMLDivElement) {
        loadingLayer = loader;
        loadingLayer.classList.add('is-hidden');
    }
}

export class KLoading {
    config: KLoadingConfig
    constructor(config: KLoadingConfig) {
        config.text = config.text || '';
        config.background = config.background || 'rgb(232,232,232)';
        this.config = config;
        if (loadingLayer) {
            const maskTitle = loadingLayer.querySelector('.loading-text');
            if (maskTitle) {
                maskTitle.innerHTML = `<span>${config.text}</span>`;
            }
            loadingLayer.style.backgroundColor = config.background;
            document.body.style.setProperty('--mask-color', 'rgb(232,232,232)');
            loadingLayer.classList.remove('is-hidden');
        }
    }
    close() {
        if (loadingLayer) {
            loadingLayer.classList.add('is-hidden');
        }
    }
}