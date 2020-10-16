import React from 'react'
import Carousel from "react-multi-carousel";
import InstagramEmbed from 'react-instagram-embed';
const LandingCarousel = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 2500 },
            items: 5
        },
        largeDesktop: {
            breakpoint: { max: 2500, min: 1600 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1600, min: 1200 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1200, min: 800 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 800, min: 0 },
            items: 1
        }
    };

    const instagramLinks = ['"It\'s like Strava but for studying "',
        '" It apeases the part of the brain that craves checking things off "',
        '" I use it every single time I study "',
        ' " Does it even count if the time isn\'t logged on StudyBuddy? "']

    return (
        <div style={{
            minHeight: '200px', minWidth: '500px',
            paddingLeft: '0px'
        }}>
            <Carousel
                swipeable={true}
                draggable={true}
                infinite={true}
                responsive={responsive}
                centerMode={true}
            >
                {
                    instagramLinks.map((link) => {
                        return (
                            <div className="textInner testimonial-card"
                                style={{ padding: '10px', minWidth: '300px' }}
                            >
                                <div className="testemonial-card-inner"
                                    style={{ padding: '0px 30px' }}
                                >
                                    <div style={{ color: 'white' }} className="textHeader">
                                        {link}
                                    </div>
                                    <div className="textPara">- StudyBuddy User</div>
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