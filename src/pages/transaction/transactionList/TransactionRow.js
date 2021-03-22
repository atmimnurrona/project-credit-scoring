import React from 'react'
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faInfoCircle, faPencilAlt, faQuestionCircle, faTrash} from "@fortawesome/free-solid-svg-icons";

const TransactionRow = ({data, onUpdate, number}) => {
    return (

        <tr>
            <td>{number}</td>
            <td>{data.customer.submitter}</td>
            <td>{data.customer.name}</td>
            <td>{data.customer.employeeType} </td>
            <td>{data.loan}</td>
            <td>{data.tenor}</td>
            <td>{data.interestRate}</td>
            <td>
                {/*<a href={`/transaction/${data.id}/detail`} className="text-muted">*/}
                {/*    <i className="fas fa-info-circle" />*/}
                {/*</a>{' '}*/}
                <Button href={`/transaction/${data.id}`} style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faQuestionCircle}/>
                </Button>
            </td>
        </tr>
    )
}

export default TransactionRow;

