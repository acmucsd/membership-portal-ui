import { notification } from 'antd';

export const notify = (title, description) => {
  notification.open({
    message: title,
    description: description,
  });
};

/**
 * Returns a randomly generated default profile picture.
 * @return {string} A link to a default profile picture.
 */
export const getDefaultProfile = () => {
  const eyes = ['eyes1', 'eyes10', 'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6', 'eyes7', 'eyes9'];
  const nose = ['nose2', 'nose3', 'nose4', 'nose5', 'nose6', 'nose7', 'nose8', 'nose9'];
  const mouth = ['mouth1', 'mouth10', 'mouth11', 'mouth3', 'mouth5', 'mouth6', 'mouth7', 'mouth9'];
  const colors = ['22ACEA', '0659BC', 'BED9E6'];

  const getRandom = list => {
    return list[Math.floor(Math.random() * list.length)];
  };

  return `https://api.adorable.io/avatars/face/${getRandom(eyes)}/${getRandom(nose)}/${getRandom(mouth)}/${getRandom(
    colors
  )}`;
};

/**
 * Returns a rank based on the number of points.
 * @param {number} points The number of points the user has.
 * @return {string} A link to a default profile picture.
 */
export const getRank = points => {
  const ranks = [
    'Factorial Flea',
    'Exponential Earthworm',
    'Polynomial Piranha',
    'Sliced Croissant',
    'Quadratic Quail',
    'Lemony Cat',
    'Logarithmic Lion',
    'Bubbling Tea',
    'Super Snu',
    'Hyped Shiba'
  ];
  const index = Math.min(ranks.length, Math.floor(points / 100));
  return ranks[index];
};

/**
 * Formats a date to be readable.
 * @param {string} time The time in unformatted form.
 * @return {string} The formatted time in a readable format
 */
export const formatDate = time => {
  const parsedTime = Date.parse(time);
  const parsedDate = new Date(parsedTime);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = parsedDate.getDate();
  const monthIndex = parsedDate.getMonth();
  const year = parsedDate.getFullYear();

  return monthNames[monthIndex] + ' ' + date + ' ' + year;
};

/**
 * TODO: Actually read the time
 * Retrieves the hour froma  time.
 * @param {string} time The time in unformatted form.
 * @return {string} The hour.
 */
export const getHour = time => {
  const subTime = time.split('T')[1];
  const hour = subTime.split(':')[0];

  return hour;
};

/**
 * Converts the month to an index
 * @param {string} month The month in string form.
 * @return {number} The month in number form.
 */
export const getMonthIndex = month => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  function checkMonth(currMonth) {
    return month === currMonth;
  }

  return monthNames.findIndex(checkMonth);
};

/**
 * Retrieves the level from the number of points.
 * @param {number} points The number of the points the user has.
 * @return {number} The current level of the user.
 */
export const getLevel = points => {
  return Math.floor(points / 100) + 1;
};
