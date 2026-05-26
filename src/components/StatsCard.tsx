type Props = {
  title: string;
  value: string;
  color: string;
};

const StatsCard = ({
  title,
  value,
  color,
}: Props) => {
  return (
    <div className={`${color} rounded-2xl p-6 text-white shadow-lg`}>

      <h3 className="text-lg">
        {title}
      </h3>

      <h1 className="text-4xl font-bold mt-4">
        {value}
      </h1>

    </div>
  );
};

export default StatsCard;