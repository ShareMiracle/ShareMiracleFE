
function getRandomElements<T>(array: T[], num: number): T[] {  
    const result = [];
    const length = array.length;
    for (let i = 0; i < num; ++ i) {
        result.push(array[Math.floor(Math.random() * length)]);
    }    
    return result;  
}

export {
    getRandomElements
};