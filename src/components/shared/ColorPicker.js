import React, { useState, useEffect } from 'react'
import { CirclePicker, ChromePicker } from 'react-color'
import { GrDown } from 'react-icons/gr'

const ColorPicker = ({ color = '#bbbbbb', setColor }) => {

    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    //const [color, setColor] = useState('#bbbbbb')


    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    };

    const handleClose = () => {
        setDisplayColorPicker(false)
    };

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    return (
        <div className="color-picker">
            <button className="color-picker__button" onClick={handleClick}>
                <div className="color-picker__button__circle" style={{ backgroundColor: color.hex }}></div>
                <div style={{ width: '10px' }} />
                <GrDown />
            </button>
            { displayColorPicker ? <div style={popover}>
                <div style={cover} onClick={handleClose} />
                <div className="color-picker__container">
                    <CirclePicker
                        width="210px"
                        height="30px"
                        color={color}
                        onChangeComplete={(c) => {
                            setColor(c)
                        }}
                        circleSpacing={14}
                    />
                </div>
            </div> : null}
        </div>
    )

}

export default ColorPicker