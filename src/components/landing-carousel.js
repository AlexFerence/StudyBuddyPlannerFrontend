import React from 'react'
import Carousel from "react-multi-carousel";
import InstagramEmbed from 'react-instagram-embed';
const LandingCarousel = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4100, min: 3700 },
            items: 5
        },
        largeDesktop: {
            breakpoint: { max: 3700, min: 3500 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3500, min: 2500 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 2500, min: 1000 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 1000, min: 0 },
            items: 1
        }
    };

    const instagramLinks = ['https://www.instagram.com/p/CGVziyGnP_W/', 'https://www.instagram.com/p/CGLpaOxHOq8/',
        'https://www.instagram.com/p/CGIy4g8AJR6/', 'https://www.instagram.com/p/CGGUaXDAYii/',
        'https://www.instagram.com/p/CGAsIGXAqtf/', 'https://www.instagram.com/p/CGArw4TAHQI/']
    return (
        <div style={{
            minHeight: '200px', minWidth: '500px',
            margin: '15px'
        }}>
            <Carousel
                swipeable={true}
                draggable={true}
                infinite={true}
                responsive={responsive}
                centerMode={true}

            >
                {instagramLinks.map((link) => {
                    return (
                        <div style={{ padding: '5px', margin: '5px' }}>
                            <InstagramEmbed
                                key={link}
                                url={link}
                                maxWidth={350}
                                hideCaption={true}
                                containerTagName='div'
                                protocol=''
                                injectScript
                                onLoading={() => { }}
                                onSuccess={() => { }}
                                onAfterRender={() => { }}
                                onFailure={() => { }}
                            />
                        </div>
                    )
                })
                }
            </Carousel>
        </div>
    )
}

export default LandingCarousel