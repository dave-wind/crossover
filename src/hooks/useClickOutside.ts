import { RefObject, useEffect } from 'react'

// 判定点击组件外
export function useClickOutside(
    ref: RefObject<HTMLElement>,
    handler: Function
) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };
        window.addEventListener("click", listener);
        return () => window.removeEventListener("click", listener);
    }, [ref, handler]);
}