exports.getValue = (array, key) => {
    return array.filter (o => o.key === key)[0].value;
  };
  exports.states = [
    {key: '01', value: 'Computers & Technology'},
    {key: '02', value: 'Arts & Entertainment'},
    {key: '03', value: 'Comics'},
    {key: '04', value: 'Business & Investing'},
    {key: '05', value: 'Education'},
    {key: '06', value: 'Biographies & Memoirs'},
    {key: '07', value: 'Children Books'},
    {key: '08', value: 'Cookery, Food & Wine'},
  ];