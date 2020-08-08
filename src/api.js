import axios from "axios";

const Error = {
  UNAUTHORIZED: 401,
};

export const createAPI = (onUnauthorized, onResponseError) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (err) => {
    const {response} = err;

    if (response === undefined) {
      onResponseError(`Server error`);
      throw err;
    }

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      return response;
    } else {
      onResponseError(response.statusText);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
