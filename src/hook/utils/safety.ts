/* eslint-disable @typescript-eslint/no-explicit-any */
interface EndFunction<P> {
    (...args: P[]): void;
}

function debounceWrapper(fn: EndFunction<any>, delay: number): EndFunction<any> {
    let timerID : null | number = null;
    function invoker(...args: Parameters<EndFunction<any>>): void {
        if (timerID !== null) {
            clearTimeout(timerID);
        }

        timerID = setTimeout(() => {
            fn(...args);
        }, delay);
    }
    return invoker;
}


export {
    debounceWrapper
};
