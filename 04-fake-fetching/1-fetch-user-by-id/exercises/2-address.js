import { labeledLogger } from '../../../lib/labeled-logger.js';
import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

const { log, error } = labeledLogger();

/* Address */

// --- declare some callbacks ---

const handleResponse = (res) => {
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
  return res.json();
};

const getAddress = (user) => {
  // write me!
  const id = user.id;
  const street = user.address.street;
  const city = user.address.city;
  const zipcode = user.address.zipcode;
  const address = `"${id}: ${street}, ${city} ${zipcode}"`;
  return address;
};

// const handleError = (err) => error(err);

// --- use the callbacks ---

log('fetching and processing user 9');
// "9: Dayna Park, Bartholomebury 76495-3109"
fetchUserById(9)
  .then((res) => handleResponse(res))
  .then((user) => getAddress(user))
  .then((address) => log(address))
  .catch((err) => error(err));

log('fetching and processing user 8');
// "8: Ellsworth Summit, Aliyaview 45169"
fetchUserById(8)
  .then((res) => handleResponse(res))
  .then((user) => getAddress(user))
  .then((address) => log(address))
  .catch((err) => error(err));

log('fetching and processing user 2');
// "2: Victor Plains, Wisokyburgh 90566-7771"
fetchUserById(2)
  .then((res) => handleResponse(res))
  .then((user) => getAddress(user))
  .then((address) => log(address))
  .catch((err) => error(err));

log('fetching and processing user 0');
// 404
fetchUserById(0)
  .then((res) => handleResponse(res))
  .then((user) => getAddress(user))
  .then((address) => log(address))
  .catch((err) => error(err));

log('= = = =  the call stack is empty  = = = =');
