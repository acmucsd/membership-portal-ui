import { notification } from 'antd';

export const notify = (title, description) => {
  notification.open({
    message: title,
    description: description
  });
***REMOVED***

/**
 * Returns a randomly generated default profile picture.
 * @return {string} A link to a default profile picture.
 */
export const getDefaultProfile = () => {
  const eyes = ['eyes1', 'eyes10', 'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6',
      'eyes7', 'eyes9'];
  const nose = ['nose2', 'nose3', 'nose4', 'nose5', 'nose6', 'nose7', 'nose8',
      'nose9'];
  const mouth = ['mouth1', 'mouth10', 'mouth11', 'mouth3', 'mouth5', 'mouth6',
      'mouth7','mouth9'];
  const colors = ['22ACEA', '0659BC', '2C72C6', 'BED9E6'];

  const getRandom = (list) => {
    return list[Math.floor((Math.random()*list.length))];
  }

  return `https://api.adorable.io/avatars/face/${getRandom(eyes)}/${getRandom(nose)}/${getRandom(mouth)}/${getRandom(colors)}`;
}

/**
 * Returns a rank based on the number of points.
 * @param {number} points The number of points the user has.
 * @return {string} A link to a default profile picture.
 */
export const getRank = (points) => {
  const ranks = [
    'Factorial Flea',
    'Exponential Earthworm',
    'Polynomial Piranha',
    'Cubic Chicken',
    'Quadratic Quail',
    'Linear Lizard',
    'Logarithmic Lion',
    'Constant Croc',
  ]
  const index = Math.min(ranks.length, Math.floor(points / 100));
  return ranks[index];
}
