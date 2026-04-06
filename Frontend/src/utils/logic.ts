export const parsePrice = (val: any): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  return Number(val.replace(/[^0-9.-]+/g, ''));
};

export const formatCurrency = (num: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num);

export const CATEGORY_COLORS: Record<string, string> = {
  Housing: '#F97316', // Orange
  'Food & Dining': '#EF4444', // Red
  Groceries: '#6B7280', // Grey
  Entertainment: '#EAB308', // Yellow
  Shopping: '#A855F7', // Purple
  Utilities: '#F97316', // Orange (Cycle repeats)
  Transport: '#EF4444', // Red
  Healthcare: '#6B7280', // Grey
  Other: '#EAB308', // Yellow
};

export const calculateQuickStats = (transactions: any[]) => {
  const currentMonthIdx = 3;
  const prevMonthIdx = 2;

  const getSum = (data: any[], type: 'income' | 'expense') =>
    data
      .filter((t) => t.type === type)
      .reduce((acc, t) => acc + parsePrice(t.amount || t.price), 0);

  const allTimeIncome = getSum(transactions, 'income');
  const allTimeExpense = getSum(transactions, 'expense');
  const currentTotalBalance = allTimeIncome - allTimeExpense;

  const currentMonthData = transactions.filter(
    (t) => new Date(t.date).getMonth() === currentMonthIdx,
  );
  const prevMonthData = transactions.filter(
    (t) => new Date(t.date).getMonth() === prevMonthIdx,
  );

  const curIn = getSum(currentMonthData, 'income');
  const curEx = getSum(currentMonthData, 'expense');
  const preIn = getSum(prevMonthData, 'income');
  const preEx = getSum(prevMonthData, 'expense');

  const getTrend = (cur: number, pre: number) => {
    if (pre === 0) return '0%';
    const val = ((cur - pre) / pre) * 100;
    return `${val > 0 ? '+' : ''}${val.toFixed(1)}%`;
  };

  const marchClosingBalance = currentTotalBalance - (curIn - curEx);
  const balanceTrend = getTrend(currentTotalBalance, marchClosingBalance);

  return [
    {
      title: 'Total Balance',
      amount: formatCurrency(currentTotalBalance),
      trend: balanceTrend,
      isPositive: currentTotalBalance > marchClosingBalance,
      highlight: true,
    },
    {
      title: 'Total Spending',
      amount: formatCurrency(curEx),
      trend: getTrend(curEx, preEx),
      isPositive: curEx < preEx,
      highlight: false,
    },
    {
      title: 'Total Incomings',
      amount: formatCurrency(curIn),
      trend: getTrend(curIn, preIn),
      isPositive: curIn > preIn,
      highlight: false,
    },
    {
      title: 'Net Revenue',
      amount: formatCurrency(curIn - curEx),
      trend: getTrend(curIn - curEx, preIn - preEx),
      isPositive: curIn - curEx > preIn - preEx,
      highlight: false,
    },
  ];
};

export const getContinuousData = (transactions: any[]) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return sorted.map((tx) => {
    const dateObj = new Date(tx.date);

    return {
      name: tx.description || tx.category || tx.name,
      fullDate: tx.date,
      displayDate: dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      }),
      income: tx.type === 'income' ? parsePrice(tx.amount || tx.price) : null,
      expenses:
        tx.type === 'expense' ? parsePrice(tx.amount || tx.price) : null,
    };
  });
};

export const getMonthlyBarChartData = (transactions: any[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const monthlyData: Record<string, { income: number; expense: number }> = {};
  months.forEach((m) => (monthlyData[m] = { income: 0, expense: 0 }));

  transactions.forEach((tx) => {
    const dateObj = new Date(tx.date);
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });

    if (monthlyData[monthName]) {
      const amount = parsePrice(tx.amount || tx.price);
      if (tx.type === 'income') {
        monthlyData[monthName].income += amount;
      } else {
        monthlyData[monthName].expense += amount;
      }
    }
  });

  let maxTotal = 0;
  const rawChartData = months.map((month) => {
    const income = monthlyData[month].income;
    const expense = monthlyData[month].expense;
    if (income + expense > maxTotal) maxTotal = income + expense;
    return { month, income, expense };
  });

  maxTotal = maxTotal > 0 ? maxTotal * 1.1 : 1000;

  const yAxisLabels = [];
  for (let i = 5; i >= 0; i--) {
    const val = (maxTotal / 5) * i;
    if (val === 0) yAxisLabels.push('0');
    else if (val >= 1000) yAxisLabels.push(`${Math.round(val / 1000)}k`);
    else yAxisLabels.push(Math.round(val).toString());
  }

  const chartData = rawChartData.map((data) => ({
    month: data.month,
    rawIncome: data.income,
    rawExpense: data.expense,
    profitPercent: maxTotal > 0 ? (data.income / maxTotal) * 100 : 0,
    lossPercent: maxTotal > 0 ? (data.expense / maxTotal) * 100 : 0,
  }));

  return { chartData, yAxisLabels };
};
export const getCategorySpending = (transactions: any[]) => {
  const rawData = transactions
    .filter((t) => t.type === 'expense')
    .reduce(
      (acc, t) => {
        const category = t.category || 'Other';
        acc[category] = (acc[category] || 0) + parsePrice(t.amount || t.price);
        return acc;
      },
      {} as Record<string, number>,
    );

  return Object.entries(rawData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, value]) => ({
      name,
      value,
      fill: CATEGORY_COLORS[name] || '#FF6B3D',
    }));
};
