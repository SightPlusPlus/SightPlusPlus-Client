import React, {Component} from "react";
import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';

export default class VoiceConfig extends Component {

    constructor(props) {
        super(props);

        //binding
    }



    render() {
        return (
            <div className="ResetPassword">
                <div className="man-user-jumbotron">
                    <div className="reset-form-title">Reset Password</div>
                    <br/>
                    <div className="resetPsw-form">
                        <p className="man-field black arial-font">*Mandatory Fields</p>
                        <Form onSubmit={this.handleReset}>
                            <Form.Group as={Row}>
                                <Form.Label column sm="5"><p className=" smallline larger align-left arial-font">*Old Password</p></Form.Label>
                                <Col sm="7">
                                    <Form.Control type="password" id="oldPassword" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="5"><p className=" smallline larger align-left arial-font">*New Password</p></Form.Label>
                                <Col sm="7">
                                    <Form.Control type="password" id="newPassword" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="5"><p className=" smallline larger align-left arial-font">*Confirm Password</p></Form.Label>
                                <Col sm="7">
                                    <Form.Control type="password" id="confirmPassword" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                            <br/>
                            <Button variant = "info" type="submit" disabled={!(this.state.oldPassword && this.state.newPassword && this.state.confirmPassword)} block>
                                <div className="smallbtn arial-font">Submit</div>
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}