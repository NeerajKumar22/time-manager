import React from "react";

import axios from "axios";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            auth: false,
        }
    }

    componentDidMount() {
        if (localStorage["token"]) {
            axios.post(
                "/users/register",
                {
                    email: this.state.email,
                    password: this.state.password,
                }
            )
                .then(({ data }) => {
                    this.setState(
                        {
                            auth: true,
                        }
                    );
                })
        }
    }

    handleChange = (
        {
            target: {
                name,
                value,
            }
        }
    ) => {
        this.setState(
            {
                [
                    name
                ]: value
            }
        )
    }

    handleSubmit = () => {
        axios.post(
            "/users/register",
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            }
        )
            .then(
                (
                    {
                        data
                    }
                ) => {
                    if (data.success) {
                        return this.props.history.push("/login")
                    } else {
                        return this.props.history.push("/register")
                    }
                }
            )
    }

    handleClick = () => {
        this.props.history.push("/");
    }

    render() {
        const {email, password} = this.state;
        return (
            <div>
                <div>
                    <button
                        onClick = {
                            this.handleClick
                        }
                    >
                        X
                    </button>
                </div>
                <input
                    type="text"
                    value={name}
                    placeholder="Enter your name"
                    name="name"
                    onChange={
                        this.handleChange
                    }
                />

                <input
                    type="text"
                    value={email}
                    placeholder="Enter your mail address"
                    name="email"
                    onChange={
                        this.handleChange
                    }
                />

                <input
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    name="password"
                    onChange={
                        this.handleChange
                    }
                />

                <div>
                    <button
                        onClick = {this.handleSubmit}
                    >
                        Register....
                    </button>
                </div>
            </div>
        )
    }
}

export default Register;