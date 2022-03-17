import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

// --- declare function ---

/**
 * Returns an array of objects with user's name, city and companyName info.
 * 
 * @async
 * @param {array} ids - Array of ids.
 * @return {Promise<array>} summaries - Array of objects containing user's name, city and companyName info.
 * 
 */
const createSummaries = async (ids = []) => {
  // Gather info.
  const responsePromises = [];
  for (let id of ids) {
    const fetch = fetchUserById(id);
    responsePromises.push(fetch);
  }
  // Wait for all promises.
  const responses = await Promise.all(responsePromises);
  // Check status and throw error.
  for (let res of responses) {
    if (!res.ok) {
      throw new Error(`${res.status}; ${res.statusText}`);
    }
  }
  // Parse all responses into user data promises.
  const userPromises = responses.map((res) => res.json());
  // Wait for promises.
  const users = await Promise.all(userPromises);
  // Create an array containing each user's summary data object.
  const summaries = users.map((user) => {
    return {
      name: `${user.name}`,
      city: `${user.address.city}`,
      companyName: `${user.company.name}`
    }
  });
  return summaries;
};

// --- --- tests --- ---

describe('createSummaries: returns an array of user summaries', () => {
  it('creates a summary for 6', async () => {
    const actual = await createSummaries([6]);
    expect(actual).toEqual([
      {
        name: 'Mrs. Dennis Schulist',
        city: 'South Christy',
        companyName: 'Considine-Lockman',
      },
    ]);
  });
  it('creates a summary for 5, 1, 10', async () => {
    const actual = await createSummaries([5, 1, 10]);
    expect(actual).toEqual([
      {
        name: 'Chelsey Dietrich',
        city: 'Roscoeview',
        companyName: 'Keebler LLC',
      },
      {
        name: 'Leanne Graham',
        city: 'Gwenborough',
        companyName: 'Romaguera-Crona',
      },
      {
        name: 'Clementina DuBuque',
        city: 'Lebsackbury',
        companyName: 'Hoeger LLC',
      },
    ]);
  });
  it('creates a summary for 7, 5', async () => {
    const actual = await createSummaries([7, 5]);
    expect(actual).toEqual([
      {
        name: 'Kurtis Weissnat',
        city: 'Howemouth',
        companyName: 'Johns Group',
      },
      {
        name: 'Chelsey Dietrich',
        city: 'Roscoeview',
        companyName: 'Keebler LLC',
      },
    ]);
  });
  it('creates a summary for no one', async () => {
    const actual = await createSummaries([]);
    expect(actual).toEqual([]);
  });
});

console.log('= = = =  the call stack is empty  = = = =');
