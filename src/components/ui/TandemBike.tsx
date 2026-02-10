interface TandemBikeProps {
  className?: string;
  color?: string;
}

export default function TandemBike({ className = "", color = "currentColor" }: TandemBikeProps) {
  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Roue arrière */}
      <circle cx="40" cy="55" r="22" stroke={color} strokeWidth="2.5" />
      <circle cx="40" cy="55" r="3" fill={color} />
      {/* Rayons roue arrière */}
      <line x1="40" y1="33" x2="40" y2="77" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="18" y1="55" x2="62" y2="55" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="24.5" y1="39.5" x2="55.5" y2="70.5" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="55.5" y1="39.5" x2="24.5" y2="70.5" stroke={color} strokeWidth="0.8" opacity="0.5" />

      {/* Roue avant */}
      <circle cx="160" cy="55" r="22" stroke={color} strokeWidth="2.5" />
      <circle cx="160" cy="55" r="3" fill={color} />
      {/* Rayons roue avant */}
      <line x1="160" y1="33" x2="160" y2="77" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="138" y1="55" x2="182" y2="55" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="144.5" y1="39.5" x2="175.5" y2="70.5" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="175.5" y1="39.5" x2="144.5" y2="70.5" stroke={color} strokeWidth="0.8" opacity="0.5" />

      {/* Cadre - tube diagonal arrière */}
      <line x1="40" y1="55" x2="75" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Cadre - tube horizontal bas */}
      <line x1="40" y1="55" x2="130" y2="55" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Cadre - tube horizontal haut */}
      <line x1="75" y1="25" x2="140" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Cadre - tube diagonal milieu */}
      <line x1="100" y1="55" x2="100" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Cadre - tube diagonal avant */}
      <line x1="130" y1="55" x2="140" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Fourche avant */}
      <line x1="140" y1="25" x2="160" y2="55" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

      {/* Selle arrière */}
      <line x1="75" y1="25" x2="75" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="15" x2="82" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Selle avant */}
      <line x1="120" y1="25" x2="120" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="113" y1="15" x2="127" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Guidon */}
      <line x1="140" y1="25" x2="148" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="144" y1="12" x2="152" y2="16" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Pédalier arrière */}
      <circle cx="75" cy="55" r="6" stroke={color} strokeWidth="1.5" />
      <line x1="69" y1="55" x2="81" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Pédalier avant */}
      <circle cx="100" cy="55" r="6" stroke={color} strokeWidth="1.5" />
      <line x1="94" y1="55" x2="106" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
