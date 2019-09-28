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
