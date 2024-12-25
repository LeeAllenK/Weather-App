import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client'
import SignIn from './components/googleSignin';
// import './index.css'

const root = createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignIn/>
  </StrictMode>
)