import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<ProfilePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
