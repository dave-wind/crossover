import React, {
    FC,
    CSSProperties,
    useMemo,
    useState,
    useRef,
    useEffect,
} from "react";
import styled, { css } from "styled-components";
import { color } from "../shared/style";
import { rgba } from "polished";
import { modalOpenAnimate, modalCloseAnimate } from "../shared/animation";
import { useStateAnimation } from "../../hooks/useStateAnimation"
import { useClickOutside } from "../../hooks/useClickOutside"
import Button from "../Button";
import Icon from "../Icon";


const CalendarWrapper = styled.div<{ visible: boolean; delay: number }>`
    position: absolute;
    border: 1px solid black;
    transition: all ${(props) => props.delay / 1000}s cubic-bezier(0.23, 1, 0.32, 1);
    background: ${color.lightGreen};
    ${(props) =>
        props.visible &&
        css`
        animation: ${modalOpenAnimate} ${props.delay / 1000}s ease-in;
      `}
    ${(props) =>
        !props.visible &&
        css`
        animation: ${modalCloseAnimate} ${props.delay / 1000}s ease-in;
      `}
  `;

const CalendarDateRow = styled.tr``;

const tableItemStyle = css`
    display: inline-block;
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 2px;
    margin: 2px;
    text-align: center;
  `;

const CalendarHeadItem = styled.td`
    ${tableItemStyle}
    cursor:default;
  `;

const CalendarDate = styled.td<Partial<DateItem>>`
    display: inline-block;
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 2px;
    margin: 2px;
    text-align: center;
    cursor: pointer;
      ${(props) => {
        if (props.isonDay) {
            //当天的 
            return `color:${color.lightGreen};background:${color.primary};`;
        }
        return `&:hover {color: ${color.secondary};};`;
    }}
    ${(props) => {
        if (props.isonMonth === false) {
            //不是当月显示灰色
            return `color:${color.secondary};`;
        }
        return "";
    }}
  `;

const CalendarHeadWrapper = styled.div`
    padding: 10px;
    display: flex;
    color: ${rgba(0, 0, 0, 0.85)};
    border-bottom: 1px solid #f0f0f0;
    justify-content: center;
    flex-direction: column;
  `;

type calDataType = [number, number, number];

const btnStyle = {
    padding: "0px",
    background: color.lightGreen,
};

const IconWrapper = styled.span`
    display: inline-block;
    vertical-align: middle;
    > svg {
      height: 12px;
    }
  `;

const BtnDiv = styled.div`
    display: flex;
    jutify-content: center;
    align-items: center;
    height: 24px;
    line-height: 24px;
  `;

const MonthWrapper = styled.div`
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
  `;

const MonthItem = styled.div<{ toGrey?: boolean }>`
    width: 25%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    ${(props) => props.toGrey && `color:${color.secondary};`}
    &:hover {
      color: ${color.secondary};
    }
  `;

const Bwrapper = styled.b`
    cursor: pointer;
    &:hover {
      color: ${color.primary};
    }
  `;

const CalendarIcon = styled.span`
    display: inline-block;
  `;

const DatePickerWrapper = styled.div`
    display: inline-block;
    border-color: #40a9ff;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  `;

interface DateItem {
    day: number; //天
    isonMonth: boolean; //当月
    isonDay: boolean; //当日
    origin: Date;
    getTime: number; // 时间戳
}

const isCurrentMonth = function (
    current: Date,
    year: number,
    month: number
): boolean {
    return current.getFullYear() === year && current.getMonth() === month;
};

const isCurrentDay = function (current: Date, day: number, onMonth: boolean) {
    return current.getDate() === day && onMonth;
};

const getDateData = function (year: number, month: number, day: number, action: string) {
    const firstDay = new Date(year, month, 1);
    let weekDay = firstDay.getDay(); //周日，0，周六 6
    weekDay = weekDay === 0 ? 7 : weekDay;
    let start = firstDay.getTime() - weekDay * 60 * 60 * 24 * 1000;
    let arr: DateItem[] = [];
    for (let i = 0; i < 42; i++) {
        let current = new Date(start + i * 60 * 60 * 24 * 1000);
        let onMonth = isCurrentMonth(current, year, month);

        arr.push({
            day: current.getDate(),
            isonMonth: onMonth,
            isonDay: isCurrentDay(current, day, onMonth) && action === 'click',
            origin: current,
            getTime: current.getTime()
        });
    }
    let k = -1;
    return Array.from({ length: 6 }, () => {
        k++;
        return arr.slice(k * 7, (k + 1) * 7);
    });
};

const getYearMonthDay = function (date: number): calDataType {
    let tmp = new Date(date);
    return [tmp.getFullYear(), tmp.getMonth(), tmp.getDay()];
};

// 字符串 转 Date getTime
const getTimeByDateString = function (date: string): number {
    let arr = date.split('-').map(itm => parseInt(itm));
    const month = arr[1] - 1
    let result = new Date(arr[0], month, arr[2]).getTime()
    return result;
};

const getStartYear = function (calData: calDataType) {
    return calData[0] - calData[0] % 10
}

const generateDate = (calData: calDataType) => {
    return `${calData[0]}-${calData[1] + 1}-${calData[2]}`
}

const validateDate = (value: string) => {
    let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    if (reg.exec(value)) {
        return true;
    } else {
        return false;
    }
};

const MonthData = new Array(12).fill(1).map((_x, y) => y + 1);

type modeType = 'date' | 'month' | 'year'

export type DatepickerProps = {
    /** 日期选择的回调 */
    callback?: (v: string) => void;
    /**  动画速度 */
    delay?: number;
    /** 初始值*/
    initDate?: string;
    /** 外层样式*/
    style?: CSSProperties;
    /** 外层类名 */
    classname?: string;
};

const DatePicker: FC<DatepickerProps> = (props) => {
    const { callback, initDate, delay = 200 } = props;
    const [mode, setMode] = useState<modeType>('date');

    const [show, setShow] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const [st, setst, unmount] = useStateAnimation(setShow, 200);
    useClickOutside(ref, () => setst(false));

    const [calData, setCalData] = useState<calDataType>(() => [
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
    ]);
    const defaultVal = () => {
        if (initDate && validateDate(initDate)) {
            return initDate;
        } else {
            return generateDate(calData);
        }
    }

    const [state, setState] = useState(defaultVal());

    const [inputVal, setInputVal] = useState(defaultVal());

    // 用户行为
    const [action, setAction] = useState('click')

    console.log('state', state)
    console.log('calData', calData)
    useEffect(() => {
        if (callback) callback(state);
    }, [state, callback]);

    const dayData = useMemo(() => {
        const [year, month, day] = state.split('-');
        const currentMonth = parseInt(month) - 1
        const arr = getDateData(Number(year), Number(currentMonth), Number(day), action);
        return arr;
    }, [state, action]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
        setAction('click')
        setInputVal(e.target.value)
    };

    const handleClick = () => {
        setShow(true);
    };

    const handleBlur = () => {
        if (state !== generateDate(calData)) {
            //如果相等，说明是calData赋值上去的
            let res = validateDate(state); //验证格式
            if (!res) {
                //错误用原来的
                setState(generateDate(calData));
                setInputVal(generateDate(calData))
            } else {
                //否则计算新值
                let p = state.split("-");
                let newDate = new Date(
                    parseInt(p[0]),
                    parseInt(p[1]) - 1,
                    parseInt(p[2])
                );
                const newCal: calDataType = [
                    newDate.getFullYear(),
                    newDate.getMonth(),
                    newDate.getDate(),
                ];
                setCalData(newCal);
                setState(generateDate(newCal));
                setInputVal(generateDate(newCal))
            }
        }
    };

    const modeDay = (
        <table style={{ display: mode === "month" ? "none" : "table" }}>
            <thead>
                <tr>
                    <CalendarHeadItem>日</CalendarHeadItem>
                    <CalendarHeadItem>一</CalendarHeadItem>
                    <CalendarHeadItem>二</CalendarHeadItem>
                    <CalendarHeadItem>三</CalendarHeadItem>
                    <CalendarHeadItem>四</CalendarHeadItem>
                    <CalendarHeadItem>五</CalendarHeadItem>
                    <CalendarHeadItem>六</CalendarHeadItem>
                </tr>
            </thead>
            <tbody>
                {dayData.map((v, index) => (
                    <CalendarDateRow key={index}>
                        {v.map((k, i) => (
                            <CalendarDate
                                isonDay={getTimeByDateString(inputVal) === k.getTime}
                                isonMonth={k.isonMonth}
                                key={i}
                                onClick={() => {
                                    const origin = k.origin;
                                    const newCal: calDataType = [
                                        origin.getFullYear(),
                                        origin.getMonth(),
                                        origin.getDate(),
                                    ];
                                    console.log('item newCal--', k)
                                    setCalData(newCal);
                                    setState(generateDate(newCal));
                                    setInputVal(generateDate(newCal));
                                    setAction('click')
                                    setst(false);
                                }}
                            >
                                {k.day}
                            </CalendarDate>
                        ))}
                    </CalendarDateRow>
                ))}
            </tbody>
        </table>
    );

    const modeMonth = (
        <MonthWrapper
            style={{ display: mode === "month" ? "flex" : "none" }}
        >
            {
                MonthData.map((v, i) => {
                    return (
                        <MonthItem
                            key={i}
                            onClick={() => {
                                //获取当前月，与点击相减得差
                                let currentMonth = v - 1;
                                let res = changeCalData(currentMonth, calData);
                                setCalData(res);
                                setState(generateDate(res))
                                setInputVal(generateDate(res))
                                setMode("date");
                            }}
                        >
                            {v}月
                        </MonthItem>
                    );
                })}
        </MonthWrapper>
    );

    const startYear = getStartYear(calData);
    const yearMap = new Array(12).fill(1).map((_x, y) => startYear + y - 1);

    // 年份
    const modeYear = (
        <MonthWrapper
            style={{ display: mode === "year" ? "flex" : "none" }}>
            {yearMap.map((v, i) => (
                <MonthItem
                    toGrey={i === 0 || i === 11}
                    key={i}
                    onClick={() => {
                        //获取选择的年与差值
                        let diff = v - calData[0];
                        let res = changeCalYear(diff, calData);
                        setCalData(res);
                        setMode("month");
                    }}
                >
                    {v}
                </MonthItem>
            ))}
        </MonthWrapper>
    );

    const changeCalData = function (
        sign: boolean | number,
        calData: calDataType
    ): calDataType {
        const oldDate = new Date(calData[0], calData[1]);
        console.log('oldDate--calData[1]', calData[1]);
        if (typeof sign === 'boolean') {
            // 表头栏 前后切换月份
            const val = sign ? -1 : 1
            const newDate = oldDate.setMonth(oldDate.getMonth() + val);
            return getYearMonthDay(newDate);
        } else {
            // 选择对应 年月 月份
            const newDate = new Date(calData[0], sign).getTime();
            return getYearMonthDay(newDate);
        }
    };

    const changeCalYear = function (sign: number, calData: calDataType) {
        console.log('year--calData', calData)
        const oldDate = new Date(calData[0], calData[1]);
        const newDate = oldDate.setFullYear(oldDate.getFullYear() + sign);
        return getYearMonthDay(newDate);
    };

    const render = useMemo(() => {
        const handleLeft = () => {
            let res: calDataType;
            if (mode === "date") {
                res = changeCalData(true, calData);
            } else if (mode === "month") {
                res = changeCalYear(-1, calData);
            } else {
                res = changeCalYear(-10, calData);
            }
            console.log('res', res)
            setAction('prev')
            setCalData(res);
            setState(generateDate(res));
        };

        const handleRight = () => {
            let res: calDataType;
            if (mode === "date") {
                res = changeCalData(false, calData);
            } else if (mode === "month") {
                res = changeCalYear(1, calData);
            } else {
                res = changeCalYear(10, calData);
            }
            console.log('res next---', res)
            setAction('next')
            setCalData(res);
            setState(generateDate(res));
        };

        if (!show) {
            unmount();
            return null;
        } else {
            return (
                <CalendarWrapper visible={st} delay={delay}>
                    <CalendarHeadWrapper>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "240px",
                            }}
                        >
                            <BtnDiv style={{ marginLeft: "20px" }}>
                                <Button
                                    size="sm"
                                    btnType="primary"
                                    style={btnStyle}
                                    onClick={() => handleLeft()}
                                >
                                    <IconWrapper>
                                        <Icon icon="arrowleft"></Icon>
                                    </IconWrapper>
                                </Button>
                            </BtnDiv>
                            <BtnDiv style={{ flex: 1 }}>
                                <span>
                                    <Bwrapper
                                        style={{
                                            display:
                                                mode === "year"
                                                    ? "inline-block"
                                                    : "none",
                                        }}
                                    >{`${startYear}-${startYear + 9}`}</Bwrapper>
                                    <Bwrapper
                                        onClick={() => {
                                            setMode("year");
                                        }}
                                        style={{
                                            display:
                                                mode === "month" ||
                                                    mode === "date"
                                                    ? "inline-block"
                                                    : "none",
                                        }}
                                    >{`${calData[0]}年`}</Bwrapper>
                                    <Bwrapper
                                        onClick={() => {
                                            setMode("month");
                                        }}
                                        style={{
                                            display:
                                                mode === "date"
                                                    ? "inline-block"
                                                    : "none",
                                        }}
                                    >{`${calData[1] + 1}月`}</Bwrapper>
                                </span>
                            </BtnDiv>
                            <BtnDiv style={{ marginRight: "20px" }}>
                                <Button
                                    size="sm"
                                    btnType="primary"
                                    style={btnStyle}
                                    onClick={() => handleRight()}
                                >
                                    <IconWrapper>
                                        <Icon icon="arrowright"></Icon>
                                    </IconWrapper>
                                </Button>
                            </BtnDiv>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {modeDay}
                            {modeMonth}
                            {modeYear}
                        </div>
                    </CalendarHeadWrapper>
                </CalendarWrapper>
            );
        }
    }, [show, unmount, st, calData, mode, delay, modeDay, modeMonth, modeYear, startYear]);

    return (
        <DatePickerWrapper ref={ref} onClick={handleClick}>
            <input
                aria-label="date picker"
                onBlur={handleBlur}
                value={inputVal}
                onChange={handleChange}
                style={{ border: "none", boxShadow: "none", outline: "none" }}
            ></input>
            <CalendarIcon>
                <Icon icon="calendar"></Icon>
            </CalendarIcon>
            {render}
        </DatePickerWrapper>
    );
}

DatePicker.defaultProps = {
    delay: 200,
};

export default DatePicker
