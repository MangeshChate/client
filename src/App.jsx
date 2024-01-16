
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Storage from "./pages/Storage";
const App = () => (
  <Router>

    <Routes>
      <Route exact path="/" element={

      <Home/>

      } />


<Route exact path="/storage" element={

<Storage/>

} />

  </Routes>




  </Router>
);

export default App;
