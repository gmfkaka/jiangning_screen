import axios from 'axios';

axios.interceptors.request.use((config) => {
  return config;
}, (err) => {
  return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
  return response;
}, (err) => {
  return Promise.reject(err);
});

export default async (url, data, method = 'get', config = {}, showMessage = true) => {
  method = method.toLowerCase();

  const ajaxConfig = {
    url,
    method,
    ...config
  };

  if (['post', 'put', 'patch'].includes(ajaxConfig.method)) {
    ajaxConfig.data = data;
  } else {
    ajaxConfig.params = data;
  }

  try {
    const { error_code, error_message, result } = (await axios(ajaxConfig)).data;
    if (error_code) { // eslint-disable-line camelcase
      showMessage && Message.error(error_message);
      const err = {
        code: error_code,
        message: error_message
      };
      throw err;
    }
    return result;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        
      }
      throw error.response;
    } else if (error.request) {
      throw error.request;
    }
    throw error;
  }
};
