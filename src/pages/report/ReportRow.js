import React from 'react'
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";

const ReportRow = ({data, number}) => {
    return (

        <tr>
            <td>1</td>
            <td>eka</td>
            <td>Non</td>
            <td>approve</td>
            <td>
                <Button href={`#`} style={{background:"#e42256"}}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                </Button>
            </td>
        </tr>
    )
}

export default ReportRow;

