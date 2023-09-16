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
