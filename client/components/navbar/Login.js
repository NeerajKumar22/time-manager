import React from "react";

import axios from "axios";

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            auth : false
        }
    }

    componentDidMount() {
        if(localStorage.getItem("token")){
            this.props.history.push("/home")
        }
    }

    handleChange = ({target : {name, value}}) => {
        this.setState({
            [name] : value
        })
    }

    handleSubmit = () => {
        axios.post("/users/login", {email : this.state.email, password : this.state.password})
        .then(({data}) => {
            if(data.success){
                setAuthToken(data.token);
                localStorage.setItem("token", data.token);

                this.props.history.push("/home")
            }
            else{
                setAuthToken();
            }
        })
    }

    handleClick = () => {
        this.props.history.push("/");
    }


    render(){
        return(
            <div>
                <div>
                    <button onClick = {this.handleClick}>
                        X
                    </button>
                </div>
                <div>
                    <input type = "text" value = {email} placeholder = "Enter your email" name = "email" onChange = {this.handleChange} />
                    <input type = "password" value = {password} placeholder = "Enter your password" name = "password" onChange = {this.handleChange} />
                    <div>
                        <button onClick = {this.handleSubmit}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
    
}

export default Login;