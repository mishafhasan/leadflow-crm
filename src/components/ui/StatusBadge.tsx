interface BadgeProps {
  text: string;
  className?: string;
}

export default function Badge({ text, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {text}
    </span>
  );
}
