import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import Signup from './Signup';

function SignupHome({ title, description }) {
  return (
    <>
    <Header/>
    <Signup/>
    <Footer/>
    </>
  );
}

export default SignupHome;
