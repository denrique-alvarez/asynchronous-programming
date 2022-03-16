import { labeledLogger } from '../../../lib/labeled-logger.js';
import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

const { log, error } = labeledLogger();

/* User Summary */

// --- declare some callbacks ---

const handleResponse = (res) => {
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
  return res.json();
};

const createSummary = (user) => {
  // write me!
  const name = user.name;
  const city = user.address.city;
  const companyName = user.company.name;
  const sumary = {
    name: `${name}`,
    city: `${city}`,
    companyName: `${companyName}`
  }
  return sumary;
};

// const handleError = (err) => error(err);

// --- use the callbacks ---

log('fetching and processing user 5');
/*  {
      name: 'Chelsey Dietrich',
      city: 'Roscoeview',
      companyName: 'Keebler LLC'
    } */
fetchUserById(5)
  .then((res) => handleResponse(res))
  .then((user) => createSummary(user))
  .then((sumary) => log(sumary))
  .catch((err) => error(err));

log('fetching and processing user 1');
/*  {
      name: 'Leanne Graham',
      city: 'Gwenborough',
      companyName: 'Romaguera-Crona',
    } */
fetchUserById(1)
  .then((res) => handleResponse(res))
  .then((user) => createSummary(user))
  .then((sumary) => log(sumary))
  .catch((err) => error(err));

log('fetching and processing user 10');
/*  {
      name: 'Clementina DuBuque',
      city: 'Lebsackbury',
      companyName: 'Hoeger LLC',
    } */
fetchUserById(10)
  .then((res) => handleResponse(res))
  .then((user) => createSummary(user))
  .then((sumary) => log(sumary))
  .catch((err) => error(err));

log('fetching and processing user -1');
// 404
fetchUserById(-1)
  .then((res) => handleResponse(res))
  .then((user) => createSummary(user))
  .then((sumary) => log(sumary))
  .catch((err) => error(err));

log('= = = =  the call stack is empty  = = = =');
