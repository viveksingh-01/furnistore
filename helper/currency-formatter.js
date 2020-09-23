const currencyFormatter = figure => {
  let [dollar, cents] = figure.toString().split('.');
  dollar = dollar.split('').reverse().join('');
  let formattedDollar = dollar.substr(0, 3);
  if (dollar.length > 3) {
    formattedDollar = dollar.substr(0, 3);
    for (let i = 3; i < dollar.length; i = i + 3) {
      formattedDollar += ',' + dollar.substr(i, 3);
    }
  }
  let formattedCurrency = formattedDollar.split('').reverse().join('');
  if (cents) {
    formattedCurrency += '.' + cents;
  }
  return formattedCurrency;
};
