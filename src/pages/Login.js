import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { facebookProvider, googleProvider } from "../auth/socialMediaProviders";
import {
  loginEmailPassword,
  loginSocialMedia,
} from "../store/reducers/users/users.thunk";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, errorMessage, isLogin } = useSelector(
    (state) => state.user
  );
  const [inputEmail, setinputEmail] = useState("test@gmail.com");
  const [inputPassword, setinputPassword] = useState("test123");

  const handleLoginSocialMedia = async (provider) => {
    const login = await dispatch(loginSocialMedia(provider));
    if (login) history.push("/");
  };

  const handleLoginEmailPassword = async (e) => {
    e.preventDefault();

    const login = await dispatch(
      loginEmailPassword({
        email: inputEmail,
        password: inputPassword,
      })
    );

    if (login) history.push("/");
  };

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1 className="text-3xl font-semibold">Login</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {isLoading && <h2>...</h2>}

      <div class="w-2/4 mt-4">
        <form onSubmit={handleLoginEmailPassword}>
          <div class="mb-5">
            <label for="email" class="font-bold mb-1 text-gray-700 block">
              Email
            </label>
            <input
              type="email"
              class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              placeholder="Email kamu..."
              onChange={(e) => setinputEmail(e.target.value)}
              required
            />
          </div>
          <div class="mb-5">
            <label for="password" class="font-bold mb-1 text-gray-700 block">
              Password
            </label>
            <input
              type="password"
              class="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              placeholder="Password kamu..."
              onChange={(e) => setinputPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
        <div className="block py-4 text-center text-gray-600">
          Atau, kamu juga bisa login pake:
        </div>
        <div className="flex justify-between gap-x-2">
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-4 w-full rounded"
            onClick={() => handleLoginSocialMedia(googleProvider)}
          >
            Google
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 w-full rounded"
            onClick={() => handleLoginSocialMedia(facebookProvider)}
          >
            Fcebook
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
