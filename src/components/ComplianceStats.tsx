import ComplianceCard from "./ComplianceCard";

const ComplianceStats = ({ report }: any) => {
  if (!report) return null;

  return (
    <div className="grid grid-cols-4 gap-6">

      <ComplianceCard
        title="Total Workers"
        value={report.totalWorkers}
        color="text-blue-600"
      />

      <ComplianceCard
        title="Compliant"
        value={report.compliantWorkers}
        color="text-green-600"
      />

      <ComplianceCard
        title="Violations"
        value={report.violations.length}
        color="text-red-600"
      />

      <ComplianceCard
        title="Compliance Score"
        value={`${report.complianceScore}%`}
        color="text-purple-600"
      />

    </div>
  );
};

export default ComplianceStats;