import React, { Component } from 'react';
import { Input } from 'antd';


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
                    <img src={logo} alt="logo" height="115" width="115"/>
                    <h1>Sign in to ACM UC San Diego</h1>
                    <form>
                        <label>Email (user@ucsd.edu)</label>
                        <Input />
                    </form>
                </div>
            </div>
        );
    }
}
 
export default SigninForm;