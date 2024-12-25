import { useState, useEffect } from "react";
import { auth, provider } from './firebase.jsx';
import { signInWithPopup } from "firebase/auth"
import App from '../App.jsx'

function SignIn() {

	const [value, setValue] = useState('');
	const handleClick = async () => {
		try {
			await signInWithPopup(auth, provider);
			setValue('Signed In')
		} catch(err) {
			return err;
		}
	}
	useEffect(() => {
		setValue(localStorage.getItem('email'));
	}, [])

	return (
		<div>
			{value ? <App /> :
				<>
					<div className="signIn" >
						<button
							className="signinBtn"
							onClick={handleClick}
						>
							Sign-In with Gmail</button>
					</div>
				</>

			}
		</div>
	)
}
export default SignIn;