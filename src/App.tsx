import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Toaster position="top-right"/>
    </>
  );
}

export default App;
