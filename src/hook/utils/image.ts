export function isImageUrl(url: string): Promise<boolean> {
    const image = new Image();
    return new Promise((resolve, _) => {
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
        image.src = url;
    });
}

export function stringToRGB(token: string) {  
    const codes = token.split('').map(char => char.charCodeAt(0));  
    let r = 0, g = 0, b = 0;  
    for (let i = 0; i < codes.length; i++) {  
        r = (r + codes[i] * 1) % 256;  
        g = (g + codes[i] * 2) % 256;  
        b = (b + codes[i] * 3) % 256;  
    }  
  
    return `rgb(${r}, ${g}, ${b})`;  
}


interface RandomAvatarConfig {
    size: number
}

function hashCode(token: string) {
    let hash = 0, i, chr;
    if (token.length === 0) return hash;
    for (i = 0; i < token.length; i++) {
        chr   = token.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
  return hash;
}

export function genHashAvatar(token: string, config: RandomAvatarConfig) {
    const canvas = document.createElement('canvas');
    const pixelSize = config.size / 5;
    canvas.id = 'random-avatar-gen';
    canvas.height = pixelSize * 5;
    canvas.width = pixelSize * 5;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return undefined;
    }

    const codes = token.split('').map(char => char.charCodeAt(0));  
    let r = 0, g = 0, b = 0;  
    for (let i = 0; i < codes.length; i++) {  
        r = (r + codes[i] * 1) % 256;  
        g = (g + codes[i] * 2) % 256;  
        b = (b + codes[i] * 3) % 256;  
    }

    const hash = hashCode(token);

    // ctx.fillStyle = 'rgb(240, 240, 240)';
    // ctx.fillRect(0, 0, 5 * pixelSize, 5 * pixelSize);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

    for (let i = 0; i < 15; ++ i) {
        const col = Math.floor(i / 5);
        const row = i % 5;
        const bit = (hash >> i) & 1;
        if (bit) {
            ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
            if (i < 10) {
                ctx.fillRect((4 - col) * pixelSize, row * pixelSize, pixelSize, pixelSize);
            }
        }
    }

    const dataUrl = canvas.toDataURL('image/png');
    canvas.parentElement?.removeChild(canvas);
    return dataUrl;
}