import React, { FC } from 'react'
export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  color?: string;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    color
  } = props
  return (
    <div className="progress-bar" style={styles}>
      <div className="progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div 
          className="progress-bar-inner"
          style={{width: `${percent}%`,backgroundColor:color}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
}
export default Progress;
