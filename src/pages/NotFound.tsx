
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate the container with a slight scale and rotation
    tl.fromTo(containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 }
    );
    
    // Animate the 404 text with a glitch effect
    tl.fromTo(errorRef.current,
      { opacity: 0, scale: 1.2, filter: 'blur(10px)' },
      { 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)', 
        duration: 0.6,
        onComplete: () => {
          // Add slight glitch effect after appearing
          gsap.to(errorRef.current, {
            x: 3,
            duration: 0.1,
            repeat: 2,
            yoyo: true,
            delay: 0.5
          });
        }
      },
      "-=0.3"
    );
    
    // Animate the text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.2"
    );
    
    // Animate the link
    tl.fromTo(linkRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    // Clean up
    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-uniai-dark">
      <div className="text-center glass-morphism p-12 rounded-xl shadow-[0_10px_40px_rgba(115,194,251,0.15)]">
        <h1 ref={errorRef} className="text-6xl font-bold mb-4 text-gradient-primary">404</h1>
        <p ref={textRef} className="text-xl text-white/80 mb-6">Oops! Page not found</p>
        <a 
          ref={linkRef} 
          href="/" 
          className="text-uniai-blue hover:text-uniai-blue/80 underline transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
