import { labeledLogger } from '../../../lib/labeled-logger.js';

import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

const { log } = labeledLogger();

/**
 * Checks if a user works at a given company
 * @async
 * @param {number} - ID number of the user.
 * @param {string} - company's name to check in the data.
 * @returns {Promise<boolean>} - True or false if the user works at the given company or not.
 * 
 */
const userWorksAt = async (id = 1, company) => {
  const response = await fetchUserById(id);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  const user = await response.json();
  return user.company.name === company ? true : false;
};

describe('userWorksAt checks if a user works at a specific company', () => {
  it('user 4 does work at Robel-Corkery', async () => {
    const actual = await userWorksAt(4, 'Robel-Corkery');
    expect(actual).toEqual(true);
  });
  it('user 4 does not work at Romaguera-Jacobson', async () => {
    const actual = await userWorksAt(4, 'Romaguera-Jacobson');
    expect(actual).toEqual(false);
  });
  it('user 6 does work at Considine-Lockman', async () => {
    const actual = await userWorksAt(6, 'Considine-Lockman');
    expect(actual).toEqual(true);
  });
  it('user 7 does not work at John Groups', async () => {
    const actual = await userWorksAt(7, 'John Groups');
    expect(actual).toEqual(false);
  });
});

log('= = = =  the call stack is empty  = = = =');
