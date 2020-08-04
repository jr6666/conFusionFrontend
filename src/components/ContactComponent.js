import React,{Component} from 'react';

import {Link} from 'react-router-dom';

import {Container, Row, Col} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Label, Button} from 'reactstrap';
import {Form, Control, Errors, actions} from 'react-redux-form';

function Breadcrumbs(){
    return(
        <Breadcrumb>
            <BreadcrumbItem>
                <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
                Contact Us
            </BreadcrumbItem>
        </Breadcrumb>
    );
}

const required=val=>val&&val.length;
const maxLength=(len)=>(val)=>!val||val.length<=len;
const minLength=(len)=>(val)=>val&&val.length>=len;
const isNumber=val=>!isNaN(Number(val));
const validEmail=val=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component{

    handleSubmit(values){
        alert("Current state :"+JSON.stringify(values));
        this.props.resetFeedbackForm();
    }

    renderForm(){
        return(
            <Row className="row-content">
                <div className="col-12">
                <h3>Send us Your Feedback</h3>
                </div>

                <div className="col-12 col-md-9">
                    <Form model="feedback" 
                        onSubmit={(values)=>this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="firstname" md={2}>First Name</Label>
                            <Col md={10}>
                                <Control.text model=".firstname" 
                                    name="firstname" id="firstname"
                                    placeholder="First Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength:minLength(3),
                                        maxLength:maxLength(10)
                                    }}/>
                                <Errors className="text-danger"
                                    model=".firstname"
                                    show="touched"
                                    messages={{
                                        required:"Required ",
                                        minLength:"First Name should have a minimum of 3 characters ",
                                        maxLength:"First Name should have a maximum of 10 characters "
                                    }}/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <Control.text model=".lastname" 
                                    name="lastname" id="lastname"
                                    placeholder="Last Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        maxLength:maxLength(10),
                                        minLength:minLength(3)
                                    }}/>
                                <Errors className="text-danger"
                                    model=".lastname"
                                    show="touched"
                                    messages={{
                                        required:"Required ",
                                        minLength:"Last Name should have a minimum of 3 characters ",
                                        maxLength:"Last Name should have a maximum of 10 characters "
                                    }}/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                            <Col md={10}>
                                <Control.text model=".telnum" 
                                    name="telnum" id="telnum"
                                    placeholder="Tel. Number"
                                    className="form-control"
                                    validators={{
                                        required,
                                        isNumber
                                    }}/>
                                <Errors className="text-danger"
                                    model=".telnum"
                                    show="touched"
                                    messages={{
                                        required:"Required ",
                                        isNumber:"Telnum should be a number "
                                    }}/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={10}>
                                <Control.text model=".email"
                                    name="email" id="email"
                                    placeholder="Email"
                                    className="form-control"
                                    validators={{
                                        required,
                                        validEmail
                                    }}/>
                                <Errors 
                                    className="text-danger"
                                    model=".email"
                                    show="touched"
                                    messages={{
                                        required:"Required ",
                                        validEmail:"Email is invalid "
                                    }}/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col md={{size: 6, offset: 2}} >
                                <div className="form-check">
                                    <Label check>
                                        <Control.checkbox
                                            name="agree" model=".agree"
                                            className="form-check-input"/>
                                        {" "}<strong>May we contact you?</strong>
                                    </Label>
                                </div>
                            </Col>

                            <Col md={{size: 3, offset: 1}}>
                                <Control.select model=".contacttype" 
                                    name="contacttype"
                                    className="from-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                            <Col md={10}>
                                <Control.textarea
                                    model=".feedback" rows="12" 
                                    name="feedback" id="feedback"
                                    className="form-control"/>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Send Feedback
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Row>
        );
    }
    render(){
        return (
            <Container>
                <Row>
                    <Breadcrumbs />
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr/>
                    </div>
                </Row>
                <Row className="row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </Row>
                <>
                    {this.renderForm()}
                </>
            </Container>
        );
    }
}

export default Contact;