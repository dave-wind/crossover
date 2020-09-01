import React, { FC, useMemo } from 'react';

export interface ItemProps {
    img: string
    imgWidth: any
    children?: any
    type?: any
    renderSlot?: () => void
}

const SwiperItem: FC<ItemProps> = (props) => {
    const { renderSlot, img, type } = props

    const setImgStyle = useMemo((imgWidth = props.imgWidth) => {
        return {
            'transform': 'translate3d(' + (imgWidth) + 'px,0,0)',
            'WebkitTransform': 'translate3d(' + (imgWidth) + 'px,0,0)',
            'MozTransform': 'translate3d(' + (imgWidth) + 'px,0,0)',
            'msTransform': 'translate3d(' + (imgWidth) + 'px,0,0)',
        }
    }, [props.imgWidth])
    return (
        <div className="swiper-item" style={setImgStyle}>
            {
                renderSlot && typeof renderSlot === 'function' ? renderSlot() : null
            }
            {
                type === 'video' ? <div>
                    <video className="preview-video" preload="auto"
                        controls>
                        <source src={img} type="video/mp4" />
                    </video></div> : <img src={img} alt=""/>
            }

        </div>
    )
}

export default SwiperItem
