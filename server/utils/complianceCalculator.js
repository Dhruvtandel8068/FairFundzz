export const calculateComplianceScore = (
  totalWorkers,
  totalViolations
) => {
  if (totalWorkers === 0) return 100;

  const deduction = (totalViolations / totalWorkers) * 100;

  let score = 100 - deduction;

  if (score < 0) score = 0;

  return Number(score.toFixed(2));
};