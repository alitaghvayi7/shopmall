import "./authpage.scss"
import LoginForm from "../../components/loginform/LoginForm.jsx";
import SignupFrom from "../../components/signupfrom/SignupFrom";
const AuthenticationPage = () => {
  return (
    <div className="authentication-container">
      <LoginForm />
      <SignupFrom />
    </div>

  )
}

export default AuthenticationPage;

