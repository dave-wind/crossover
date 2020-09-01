import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, ...arg: any[]) { // ...arg: any[]
    const savedCallback: any = useRef();
    // get an Array of all the arguments except the first one
    const args = Array.prototype.slice.call(arguments, 1)
    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        const id = setInterval(tick, args[0]);
        return () => clearInterval(id);
    }, [args]);
}
