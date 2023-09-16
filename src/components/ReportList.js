import React from "react";


export default function ReportList(props){
    return(
        <ul>
            {props.dataToDisplay.map((item) => (
                <li key={item.id}>
                    {item.sum}, {item.date}, {item.category}, {item.description}
                </li>
            ))}
        </ul>
    );
}