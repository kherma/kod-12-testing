import '@testing-library/jest-dom';
import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';

describe('Component ResultBox', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  const fromPLNToUSDTestCases = [
    { amountPLN: 100, expectedOutput: 'PLN 100.00 = $28.57' },
    { amountPLN: 153, expectedOutput: 'PLN 153.00 = $43.71' },
    { amountPLN: 256, expectedOutput: 'PLN 256.00 = $73.14' },
    { amountPLN: 400, expectedOutput: 'PLN 400.00 = $114.29' },
  ];

  for (const { amountPLN, expectedOutput } of fromPLNToUSDTestCases) {
    it(`should render proper info about conversion when PLN ${amountPLN} -> USD`, () => {
      render(<ResultBox from='PLN' to='USD' amount={amountPLN} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(expectedOutput);
    });
  }

  const fromUSDToPLNTestCases = [
    { amountUSD: 100, expectedOutput: `$100.00 = PLN 350.00` },
    { amountUSD: 153, expectedOutput: `$153.00 = PLN 535.50` },
    { amountUSD: 256, expectedOutput: `$256.00 = PLN 896.00` },
    { amountUSD: 400, expectedOutput: `$400.00 = PLN 1,400.00` },
  ];

  for (const { amountUSD, expectedOutput } of fromUSDToPLNTestCases) {
    it(`should render proper info about conversion when USD ${amountUSD} -> PLN`, () => {
      render(<ResultBox from='USD' to='PLN' amount={amountUSD} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(expectedOutput);
    });
  }

  const sameCurrencyTestCases = [
    {
      from: 'PLN',
      to: 'PLN',
      amount: 100,
      expectedOutput: 'PLN 100.00 = PLN 100.00',
    },
    {
      from: 'PLN',
      to: 'PLN',
      amount: 250,
      expectedOutput: 'PLN 250.00 = PLN 250.00',
    },
    {
      from: 'USD',
      to: 'USD',
      amount: 100,
      expectedOutput: '$100.00 = $100.00',
    },
    {
      from: 'USD',
      to: 'USD',
      amount: 75,
      expectedOutput: '$75.00 = $75.00',
    },
  ];

  for (const { from, to, amount, expectedOutput } of sameCurrencyTestCases) {
    it(`should render the same amount when ${from} -> ${to} (${amount})`, () => {
      render(<ResultBox from={from} to={to} amount={amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(expectedOutput);
    });
  }

  const negativeAmountTestCases = [
    { from: 'PLN', to: 'USD', amount: -100 },
    { from: 'USD', to: 'PLN', amount: -50 },
  ];

  for (const { from, to, amount } of negativeAmountTestCases) {
    it(`should render error message for negative amount (${from} -> ${to}, ${amount})`, () => {
      render(<ResultBox from={from} to={to} amount={amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value...');
    });
  }
});
