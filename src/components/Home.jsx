import React from 'react'
import Button from './WebComponents/Button'

const Home = () => {
    return (
        <div>
            ssebs.com site
            <Button onClick={()=>console.log("clicked")} variant="primary">Test Button</Button>
        </div>
    )
}

export default Home
