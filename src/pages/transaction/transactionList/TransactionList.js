import {Button, Container, Table} from "reactstrap";
import Containers from '../../../components/Containers/Container'
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {findAllTransactionAction} from "../../../actions/transactionAction";
import TransactionRow from "./TransactionRow";
import Header from "../../../components/dashboard/Header";
import Menu from "../../../components/dashboard/Menu";
import SignIn from "../../login/SignIn";
import Footer from "../../../components/dashboard/Footer";

function TransactionList({
                             isLoading,
                             transactions,
                             error,
                             findAllTransactionAction
                         }) {

    const onReload = () => {
        findAllTransactionAction();
    };

    useEffect(onReload, [findAllTransactionAction])

    return (
        <div>
            {
                localStorage.getItem("roles") == "MASTER" ?
                    <>
                        <Containers error={error}>
                            <Header/>
                            <Menu/>
                            <div className="content-wrapper">
                                <div className="content-header">
                                    <div className="container-fluid">
                                        <div className="row mb-2">
                                            <div className="col-sm-6">
                                                <h1 className="m-0 text-dark">List Transaction</h1>
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
                                                                <i className="fas fa-user-plus"/>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="card-body table-responsive p-0">
                                                        <table className="table table-striped table-valign-middle">
                                                            <thead style={{textAlign: "left"}}>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Submitter</th>
                                                                <th>Name</th>
                                                                <th>Employee Type</th>
                                                                <th>Loan</th>
                                                                <th>Tenor</th>
                                                                <th>Interest Rate</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody style={{textAlign: "left"}}>
                                                            {
                                                                !isLoading ?
                                                                    transactions?.list?.map((e, i) => {
                                                                        return (
                                                                            <TransactionRow key={i} data={e}
                                                                                            number={(transactions.page * transactions.size) + 1 + i}/>
                                                                        )
                                                                    }) :
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
                    </>
                    :
                    <div>
                        <SignIn/>
                    </div>
            }
        </div>

    )
};

const mapStateToProps = (state) => {
    return {
        error: state.finAllTransactionReducer.error,
        transactions: state.finAllTransactionReducer.data || [],
        isLoading: state.finAllTransactionReducer.isLoading
    }
}

const mapDispatchToProps = {
    findAllTransactionAction
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);