import React from 'react';
import { CCarousel, CCarouselItem, CCarouselCaption } from '@coreui/react';
import Feliz from '../Salud/Feliz.png';
import Regular from '../Salud/Regular.png';
import medio from '../Salud/Medio.png';
import Muerta from '../Salud/Muerta.png';

function MacetaCard() {
    return (
        
            <CCarousel>
                <CCarouselItem>
                    <img className="d-block w-100" src={Feliz} alt="Slide 1" />
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <img className="d-block w-100" src={Regular} alt="Slide 2" />
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <img className="d-block w-100" src={medio} alt="Slide 3" />
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <img className="d-block w-100" src={Muerta} alt="Slide 4" />
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </CCarouselCaption>
                </CCarouselItem>
            </CCarousel>
        
    );
}

export default MacetaCard;
