import "./App.css";
import { Container } from "react-bootstrap";
import Heading from "./components/Heading";
import PersonInput from "./components/PersonInput";

function App() {
  return (
    <div className="App">
      <Container>
        <Heading />
        <PersonInput />
      </Container>
    </div>
  );
}

export default App;
