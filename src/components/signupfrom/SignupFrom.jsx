import "./signupform.scss";
import FormInput from '../form-input/FormInput';
import { useState,useContext } from "react";
import Button from "../button/Button";
import { createUser, createUserFromGoogle } from "../../services/firebase";
import {UserContext} from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupFrom = () => {

    const {setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();

    const userInformation = {
        signupDisplayName: '',
        signupEmail: '',
        signupPassword: '',
        signupConfirmPassword: ''
    }

    const [formFields, setFormFields] = useState(userInformation);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChangeHandler = (event) => {
        const { id, value } = event.target;
        setFormFields({ ...formFields, [id]: value });
    }

    const { signupDisplayName, signupEmail, signupPassword, signupConfirmPassword } = formFields;

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorPassword(false);
        setErrorEmail(false);

        if (formFields.signupPassword !== formFields.signupConfirmPassword) {
            setErrorPassword(true);
            setIsSubmitting(false);
            return;
        }

        try {
            const { user } = await createUser(formFields.signupEmail, formFields.signupPassword);
            await createUserFromGoogle(user, { displayName: formFields.signupDisplayName });
            setCurrentUser(user);
            navigate("/");
            setIsSubmitting(false);
            setFormFields(userInformation);
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorEmail(true);
                setIsSubmitting(false);
                return;
            }
            else if (error.code === 'auth/weak-password') {
                setErrorPassword(true);
                setIsSubmitting(false);
                return;
            }
        }
    }


    return (
        <div className="signup-container">
            <h2>Dont Have An Account?</h2>
            <span>Sign Up With Your Email And Password</span>
            <form onSubmit={submitHandler}>

                <FormInput
                    label='displayName'
                    type="text"
                    value={signupDisplayName}
                    onChange={onChangeHandler}
                    id="signupDisplayName"
                    required
                />

                <FormInput
                    label='Email'
                    setError={errorEmail}
                    errorMessage="Your Email Is Already Taken By Another User"
                    type="email"
                    value={signupEmail}
                    onChange={onChangeHandler}
                    id='signupEmail'
                    required
                />

                <FormInput
                    label='Password'
                    setError={errorPassword}
                    errorMessage="Your Password Is Wrong"
                    type="password"
                    value={signupPassword}
                    onChange={onChangeHandler}
                    required
                    id="signupPassword"
                    minLength={6}
                />


                <FormInput
                    label='confirmPassword'
                    setError={errorPassword}
                    errorMessage="Your Confirm Password Is Wrong"
                    type="password"
                    value={signupConfirmPassword}
                    onChange={onChangeHandler}
                    required
                    id="signupConfirmPassword"
                    minLength={6}
                />
                <Button type='submit' disabled={isSubmitting}>SIGN Up</Button>
            </form>
        </div>
    )
}

export default SignupFrom