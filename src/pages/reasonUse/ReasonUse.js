import React from "react";
import add_reason_use from "../../assets/images/add_reason_use.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Container, Button, Form} from "reactstrap";


const ReasonUse = () => {

    return(
        <div>
            <Container >

                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 pr-lg-5 mb-md-0">
                            <div>
                                <img src={add_reason_use} alt=""
                                     className="img-fluid d-none d-md-block"/>
                                <hr/>
                            </div>
                        </div>

                        <div className="col-md-7 col-lg-6 ml-auto">
                            <h1 style={{color: "#e42256", fontSize: "55px"}}>Reason Use</h1><br/>
                            <Form>
                                <div className="row">

                                    <div className="input-group col-lg-12 mb-4">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0">
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </span>
                                        </div>
                                        <input
                                            required
                                            id="reason"
                                            type="text"
                                            name="reason"
                                            placeholder="input the reason for use"
                                            className="form-control bg-white border-left-0 border-md"/>
                                    </div>

                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <Button
                                            style={{background: "#e42256"}}
                                            block>
                                        <span className="font-weight-bold"
                                              style={{color: "#ffff"}}>SUBMIT</span>
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>

    )

}

export default ReasonUse