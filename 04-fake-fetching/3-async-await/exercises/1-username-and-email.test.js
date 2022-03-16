import { labeledLogger } from '../../../lib/labeled-logger.js';

import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

const { log } = labeledLogger();

/**
 * Returns the user's id, name and email.
 * 
 * 
 * @async
 * @param {number} id - ID number of user.
 * @returns {Promise<string>} - String with user's id, name and email.
 * 
 */
const usernameAndEmail = async (id = 1) => {
  const response = await fetchUserById(id);
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  const user = await response.json();
  
  const nameAndEmail = `${user.id}. ${user.name}, ${user.email}`;

  return nameAndEmail;
};

describe("usernameAndEmail returns the user's id, name and email", () => {
  it("returns user 2's info", async () => {
    const actual = await usernameAndEmail(2);
    expect(actual).toEqual('2. Ervin Howell, Shanna@melissa.tv');
  });
  it("returns user 4's info", async () => {
    const actual = await usernameAndEmail(4);
    expect(actual).toEqual('4. Patricia Lebsack, Julianne.OConner@kory.org');
  });
  it("returns user 7's info", async () => {
    const actual = await usernameAndEmail(7);
    expect(actual).toEqual('7. Kurtis Weissnat, Telly.Hoeger@billy.biz');
  });
  it("returns user 10's info", async () => {
    const actual = await usernameAndEmail(10);
    expect(actual).toEqual('10. Clementina DuBuque, Rey.Padberg@karina.biz');
  });
});

log('= = = =  the call stack is empty  = = = =');
