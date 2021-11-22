import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home.js";
import InterviewList from "./screens/InterviewList";
import ScheduleInterview from "./screens/ScheduleInterview";
import AddPerson from "./screens/AddPerson";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  console.log("return se pehle", Home);
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Switch>
          <Route path="/addPerson">
            <AddPerson />
          </Route>

          <Route path="/interviewList">
            <InterviewList />
          </Route>

          <Route path="/scheduleInterview">
            <ScheduleInterview />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
