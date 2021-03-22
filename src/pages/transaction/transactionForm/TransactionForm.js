import {InputGroupText, InputGroup, FormGroup, Form, Input, Label, Button, Col} from "reactstrap";
import Container from "../../../components/Containers/Container";
import {Redirect, useHistory, useParams} from 'react-router-dom'
import {saveTransactionAction} from "../../../actions/transactionAction";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import {findCustomerByIdAction} from "../../../actions/customerAction";
import DropdownList from "../../../components/DropdownList/DropdownList";
import Header from "../../../components/dashboard/Header";
import Menu from "../../../components/dashboard/Menu";
import NumberFormat from 'react-number-format';

const TransactionForm = ({savedTransaction, isLoading, error, saveTransactionAction, customer, findCustomerByIdAction}) => {
    const {id} = useParams()
    const [redirect] = useState(false)
    const [data, setData] = useState({
        customer: ""
    })
    const history = useHistory()

    const handleCustomer = () => {
        setData({
            ...data,
            customer: customer.id
        })
    }

    const handleNeed = (e) => {
        setData({...data, needType: e})
    }

    useEffect(() => {
        if (id !== data.customer) {
            findCustomerByIdAction(id);
            setData({
                ...data,
                customer: id
            })
        }
    }, [])

    useEffect(() => {
        console.log(`CUSTOMER `, customer, `DATA `, data)
    }, [data])

    useEffect(() => {
        if (savedTransaction) {
            history.push('/transaction')
        }
    }, [savedTransaction, history])

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setData({...data, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setData({...data, income:data.income.split(",").join("")})
        saveTransactionAction(data)
        // console.log(data)
    }
    if (redirect === true) {
        return <Redirect to='/transaction'/>
    }

    return (
        <div>
            <Container error={error}/>
            <Header/>
            <Menu/>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Form Transaction</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body table-responsive p-0">
                                        <div className="col-md-12">
                                            <div className="form form-container">
                                                {!isLoading ?
                                                    <Form onSubmit={handleSubmit}>
                                                        <FormGroup row>
                                                            <Label for="notes" sm={2}
                                                                   style={{textAlign: "left"}}>Note</Label>
                                                            <Col sm={10}>
                                                                <Input
                                                                    required
                                                                    onChange={handleChange}
                                                                    value={data?.notes || ''}
                                                                    type="text"
                                                                    name="notes"
                                                                    id="notes"
                                                                    placeholder="input note"/>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="income" sm={2}
                                                                   style={{textAlign: "left"}}>Income</Label>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroupText>Rp</InputGroupText>
                                                                    {/*<Input >*/}
                                                                    <NumberFormat
                                                                        required
                                                                        name="income"
                                                                        id="tanpa-rupiah"
                                                                        onChange={handleChange}
                                                                        value={data?.income || ''}
                                                                        placeholder="income"
                                                                        thousandSeparator={true}/>
                                                                    {/*</Input>*/}
                                                                    <InputGroupText>.00</InputGroupText>
                                                                </InputGroup>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="outcome" sm={2}
                                                                   style={{textAlign: "left"}}>Outcome</Label>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroupText>Rp</InputGroupText>
                                                                    <Input required
                                                                           name="outcome"
                                                                           onChange={handleChange}
                                                                           value={data?.outcome || ''}
                                                                           placeholder="outcome"
                                                                           type="number" min="0"/>
                                                                    <InputGroupText>.00</InputGroupText>
                                                                </InputGroup>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="loan" sm={2}
                                                                   style={{textAlign: "left"}}>Loan</Label>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <InputGroupText>Rp</InputGroupText>
                                                                    <Input required
                                                                           onChange={handleChange}
                                                                           value={data?.loan || ''}
                                                                           placeholder="loan"
                                                                           type="number" min="0"
                                                                           name="loan"/>
                                                                    <InputGroupText>.00</InputGroupText>
                                                                </InputGroup>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label htmlFor="tenor" sm={2}
                                                                   style={{textAlign: "left"}}>Tenor</Label>
                                                            <Col sm={10}>
                                                                <Input required
                                                                       onChange={handleChange}
                                                                       type="number" min="0"
                                                                       value={data?.tenor || ''}
                                                                       name="tenor"
                                                                       placeholder="tenor"/>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="interestRate" sm={2}
                                                                   style={{textAlign: "left"}}>Interest Rate</Label>
                                                            <Col sm={10}>
                                                                <InputGroup>
                                                                    <Input
                                                                        required
                                                                        onChange={handleChange}
                                                                        name="interestRate"
                                                                        value={data?.interestRate || ''}
                                                                        placeholder="interest rate" min={0} max={100}
                                                                        type="number" min="0" step="1"/>
                                                                    <InputGroupText>%</InputGroupText>
                                                                </InputGroup>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="select" sm={2} style={{textAlign: "left"}}>Need
                                                                Type</Label>
                                                            <Col sm={10}>
                                                                <DropdownList
                                                                    data={[
                                                                        {value: "CAPITAL", label: "CAPITAL"},
                                                                        {value: "CONSUMPTIVE", label: "CONSUMPTIVE"},
                                                                        {value: "INVESTMENT", label: "INVESTMENT"}
                                                                    ]}
                                                                    value={data?.needType}
                                                                    placeholder="Select Need Type"
                                                                    handleDropdown={handleNeed}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup check row>
                                                            <Col sm={{size: 10, offset: 2}}>
                                                                <Button style={{background: "#e42256"}}>
                                                                    <FontAwesomeIcon icon={faSave}/>
                                                                    Submit
                                                                </Button> {' '}
                                                                <Button href="/customer"
                                                                        style={{background: "#e42256"}}>
                                                                    <FontAwesomeIcon icon={faArrowLeft}/>
                                                                    Cancel
                                                                </Button>
                                                            </Col>
                                                        </FormGroup>
                                                    </Form> :
                                                    <div>Loading...</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customer: state.findCustomerByIdReducer.data,
        savedTransaction: state.saveTransactionReducer.data,
        isLoading: state.saveTransactionReducer.isLoading,
        error: state.saveTransactionReducer.error
    }
}

const mapDispatchToProps = {findCustomerByIdAction, saveTransactionAction}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm)