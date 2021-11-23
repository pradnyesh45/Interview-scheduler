import "./App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home.js";
import InterviewList from "./screens/InterviewList";
import ScheduleInterview from "./screens/ScheduleInterview";
import AddPerson from "./screens/AddPerson";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  console.log("return se pehle", Home);
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/addPerson" element={<AddPerson />} />
          <Route path="/interviewList" element={<InterviewList />} />
          <Route path="/scheduleInterview" element={<ScheduleInterview />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
