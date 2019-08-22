import React, { Component } from 'react';
import './style.less'
import logo from "../../assets/logo.svg"

class SigninForm extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }
    render() { 
        return (
            <div className="card">
                <div className="content">
                    <img src={logo} alt="logo" height="200" width="200"/>
                </div>
            </div>
        );
    }
}
 
export default SigninForm;