export function throttle(func, delay = 300) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
        const context = this;
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime >= delay) {
            // If enough time has passed since the last execution, execute the function
            func.apply(context, args);
            lastExecTime = currentTime;
        } else {
            // If not enough time has passed, schedule the execution
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
                lastExecTime = currentTime;
            }, delay - (currentTime - lastExecTime));
        }
    };
}