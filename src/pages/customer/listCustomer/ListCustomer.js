import React, {useEffect} from 'react'
import {findAllCustomerAction} from '../../../actions/customerAction'
import {connect} from "react-redux"
import Containers from "../../../components/Containers/Container";
import SignIn from "../../login/SignIn";
import RowCustomer from "./RowCustomer";
import Header from "../../../components/dashboard/Header";
import Menu from "../../../components/dashboard/Menu";
import Footer from "../../../components/dashboard/Footer";

function CustomerList({
                          error,
                          isLoading,
                          customers,
                          findAllCustomerAction
                      }) {

    const onReload = () => {
        findAllCustomerAction();
    };

    useEffect(onReload, [findAllCustomerAction])

    return (

        <div>
            {
                // localStorage.getItem("roles") == "MASTER" ?
                //     <>
                        <Containers error={error}>
                            <Header/>
                            <Menu/>
                            <div className="content-wrapper">
                                <div className="content-header">
                                    <div className="container-fluid">
                                        <div className="row mb-2">
                                            <div className="col-sm-6">
                                                <h1 className="m-0 text-dark">List Customer</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-lg-12">

                                                <div className="card">
                                                    <div className="card-header border-0">
                                                        {/*<h3 className="card-title">List Customer</h3>*/}
                                                        <div className="card-tools">
                                                            {/*<a href="#" className="btn btn-tool btn-sm">*/}
                                                            {/*    <i className="fas fa-download"/>*/}
                                                            {/*</a>*/}
                                                            <a href="/customer/form" className="btn btn-tool btn-sm">
                                                                <i className="fas fa-plus-circle"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="card-body table-responsive p-0">
                                                        <table className="table table-striped table-valign-middle">
                                                            <thead>
                                                            <tr>
                                                                <th>Number</th>
                                                                <th>Full Name</th>
                                                                <th>ID Card</th>
                                                                <th>Email</th>
                                                                <th>Employee Type</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                !isLoading ?
                                                                    customers?.list?.map((e, i) => {

                                                                        return (
                                                                            <RowCustomer key={i} data={e}
                                                                                         number={(customers.page * customers.size) + 1 + i}/>
                                                                        )
                                                                    })
                                                                    :
                                                                    <tr>
                                                                        <td colSpan="3"> Loading..</td>
                                                                    </tr>
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<Footer/>*/}
                        </Containers>
                    // </>
                    // :
                    // <div>
                    //     <SignIn/>
                    // </div>
            }
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        error: state.findAllCustomerReducer.error,
        customers: state.findAllCustomerReducer.data || [],
        isLoading: state.findAllCustomerReducer.isLoading
    }
}

const mapDispatchToProps = {
    findAllCustomerAction
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)
