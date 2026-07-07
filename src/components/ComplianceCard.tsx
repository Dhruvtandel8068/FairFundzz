type Props = {
  title: string;
  value: string | number;
  color: string;
};

const ComplianceCard = ({ title, value, color }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h4 className="text-gray-500 text-lg">{title}</h4>

      <h1 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h1>
    </div>
  );
};

export default ComplianceCard;