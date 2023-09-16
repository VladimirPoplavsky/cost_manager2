import React from "react";


export default function ReportList(props){
    console.log(props.dataToDisplay);
    console.log(props.moreData);
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