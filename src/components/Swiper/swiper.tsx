import React, { FC, useReducer, useState, useEffect, useCallback, useMemo } from 'react'
import SwiperItem from './swiperItem'
import { reducer } from './reducer'
import { useInterval } from '../../hooks/useInterval'


const defaultState = {
    imgIndex: 0, // imgIndex
    dotsIndex: 0,
    duration: 300
}

export interface SwiperProps {
    wrapperClass?: string
    imgList: string[]
    imgWidth: string // 图片宽度
    prev?: string // 左按钮样式
    next?: string // 右按钮样式
    dotClass?: string // 圆点class
    arrowShow?: boolean
    dotShow?: boolean // 圆点是否展示
    dotOther?: string
    loop?: boolean // 无线滚动
    durationTime?: number // transition transform 持续时间
    auto?: boolean
    autoTime?: number
    keyName?: any
    showTxt?: boolean
    children?: React.ReactNode
    dotTextClassName?: string
    type?: string
}

const Swiper: FC<SwiperProps> = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const [arrow, setArrow] = useState(false)

    const mouseover = () => {
        setArrow(true)
    }

    const mouseout = () => {
        setArrow(false)
    }

    useEffect(() => {
        const { durationTime } = props
        dispatch({ type: 'DURATION', payload: durationTime })
    }, [props])

    /**
    *@computed useMemo use cache return value
    */
    const swiperBoxStyle = useMemo(() => {
        const { imgIndex, duration } = state
        const imgWidth = parseInt(props.imgWidth as string)
        return {
            'transition': `all ${duration}ms ease-out`,
            'WebkitTransition': `all ${duration}ms ease-out`,
            'MozTransition': `all ${duration}ms ease-out`,
            'msTransition': `all ${duration}ms ease-out`,
            'transform': `translate3d(${-imgIndex * imgWidth}px,0,0)`,
            'WebkitTransform': `translate3d(${-imgIndex * imgWidth}px,0,0)`,
            'MozTransform': `translate3d(${-imgIndex * imgWidth}px,0,0)`,
            'msTransform': `translate3d(${-imgIndex * imgWidth}px,0,0)`,
        }
    }, [state, props.imgWidth])

    const imgList = useMemo(() => props.imgList, [props.imgList])

    const len = useMemo(() => props.imgList.length, [props.imgList])

    const otherClass = useMemo(() => props.arrowShow && len > 1 ? 'swiper-hover' : '', [props.arrowShow, len])

    const swiperClassName = useMemo(() => {
        let className = props.wrapperClass
        if (otherClass) {
            className += ' ' + otherClass
        }
        return className
    }, [props.wrapperClass, otherClass])

    const dotClassName = useMemo(() => {
        let className = props.dotClass
        if (otherClass) {
            className += ' ' + props.dotOther
        }
        return className
    }, [props.dotClass, props.dotOther, otherClass])

    const handleImgList = useMemo(() => {
        const key = props.keyName
        let result = []
        const first = imgList[0]
        if (imgList.length > 0) {
            if (typeof first === 'string') {
                result = props.imgList.map((item: any) => {
                    let obj: any = {}
                    obj[key] = item
                    return obj
                })
            } else if ((typeof first === 'object')) {
                result = props.imgList.map((item: any) => {
                    const k = Object.keys(item)[0]
                    let obj: any = {}
                    obj[key] = item[k]
                    return obj
                })
            }
        }
        return result
    }, [props.imgList, props.keyName, imgList])
    /**
     *@methods
    */
    const swiperLoop = useCallback((type: string) => {
        const time = state.duration;
        const imgIndex = type === 'next' ? 0 : len - 1
        dispatch({ type: 'SWIPER_LOOP', payload: imgIndex })
        setTimeout(() => {
            dispatch({ type: 'SWIPER_ASYNC', payload: { duration: time, direction: type } })
        }, 30);
    }, [state.duration, len])

    const toNext = useCallback(() => {
        if (props.loop) {
            dispatch({ type: 'NEXT' })
            if (state.dotsIndex === len - 1) {
                dispatch({ type: 'SET_DOTSINDEX', payload: 0 })
            }
            if (state.imgIndex === len) {
                swiperLoop('next')
            }
        } else {
            dispatch({ type: 'NEXT' })
            if (state.imgIndex > len - 1) {
                dispatch({ type: 'INIT_SWIPER' })
            }
        }
    }, [state.imgIndex, state.dotsIndex, len, props.loop, swiperLoop])

    const autoPlay = useCallback(() => {
        if (props.auto && len > 1) {
            toNext()
        }
    }, [len, props.auto, toNext]) // use callback please add [your listen props or state ]



    useInterval(autoPlay, props.autoTime, state.imgIndex, state.dotsIndex)

    const toPrev = useCallback(() => {
        if (props.loop) {
            dispatch({ type: 'PREV' })
            if (state.dotsIndex === 0) {
                dispatch({ type: 'SET_DOTSINDEX', payload: len - 1 })
            }
            if (state.imgIndex === -1) {
                swiperLoop('prev')
            }
        } else {
            if (state.imgIndex === 0) {
                const val = len > 0 ? len - 1 : 0
                dispatch({ ...state, dotsIndex: val, imgIndex: val })
                return
            }
            dispatch({ type: 'PREV' })
        }
    }, [state, len, props.loop, swiperLoop])


    const handleDotClick = (index: number) => {
        dispatch({ type: 'DOT_CLICK', payload: { imgIndex: index, dotsIndex: index } })
    }
    /**
     *@render
    */
    return (
        <div id="swiperEasy" className={swiperClassName} onMouseOver={mouseover} onMouseLeave={mouseout}>
            <div className="swiper-box" style={swiperBoxStyle}>
                {
                    props.loop ? <SwiperItem
                        type={props.type}
                        img={handleImgList[len - 1][props.keyName]}
                        imgWidth={-props.imgWidth}>
                    </SwiperItem> : null
                }
                {
                    len > 0 && handleImgList.map((item, index) => (
                        <SwiperItem key={index} type={props.type} img={item[props.keyName]} imgWidth={parseInt(props.imgWidth) * index} />
                    ))
                }
                {
                    props.loop ? <SwiperItem
                        type={props.type}
                        img={handleImgList[0][props.keyName]}
                        imgWidth={parseInt(props.imgWidth) * len}>
                    </SwiperItem> : null
                }
            </div>
            {
                props.children ? props.children : null
            }
            {
                props.dotShow && len > 1 && (<div className={dotClassName}>
                    {
                        imgList.map((item, index) => (<div className={state.dotsIndex === index ? 'active' : ''}
                            onClick={() => handleDotClick(index)} key={index}>
                        </div>))
                    }
                </div>)
            }
            <div className={props.dotTextClassName}>
                {state.dotsIndex + 1} / {len}
            </div>
            {
                arrow ? <div className={props.prev ? props.prev : 'common-prev'} onClick={toPrev} /> : null
            }
            {
                arrow ? <div className={props.next ? props.next : 'common-next'} onClick={toNext} /> : null
            }

        </div>
    )
}

Swiper.defaultProps = {
    wrapperClass: '',
    imgList: [] as string[], // what the expected type of that array for compiler's resolution of the any type
    imgWidth: '100',
    prev: '', // 左按钮样式
    next: '', // 右按钮样式
    dotClass: 'dot-wrap', // 圆点class
    arrowShow: true,
    dotShow: true,
    loop: true,
    durationTime: 300,  // transition transform 持续时间
    auto: false,
    autoTime: 2500,
    keyName: 'url',
    showTxt: false,
    dotTextClassName: '',
    type: 'img',
    children: null
}

export default Swiper
