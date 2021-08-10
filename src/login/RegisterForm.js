import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import useForm from '../hooks/useForm';
import { useHistory } from "react-router-dom";
import ReactLogo from "../images/logo512.png";
import { message } from 'antd';
import useLocalStorage from '../hooks/useLocalStorage';

function RegisterForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleField, fields } = useForm();
  const [state, setLocalStorage] = useLocalStorage('__token__');
  const submitHandle = async e => {
    e.preventDefault();
    const { email, password, fullName } = fields;
    if (!fullName || fullName.trim().length === 0) {
      return message.error('the email address is invalid');
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return message.error('the email address is invalid');
    }
    if (!password || password.length === 0) {
      return message.error('Password Required');
    }

    const formdata = new FormData();
    formdata.append("fullName", fullName);
    formdata.append("email", email);
    formdata.append("password", password);

    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    const response = await fetch("http://localhost:8000/api/accounts/signup", requestOptions);
    const { __token__, id } = await response.json();
    if (__token__) {
      setLocalStorage(__token__);
      dispatch(login({ email, fullName, id, __token__ }));
      history.push("/");
    } else {
      message.error('something went wrong akkwrd !');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <a href="/">
            <img className="mx-auto h-12 w-auto" src={ReactLogo}
              alt="Logo" />
          </a>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or <Link to="/login" className="xs font-medium text-indigo-600 hover:text-indigo-500">log in</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandle}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input onChange={handleField} name="fullName" type="text" autoComplete="off" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full name" />
            </div>
            <div>
              <input onChange={handleField} name="email" type="email" autoComplete="off" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address" />
            </div>
            <div>
              <input onChange={handleField} name="password" type="password" autoComplete="off" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input name="remember-me" type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm;
