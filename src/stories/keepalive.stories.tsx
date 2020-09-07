import React, {
    useState,
} from "react";
import { KeepAlive, AliveScope } from "../components/KeepAlive";
import { withKnobs } from "@storybook/addon-knobs";
import Button from '../components/Button'

export default {
    title: "Keepalive",
    component: KeepAlive,
    decorators: [withKnobs],
};

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            count: {count}
            <Button
                onClick={() => setCount((count) => count + 1)}
                btnType="primary"
                style={{ marginLeft: 8 }}>add</Button>
        </div>
    );
}

export const Alive = () => {
    const [show, setShow] = useState(true);
    return (
        <AliveScope>
            <div>
                <Button onClick={() => setShow((show) => !show)}>Toggle</Button>
                <p>无 KeepAlive</p>
                {show && <Counter />}
                <p>有 KeepAlive</p>
                {show && (
                    <KeepAlive id="Test">
                        <Counter />
                    </KeepAlive>
                )}
            </div>
        </AliveScope>
    );
};