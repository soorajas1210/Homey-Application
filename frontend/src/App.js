import "./App.css";

import { BrowserRouter } from "react-router-dom";
import UserRouters from "./Routers/UserRouters";
import AdminRouters from "./Routers/AdminRouters";
import ServicesRouter from "./Routers/ServicesRouter";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <UserRouters />
      <AdminRouters />
      <ServicesRouter />
    </BrowserRouter>
  );
}

export default App;
