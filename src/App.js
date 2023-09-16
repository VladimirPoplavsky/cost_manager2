import './App.css';
import AddExpense from "./components/AddExpense";
import DisplayData from "./components/ShowReport";
import {Container} from "react-bootstrap";


function App() {
   return(
     <Container>
         <AddExpense></AddExpense>
         <DisplayData></DisplayData>
     </Container>
   )
}

export default App;
