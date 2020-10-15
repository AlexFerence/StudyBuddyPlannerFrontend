import React from 'react'
import Carousel from "react-multi-carousel";
import InstagramEmbed from 'react-instagram-embed';
const LandingCarousel = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const instagramLinks = ['https://www.instagram.com/p/CGVziyGnP_W/', 'https://www.instagram.com/p/CGLpaOxHOq8/',
        'https://www.instagram.com/p/CGIy4g8AJR6/', 'https://www.instagram.com/p/CGGUaXDAYii/',
        'https://www.instagram.com/p/CGAsIGXAqtf/', 'https://www.instagram.com/p/CGArw4TAHQI/']

    return (
        <div style={{
            minHeight: '200px', minWidth: '500px'
        }}>
            <Carousel
                swipeable={true}
                draggable={true}
                infinite={true}
                responsive={responsive}
            >
                {instagramLinks.map((link) => {
                    return (
                        <div>
                            <InstagramEmbed
                                key={link}
                                url={link}
                                maxWidth={450}
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