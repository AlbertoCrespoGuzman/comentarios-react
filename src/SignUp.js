import React from 'react'
import { Component} from 'react'


class SignUp extends Component{

	state = {
		email: '',
		passwd: ''
	}
	
	handleChange = field => event => {
    	this.setState  ({
      	[field]: event.target.value
    	})
  	}
  	createAccount = () => {
  		this.props.createAccount(this.state.email, this.state.passwd)
  	}
	render(){
		const errorMessages = {
			'auth/email-already-in-use' : 'email ja foi utilizado',
			'auth/weak-password' : 'senha fraca',
			'auth/invalid-email' : 'email invalido'

		}
		return (
			<div>
				<h4> Criar conta </h4>
				<form className='form-inline'>
				<input type='text' className='form-control' onChange={this.handleChange('email')} placeholder='email'/>
				<input type='password' className='form-control' onChange={this.handleChange('passwd')} placeholder='pasword'/>
				<button type='button' className='btn btn-primary rm-1' onClick={this.createAccount} > Criar Conta </button>
				{
					this.props.isSignUpError &&
					<div className='card text-white bg-danger mt-3'>
						<div className='card-header'>
								Erro ao criar conta
						</div>
						<div className='card-body'>
							{errorMessages[this.props.signUpError]}
						</div>
					</div>
				}
				<button className='btn' onClick={() => this.props.changeScreen('login')}>Ja tenho uma conta, entrar </button>
				</form>
			</div>
		)
	}
}
export default SignUp