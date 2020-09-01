type IAction = {
    payload?: any
    type: string
}
export const reducer = (state: any, action: IAction) => {
    switch (action.type) {
        case 'DURATION':
            return {
                ...state,
                duration: action.payload
            }
        case 'NEXT':
            const imgIndex = state.imgIndex + 1
            const dotsIndex = state.dotsIndex + 1
            return {
                ...state,
                imgIndex,
                dotsIndex
            }
        case 'PREV':
            const prevImgIndex = state.imgIndex - 1
            const prevDotsIndex = state.dotsIndex - 1
            return {
                ...state,
                imgIndex: prevImgIndex,
                dotsIndex: prevDotsIndex
            }
        case 'DOT_CLICK':
            return {
                ...state,
                imgIndex: action.payload.imgIndex,
                dotsIndex: action.payload.dotsIndex
            }
        case 'SET_DOTSINDEX':
            return {
                ...state,
                dotsIndex: action.payload
            }
        case 'INIT_SWIPER':
            return {
                ...state,
                imgIndex: 0,
                dotsIndex: 0
            }
        case 'SWIPER_LOOP':
            return {
                ...state,
                duration: 0,
                imgIndex: action.payload
            }
        case 'SWIPER_ASYNC':
            const { duration, direction } = action.payload
            return {
                ...state,
                imgIndex: direction === 'next' ? state.imgIndex + 1 : state.imgIndex - 1,
                duration
            }
        default:
            return state
    }
}