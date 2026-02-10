interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h2 className={`text-3xl md:text-4xl font-heading text-bistro mb-8 text-center ${className}`}>
      {children}
      <span className="block w-16 h-0.5 bg-accent mx-auto mt-3" />
    </h2>
  );
}
