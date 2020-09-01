import { FC } from 'react'
import Swiper, { SwiperProps } from './swiper'
import SwiperItem, { ItemProps } from './swiperItem'

export type ISwiperComponent = FC<SwiperProps> & {
    Item: FC<ItemProps>
}

const SwiperComponent = Swiper as ISwiperComponent
SwiperComponent.Item = SwiperItem

export default Swiper