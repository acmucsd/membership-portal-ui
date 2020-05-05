import { notification } from 'antd';

export const notify = (title, description) => {
  notification.open({
    message: title,
    description: description,
  });
***REMOVED***

/**
 * Returns a randomly generated default profile picture.
 * @return {string} A link to a default profile picture.
 */
export const generateDefaultProfile = () => {
  const eyes = ['eyes1', 'eyes10', 'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6', 'eyes7', 'eyes9'];
  const nose = ['nose2', 'nose3', 'nose4', 'nose5', 'nose6', 'nose7', 'nose8', 'nose9'];
  const mouth = ['mouth1', 'mouth10', 'mouth11', 'mouth3', 'mouth5', 'mouth6', 'mouth7', 'mouth9'];
  const colors = ['22ACEA', '0659BC', 'BED9E6'];

  const getRandom = list => {
    return list[Math.floor(Math.random() * list.length)];
  ***REMOVED***

  return `https://api.adorable.io/avatars/face/${getRandom(eyes)}/${getRandom(nose)}/${getRandom(mouth)}/${getRandom(
    colors
  )}`;
***REMOVED***

/**
 * Returns a random default profile picture out of a select few generated from getDefaultProfile
 * @return {string} A link to the profile picture
 */

export const getDefaultProfile = () => {
  const randomIndex = Math.floor(Math.random() * 9);
  return `${window.location.origin}/adorableprofiles/adorable${randomIndex}.png`;
***REMOVED***

/**
 * Returns a rank based on the number of points.
 * @param {number} points The number of points the user has.
 * @return {string} A link to a default profile picture.
 */
export const getRank = points => {
  const ranks = [
    'Factorial Flatbread',
    'Exponential Eclair',
    'Polynomial Pita',
    'Cubic Croissant',
    'Quadratic Qornbread',
    'Linear Loaf',
    'nlog Naan',
    'Constant Cornbread',
    'Binary Baguette',
    'Blessed Boba',
    'Super Snu',
  ];
  const index = Math.min(ranks.length, Math.floor(points / 100));
  return ranks[index];
***REMOVED***

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
***REMOVED***

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
***REMOVED***

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
***REMOVED***

/**
 * Retrieves the level from the number of points.
 * @param {number} points The number of the points the user has.
 * @return {number} The current level of the user.
 */
export const getLevel = points => {
  return Math.floor(points / 100) + 1;
***REMOVED***

/**
 * Determines if given string is a valid website link.
 * @param {string} str The string containing a potential URL.
 * @return {boolean} True if valid URL, false otherwise.
 */
export const isURL = str => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );

  return !!pattern.test(str);
***REMOVED***

/**
 * Ensures a valid website link is an absolute path.
 * @param {string} str The string containing a URL.
 * @return {string} A guaranteed absolute path for the link.
 */
export const getAbsoluteURL = str => {
  if (isURL(str) && !/^https?:\/\//i.test(str)) {
    return 'http://' + str;
  }

  return str;
***REMOVED***
