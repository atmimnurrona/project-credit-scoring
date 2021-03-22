import React, {useEffect, useState} from "react";
import {findByIdTransactionAction} from "../../actions/transactionAction";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom'
import Header from "../../components/dashboard/Header";
import Menu from "../../components/dashboard/Menu";


function TransactionDetail({ findByIdDispatch ,transaction, isLoading}) {

    const {id} = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        if(id && transaction) {

            setData({...transaction})
        }
        console.log("useeffect", data)
    }, [transaction])

    useEffect(() => {
        if (id) {
            findByIdDispatch(id)
        }
    }, [id, findByIdDispatch])

    return(
        <div>
            {
                localStorage.getItem("roles") == "MASTER" ?
                    <>
                    <div>
                        <Header/>
                        <Menu/>
                        <div className="content-wrapper">
                            <div className="content-header">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <div className="col-sm-6">
                                            <h1 className="m-0 text-dark">Detail Transaction</h1>
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
                                                    {/*<h3 className="card-title">Detail Customer</h3>*/}
                                                    <div className="card-tools">
                                                        <a href="/transaction/form" className="btn btn-tool btn-sm">
                                                            <i className="fas fa-pencil-alt" />
                                                        </a>
                                                        <a href="/transaction" className="btn btn-tool btn-sm">
                                                            <i className="fas fa-arrow-left" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="card-body table-responsive p-0">
                                                    <table className="table table-striped table-valign-middle">

                                                        <tbody>
                                                            <tr>
                                                                <td>Notes</td>
                                                                <td>{data.notes}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Income</td>
                                                                <td>{data.income}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Outcome</td>
                                                            <td>{data.outcome}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Loan</td>
                                                            <td>{data.loan}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Tenor</td>
                                                            <td>{data.tenor}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Interest Rate</td>
                                                            <td>{data.interestRate}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Main Loan</td>
                                                            <td>{data.mainLoan}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Interest</td>
                                                            <td>{data.interest}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Installment Total</td>
                                                            <td>{data.installmentTotal}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Installment</td>
                                                            <td>{data.installment}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Credit ratio</td>
                                                            <td>{data.creditRatio}</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Finance Criteria</td>
                                                            <td>{data.financeCriteria ?
                                                            "True" : "False"
                                                        }</td>
                                                            </tr>
                                                            <tr>
                                                            <td>Employee Criteria</td>
                                                            <td>{data.employeeCriteria ?
                                                            "True" : "False"
                                                        }</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                    :
                    <div> cannot access</div>
            }
        </div>

    )
}

const mapStateToProps = (state) => {
    return{
        isLoading: state.findTransactionByIdReducer.isLoading || state.saveTransactionReducer.loading,
        transaction: state.findTransactionByIdReducer.data || []
    }
}

const mapDispatchToProps = {
    findByIdDispatch: findByIdTransactionAction
}

export default connect(mapStateToProps, mapDispatchToProps) (TransactionDetail)