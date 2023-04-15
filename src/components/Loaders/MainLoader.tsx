import React from 'react'
import TopBar from '../TopBar/TopBar'
import Loader from './Loader'

const MainLoader = () => {
    return (
        <>
            <TopBar />

            <div style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Loader variant='main' />
            </div>
        </>
    )
}

export default MainLoader