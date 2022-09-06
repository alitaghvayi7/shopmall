import "./loginform.scss";
import FormInput from "../form-input/FormInput";
import { signInWithGooglePopup, createUserFromGoogle, loginUser, createUser } from "../../services/firebase.js";
import { useState, useContext } from "react";
import Button from "../button/Button";
import { UserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { id, value } = event.target;
        setFormFields({ ...formFields, [id]: value });
    }

    const userInformation = {
        loginEmail: '',
        loginPassword: '',
    }

    const [formFields, setFormFields] = useState(userInformation);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loggerGoogle = async () => {

        setIsSubmitting(true);
        const { user } = await signInWithGooglePopup();
        await createUserFromGoogle(user, { displayName: user.displayName });
        setCurrentUser(user);
        navigate("/")
    }

    const onSubmitHandler = async (event) => {

        event.preventDefault();
        setIsSubmitting(true);
        setErrorEmail(false);
        setErrorPassword(false);

        try {
            const { user } = await loginUser(formFields.loginEmail, formFields.loginPassword);
            setCurrentUser(user);
            setIsSubmitting(false);
            setFormFields(userInformation);
            navigate('/')
        }
        catch (error) {
            if (error.code === 'auth/wrong-password') {
                setErrorPassword(true);
            }
            else if (error.code === 'auth/user-not-found') {
                setErrorEmail(true);
            }
            setIsSubmitting(false);
        }

    }

    return (
        <div className="login-container">
            <h2>I Have An Account</h2>
            <span>Login with your Email And Password</span>
            <form onSubmit={onSubmitHandler}>

                <FormInput
                    label='Email'
                    setError={errorEmail}
                    errorMessage="Your Email Is Invalid"
                    id='loginEmail'
                    type="email"
                    value={formFields.loginEmail}
                    onChange={onChangeHandler}
                    required
                />

                <FormInput
                    label='Password'
                    setError={errorPassword}
                    errorMessage="Your Password Is Wrong"
                    id="loginPassword"
                    type="password"
                    value={formFields.loginPassword}
                    onChange={onChangeHandler}
                    required
                    minLength={6}
                />

                <div className="button-container">
                    <Button type='submit' disabled={isSubmitting}>LOGIN</Button>
                    <Button onClick={loggerGoogle} type='button' disabled={isSubmitting} classNameType='google'>GOOGLE LOGIN</Button>
                </div>

            </form>
        </div>
    )
}

export default LoginForm;

