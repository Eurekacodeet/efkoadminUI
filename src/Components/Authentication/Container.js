import React from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegisterForm';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm">
        <h1 className="text-3xl mb-6 text-center">Login</h1>
        <LoginForm className="flex justify-center items-center" />
      </div>
    </div>
  );
};

const RegistrationPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm">
        <h1 className="text-3xl mb-6">Register</h1>
        <RegistrationForm />
        <p className="mt-4">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export { LoginPage, RegistrationPage };
