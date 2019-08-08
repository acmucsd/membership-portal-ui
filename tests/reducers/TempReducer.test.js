import TempReducer from '../../src/reducers/TempReducer.js'

it('should return the initial state', () => {
  expect(TempReducer(undefined, {})).toEqual({});
});
