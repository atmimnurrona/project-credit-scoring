import React from "react";
import TransactionList from "../pages/transaction/transactionList";
import CustomerForm from "../pages/customer/customerForm";
import SignIn from "../pages/login/SignIn";
import HomeMaster from "../pages/home/HomeMaster";
import SignUp from "../pages/login/SignUp";
import TransactionForm from "../pages/transaction/transactionForm";
import Dashboard from "../components/dashboard";
import ListCustomer from "../pages/customer/listCustomer";
import DetailCustomer from "../pages/customer/DetailCustomer";
import CustomerDetail from "../pages/customer/DetailCustomer";
import AccountList from "../pages/login/AccountList";
import TransactionDetail from "../pages/transaction/TransactionDetail";
import ReportList from "../pages/report/ReportList";
import ReportDetail from "../pages/report/ReportDetail";
import ReasonUse from "../pages/reasonUse/ReasonUse";

const routes = [
    {
        path: '/',
        component: <SignIn />,
        exact: true
    },
    {
        path: '/users',
        component: <AccountList/>,
        exact: true
    },
    {
        path: '/users/:id',
        component: <SignUp/>,
        exact: true
    },
    {
        path: '/reason',
        component: <ReasonUse/>,
        exact: true
    },
    {
        path: '/dashboard',
        component: <Dashboard />,
        exact: true
    },
    {
        path: '/customer',
        component: <ListCustomer />,
        exact: true
    },
    {
        path: '/master/home',
        component: <Dashboard />,
        exact: true
    },
    {
        path: '/register',
        component: <SignUp />,
        exact: true
    },
    {
        path: '/customer/form',
        component: <CustomerForm />,
        exact: true
    },
    {
        path: '/customer/:id/edit',
        component: <CustomerForm />,
        exact: true
    },
    {
        path: '/transaction',
        component: <TransactionList />,
        exact: true
    },
    {
        path: '/transaction/form/:id',
        component: <TransactionForm />,
        exact: true
    },
    {
        path: '/customer/:id/detail',
        component: <CustomerDetail />,
        exact: true
    },
    {
        path: '/transaction/:id',
        component: <TransactionDetail />,
        exact: true
    },
    {
        path: '/report',
        component: <ReportList/>,
        exact: true
    }
    // {
    //     path: '/report/id',
    //     component: <ReportDetail/>,
    //     exact: true
    // }

];

export default routes
