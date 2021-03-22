import Containers from '../../components/Containers/Container'
import React, {useEffect} from "react";
import {connect} from "react-redux";
import Header from "../../components/dashboard/Header";
import Menu from "../../components/dashboard/Menu";
import Footer from "../../components/dashboard/Footer";
import SignIn from "../login/SignIn";
import {findAllReportAction} from "../../actions/reportAction";
import ReportRow from "./ReportRow";
import ReportDetail from "./ReportDetail";

function ReportList({
    reports,
    error
                    }) {

    const onReload = () => {
        findAllReportAction();
    }

    useEffect(onReload, [findAllReportAction])

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
                                                <h1 className="m-0 text-dark">Report</h1>
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
                                                        <div className="card-tools">
                                                            <a href="#" className="btn btn-tool btn-sm">
                                                                <i className="fas fa-download"/>
                                                            </a>
                                                            <a href="#" className="btn btn-tool btn-sm">
                                                                <i className="fas fa-user-plus"/>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div className="card-body table-responsive p-0">
                                                        <table className="table table-striped table-valign-middle">
                                                            <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Name</th>
                                                                <th>Employee Type</th>
                                                                <th>Approved</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                <ReportRow/>
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <br/>
                                                    <br/>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ReportDetail/>
                            <Footer/>
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
        reports: state.findAllReportReducer.data,
        error: state.findAllReportReducer.error
    }
}

const mapDispatchToProps = {
    findAllReportAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);