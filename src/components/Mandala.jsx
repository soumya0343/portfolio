import React, { useMemo } from "react";

function generatePetalPath(cx, cy, radius, petalWidth, angle) {
  const rad = (angle * Math.PI) / 180;
  const tipX = cx + radius * Math.cos(rad);
  const tipY = cy + radius * Math.sin(rad);
  const leftRad = ((angle - petalWidth) * Math.PI) / 180;
  const rightRad = ((angle + petalWidth) * Math.PI) / 180;
  const baseRadius = radius * 0.35;
  const leftX = cx + baseRadius * Math.cos(leftRad);
  const leftY = cy + baseRadius * Math.sin(leftRad);
  const rightX = cx + baseRadius * Math.cos(rightRad);
  const rightY = cy + baseRadius * Math.sin(rightRad);
  const cp1Radius = radius * 0.7;
  const cp1LeftX =
    cx + cp1Radius * Math.cos(((angle - petalWidth * 0.5) * Math.PI) / 180);
  const cp1LeftY =
    cy + cp1Radius * Math.sin(((angle - petalWidth * 0.5) * Math.PI) / 180);
  const cp1RightX =
    cx + cp1Radius * Math.cos(((angle + petalWidth * 0.5) * Math.PI) / 180);
  const cp1RightY =
    cy + cp1Radius * Math.sin(((angle + petalWidth * 0.5) * Math.PI) / 180);

  return `M ${leftX} ${leftY} Q ${cp1LeftX} ${cp1LeftY} ${tipX} ${tipY} Q ${cp1RightX} ${cp1RightY} ${rightX} ${rightY} Z`;
}

const Mandala = React.memo(function Mandala({
  size = 280,
  colorPrimary = "#D4A85A",
  colorSecondary = "#E8732A",
  colorAccent = "#7B5EA7",
  colorExtra1 = "#2ABFBF",
  colorExtra2 = "#C2385A",
  colorExtra3 = "#E8557A",
  rotationSpeed = 60,
  opacity = 1,
  direction = "cw",
  rings = 8,
  className = "",
  style = {},
  drawAnimation = false,
}) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 4;

  const ringColors = [
    colorPrimary,
    colorSecondary,
    colorAccent,
    colorExtra1,
    colorExtra2,
    colorExtra3,
    colorPrimary,
    colorSecondary,
  ];

  const layers = useMemo(() => {
    const result = [];
    for (let r = 0; r < rings; r++) {
      const ringRadius = maxRadius * ((r + 1) / rings);
      const petalCount = 6 + r * 2;
      const isStrokeOnly = r >= rings - 3;
      const ringColor = ringColors[r % ringColors.length];
      const petalWidth = 360 / petalCount / 3;
      const petals = [];

      for (let p = 0; p < petalCount; p++) {
        const angle = (360 / petalCount) * p;
        petals.push(
          <path
            key={`r${r}-p${p}`}
            d={generatePetalPath(cx, cy, ringRadius, petalWidth, angle)}
            fill={isStrokeOnly ? "none" : ringColor}
            fillOpacity={isStrokeOnly ? 0 : 0.15 + r * 0.05}
            stroke={ringColor}
            strokeWidth={isStrokeOnly ? 1 : 0.5}
            strokeOpacity={0.6 + r * 0.05}
            style={
              drawAnimation
                ? {
                    strokeDasharray: 200,
                    strokeDashoffset: 200,
                    animation: `mandala-draw 2.5s ease forwards ${r * 0.2}s`,
                  }
                : undefined
            }
          />,
        );
      }

      // Decorative circle for this ring
      petals.push(
        <circle
          key={`ring-${r}`}
          cx={cx}
          cy={cy}
          r={ringRadius}
          fill="none"
          stroke={ringColor}
          strokeWidth={0.3}
          strokeOpacity={0.3}
          strokeDasharray={r % 2 === 0 ? "none" : "4 4"}
        />,
      );

      result.push(petals);
    }
    return result;
  }, [
    rings,
    size,
    colorPrimary,
    colorSecondary,
    colorAccent,
    colorExtra1,
    colorExtra2,
    colorExtra3,
  ]);

  const animationName =
    direction === "ccw" ? "mandala-spin-ccw" : "mandala-spin-cw";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{
        opacity,
        animation:
          rotationSpeed > 0 && !drawAnimation
            ? `${animationName} ${rotationSpeed}s linear infinite`
            : undefined,
        willChange: "transform",
        ...style,
      }}
    >
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={3} fill={colorPrimary} opacity={0.8} />
      {layers.map((petals, i) => (
        <g key={i}>{petals}</g>
      ))}
    </svg>
  );
});

export default Mandala;
