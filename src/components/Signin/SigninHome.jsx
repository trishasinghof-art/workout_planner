import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import SignIn from './SignIn';

function SigninHome({ title, description }) {
  return (
    <>
    <Header/>
    <SignIn/>
    <Footer/>
    </>
  );
}

export default SigninHome;
