import {FaLock, FaUserPlus} from 'react-icons/fa';
import {Form, Link, useActionData, useNavigation, useSearchParams} from "@remix-run/react";

function AuthForm() {
    const validationErrors = useActionData()
    const navigation = useNavigation();
    const [searchParams] = useSearchParams()
    const authMode = searchParams.get('mode') || 'login';
    const submitText = authMode === 'login' ? 'Login' : 'Create Account';
    const toggleMode = authMode === 'login' ? 'Create a new Account' : 'Log in with existing user';
    const queryMode = authMode === 'login' ? 'signup' : 'login';
    const icon = authMode === 'login' ? <FaLock/> : <FaUserPlus/>;
    const isSubmitting = navigation.state !== 'idle';
    return (
        <Form method="post" className="form" id="auth-form">
            <div className="icon-img">
                {icon}
            </div>
            <p>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required/>
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" minLength={7}/>
            </p>
            {validationErrors && <ul>
                {Object.values(validationErrors).map((error: any, index: number) => <li key={index}>{error}</li>)}
            </ul>}
            <div className="form-actions">
                <button disabled={isSubmitting}>{isSubmitting ? 'Authenticating...' : submitText}</button>
                <Link to={`?mode=${queryMode}`}>{toggleMode}</Link>
            </div>

        </Form>
    );
}

export default AuthForm;
