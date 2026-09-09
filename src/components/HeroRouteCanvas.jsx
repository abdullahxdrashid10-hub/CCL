import { motion } from 'motion/react';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

// Abstract continental hub coordinates for the great-circle bezier curves
const HUBS = [
  { id: 'asia-east', x: 780, y: 160, label: 'East Asia Hub' },
  { id: 'mideast-gulf', x: 540, y: 220, label: 'Gulf Logistics Hub' },
  { id: 'europe-west', x: 420, y: 130, label: 'European Gateway' },
  { id: 'americas-east', x: 220, y: 180, label: 'Americas Atlantic' },
  { id: 'americas-west', x: 120, y: 240, label: 'Americas Pacific' },
  { id: 'asia-south', x: 670, y: 260, label: 'South Asia Corridor' },
];

// Great-circle style curve arcs connecting the hubs
const ROUTES = [
  {
    from: HUBS[0],
    to: HUBS[1],
    path: 'M 780 160 Q 660 110 540 220',
    duration: 4.2,
  },
  {
    from: HUBS[1],
    to: HUBS[2],
    path: 'M 540 220 Q 480 140 420 130',
    duration: 3.8,
  },
  {
    from: HUBS[2],
    to: HUBS[3],
    path: 'M 420 130 Q 320 80 220 180',
    duration: 4.6,
  },
  {
    from: HUBS[3],
    to: HUBS[4],
    path: 'M 220 180 Q 170 190 120 240',
    duration: 3.5,
  },
  {
    from: HUBS[0],
    to: HUBS[5],
    path: 'M 780 160 Q 730 220 670 260',
    duration: 3.2,
  },
  {
    from: HUBS[5],
    to: HUBS[1],
    path: 'M 670 260 Q 600 250 540 220',
    duration: 3.6,
  },
  {
    from: HUBS[0],
    to: HUBS[4],
    path: 'M 780 160 Q 450 40 120 240',
    duration: 5.4,
  },
];

export default function HeroRouteCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 900 400"
        className="h-full w-full max-w-[1400px] opacity-45 transition-opacity duration-1000 md:opacity-60"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients for arcs */}
          <linearGradient
            id="route-gradient-primary"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={BRAND_BLUE} stopOpacity="0.8" />
            <stop offset="50%" stopColor={BRAND_ORANGE} stopOpacity="0.9" />
            <stop offset="100%" stopColor={BRAND_BLUE} stopOpacity="0.4" />
          </linearGradient>

          <linearGradient
            id="route-gradient-subtle"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={BRAND_BLUE} stopOpacity="0.2" />
            <stop offset="50%" stopColor={BRAND_ORANGE} stopOpacity="0.4" />
            <stop offset="100%" stopColor={BRAND_BLUE} stopOpacity="0.1" />
          </linearGradient>

          {/* Radial glow filter */}
          <filter id="glow-route" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Abstract subtle grid lines for logistics technical feel */}
        <g
          opacity="0.07"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeDasharray="3,6"
        >
          <line x1="0" y1="100" x2="900" y2="100" />
          <line x1="0" y1="200" x2="900" y2="200" />
          <line x1="0" y1="300" x2="900" y2="300" />
          <line x1="200" y1="0" x2="200" y2="400" />
          <line x1="450" y1="0" x2="450" y2="400" />
          <line x1="700" y1="0" x2="700" y2="400" />
        </g>

        {/* Static background arc trails */}
        {ROUTES.map((route, i) => (
          <path
            key={`base-${i}`}
            d={route.path}
            fill="none"
            stroke="url(#route-gradient-subtle)"
            strokeWidth="1.2"
            strokeDasharray="4,8"
          />
        ))}

        {/* Animated drawing great-circle paths */}
        {ROUTES.map((route, i) => (
          <motion.path
            key={`anim-${i}`}
            d={route.path}
            fill="none"
            stroke="url(#route-gradient-primary)"
            strokeWidth="1.8"
            filter="url(#glow-route)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0, 0.8, 0.4],
            }}
            transition={{
              duration: route.duration,
              delay: i * 0.4,
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 1.5,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Continental Hub Nodes */}
        {HUBS.map((hub, i) => (
          <g key={hub.id}>
            {/* Outer pulsating ring */}
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              fill="none"
              stroke={BRAND_ORANGE}
              strokeWidth="1"
              initial={{ r: 4, opacity: 0.8 }}
              animate={{ r: [4, 16, 20], opacity: [0.8, 0.2, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />

            {/* Core glowing dot */}
            <circle
              cx={hub.x}
              cy={hub.y}
              r="4"
              fill={BRAND_ORANGE}
              filter="url(#glow-route)"
            />
            <circle cx={hub.x} cy={hub.y} r="2" fill="#FFFFFF" />

            {/* Subtle Hub Coordinate Marker */}
            <text
              x={hub.x + 8}
              y={hub.y + 4}
              fill="#888888"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.1em"
              opacity="0.6"
            >
              {hub.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
