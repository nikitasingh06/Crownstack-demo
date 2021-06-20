/**
 * Common WebService Handler Component
 * @author Nikita Singh
 * @flow
 */
import {customAlert} from './CommonFunctions';

export const callRemoteMethod = async (endpoint, type = 'GET', data) => {
  //As per the requirement of this project, not using NetInfo and axios
  const method = type.toLowerCase();
  try {
    let options = {
      method: method,
      headers: await getRequestHeader(),
    };
    (type === 'POST' || type === 'PUT') && (options.data = data);
    let response = await fetch(endpoint, options);
    return parseResponse(response);
  } catch (err) {
    if (err.response && err.response.status) {
      handleStatus(err.response);
    }
  }
};

const getRequestHeader = async () => {
  var header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return header;
};

const parseResponse = response => {
  if (response.status === 200) {
    return response.json();
  } else {
    return {};
  }
};

const handleStatus = response => {
  switch (response.status) {
    case 400:
      customAlert(response.data.msg);
      console.warn('Bad request');
      break;
    case 403:
      customAlert(response.data.msg);
      console.warn('Forbidden Access');
      break;
    case 404:
      customAlert(response.data.msg);
      break;
    case 500:
      console.warn('Internal Server Error');
      break;
    default:
      console.warn('Something went wrong! Please try again later.');
  }
};
