import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TaskPage />} />
      </Routes>
    </>
  );
}

export default App;
