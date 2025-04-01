
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import gsap from 'gsap';

const ATSChecker = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate the container
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    );
    
    // Animate the header
    tl.fromTo(headerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );
    
    // Animate the content
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    // Clean up
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div ref={containerRef} className="container mx-auto px-4">
          <h1 ref={headerRef} className="text-3xl md:text-4xl font-bold text-gradient-primary mb-6">ATS Checker</h1>
          <p ref={contentRef} className="text-muted-foreground">ATS checker functionality will be implemented here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ATSChecker;
