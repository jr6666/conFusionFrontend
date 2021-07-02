import React from 'react';
import {Container, Row} from 'reactstrap';
import {Card,CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
function RenderCard({item,isLoading, errMess}){
    if(isLoading)
        return(
            <Loading />
        );
    if(errMess)
            return(
                <h4>{errMess}</h4>
            );
    return(
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? 
                <CardSubtitle>{item.designation}</CardSubtitle>:
                null
                }
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props){
    return(
        <Container>
            <Row className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                        isLoading={props.dishesIsLoading}
                        errMess={props.dishesErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                        isLoading={props.promotionIsLoading}
                        errMess={props.promotionErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} 
                        isLoading={props.leaderIsLoading}
                        errMess={props.leaderErrMess}/>                        
                </div>
                
            </Row>
        </Container>
    );
}

export default Home;
