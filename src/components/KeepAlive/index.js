import React, {
    createContext,
    useState,
    useEffect,
    useRef,
    useContext,
    useMemo,
  } from "react";
  
  const Context = createContext();
  
  export function AliveScope(props) {
    const [state, setState] = useState({});
    const ref = useMemo(() => {
      return {};
    }, []);
  
    const keep = useMemo(() => {
      return (id, children) =>
        new Promise((resolve) => {
          setState({
            [id]: { id, children },
          });
          setTimeout(() => {
            //需要等待setState渲染完拿到实例返回给子组件。
            resolve(ref[id]);
          });
        });
    }, [ref]);
  
    return (
      <Context.Provider value={keep}>
        {props.children}
        {Object.values(state).map(({ id, children }) => (
          <div
            key={id}
            ref={(node) => {
              ref[id] = node;
            }}
          >
            {children}
          </div>
        ))}
      </Context.Provider>
    );
  }
  
  export function KeepAlive(props) {
    const keep = useContext(Context);
    useEffect(() => {
      const init = async ({ id, children }) => {
        const realContent = await keep(id, children);
        if (ref.current) {
          ref.current.appendChild(realContent);
        }
      };
      init(props);
    }, [props, keep]);
    const ref = useRef(null);
    return <div ref={ref} />;
  }