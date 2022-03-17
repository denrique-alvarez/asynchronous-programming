import { fetchUserById } from '../../../lib/fetch-user-by-id/index.js';

/**
 * Returns an array of objects with user's coordinates in longitude and latitude.
 * 
 * @async
 * @param {array} ids - An array containing user's ids.
 * @returns {Promise<array>} coordinates - An array of objects with user's geo-location information.
 *
 */
const findGeoCoordinates = async (ids = []) => {
  // Gather all user's data.
  const responsePromises = [];
  for (let id of ids) {
    const nextUser = fetchUserById(id);
    responsePromises.push(nextUser);
  }
  // Wait for all the promises to resolve.
  const responses = await Promise.all(responsePromises);
  // Check status of promises.
  for (const res of responses) {
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }
  }
  // Parse all resnponses into user's data promises.
  const userPromises = responses.map((res) => res.json());
  const users = await Promise.all(userPromises);
  // Create an object containing latitude and longitude data.
  const coordinates = users.map((user) => {
    return user.address.geo;
  });
  return coordinates;
};

// --- --- tests --- ---

describe('findGeoCoordinates: returns an array of user coordinates', () => {
  it('finds coordinates for 6', async () => {
    const actual = await findGeoCoordinates([6]);
    expect(actual).toEqual([{ lat: '-71.4197', lng: '71.7478' }]);
  });
  it('finds coordinates for 8, 6, 4', async () => {
    const actual = await findGeoCoordinates([8, 6, 4]);
    expect(actual).toEqual([
      { lat: '-14.3990', lng: '-120.7677' },
      { lat: '-71.4197', lng: '71.7478' },
      { lat: '29.4572', lng: '-164.2990' },
    ]);
  });
  it('finds coordinates for 4, 7, 5, 6', async () => {
    const actual = await findGeoCoordinates([4, 7, 5, 6]);
    expect(actual).toEqual([
      { lat: '29.4572', lng: '-164.2990' },
      { lat: '24.8918', lng: '21.8984' },
      { lat: '-31.8129', lng: '62.5342' },
      { lat: '-71.4197', lng: '71.7478' },
    ]);
  });
  it('finds coordinates for no one', async () => {
    const actual = await findGeoCoordinates([]);
    expect(actual).toEqual([]);
  });
});

console.log('= = = =  the call stack is empty  = = = =');
