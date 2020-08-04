import React from 'react';

import {Link} from 'react-router-dom';

import {Container, Row} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Card, CardTitle, CardImgOverlay, CardImg} from 'reactstrap';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

function BreadCrumbs(){
    return(
        <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>About Us</BreadcrumbItem>
        </Breadcrumb>
    );
}

function RenderDish({dish}){
    return(
        <div key={dish.id} className="col-12 col-md-5 mt-5">
            <Link to={`/menu/${dish.id}`}>
                <Card>
                    <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}/>
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </Link>
        </div>
    );
}

function Menu({dishes,isLoading, errMess}){
    if(isLoading)
        return(
            <Container>
                <Row>
                    <BreadCrumbs />
                </Row>
                <Row>
                    <Loading />
                </Row>
            </Container>
        );
    if(errMess)
        return(
            <Container>
                <Row>
                    <BreadCrumbs />
                </Row>
                <Row>
                    <h4>{errMess}</h4>
                </Row>
            </Container>
        );
    return(
        <Container>
            <Row>
                <BreadCrumbs />
            </Row>
            <Row>
                {dishes.map((dish)=><RenderDish dish={dish}/>)}
            </Row>
        </Container>
        );
}

export default Menu;