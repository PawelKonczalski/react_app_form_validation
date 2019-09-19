import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        username: '',
        email: '',
        pass: '',
        accept: false,
        message: '',

        errors: {
            username: false,
            email: false,
            pass: false,
            accept: false,
        }
    };

    messages = {
        username_incorrect: 'Name must be longer than 10 characters and do not contain spaces',
        email_incorrect: 'None @ in email',
        pass_incorrect: 'Password must be 8 characters',
        accept_incorrect: 'No consent was given'
    };

    handleChange = e => {
        const name = e.target.name;
        const type = e.target.type;

        if (type === 'text' || type === 'password' || type === 'email') {
            const value = e.target.value;
            this.setState({
                [name]: value,
            })
        } else if (type === 'checkbox') {
            const checked = e.target.checked;
            this.setState({
                [name]: checked,
            })
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        const validation = this.formValidation();

        if (validation.correct) {
            this.setState({
                username: '',
                email: '',
                pass: '',
                accept: false,
                message: 'Form sended',

                errors: {
                    username: false,
                    email: false,
                    pass: false,
                    accept: false,
                }
            })
        } else {
            this.setState({
                errors: {
                    username: !validation.username,
                    email: !validation.email,
                    pass: !validation.pass,
                    accept: !validation.accept,
                }
            })
        }
    };

    formValidation = () => {
        let username = false;
        let email = false;
        let pass = false;
        let accept = false;
        let correct = false;

        if (this.state.username.length > 10 &&
            this.state.username.indexOf(' ') === -1) {
            username = true;
        }

        if (this.state.email.indexOf('@') !== -1) {
            email = true;
        }

        if (this.state.pass.length === 8) {
            pass = true;
        }

        if (this.state.accept) {
            accept = true;
        }

        if (username && email && pass && accept) {
            correct = true;
        }

        return ({
            username,
            email,
            pass,
            accept,
            correct
        })
    };

    componentDidUpdate() {
        if(this.state.message !== ''){
            setTimeout(() => this.setState({
                message: ''
            }), 3000)
        }
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit} noValidate>
                    <label htmlFor='user'>Your name:
                        <input type='text' id='user' name='username'
                               value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    {this.state.errors.username && <span>{this.messages.username_incorrect}</span>}

                    <label htmlFor='email'>Your email:
                        <input type='email' id='email' name='email'
                               value={this.state.email} onChange={this.handleChange}/>
                    </label>
                    {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}

                    <label htmlFor='pass'>Your password:
                        <input type='password' id='password' name='pass'
                               value={this.state.pass} onChange={this.handleChange}/>
                    </label>
                    {this.state.errors.pass && <span>{this.messages.pass_incorrect}</span>}

                    <label htmlFor='accept'>
                        <input type='checkbox' id='accept' name='accept'
                               checked={this.state.accept}
                               onChange={this.handleChange}/>I accept the regulations and agree
                    </label>
                    {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}

                    <button>Submit</button>
                </form>
                {this.state.message && <h3>{this.state.message}</h3>}
            </div>
        );
    }
}

export default App;
