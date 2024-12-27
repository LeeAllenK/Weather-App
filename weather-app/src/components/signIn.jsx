import { useState, useEffect } from "react";
import { signInWithGooglePopup } from './signinWithGoogle';
import { signUpWithEmail } from './signUpWithEmail';
import { signInWithEmail } from './signInWithEmail';
import App from '../App.jsx';
import '../signin-signup.css';


function SignIn() {
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRegistering, setIsRegistering] = useState(false);

	const clearError = () => {
		setError(null);
	};

	const handleClickPopup = async () => {
		clearError();
		try {
			await signInWithGooglePopup();
			setValue('Signed In');
			localStorage.setItem('email', 'user@example.com');
		} catch(err) {
			setError(err.message);
		}
	};

	const handleSignUp = async () => {
		clearError();
		if(!firstName) {
			setError('First name is required.');
			return;
		}
		if(!lastName) {
			setError('Last name is required.');
			return;
		}
		if(!email) {
			setError('Email is required.');
			return;
		}
		if(!validateEmail(email)) {
			setError('Invalid email format.');
			return;
		}
		if(!password) {
			setError('Password is required.');
			return;
		}
		if(!validatePassword(password)) {
			setError('Password must be at least 6 characters long.');
			return;
		}
		try {
			await signUpWithEmail(email, password, firstName, lastName);
			setValue('Signed Up');
			localStorage.setItem('email', email);
			localStorage.setItem('firstName', firstName);
			localStorage.setItem('lastName', lastName);
		} catch(err) {
			setError('Email already in use');
		}
	};

	const handleSignIn = async () => {
		clearError();
		if(!email) {
			setError('Email is required.');
			return;
		}
		if(!validateEmail(email)) {
			setError('Invalid email format.');
			return;
		}
		if(!password) {
			setError('Password is required.');
			return;
		}
		try {
			await signInWithEmail(email, password);
			setValue('Signed In');
			localStorage.setItem('email', email);
		} catch(err) {
			setError('Incorrect password. Please try again.');
		}
	};

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const validatePassword = (password) => {
		return password.length >= 6;
	};

	useEffect(() => {
		setValue(localStorage.getItem('email'));
	}, []);

	return (
		<div className='signin-signup'>
			{value ? (
				<App />
			) : (
				<>
					{isRegistering ? (
						<div className="email-signup">
							<input
								type="text"
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<input
								type="text"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button className="signupBtn" onClick={handleSignUp}>
								Sign-Up with Email
							</button><br />
							<button className="toggleBtn" onClick={() => { clearError(); setIsRegistering(false); }}>
								Already have an account? Sign In
							</button>
						</div>
					) : (
						<div className="email-signin">
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button className="signinBtn" onClick={handleSignIn}>
								Sign-In with Email
							</button><br />
							<button className="signinBtn" onClick={handleClickPopup}>
								Sign-In with Gmail
							</button><br />
							<button className="toggleBtn" onClick={() => { clearError(); setIsRegistering(true); }}>
								Don't have an account? Register
							</button>
						</div>
					)}
					{error && <p className="error">{error}</p>}
				</>
			)}
		</div>
	);
}
export default SignIn;
