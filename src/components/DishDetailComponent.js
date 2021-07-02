import React,{Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {LocalForm, Control, Errors} from 'react-redux-form';
import {Label, Button} from 'reactstrap';
import {Card, CardImg, CardTitle, CardImgOverlay, CardBody} from 'reactstrap';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }

        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating,values.yourname,values.comment);
    }

    renderButton(){
        return(
                <Button
                    onClick={this.toggleModal}>
                    <i className="fa fa-pencil"> Submit Comment</i>
                </Button>
        );
    }

    renderForm(){
        const required=val=>val&&val.length;
        const maxLength=(len)=>(val)=>!val||val.length<=len;
        const minLength=(len)=>(val)=>val&&val.length>=len;
        return(
            <Modal isOpen={this.state.isModalOpen}
                toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    
                    <LocalForm  onSubmit={(values)=>this.handleSubmit(values)}>
                        <Row className="from-group">
                            <Label htmlFor="rating" md={2}>
                                Rating
                            </Label>
                            <Col md={12}>
                                <Control.select model=".rating"
                                    name="rating" id="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                            </Row>
                        <Row className="form-group">
                            <Label htmlFor="yourname" md={12}>
                                Your Name
                            </Label>
                            <Col md={12}>
                                <Control.text model=".yourname"
                                    name="yourname" id="yourname"
                                    className="form-control"
                                    placeholder="Your Name"
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(10)
                                    }} />
                                <Errors className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                        required:"Required ",
                                        minLength:"Name should atleast have 3 characters ",
                                        maxLength:"Name should have a max of 10 charaters "
                                    }} />
                            </Col>
                        </Row>
                        <Row className="from-group">
                            <Label md={2}
                                htmlFor="comment">
                                Comment
                            </Label>
                            <Col md={12}>
                                <Control.textarea model=".comment"
                                    name="comment" id="comment"
                                    className="form-control"
                                    rows="6"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Button type="submit"
                                    color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                    
                </ModalBody>
            </Modal>
        );
    }
    render(){
        return(
            <>
                {this.renderForm()}
                {this.renderButton()}
            </>
        );
    }
}

function RenderDish({dish}){
    return(
        <Card key={dish.id}>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
            <CardBody>{dish.description}</CardBody>
        </Card>
    );
}
function RenderComments({comments}){
    
    const commentList=comments.map((comment)=>{
        return(
            <li>
                <p>{comment.comment}</p>
                <p>
                    -- 
                    {comment.author}, 
                    {
                        new Intl.DateTimeFormat(
                            'en-US',
                            {year: 'numeric', month: 'short', day: '2-digit'})
                            .format(new Date(Date.parse(comment.date)))   }
                </p>
            </li>
        );
    });
    return(
        <ul>
            {commentList}
        </ul>
    );
}


function DishDetail({dish,dishIsLoading,dishErrMess,comments,commentsErrMess,addComment}){
    if(dishIsLoading){
        return(
            <Container>
                <Row>
                    <Loading />
                </Row>
            </Container>
        );
    }
    if(dishErrMess){
        return(
            <Container>
                <Row>
                    <h4>{dishErrMess}</h4>
                </Row>
            </Container>
        );
    }
    if(commentsErrMess){
        return(
            <Container>
                <Row>
                    <h4>{commentsErrMess}</h4>
                </Row>
            </Container>
        );
    }
    if(dish && comments){
        return (
            <Container>
                <Row>
                    <div className="col-12 col-md-5 mr-1 mt-5">
                        <RenderDish dish={dish}/>
                    </div>
                    <div className="col-12 col-md-5 mt-5">
                        <RenderComments comments={comments} />
                        <CommentForm addComment={addComment}
                            dishId={dish.id}/>
                    </div>
                </Row>
            </Container>
        );
    }
    else{
        return(
            <> </>
        );
    }
}

export default DishDetail;
