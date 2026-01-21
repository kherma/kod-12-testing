import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import { useMemo } from 'react';
import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {
  const isInvalidAmount = amount < 0;

  const convertedAmount = useMemo(() => {
    if (isInvalidAmount) return null;

    if (from === 'USD' && to === 'PLN') return convertUSDToPLN(amount);
    if (from === 'PLN' && to === 'USD') return convertPLNToUSD(amount);

    return formatAmountInCurrency(amount, from);
  }, [from, to, amount, isInvalidAmount]);

  const formattedAmount = useMemo(() => {
    if (isInvalidAmount) return null;
    return formatAmountInCurrency(amount, from);
  }, [amount, from, isInvalidAmount]);

  return (
    <div className={styles.result} data-testid='output'>
      {isInvalidAmount
        ? 'Wrong value...'
        : `${formattedAmount} = ${convertedAmount}`}
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default ResultBox;
