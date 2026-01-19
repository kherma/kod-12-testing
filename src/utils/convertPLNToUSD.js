export const convertPLNToUSD = (PLN) => {
  if (PLN === undefined) return NaN;

  if (typeof PLN === 'string') return NaN;

  if (PLN === null || typeof PLN === 'object' || typeof PLN === 'function') {
    return 'Error';
  }

  if (typeof PLN === 'number' && PLN < 0) {
    return '$0.00';
  }

  if (typeof PLN === 'number') {
    const PLNtoUSD = PLN / 3.5;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
  }

  return 'Error';
};
