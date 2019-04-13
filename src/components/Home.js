import React from 'react'
import bannerImg from '../assets/ssebsFeatureLogo---1024x500.png'

const Banner = () => {
    return (
        <div style={{
            backgroundImage: `url(${bannerImg})`,
            height: "500px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <h1>Big banner</h1>
        </div>
    )
}

const TopProjects = () => {
    return (
        <div style={{
            height: "100px",
            backgroundColor:"gray"
        }}>
            TopProjects
        </div>
    )
}


function Home() {
    return (
        <div>
            <h1>Home</h1>
            <hr />
            <Banner />
            <hr />
            <TopProjects />
        </div>
    )
}

export default Home;
