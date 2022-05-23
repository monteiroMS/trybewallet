const fetchQuotes = async (currency) => {
  try {
    const response = await fetch(`https://economia.awesomeapi.com.br/last/${currency}-BRL`);
    const { [`${currency}BRL`]: { code, name, ask } } = await response.json();
    return { code, name, ask: Number(parseFloat(ask).toFixed(2)) };
  } catch (error) {
    return { error };
  }
};

export default fetchQuotes;
