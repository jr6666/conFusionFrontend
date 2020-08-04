import React, {Component} from 'react';

import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchComments, fetchPromotions, fetchLeaders} from '../redux/ActionCreator';
import {actions} from 'react-redux-form';

import {Switch, Route, Redirect} from 'react-router-dom';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Aboutus from './AboutusComponent';
import Contact from './ContactComponent';

const mapStateToProps=state=>{
    return{
        dishesReducer: state.dishes,
        commentsReducer: state.comments,
        leadersReducer: state.leaders,
        promotionsReducer: state.promotions
    }
}

const mapDispatchToProps=dispatch=>({
    postComment:(dishId, rating, author, comment)=>
        dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes:()=>{
            dispatch(fetchDishes())
        },
    fetchComments:()=>{
        dispatch(fetchComments())
    },
    fetchPromotions:()=>{
        dispatch(fetchPromotions())
    },
    fetchLeaders:()=>{
        dispatch(fetchLeaders())
    },
    resetFeedbackForm: ()=>{
        dispatch(actions.reset("feedback"))
    }
});

class Main extends Component{
    constructor(props){
        super(props);

        this.dishWithId=this.dishWithId.bind(this);
    }

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchLeaders();
    }

    dishWithId({match}){
        return(
            <DishDetail 
                dish={this.props.dishesReducer.dishes.filter(
                    (dish)=> dish.id === (parseInt(match.params.id,10))
                )[0]} 
                dishIsLoading={this.props.dishesReducer.isLoading}
                dishErrMess={this.props.dishesReducer.errMess}

                comments={this.props.commentsReducer.comments.filter(
                    (comment)=> comment.dishId=== (parseInt(match.params.id,10))
                )}
                commentsErrMess={this.props.commentsReducer.isLoading}

                addComment={this.props.postComment}/> 
        );
    }
    
    render(){
        console.log(JSON.stringify(this.props.dishesReducer.dishes.filter((dish)=>dish.featured)[0]));
        return (
            <>
                <Header />
                <Switch>
                    <Route path="/home" component={()=><Home dish={this.props.dishesReducer.dishes.filter((dish)=>dish.featured)[0]}
                                                            dishesIsLoading={this.props.dishesReducer.isLoading}
                                                            dishesErrMess={this.props.dishesReducer.errMess}

                                                            leader={this.props.leadersReducer.leaders.filter((leader)=>leader.featured)[0]}
                                                            leaderIsLoading={this.props.leadersReducer.isLoading}
                                                            leaderErrMess={this.props.leadersReducer.errMess}

                                                            promotion={this.props.promotionsReducer.promotions.filter((promotion)=>promotion.featured)[0]}
                                                            promotionIsLoading={this.props.promotionsReducer.isLoading}
                                                            promotionErrMess={this.props.promotionsReducer.errMess}
                                                            />
                                        }/>
                    <Route exact path="/menu" component={ ()=><Menu dishes={this.props.dishesReducer.dishes} 
                                                                isLoading={this.props.dishesReducer.isLoading}
                                                                errMess={this.props.dishesReducer.errMess}/> }/>

                    <Route path="/menu/:id" component={this.dishWithId} />

                    <Route path="/aboutus" component={()=><Aboutus leaders={this.props.leadersReducer.leaders}/>} />
                    
                    <Route path="/contact" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
                    
                    <Redirect to="/home"/>
                </Switch>
                <Footer />
            </>
            
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));