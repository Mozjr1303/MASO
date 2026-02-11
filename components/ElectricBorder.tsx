import React from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  style?: React.CSSProperties;
  className?: string;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#7df9ff',
  speed = 1,
  chaos = 0.5,
  thickness = 2,
  style = {},
  className = '',
}) => {
  return (
    <div
      className={`electric-border-wrapper ${className}`}
      style={{
        ...style,
        '--electric-color': color,
        '--electric-speed': `${2 / speed}s`,
        '--electric-thickness': `${thickness}px`,
        '--electric-chaos': chaos,
        position: 'relative',
        display: 'inline-block', // Or block, depending on usage. AuthForm card is block-like.
        padding: `${thickness}px`,
        background: 'transparent',
        overflow: 'hidden', // Ensure the border doesn't spill if rounded
      } as React.CSSProperties}
    >
      {/* The Animated Border Background */}
      <div className="electric-border-bg" />

      {/* The Content */}
      <div className="electric-border-content" style={{ borderRadius: 'inherit', height: '100%' }}>
        {children}
      </div>

      <style>{`
        .electric-border-wrapper {
          z-index: 0;
        }

        .electric-border-bg {
          position: absolute;
          inset: 0;
          background: conic-gradient(
            from 0deg, 
            transparent 0deg, 
            transparent 90deg, 
            var(--electric-color) 180deg, 
            transparent 270deg, 
            transparent 360deg
          );
          animation: rotate var(--electric-speed) linear infinite;
          z-index: -1;
        }
        
        /* Add a second layer for more "chaos" or intensity if chaos > 0 */
        .electric-border-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          animation: rotate var(--electric-speed) linear infinite reverse;
          opacity: 0.5;
        }

        .electric-border-content {
          background: transparent;
          position: relative;
          z-index: 1;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ElectricBorder;
