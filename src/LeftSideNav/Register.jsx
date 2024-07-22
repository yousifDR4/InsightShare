import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { register } from './registerApi';
import { setUserInfo } from '../utils/localstoreg';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import currentuser from '../auth/currentuser';
function Register() {
  const DispatchRedux=useDispatch();
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <Formik
        initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
        validate={values => {
          const errors = {};
          if (!values.fullName) {
            errors.fullName = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords must match';
          }
          return errors;
        }}
        onSubmit={async(values, { setSubmitting }) => {
            console.log(values);
            try{
              const status=register(values);
              if(status===201){
                const user=await currentuser();
                setUserInfo(user)
                DispatchRedux(setUser(user));
              }
            }
            catch(e){console.log(e);}
            setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-2xl mb-4 text-center">Register</h2>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Field
                type="text"
                name="fullName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="fullName" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
