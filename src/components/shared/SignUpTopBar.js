import React from 'react'

const SignUpTopBar = () => {
    return (
        <div className='signup-header'>
            <img src='/blackSB.png'
                className='signup-header__image'
                style={{ height: '25px', width: '25px', marginRight: '5px' }}
                className="imageInner"
            />
            <span
                className='signup-header__image'
                style={{ paddingTop: '5px' }}>StudyBuddy</span>
        </div>
    )
}

export default SignUpTopBar