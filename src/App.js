import React, { Component } from 'react';
import Comments from './Comments';
import NewComment from './NewComment';
import Login from './Login'
import User from './User'
import SignUp from './SignUp'
import 'bootstrap-css-only'


class App extends Component {

  state = {
      comments: {},
      isLoading : false,
      isAuth: false,
      isAuthError: false,
      authError: '',
      user:{},
      userScreen: 'login', //signup,
      signUpError: '',
      isSignUpError: false
    }
  
login = async(email, passwd) => {
    const { auth } = this.props
    try{
      const user = await auth.signInWithEmailAndPassword(email, passwd)
      console.log(email, passwd, user)
      this.setState({
        authError: '',
        isAuthError: false
      })
    }catch(err){
      this.setState({
        authError: err.code,
        isAuthError: true
      })
    }
  }
  createAccount = async(email, passwd) => {
    const { auth } = this.props
    try{
      const user = await auth.createUserWithEmailAndPassword(email, passwd)
      console.log(email, passwd, user)
      this.setState({
        signUpError: '',
        isSignUpError: false
      })
    }catch(err){
      this.setState({
        signUpError: err.code,
        isSignUpError: true
      })
    }
  }
  sendComment = comment => {
    const {database} = this.props
    const id = database.ref().child('comments').push().key;
    const comments = {}
    comments['comments/' + id] = {
      comment,
      email: this.state.user.email, 
      userId: this.state.user.uid
    }
    database.ref().update(comments);
  }

componentDidMount(){
  const {database, auth} = this.props
  this.setState({isLoading : true});
  this.comments = database.ref('comments');
  this.comments.on('value', snapshot => {
   this.setState({
      comments: snapshot.val(),
      isLoading: false
    })
  })
  auth.onAuthStateChanged(user => {
    if(user){
      this.setState({
        isAuth: true,
        user
      })
    }else{
      this.setState({
        isAuth: false,
        user: {}
      })
    }
  })
}

logout = () => {
  const { auth} = this.props
  auth.signOut()
}
changeScreen  = (screen) => {
  this.setState({
    userScreen : screen
  })
  
}
  render() {
    return (
      <div className='container mt-1'>
      {this.state.isAuth && <User email={this.state.user.email} logout={this.logout}/>}
     
      {  !this.state.isAuth 
         && this.state.userScreen === 'login' &&
         <Login login={this.login} isAuthError={this.state.isAuthError} authError={this.state.authError} changeScreen={this.changeScreen}/>
       }
       
       {  !this.state.isAuth 
         && this.state.userScreen === 'signup' &&
         <SignUp createAccount={this.createAccount} isSignUpError={this.state.isSignUpError} signUpError={this.state.signUpError} changeScreen={this.changeScreen}/>
       }
      
      
      { this.state.isAuth &&  <NewComment sendComment={this.sendComment} handleChange = {this.handleChange} n = {this.state.newComment} /> }
        
        <Comments comments ={this.state.comments} />
        {
          this.state.isLoading && <p> Carregando... </p>
        }
      </div>
    );
  }
}

export default App;
