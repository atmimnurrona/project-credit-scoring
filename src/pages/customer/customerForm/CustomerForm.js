import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {findCustomerByIdAction, saveCustomerAction} from "../../../actions/customerAction"
import { Redirect} from "react-router-dom"
import {connect} from "react-redux"
import { Button, Form, FormGroup, Input, Label, Col} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faSave} from "@fortawesome/free-solid-svg-icons";
import Container from "../../../components/Containers/Container";
import DropdownList from "../../../components/DropdownList/DropdownList";
import SignIn from "../../login/SignIn";
import Header from "../../../components/dashboard/Header";
import Menu from "../../../components/dashboard/Menu";

const CustomerForm = ({error, isLoading, saveCustomer, saveCustomerAction, customer, findCustomerByIdAction}) => {
    const {id} = useParams()
    const [roles, setRoles] = useState(localStorage.getItem("roles"))
    const [redirect] = useState(false)
    const [photo, setPhoto] = useState({
        profilePhoto: {},
        idPhoto: {}
    })
    const [data, setData] = useState({
        name: "",
        email: "",
        idNumber: 0,
        address: "",
        employeeType: "",
        contractLength: "",
        contractStart: "",
        idPhoto: "",
        profilePhoto: ""
    })
    const history = useHistory()

    useEffect(() => {
        if (id !== data.id) {
            findCustomerByIdAction(id);
            setData(customer)
            console.log("ini useeffect", customer)
        }
    }, [customer])

    useEffect(() => {
        if (saveCustomer) {
            history.push('/customer')
        }
    }, [saveCustomer, history])

    const handlePhoto = async (e) => {
        let name = e.target.name
        let value = e.target.files[0]
        setPhoto({...photo, [name]: value})

        const formData = new FormData()
        formData.append("file", value)
        formData.append("upload_preset", "ve2u0qv8")

        const response = await fetch("https://api.cloudinary.com/v1_1/nielnaga/image/upload", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: formData // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(res => {
                console.log(res.url)
                setData({
                    ...data,
                    [name]: res.url
                })
            })
    }

    const uploadIdPhoto = async () => {
        const formData = new FormData()
        formData.append("file", photo.idPhoto)
        formData.append("upload_preset", "ve2u0qv8")

        const response = await fetch("https://api.cloudinary.com/v1_1/nielnaga/image/upload", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: formData // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(res => {
                console.log(res.url)
                setData({
                    ...data,
                    idPhoto: res.url
                })
            })
    }


    const uploadProfilePhoto = async () => {
        const formData = new FormData()
        formData.append("file", photo.profilePhoto)
        formData.append("upload_preset", "ve2u0qv8")

        const response = await fetch("https://api.cloudinary.com/v1_1/nielnaga/image/upload", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: formData // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(res => {
                console.log(res.url)
                setData({
                    ...data,
                    profilePhoto: res.url
                })
            })
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setData({...data, [name]: value})

    }

    const handleEmployee = (e) => {
        setData({...data, employeeType: e})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveCustomerAction(data)

    }

    if (redirect === true) {
        return <Redirect to="/customer"/>
    }

    return (
        <div>
            {
                // localStorage.getItem("roles") == "MASTER" ?
                //     <>
                        <div>
                            <Container error={error}/>
                            <Header/>
                            <Menu/>
                            <div className="content-wrapper">
                                <div className="content-header">
                                    <div className="container-fluid">
                                        <div className="row mb-2">
                                            <div className="col-sm-6">
                                                <h1 className="m-0 text-dark">Form Customer</h1>
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
                                                                            <Label htmlFor="name" sm={3} style={{textAlign:"left"}}>Customer's
                                                                                Name</Label>
                                                                            <Col sm={9}>
                                                                                <Input
                                                                                    required
                                                                                    onChange={handleChange}
                                                                                    value={data?.name || ''}
                                                                                    type="text"
                                                                                    name="name"
                                                                                    placeholder="input name"/>
                                                                            </Col>
                                                                        </FormGroup>
                                                                        <FormGroup row>
                                                                            <Label htmlFor="email" sm={3} style={{textAlign:"left"}}>Email</Label>
                                                                            <Col sm={9}>
                                                                                <Input
                                                                                    required
                                                                                    onChange={handleChange}
                                                                                    value={data?.email || ''}
                                                                                    type="email"
                                                                                    name="email"
                                                                                    placeholder="input email"/>
                                                                            </Col>
                                                                        </FormGroup>
                                                                        <FormGroup row>
                                                                            <Label htmlFor="idNumber" sm={3} style={{textAlign:"left"}}>ID
                                                                                Number</Label>
                                                                            <Col sm={9}>
                                                                                <Input
                                                                                    required
                                                                                    onChange={handleChange}
                                                                                    value={data?.idNumber || ''}
                                                                                    type="number" min="0"
                                                                                    name="idNumber"
                                                                                    placeholder="input ID number"/>
                                                                            </Col>
                                                                        </FormGroup>
                                                                        <FormGroup row>
                                                                            <Label htmlFor="exampleText"
                                                                                   sm={3} style={{textAlign:"left"}}>Address</Label>
                                                                            <Col sm={9}>
                                                                                <Input
                                                                                    required
                                                                                    onChange={handleChange}
                                                                                    value={data?.address || ''}
                                                                                    type="textarea"
                                                                                    name="address"
                                                                                    placeholder="address"/>
                                                                            </Col>
                                                                        </FormGroup>
                                                                        <FormGroup row>
                                                                            <Label htmlFor="select" sm={3} style={{textAlign:"left"}}>Type of
                                                                                customer</Label>
                                                                            <Col sm={9}>
                                                                                <DropdownList
                                                                                    data={[
                                                                                        {value: "NON", label: "NON"},
                                                                                        {
                                                                                            value: "REGULAR",
                                                                                            label: "REGULAR"
                                                                                        },
                                                                                        {
                                                                                            value: "CONTRACT",
                                                                                            label: "CONTRACT"
                                                                                        }
                                                                                    ]}
                                                                                    value={data?.employeeType}
                                                                                    placeholder="Select Employee Type"
                                                                                    handleDropdown={handleEmployee}
                                                                                />
                                                                            </Col>
                                                                        </FormGroup>

                                                                        {data.employeeType == "CONTRACT"
                                                                        &&

                                                                        <div>
                                                                            <FormGroup row>
                                                                                <Label for="contractStart" sm={3} style={{textAlign:"left"}}>Contract
                                                                                    Start</Label>
                                                                                <Col sm={9}>
                                                                                    <Input
                                                                                        onChange={handleChange}
                                                                                        value={data?.contractStart || ''}
                                                                                        type="date"
                                                                                        name="contractStart"
                                                                                        id="contractStart"
                                                                                        placeholder="contract start"/>
                                                                                </Col>
                                                                            </FormGroup>
                                                                            <FormGroup row>
                                                                                <Label for="contractLength" sm={3} style={{textAlign:"left"}}>Contract
                                                                                    Length</Label>
                                                                                <Col sm={9}>
                                                                                    <Input
                                                                                        onChange={handleChange}
                                                                                        value={data?.contractLength || ''}
                                                                                        type="number" min="0"
                                                                                        name="contractLength"
                                                                                        id="contractLength"
                                                                                        placeholder="contract length"/>
                                                                                </Col>
                                                                            </FormGroup>
                                                                        </div>
                                                                        }

                                                                        <FormGroup row>
                                                                            <Label for="idPhoto" sm={3} style={{textAlign:"left"}}>ID Card</Label>
                                                                            <Col sm={9}>
                                                                                <Input
                                                                                    required
                                                                                    type="file"
                                                                                    name="idPhoto"
                                                                                    onChange={handlePhoto}
                                                                                    accept="image/jpeg, image/png"/>
                                                                            </Col>
                                                                        </FormGroup>
                                                                        <FormGroup row>
                                                                            <Label for="profilePhoto" sm={3} style={{textAlign:"left"}}>Profile
                                                                                Photo</Label>
                                                                            <Col sm={9}>
                                                                                <Input
                                                                                    required
                                                                                    type="file"
                                                                                    name="profilePhoto"
                                                                                    onChange={handlePhoto}
                                                                                    accept="image/jpeg, image/png"/>
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
                                                                                    <FontAwesomeIcon
                                                                                        icon={faArrowLeft}/>
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
                    // </>
                    // :
                    // <div><SignIn/></div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        // call reducer
        error: state.findCustomerByIdReducer.error || state.saveCustomerReducer.error,
        customer: state.findCustomerByIdReducer.data,
        isLoading: state.findCustomerByIdReducer.isLoading,
        update: state.updateCustomerReducer,
        saveCustomer: state.saveCustomerReducer.data
    }
}

const mapDispatchToProps = {findCustomerByIdAction, saveCustomerAction}


export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)
