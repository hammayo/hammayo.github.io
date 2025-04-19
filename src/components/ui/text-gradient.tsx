interface TextGradientProps {
  text: string;
  from?: string;
  via?: string;
  to?: string;
  className?: string;
}

export default function TextGradient({
  text,
  from = "from-orange-700",
  via = "via-blue-500",
  to = "to-green-400",
  className = ""
}: TextGradientProps) {
  return (
    <span
      className={`bg-gradient-to-r ${from} ${via} ${to} text-transparent bg-clip-text animate-gradient bg-300% ${className}`}
    >
      {text}
    </span>
  );
}
