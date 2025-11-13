type Props = {
  label: string;
  probability: number;
};

export function ResultCard({ label, probability }: Props) {
  const isStress = label.toLowerCase() === "stress";
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <div className="text-sm text-gray-500">Model Prediction</div>
      <div className="mt-1 text-2xl font-semibold">
        <span className={isStress ? "text-amber-700" : "text-purple-700"}>{label}</span>
      </div>
      <div className="mt-2 text-stone-700">Probability: {(probability * 100).toFixed(1)}%</div>
    </div>
  );
}


