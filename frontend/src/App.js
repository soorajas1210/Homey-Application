import "./App.css";

import { BrowserRouter } from "react-router-dom";
import UserRouters from "./Routers/UserRouters";
import AdminRouters from "./Routers/AdminRouters";
import ServicesRouter from "./Routers/ServicesRouter";

function App() {
  return (
    <BrowserRouter>
      <UserRouters />
      <AdminRouters />
      <ServicesRouter />
    </BrowserRouter>
  );
}

export default App;
