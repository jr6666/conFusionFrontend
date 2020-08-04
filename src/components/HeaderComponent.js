import React, { Component } from 'react';

import {NavLink} from 'react-router-dom';

import {Container, Col} from 'reactstrap';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import {Jumbotron} from 'reactstrap';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Label, Input, Button} from 'reactstrap';
import {Form, FormGroup} from 'reactstrap';



class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      isNavOpen:false,
      isModalOpen: false
    }
    this.toggleNav=this.toggleNav.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  toggleNav(){
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  handleLogin(event){
    this.toggleModal();

    alert("UserName :"+this.username.value+
      " Password:"+this.password.value+
      "Remember:"+this.remember.checked);
  }

  loginModal(){
    return (
      <Modal isOpen={this.state.isModalOpen}
        toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>
          Login
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleLogin}>
            <FormGroup row>
              <Label htmlFor="username" md={2}>User Name</Label>
              <Col md={10}>
                <Input type="text"
                  name="username" id="username"
                  innerRef={(input)=>{this.username=input}} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="password" md={2}>Password</Label>
              <Col md={10}>
                <Input type="password"
                  name="password" id="password"
                  innerRef={(input)=>{this.password=input}} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{size: 6, offset: 2}} >
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="agree"
                      innerRef={(input)=>this.remember=input}/>
                      {" "}<strong>Remember Me</strong>
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={2}>
                <Button type="submit" value="submit" color="primary">
                  Login
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }

  renderNavbar(){
    return(
      <Navbar dark color="primary" expand="md">
        <Container>

          <NavbarToggler onClick={this.toggleNav} />

          <NavbarBrand className="mr-auto" href="/">
            <img src="assets/images/logo.png"
                height="30" width="41" 
                alt="Ristorante Con Fusion" />
          </NavbarBrand>

          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar>

              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <i className="fa fa-home"> Home</i>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/menu">
                  <i className="fa fa-list"> Menu</i>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/aboutus">
                  <i className="fa fa-address-card"> About Us</i>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/contact">
                  <i className="fa fa-phone"> Contact Us</i>
                </NavLink>
              </NavItem>

            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline onClick={this.toggleModal}>
                  <i className="fa fa-sign-in"> Login</i>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>

        </Container>
      </Navbar>
    );
  }
  renderJumbotron(){
    return(
      <Jumbotron>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Ristorante con Fusion</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                   </div>
               </div>
           </div>
       </Jumbotron>
    );
  }
  render() {
    return(
    <>
      {this.renderNavbar()}
      {this.renderJumbotron()}
      <Container>
      {this.loginModal()}
      </Container>
    </>
    );
  }
}

export default Header;