/*
----- Developers info -----
Dev1 name: Vladimir Poplavsky
Dev1 ID: 336137468

Dev2 name: Sergey Gershov
Dev2 ID: 327232450

Dev3 name: Ilan Yashan
Dev3 ID: 201211588
 */

import './App.css';
import AddExpense from "./components/AddExpense";
import ShowReport from "./components/ShowReport";
import {Container} from "react-bootstrap";


function App() {
    return (
        <div className={"App-header"}>
            <Container>
                <AddExpense></AddExpense>
                <ShowReport></ShowReport>
            </Container>
        </div>
    )
}

export default App;
