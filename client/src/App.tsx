import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import ForgotPasswordForm from "./components/forgetpasswordForm";
import LoginForm from "./components/loginform";
import Navbar from "./components/navbar";
import RegisterForm from "./components/registerform";
import ResetForm from "./components/resetForm";
import PostDescription from "./pages/description";
import Home from "./pages/home";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PostDescription />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App