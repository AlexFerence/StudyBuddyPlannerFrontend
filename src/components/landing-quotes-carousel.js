import React from 'react'
import Carousel from "react-multi-carousel";
import InstagramEmbed from 'react-instagram-embed';
const LandingCarousel = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4100, min: 2650 },
            items: 5
        },
        largeDesktop: {
            breakpoint: { max: 2650, min: 1750 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1750, min: 1250 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1250, min: 500 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 900, min: 0 },
            items: 1
        }
    };

    const quotes = [
        {
            text: '"It\'s like Strava but for studying. "',
            author: ' - Maddy Epps'
        },
        {
            text: '" Clean. "',
            author: ' - Diego Dorantes-Ferreira'
        },
        {
            text: '" It always motivates me to do that little bit more. "',
            author: ' - Torean Vance'
        },
        {
            text: '" It helps me organize everything in one place. "',
            author: ' - Maya Nachman'
        },
        {
            text: ' " StudyBuddy keeps me studying for a lot longer than I used to. "',
            author: ' - Vlad Stets'
        },
        {
            text: ' " I love the aesthetic and color scheme. "',
            author: ' - Bailey Aaron'
        },
        {
            text: '" I use it every single time I study "',
            author: ' - Silas Chappell'
        },
        {
            text: '" It appeases the part of the brain that craves checking things off "',
            author: ' - Havana Garcha'
        }]



    return (
        <div style={{
            minHeight: '200px', minWidth: '500px',
            paddingLeft: '0px'
        }}>
            <Carousel
                swipeable={true}
                draggable={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                responsive={responsive}
                centerMode={true}
            >
                {
                    quotes.map((quote) => {
                        return (
                            <div className="textInner testimonial-card"
                                style={{ padding: '10px', minWidth: '300px' }}
                            >
                                <div className="testemonial-card-inner"
                                    style={{ padding: '0px 30px' }}
                                >
                                    <div style={{ color: 'white' }} className="textHeader">
                                        {quote.text}
                                    </div>
                                    <div className="textPara">{quote.author}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default LandingCarousel