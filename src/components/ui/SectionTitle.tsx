import TandemBike from "@/components/ui/TandemBike";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 className="text-3xl md:text-5xl font-heading text-bistro">{children}</h2>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-bistro/25" />
        <TandemBike className="w-16 h-6 text-mountain/70" />
        <span className="h-px w-10 bg-bistro/25" />
      </div>
    </div>
  );
}
