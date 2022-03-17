import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

/**
 * Returns an array of strings with user's intros.
 * 
 * @async
 * @param {array} ids - An array containing user's ids.
 * @returns {Promise<array>} intros - An array of strings with user's ids.
 * 
 * 
 */
const getIntros = async (ids = []) => {
  // Gather user's promises in an array.
  const responsePromises = [];
  for (let id of ids) {
    const userResponse = fetchUserById(id);
    responsePromises.push(userResponse);
  }
  // Wait for all responses to resolve.
  const responses = await Promise.all(responsePromises);
  // Check status of promises.
  for (const res of responses) {
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }
  }
  // Parse all promises into user-data promises.
  const userPromises = responses.map((res) => res.json());
  const users = await Promise.all(userPromises);
  // Create an array containing each user's introduction.
  const intros = users.map((user) => {
    return `${user.id}: Hello, my name is ${user.name}`;
  });
  return intros;
};

// --- --- tests --- ---

describe('getIntros: returns an array of user introductions', () => {
  it('gets intros for 6', async () => {
    const actual = await getIntros([6]);
    expect(actual).toEqual(['6: Hello, my name is Mrs. Dennis Schulist']);
  });
  it('gets intros for 8, 6, 4', async () => {
    const actual = await getIntros([8, 6, 4]);
    expect(actual).toEqual([
      '8: Hello, my name is Nicholas Runolfsdottir V',
      '6: Hello, my name is Mrs. Dennis Schulist',
      '4: Hello, my name is Patricia Lebsack',
    ]);
  });
  it('gets intros for 4, 7, 5, 6', async () => {
    const actual = await getIntros([4, 7, 5, 6]);
    expect(actual).toEqual([
      '4: Hello, my name is Patricia Lebsack',
      '7: Hello, my name is Kurtis Weissnat',
      '5: Hello, my name is Chelsey Dietrich',
      '6: Hello, my name is Mrs. Dennis Schulist',
    ]);
  });
  it('gets intros for no one', async () => {
    const actual = await getIntros([]);
    expect(actual).toEqual([]);
  });
});

console.log('= = = =  the call stack is empty  = = = =');
