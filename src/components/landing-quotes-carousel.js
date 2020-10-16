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
            breakpoint: { max: 1250, min: 900 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 900, min: 0 },
            items: 1
        }
    };

    const quotes = [
        {
            text: '"It\'s like Strava but for studying "',
            author: ' - Alex Ference'
        },
        {
            text: ' " Does it even count if the time isn\'t logged on StudyBuddy? "',
            author: ' - Alex Ference'
        },
        {
            text: '" I use it every single time I study "',
            author: ' - Ari Kaufman'
        },
        {
            text: '" It apeases the part of the brain that craves checking things off "',
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
<<<<<<< Updated upstream
                    quotes.map((link) => {
=======
                    quotes.map((quote) => {
>>>>>>> Stashed changes
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