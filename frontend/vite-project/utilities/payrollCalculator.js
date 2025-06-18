export const calculateSalary = (yearlySalary, dayDiff) => {
  return (yearlySalary / 365) * dayDiff;
};

export const calculateUpgrades = (upgradeCount) => {
  return upgradeCount * (10000 / 260);
};

export const calculateGross = (bonus, upgrades, salary) => {
  const total = bonus + upgrades + salary;
  return total;
};

export const calculateSuper = (gross) => {
  return gross * 0.12;
};

export const calculateNet = (gross, tax) => {
  return gross - tax;
};

export const taxCalculator = (gross, dayDiff) => {
  let tax = 0;
  const expectedYearlySalary = gross * (365 / dayDiff);

  if (expectedYearlySalary <= 18200) {
    tax = 0;
  } else if (expectedYearlySalary <= 45000) {
    tax = 0.19 * (expectedYearlySalary - 18200);
  } else if (expectedYearlySalary <= 120000) {
    tax = 5092 + 0.325 * (expectedYearlySalary - 45000);
  } else if (expectedYearlySalary <= 180000) {
    tax = 29467 + 0.37 * (expectedYearlySalary - 120000);
  } else {
    tax = 51667 + 0.45 * (expectedYearlySalary - 180000);
  }
  const payTax = tax / (365 / dayDiff);
  return payTax;
};
