import React, { useState, useEffect,useRef } from "react";
const NoTeamsAnimation = ({ message1, message2 ,message3}) => {
  const [animationFrame, setAnimationFrame] = useState(0);

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame((prev) => (prev + 1) % 60);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Calculate animation values
  const bounce = Math.sin(animationFrame * 0.1) * 8;
  const rotation = Math.sin(animationFrame * 0.05) * 5;
  const scale = 0.95 + Math.sin(animationFrame * 0.1) * 0.05;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto text-center">
      {/* Animated illustration */}
      <div
        className="relative mb-6"
        style={{
          transform: `translateY(${bounce}px) rotate(${rotation}deg) scale(${scale})`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
          <div className="relative">
            {/* User icon */}
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            {/* Animated question marks */}
            <div
              className="absolute -right-4 -top-4 text-lg font-bold text-blue-500"
              style={{ opacity: Math.sin(animationFrame * 0.2) * 0.5 + 0.5 }}
            >
              ?
            </div>
            <div
              className="absolute -left-4 -top-2 text-lg font-bold text-blue-500"
              style={{
                opacity: Math.sin((animationFrame + 20) * 0.2) * 0.5 + 0.5,
              }}
            >
              ?
            </div>
          </div>
        </div>

        {/* Animated dotted circle representing potential team members */}
        <div
          className="absolute inset-0 rounded-full border-4 border-dashed border-blue-300"
          style={{
            transform: `rotate(${-animationFrame}deg)`,
            opacity: 0.7,
          }}
        ></div>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{message1}</h2>
      <p className="text-gray-600 mb-6">
        {message2}
      </p>

      {/* Button with subtle hover animation */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
        onClick={() => console.log("Find teammates clicked")}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>{message3}</span>
      </button>
    </div>
  );
};



const AllCaughtUpAnimation = () => {
    const [animationFrame, setAnimationFrame] = useState(0);
    
    // Animation effect
    useEffect(() => {
      const interval = setInterval(() => {
        setAnimationFrame(prev => (prev + 1) % 120);
      }, 50);
      
      return () => clearInterval(interval);
    }, []);
    
    // Calculate animation values
    const checkmarkProgress = Math.min(1, animationFrame / 30);
    const celebrationOpacity = animationFrame > 30 ? Math.sin((animationFrame - 30) * 0.05) * 0.5 + 0.5 : 0;
    const bounce = animationFrame > 30 ? Math.sin((animationFrame - 30) * 0.1) * 5 : 0;
    const rotation = Math.sin(animationFrame * 0.02) * 3;
    
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg shadow-lg max-w-md mx-auto text-center">
        {/* Animated illustration */}
        <div 
          className="relative mb-6"
          style={{
            transform: `translateY(${bounce}px) rotate(${rotation}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Main circle */}
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
            {/* Checkmark */}
            <svg className="w-16 h-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path 
                d="M20 6L9 17L4 12" 
                strokeDasharray="30"
                strokeDashoffset={30 - (30 * checkmarkProgress)}
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
              />
            </svg>
          </div>
          
          {/* Celebration particles */}
          <div className="absolute inset-0" style={{ opacity: celebrationOpacity }}>
            {/* Stars */}
            <div className="absolute -top-6 left-12 text-yellow-400 text-2xl" style={{ transform: `rotate(${animationFrame * 2}deg)` }}>✦</div>
            <div className="absolute -right-4 top-8 text-yellow-500 text-xl" style={{ transform: `rotate(${-animationFrame * 1.5}deg)` }}>✦</div>
            <div className="absolute -left-4 top-8 text-yellow-300 text-xl" style={{ transform: `rotate(${animationFrame * 1.8}deg)` }}>✦</div>
            <div className="absolute -bottom-2 right-12 text-yellow-400 text-lg" style={{ transform: `rotate(${-animationFrame}deg)` }}>✦</div>
            
            {/* Confetti */}
            <div className="absolute top-0 -right-2 w-4 h-4 bg-blue-400 rounded-full" 
                 style={{ transform: `translateY(${Math.sin(animationFrame * 0.15) * 12}px)` }}></div>
            <div className="absolute -top-2 right-10 w-3 h-3 bg-purple-400 rounded-full" 
                 style={{ transform: `translateY(${Math.sin((animationFrame + 20) * 0.12) * 15}px)` }}></div>
            <div className="absolute -top-3 left-10 w-3 h-3 bg-pink-400 rounded-full" 
                 style={{ transform: `translateY(${Math.sin((animationFrame + 40) * 0.1) * 14}px)` }}></div>
            <div className="absolute top-2 -left-2 w-4 h-4 bg-orange-400 rounded-full" 
                 style={{ transform: `translateY(${Math.sin((animationFrame + 60) * 0.13) * 10}px)` }}></div>
          </div>
        </div>
        
        {/* Message */}
        <h2 className="text-2xl font-bold text-green-800 mb-2">All Caught Up!</h2>
        <p className="text-green-600 mb-6">You have no pending assignments. Great job!</p>
        
        {/* Relaxation message */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100 max-w-xs">
          <p className="text-gray-600 text-sm">Time to relax or get ahead on future projects!</p>
        </div>
      </div>
    );
  };


  const NoInvitationsAnimation = () => {
    const [animationFrame, setAnimationFrame] = useState(0);
  
    // Animation effect
    useEffect(() => {
      const interval = setInterval(() => {
        setAnimationFrame((prev) => (prev + 1) % 120);
      }, 50);
  
      return () => clearInterval(interval);
    }, []);
  
    // Calculate animation values
    const bounce = Math.sin(animationFrame * 0.1) * 8;
    const rotation = Math.sin(animationFrame * 0.05) * 4;
    const scale = 0.95 + Math.sin(animationFrame * 0.1) * 0.05;
    const envelopeOpacity = Math.sin(animationFrame * 0.1) * 0.3 + 0.7;
  
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-indigo-50 rounded-lg shadow-lg max-w-md mx-auto text-center">
        {/* Animated illustration */}
        <div
          className="relative mb-6"
          style={{
            transform: `translateY(${bounce}px) rotate(${rotation}deg) scale(${scale})`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
            <div className="relative">
              {/* Envelope icon */}
              <div 
                className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center"
                style={{ opacity: envelopeOpacity }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2" />
                  <path d="M22 6v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6" />
                  <path d="M2 6l10 7 10-7" />
                </svg>
              </div>
  
              {/* Animated question marks */}
              <div
                className="absolute -right-4 -top-4 text-lg font-bold text-indigo-500"
                style={{ opacity: Math.sin(animationFrame * 0.2) * 0.5 + 0.5 }}
              >
                ?
              </div>
              <div
                className="absolute -left-4 -top-2 text-lg font-bold text-indigo-500"
                style={{
                  opacity: Math.sin((animationFrame + 20) * 0.2) * 0.5 + 0.5,
                }}
              >
                ?
              </div>
            </div>
          </div>
  
          {/* Animated dotted circle representing potential invitations */}
          <div
            className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-300"
            style={{
              transform: `rotate(${-animationFrame * 0.5}deg)`,
              opacity: 0.7,
            }}
          ></div>
        </div>
  
        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You have no invitations</h2>
        <p className="text-gray-600 mb-6">
          When you receive invitations, they will appear here
        </p>
  
        {/* Button with subtle hover animation */}
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          onClick={() => console.log("Refresh clicked")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
          </svg>
          <span>Refresh</span>
        </button>
  
        {/* Small animated notification dots */}
        <div className="flex mt-6 space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-indigo-400"
              style={{
                opacity: Math.sin((animationFrame + index * 15) * 0.1) * 0.5 + 0.5,
                transform: `scale(${
                  Math.sin((animationFrame + index * 15) * 0.1) * 0.3 + 0.7
                })`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  const ClassGitLoadingAnimation = () => {
    const [animationFrame, setAnimationFrame] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setAnimationFrame(prev => (prev + 1) % 180);
      }, 16); // ~60fps for smooth animation
  
      return () => clearInterval(interval);
    }, []);
  
    // Calculate animation phases
    const phase = animationFrame / 180;
    const gitPathProgress = Math.min(1, (animationFrame % 90) / 45);
    const gitNodeOpacity = animationFrame % 90 > 45 ? 1 : (animationFrame % 90) / 45;
    const floatEffect = Math.sin(phase * Math.PI * 2) * 8;
    const rotateEffect = Math.sin(phase * Math.PI * 2) * 3;
    
    // Calculate positions for nodes in the git flow
    const getNodePosition = (index, total) => {
      const angle = (index / total) * Math.PI * 2;
      const radius = 40;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      };
    };
  
    // Generate nodes for the git flow
    const nodePositions = [0, 1, 2, 3, 4, 5].map(i => getNodePosition(i, 6));
  
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full bg-gray-100 rounded-lg">
        <div 
          className="relative w-64 h-64"
          style={{
            transform: `translateY(${floatEffect}px)`,
          }}
        >
          {/* Central emblem */}
          <div 
            className="absolute left-1/2 top-1/2 w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{
              transform: `translate(-50%, -50%) rotate(${rotateEffect}deg)`,
            }}
          >
            {/* CG Logo */}
            <div className="text-white font-bold text-2xl">CG</div>
          </div>
          
          {/* Git network animation */}
          <svg 
            className="absolute top-0 left-0 w-full h-full"
            viewBox="-100 -100 200 200"
            style={{
              transform: `rotate(${animationFrame}deg)`,
            }}
          >
            {/* Circle path */}
            <circle 
              cx="0" 
              cy="0" 
              r="40" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="2" 
              strokeDasharray="10 5"
              strokeOpacity="0.6"
            />
            
            {/* Git flow paths */}
            {nodePositions.map((pos, i) => {
              const nextPos = nodePositions[(i + 1) % nodePositions.length];
              return (
                <path
                  key={`path-${i}`}
                  d={`M ${pos.x} ${pos.y} Q 0 0, ${nextPos.x} ${nextPos.y}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="50"
                  strokeDashoffset={50 - gitPathProgress * 50}
                  strokeOpacity="0.8"
                />
              );
            })}
            
            {/* Git nodes */}
            {nodePositions.map((pos, i) => (
              <circle
                key={`node-${i}`}
                cx={pos.x}
                cy={pos.y}
                r="6"
                fill="#10b981"
                opacity={Math.max(0.3, gitNodeOpacity)}
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
                }}
              />
            ))}
          </svg>
          
          {/* Pulse effect */}
          <div 
            className="absolute left-1/2 top-1/2 w-24 h-24 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(-50%, -50%) scale(${1 + Math.sin(phase * Math.PI * 3) * 0.2})`,
              opacity: 0.2 + Math.sin(phase * Math.PI * 3) * 0.1,
            }}
          />
          
          {/* Education icons floating around */}
          {[0, 1, 2].map((i) => {
            const angle = (i / 3) * Math.PI * 2 + (animationFrame / 180) * Math.PI * 2;
            const radius = 70;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div
                key={`icon-${i}`}
                className="absolute w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center"
                style={{
                  transform: `translate(${x + 96}px, ${y + 96}px) rotate(${angle * 180 / Math.PI}deg)`,
                  opacity: 0.8 + Math.sin((animationFrame + i * 30) * 0.05) * 0.2,
                }}
              >
                {i === 0 ? (
                  // Book icon
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ) : i === 1 ? (
                  // Code icon
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ) : (
                  // Graduation cap icon
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Loading text */}
        <div className="mt-4 text-center">
          <div className="text-lg font-bold text-gray-800">
            <span className="text-blue-600">Class</span>
            <span className="text-green-600">Git</span>
          </div>
          <div className="flex items-center justify-center mt-2">
            <div className="text-sm text-gray-600">Loading</div>
            <div className="ml-2 flex">
              {[0, 1, 2].map((i) => (
                <div 
                  key={`dot-${i}`} 
                  className="w-2 h-2 mx-1 rounded-full bg-blue-500"
                  style={{
                    opacity: Math.sin((animationFrame + i * 20) * 0.1) * 0.5 + 0.5,
                    transform: `scale(${Math.sin((animationFrame + i * 20) * 0.1) * 0.3 + 0.7})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };




  const EnhancedAnimation = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;
      let particles = [];
      let triangles = [];
      let circles = [];
      let time = 0;
      
      // Set canvas size
      const setCanvasSize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      
      // Initialize animation elements
      const initialize = () => {
        particles = [];
        triangles = [];
        circles = [];
        
        // Create particles
        for (let i = 0; i < 30; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.2
          });
        }
        
        // Create triangles
        for (let i = 0; i < 5; i++) {
          triangles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 50 + 30,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() * 0.001 - 0.0005),
            speedX: Math.random() * 0.3 - 0.15,
            speedY: Math.random() * 0.3 - 0.15,
            opacity: Math.random() * 0.05 + 0.05,
            hue: Math.random() * 60 + 220 // Blue to purple range
          });
        }
        
        // Create circles
        for (let i = 0; i < 4; i++) {
          circles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 100 + 50,
            speedX: Math.random() * 0.2 - 0.1,
            speedY: Math.random() * 0.2 - 0.1,
            opacity: Math.random() * 0.08 + 0.05,
            hue: Math.random() * 60 + 180 // Cyan to blue range
          });
        }
      };
      
      // Draw a triangle
      const drawTriangle = (x, y, size, rotation, opacity, hue) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
        ctx.lineTo(-size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
        ctx.closePath();
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
        ctx.fill();
        ctx.restore();
      };
      
      // Draw a circle with gradient
      const drawCircle = (x, y, radius, opacity, hue) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${opacity})`);
        gradient.addColorStop(1, `hsla(${hue}, 70%, 60%, 0)`);
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      };
      
      // Draw grid lines
      const drawGrid = () => {
        const gridSize = 40;
        const lineWidth = 0.5;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = lineWidth;
        
        // Vertical lines
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      };
      
      // Draw a wave
      const drawWave = (period, amplitude, offset, opacity) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin((x + offset) / period) * amplitude + canvas.height / 2;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
        gradient.addColorStop(0, `rgba(100, 120, 255, ${opacity})`);
        gradient.addColorStop(1, `rgba(100, 120, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      };
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.01;
        
        // Draw background grid
        drawGrid();
        
        // Draw waves
        drawWave(200, 20, time * 50, 0.05);
        drawWave(120, 15, -time * 30, 0.03);
        
        // Update and draw circles
        circles.forEach(circle => {
          circle.x += circle.speedX;
          circle.y += circle.speedY;
          
          // Bounce off edges
          if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
            circle.speedX *= -1;
          }
          if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
            circle.speedY *= -1;
          }
          
          drawCircle(circle.x, circle.y, circle.radius, circle.opacity, circle.hue);
        });
        
        // Update and draw triangles
        triangles.forEach(triangle => {
          triangle.x += triangle.speedX;
          triangle.y += triangle.speedY;
          triangle.rotation += triangle.rotationSpeed;
          
          // Bounce off edges
          if (triangle.x - triangle.size < 0 || triangle.x + triangle.size > canvas.width) {
            triangle.speedX *= -1;
          }
          if (triangle.y - triangle.size < 0 || triangle.y + triangle.size > canvas.height) {
            triangle.speedY *= -1;
          }
          
          drawTriangle(triangle.x, triangle.y, triangle.size, triangle.rotation, triangle.opacity, triangle.hue);
        });
        
        // Update and draw particles
        particles.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.fill();
        });
        
        animationFrameId = window.requestAnimationFrame(animate);
      };
      
      // Handle window resize
      const handleResize = () => {
        setCanvasSize();
        initialize();
      };
      
      // Initialize and start animation
      setCanvasSize();
      initialize();
      animate();
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.cancelAnimationFrame(animationFrameId);
      };
    }, []);
    
    return (
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: 'linear-gradient(to bottom right, #0a1128, #1c2e4a)' }}
      />
    );
  };
  




const ClassGitAnimation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let gitNodes = [];
    let connections = [];
    let particles = [];
    let time = 0;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Initialize animation elements
    const initialize = () => {
      gitNodes = [];
      connections = [];
      particles = [];
      
      // Create main branch
      const mainBranchLength = 7;
      const mainBranchSpacing = canvas.height / (mainBranchLength + 1);
      
      for (let i = 0; i < mainBranchLength; i++) {
        gitNodes.push({
          x: canvas.width * 0.3,
          y: mainBranchSpacing * (i + 1),
          radius: 8,
          type: 'main',
          color: '#64B5F6',
          pulseSpeed: 0.02 + Math.random() * 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          connections: []
        });
      }
      
      // Create feature branches
      const numFeatureBranches = 3;
      for (let i = 0; i < numFeatureBranches; i++) {
        const startNodeIndex = Math.floor(Math.random() * (mainBranchLength - 2)) + 1;
        const startNode = gitNodes[startNodeIndex];
        const branchLength = Math.floor(Math.random() * 3) + 2;
        
        let prevNode = startNode;
        for (let j = 0; j < branchLength; j++) {
          const newNode = {
            x: prevNode.x + canvas.width * 0.1,
            y: prevNode.y - mainBranchSpacing * 0.5,
            radius: 6,
            type: 'feature',
            color: '#7E57C2',
            pulseSpeed: 0.03 + Math.random() * 0.01,
            pulseOffset: Math.random() * Math.PI * 2,
            connections: []
          };
          
          gitNodes.push(newNode);
          
          // Create connection between nodes
          connections.push({
            from: prevNode,
            to: newNode,
            progress: 0,
            speed: 0.005 + Math.random() * 0.002
          });
          
          prevNode.connections.push(newNode);
          prevNode = newNode;
        }
        
        // Merge back to main branch
        const mergeNodeIndex = Math.min(startNodeIndex + 2, mainBranchLength - 1);
        const mergeNode = gitNodes[mergeNodeIndex];
        
        connections.push({
          from: prevNode,
          to: mergeNode,
          progress: 0,
          speed: 0.003 + Math.random() * 0.002
        });
        
        prevNode.connections.push(mergeNode);
      }
      
      // Create particles
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    // Draw a node
    const drawNode = (node, time) => {
      // Draw pulsing glow
      const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.5 + 0.5;
      const glowRadius = node.radius * (2 + pulse);
      
      const gradient = ctx.createRadialGradient(node.x, node.y, node.radius * 0.5, node.x, node.y, glowRadius);
      gradient.addColorStop(0, node.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      
      // Add highlight
      ctx.beginPath();
      ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
    };
    
    // Draw a connection
    const drawConnection = (connection) => {
      const { from, to, progress } = connection;
      
      // Calculate points along the curve
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      const controlX = midX + (to.y - from.y) * 0.5;
      const controlY = midY - (to.x - from.x) * 0.2;
      
      // Draw growing line
      if (progress > 0) {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        
        const numPoints = Math.ceil(progress * 30);
        for (let i = 1; i <= numPoints; i++) {
          const t = i / 30;
          const x = Math.pow(1 - t, 2) * from.x + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * to.x;
          const y = Math.pow(1 - t, 2) * from.y + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * to.y;
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = 'rgba(120, 144, 240, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw moving dots on the line
        const dotCount = 3;
        for (let i = 0; i < dotCount; i++) {
          const t = (time * 0.2 + i / dotCount) % 1;
          if (t <= progress) {
            const x = Math.pow(1 - t, 2) * from.x + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * to.x;
            const y = Math.pow(1 - t, 2) * from.y + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * to.y;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(160, 200, 255, 0.8)';
            ctx.fill();
          }
        }
      }
    };
    
    // Draw a C shape
    const drawCShape = (time) => {
      const x = canvas.width * 0.65;
      const y = canvas.height * 0.5;
      const radius = Math.min(canvas.width, canvas.height) * 0.15;
      const lineWidth = 10;
      const opacity = 0.3 + Math.sin(time * 0.5) * 0.1;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, Math.PI * 0.8, Math.PI * 1.2, true);
      ctx.strokeStyle = `rgba(100, 181, 246, ${opacity})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(x, y, radius - lineWidth, Math.PI * 0.8, Math.PI * 1.2, true);
      ctx.strokeStyle = `rgba(126, 87, 194, ${opacity})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };
    
    // Draw grid background
    const drawGrid = () => {
      const gridSize = 30;
      const lineWidth = 0.5;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = lineWidth;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      
      // Draw background grid
      drawGrid();
      
      // Draw the C shape
      drawCShape(time);
      
      // Update and draw connections
      connections.forEach(connection => {
        if (connection.progress < 1) {
          connection.progress += connection.speed;
          if (connection.progress > 1) connection.progress = 1;
        }
        drawConnection(connection);
      });
      
      // Draw nodes
      gitNodes.forEach(node => {
        drawNode(node, time);
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      initialize();
    };
    
    // Initialize and start animation
    setCanvasSize();
    initialize();
    animate();
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(to bottom right, #0a1128, #1c2e4a)' }}
    />
  );
};




const ProcessorAnimation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let processorNodes = [];
    let connections = [];
    let dataPulses = [];
    let time = 0;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Initialize animation elements
    const initialize = () => {
      processorNodes = [];
      connections = [];
      dataPulses = [];
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const loginFormRadius = Math.min(canvas.width, canvas.height) * 0.15;
      
      // Create central processor node (represents the login form area)
      const centralNode = {
        x: centerX,
        y: centerY,
        radius: loginFormRadius,
        type: 'central',
        color: 'rgba(64, 196, 255, 0.2)',
        pulseSpeed: 0.02,
        pulseOffset: 0,
        connections: []
      };
      
      // Create primary nodes in a circular pattern around the center
      const primaryNodeCount = 8;
      const primaryNodes = [];
      const primaryNodeRadius = Math.min(canvas.width, canvas.height) * 0.3;
      
      for (let i = 0; i < primaryNodeCount; i++) {
        const angle = (Math.PI * 2 / primaryNodeCount) * i;
        const node = {
          x: centerX + Math.cos(angle) * primaryNodeRadius,
          y: centerY + Math.sin(angle) * primaryNodeRadius,
          radius: 6,
          type: 'primary',
          color: '#64B5F6',
          pulseSpeed: 0.03 + Math.random() * 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          connections: []
        };
        
        primaryNodes.push(node);
        processorNodes.push(node);
        
        // Connect primary nodes to central node
        connections.push({
          from: centralNode,
          to: node,
          progress: 1, // Fully visible from start
          speed: 0,
          active: true,
          width: 1.5
        });
        
        centralNode.connections.push(node);
      }
      
      // Create terminal nodes (endpoints)
      const terminalNodeCount = 24;
      const terminalNodeRadius = Math.min(canvas.width, canvas.height) * 0.45;
      
      for (let i = 0; i < terminalNodeCount; i++) {
        const angle = (Math.PI * 2 / terminalNodeCount) * i + (Math.random() * 0.2 - 0.1);
        const node = {
          x: centerX + Math.cos(angle) * terminalNodeRadius,
          y: centerY + Math.sin(angle) * terminalNodeRadius,
          radius: 4,
          type: 'terminal',
          color: '#7E57C2',
          pulseSpeed: 0.02 + Math.random() * 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          connections: []
        };
        
        processorNodes.push(node);
        
        // Connect to nearest primary node
        let minDist = Infinity;
        let nearestPrimary = null;
        
        for (const primary of primaryNodes) {
          const dist = Math.hypot(primary.x - node.x, primary.y - node.y);
          if (dist < minDist) {
            minDist = dist;
            nearestPrimary = primary;
          }
        }
        
        connections.push({
          from: nearestPrimary,
          to: node,
          progress: 1, // Fully visible from start
          speed: 0,
          active: true,
          width: 1
        });
        
        nearestPrimary.connections.push(node);
      }
      
      // Add central node last so it renders on top
      processorNodes.push(centralNode);
      
      // Create initial data pulses
      createInitialDataPulses();
    };
    
    // Create initial data pulses
    const createInitialDataPulses = () => {
      // Clear existing pulses
      dataPulses = [];
      
      // Create pulses from center to terminal nodes
      connections.forEach(connection => {
        if (Math.random() > 0.5) {
          createDataPulse(connection);
        }
      });
    };
    
    // Create a new data pulse on a connection
    const createDataPulse = (connection) => {
      dataPulses.push({
        connection,
        progress: 0,
        speed: 0.005 + Math.random() * 0.005,
        size: 2 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#64B5F6' : '#7E57C2'
      });
    };
    
    // Draw a node
    const drawNode = (node, time) => {
      // Skip drawing for central node - login form will be here
      if (node.type === 'central') {
        // Just draw a subtle glow for the center
        const gradient = ctx.createRadialGradient(node.x, node.y, node.radius * 0.5, node.x, node.y, node.radius * 1.2);
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        return;
      }
      
      // Draw pulsing glow
      const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.5 + 0.5;
      const glowRadius = node.radius * (2 + pulse);
      
      const gradient = ctx.createRadialGradient(node.x, node.y, node.radius * 0.5, node.x, node.y, glowRadius);
      gradient.addColorStop(0, node.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.type === 'primary' ? '#64B5F6' : '#7E57C2';
      ctx.fill();
      
      // Add highlight
      ctx.beginPath();
      ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
    };
    
    // Draw a connection
    const drawConnection = (connection) => {
      const { from, to, progress, width } = connection;
      
      if (progress > 0) {
        // Calculate points for a slight curve
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Add subtle curve to connections
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const curveAmount = distance * 0.15;
        const perpX = -dy / distance;
        const perpY = dx / distance;
        
        const controlX = midX + perpX * curveAmount * (Math.sin(time * 0.2) * 0.2 + 0.8);
        const controlY = midY + perpY * curveAmount * (Math.sin(time * 0.2) * 0.2 + 0.8);
        
        // Draw the connection
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(controlX, controlY, to.x, to.y);
        
        // Use different opacity for different connection types
        let alpha = 0.3;
        if (from.type === 'central' || to.type === 'central') {
          alpha = 0.5;
        }
        
        ctx.strokeStyle = `rgba(100, 181, 246, ${alpha})`;
        ctx.lineWidth = width;
        ctx.stroke();
      }
    };
    
    // Draw a data pulse moving along a connection
    const drawDataPulse = (pulse) => {
      const { connection, progress, size, color } = pulse;
      const { from, to } = connection;
      
      // Calculate position along the quadratic curve
      const t = progress;
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Same curve calculation as in drawConnection
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      const curveAmount = distance * 0.15;
      const perpX = -dy / distance;
      const perpY = dx / distance;
      
      const controlX = midX + perpX * curveAmount * (Math.sin(time * 0.2) * 0.2 + 0.8);
      const controlY = midY + perpY * curveAmount * (Math.sin(time * 0.2) * 0.2 + 0.8);
      
      // Get position along curve
      const x = Math.pow(1 - t, 2) * from.x + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * to.x;
      const y = Math.pow(1 - t, 2) * from.y + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * to.y;
      
      // Draw pulse
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Add glow
      const glowSize = size * 2;
      const gradient = ctx.createRadialGradient(x, y, size * 0.5, x, y, glowSize);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };
    
    // Draw background grid
    const drawGrid = () => {
      const gridSize = 30;
      const lineWidth = 0.5;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = lineWidth;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      
      // Draw background grid
      drawGrid();
      
      // Draw connections
      connections.forEach(connection => {
        drawConnection(connection);
      });
      
      // Update and draw data pulses
      dataPulses.forEach((pulse, index) => {
        pulse.progress += pulse.speed;
        
        // If pulse reaches destination
        if (pulse.progress >= 1) {
          // Remove pulse
          dataPulses.splice(index, 1);
          
          // Chance to create new pulse from destination if it's not a terminal
          if (pulse.connection.to.type !== 'terminal' && Math.random() > 0.7) {
            const nextConnections = pulse.connection.to.connections;
            if (nextConnections.length > 0) {
              const nextNode = nextConnections[Math.floor(Math.random() * nextConnections.length)];
              const nextConnection = connections.find(c => 
                c.from === pulse.connection.to && c.to === nextNode
              );
              if (nextConnection) {
                createDataPulse(nextConnection);
              }
            }
          }
        } else {
          drawDataPulse(pulse);
        }
      });
      
      // Draw nodes
      processorNodes.forEach(node => {
        drawNode(node, time);
      });
      
      // Periodically create new data pulses from center
      if (Math.random() < 0.05) {
        const centralNode = processorNodes.find(node => node.type === 'central');
        if (centralNode) {
          const primaryConnections = connections.filter(c => 
            c.from === centralNode || c.to === centralNode
          );
          
          if (primaryConnections.length > 0) {
            const randomConnection = primaryConnections[Math.floor(Math.random() * primaryConnections.length)];
            createDataPulse(randomConnection);
          }
        }
      }
      
      // Add new pulses if there are too few
      if (dataPulses.length < 10 && Math.random() < 0.1) {
        const randomConnection = connections[Math.floor(Math.random() * connections.length)];
        createDataPulse(randomConnection);
      }
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      initialize();
    };
    
    // Initialize and start animation
    setCanvasSize();
    initialize();
    animate();
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'linear-gradient(to bottom right, #0a1128, #1c2e4a)' }}
    />
  );
};




const ProcessorAnimation_2 = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let processorNodes = [];
    let connections = [];
    let dataPulses = [];
    let time = 0;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Initialize animation elements
    const initialize = () => {
      processorNodes = [];
      connections = [];
      dataPulses = [];
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const loginFormRadius = Math.min(canvas.width, canvas.height) * 0.15;
      
      // Create central processor node (represents the login form area)
      const centralNode = {
        x: centerX,
        y: centerY,
        radius: loginFormRadius,
        type: 'central',
        color: 'rgba(64, 196, 255, 0.2)',
        pulseSpeed: 0.02,
        pulseOffset: 0,
        connections: []
      };
      
      // Create primary nodes in a grid pattern around the center
      const gridSize = 4; // 4x4 grid
      const primaryNodes = [];
      const gridSpacing = Math.min(canvas.width, canvas.height) * 0.07;
      const gridOffset = gridSpacing * 2;
      
      // Create a grid of primary nodes
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          // Skip the very center where the login form is
          if (row === gridSize / 2 - 1 && col === gridSize / 2 - 1) continue;
          if (row === gridSize / 2 - 1 && col === gridSize / 2) continue;
          if (row === gridSize / 2 && col === gridSize / 2 - 1) continue;
          if (row === gridSize / 2 && col === gridSize / 2) continue;
          
          const x = centerX + (col - gridSize / 2 + 0.5) * gridSpacing * 2 + gridOffset;
          const y = centerY + (row - gridSize / 2 + 0.5) * gridSpacing * 2 + gridOffset;
          
          const node = {
            x,
            y,
            radius: 5,
            type: 'primary',
            color: '#64B5F6',
            pulseSpeed: 0.03 + Math.random() * 0.01,
            pulseOffset: Math.random() * Math.PI * 2,
            connections: []
          };
          
          primaryNodes.push(node);
          processorNodes.push(node);
          
          // Create straight line connections from central node to primary nodes
          connections.push({
            from: centralNode,
            to: node,
            points: [
              { x: centralNode.x, y: centralNode.y },
              { x: centralNode.x, y: node.y },
              { x: node.x, y: node.y }
            ],
            progress: 1, // Fully visible from start
            speed: 0,
            active: true,
            width: 1.5
          });
          
          centralNode.connections.push(node);
        }
      }
      
      // Create terminal nodes at the edges
      const terminalCount = 24;
      const edgeOffset = 20;
      const terminalNodes = [];
      
      // Create terminals on the edges
      for (let i = 0; i < terminalCount; i++) {
        let x, y;
        const side = Math.floor(i / 6); // 0: top, 1: right, 2: bottom, 3: left
        
        switch (side) {
          case 0: // top
            x = edgeOffset + (canvas.width - 2 * edgeOffset) * ((i % 6) / 5);
            y = edgeOffset;
            break;
          case 1: // right
            x = canvas.width - edgeOffset;
            y = edgeOffset + (canvas.height - 2 * edgeOffset) * ((i % 6) / 5);
            break;
          case 2: // bottom
            x = canvas.width - edgeOffset - (canvas.width - 2 * edgeOffset) * ((i % 6) / 5);
            y = canvas.height - edgeOffset;
            break;
          case 3: // left
            x = edgeOffset;
            y = canvas.height - edgeOffset - (canvas.height - 2 * edgeOffset) * ((i % 6) / 5);
            break;
        }
        
        const node = {
          x,
          y,
          radius: 3,
          type: 'terminal',
          color: '#7E57C2',
          pulseSpeed: 0.02 + Math.random() * 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          connections: []
        };
        
        terminalNodes.push(node);
        processorNodes.push(node);
        
        // Connect to nearest primary node with orthogonal lines
        let minDist = Infinity;
        let nearestPrimary = null;
        
        for (const primary of primaryNodes) {
          const dist = Math.abs(primary.x - x) + Math.abs(primary.y - y); // Manhattan distance
          if (dist < minDist) {
            minDist = dist;
            nearestPrimary = primary;
          }
        }
        
        if (nearestPrimary) {
          connections.push({
            from: nearestPrimary,
            to: node,
            points: [
              { x: nearestPrimary.x, y: nearestPrimary.y },
              { x: nearestPrimary.x, y: node.y },
              { x: node.x, y: node.y }
            ],
            progress: 1,
            speed: 0,
            active: true,
            width: 1
          });
          
          nearestPrimary.connections.push(node);
        }
      }
      
      // Add some additional connections between primary nodes
      for (let i = 0; i < primaryNodes.length; i++) {
        const node = primaryNodes[i];
        
        // Connect to another random primary node
        const j = (i + 1 + Math.floor(Math.random() * (primaryNodes.length - 2))) % primaryNodes.length;
        const otherNode = primaryNodes[j];
        
        connections.push({
          from: node,
          to: otherNode,
          points: [
            { x: node.x, y: node.y },
            { x: node.x, y: otherNode.y },
            { x: otherNode.x, y: otherNode.y }
          ],
          progress: 1,
          speed: 0,
          active: true,
          width: 1
        });
        
        node.connections.push(otherNode);
      }
      
      // Add central node last so it renders on top
      processorNodes.push(centralNode);
      
      // Create initial data pulses
      createInitialDataPulses();
    };
    
    // Create initial data pulses
    const createInitialDataPulses = () => {
      // Clear existing pulses
      dataPulses = [];
      
      // Create pulses from center to terminal nodes
      connections.forEach(connection => {
        if (Math.random() > 0.7) {
          createDataPulse(connection);
        }
      });
    };
    
    // Create a new data pulse on a connection
    const createDataPulse = (connection) => {
      dataPulses.push({
        connection,
        segmentIndex: 0,
        progress: 0,
        totalSegments: connection.points.length - 1,
        speed: 0.01 + Math.random() * 0.005,
        size: 2 + Math.random() * 1.5,
        color: Math.random() > 0.5 ? '#64B5F6' : '#7E57C2'
      });
    };
    
    // Draw a node
    const drawNode = (node, time) => {
      // Skip drawing for central node - login form will be here
      if (node.type === 'central') {
        // Just draw a subtle glow for the center
        const gradient = ctx.createRadialGradient(node.x, node.y, node.radius * 0.5, node.x, node.y, node.radius * 1.2);
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        return;
      }
      
      // Draw pulsing glow
      const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.5 + 0.5;
      const glowRadius = node.radius * (2 + pulse);
      
      const gradient = ctx.createRadialGradient(node.x, node.y, node.radius * 0.5, node.x, node.y, glowRadius);
      gradient.addColorStop(0, node.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.type === 'primary' ? '#64B5F6' : '#7E57C2';
      ctx.fill();
      
      // Add highlight
      ctx.beginPath();
      ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
    };
    
    // Draw a connection
    const drawConnection = (connection) => {
      const { points, progress, width } = connection;
      
      if (progress > 0) {
        // Draw straight line segments
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        
        // Use different opacity for different connection types
        let alpha = 0.3;
        if (connection.from.type === 'central' || connection.to.type === 'central') {
          alpha = 0.5;
        }
        
        ctx.strokeStyle = `rgba(100, 181, 246, ${alpha})`;
        ctx.lineWidth = width;
        ctx.stroke();
      }
    };
    
    // Draw a data pulse moving along a connection
    const drawDataPulse = (pulse) => {
      const { connection, segmentIndex, progress, size, color } = pulse;
      const { points } = connection;
      
      // Calculate position along the current segment
      const startPoint = points[segmentIndex];
      const endPoint = points[segmentIndex + 1];
      
      const x = startPoint.x + (endPoint.x - startPoint.x) * progress;
      const y = startPoint.y + (endPoint.y - startPoint.y) * progress;
      
      // Draw pulse
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Add glow
      const glowSize = size * 2;
      const gradient = ctx.createRadialGradient(x, y, size * 0.5, x, y, glowSize);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };
    
    // Draw circuit board traces in the background
    const drawCircuitTraces = () => {
      const traceCount = 30;
      const traceWidth = 1;
      
      ctx.strokeStyle = 'rgba(100, 181, 246, 0.1)';
      ctx.lineWidth = traceWidth;
      
      for (let i = 0; i < traceCount; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        let x = startX;
        let y = startY;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        const segments = 3 + Math.floor(Math.random() * 5);
        for (let j = 0; j < segments; j++) {
          // Choose direction: horizontal or vertical
          if (Math.random() > 0.5) {
            x = Math.random() * canvas.width;
            ctx.lineTo(x, y);
          } else {
            y = Math.random() * canvas.height;
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
    };
    
    // Draw background grid
    const drawGrid = () => {
      const gridSize = 30;
      const lineWidth = 0.5;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = lineWidth;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      
      // Draw background elements
      drawGrid();
      drawCircuitTraces();
      
      // Draw connections
      connections.forEach(connection => {
        drawConnection(connection);
      });
      
      // Update and draw data pulses
      for (let i = dataPulses.length - 1; i >= 0; i--) {
        const pulse = dataPulses[i];
        pulse.progress += pulse.speed;
        
        // If pulse reaches end of current segment
        if (pulse.progress >= 1) {
          pulse.segmentIndex++;
          pulse.progress = 0;
          
          // If pulse reaches end of current segment
          if (pulse.progress >= 1) {
            pulse.segmentIndex++;
            pulse.progress = 0;
            
            // If pulse has reached the end of the connection
            if (pulse.segmentIndex >= pulse.totalSegments) {
              // Remove the pulse
              dataPulses.splice(i, 1);
              
              // Create a new pulse if at a node
              if (Math.random() > 0.7) {
                const node = pulse.connection.to;
                if (node.connections.length > 0) {
                  const nextNode = node.connections[Math.floor(Math.random() * node.connections.length)];
                  // Find the connection between these nodes
                  for (const conn of connections) {
                    if ((conn.from === node && conn.to === nextNode) || 
                        (conn.from === nextNode && conn.to === node)) {
                      createDataPulse(conn);
                      break;
                    }
                  }
                }
              }
            }
          } else {
            // Continue drawing the pulse
            drawDataPulse(pulse);
          }
        } else {
          // Continue drawing the pulse
          drawDataPulse(pulse);
        }
      }
      
      // Occasionally create new pulses
      if (Math.random() > 0.98) {
        const randomConnection = connections[Math.floor(Math.random() * connections.length)];
        createDataPulse(randomConnection);
      }
      
      // Draw nodes on top of everything
      processorNodes.forEach(node => {
        drawNode(node, time);
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      initialize();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    setCanvasSize();
    initialize();
    animate();
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="processor-animation"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'rgb(10, 25, 41)'
      }}
    />
  );
};
export { NoTeamsAnimation , AllCaughtUpAnimation , NoInvitationsAnimation, ClassGitLoadingAnimation,EnhancedAnimation, ClassGitAnimation, ProcessorAnimation,ProcessorAnimation_2};
