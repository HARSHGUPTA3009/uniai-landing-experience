
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SignUp } from '@clerk/clerk-react';
import gsap from 'gsap';

const SignUpPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Fade in the container with a slight scale
    tl.fromTo(containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8 }
    );
    
    // Animate the title from bottom with a slight blur effect
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
      "-=0.4"
    );
    
    // Animate the subtitle slightly delayed
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );
    
    // Animate the form with a slight delay
    tl.fromTo(formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
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
      <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
        <div ref={containerRef} className="container mx-auto max-w-md px-4">
          <div className="glass-morphism p-1.5 rounded-2xl shadow-[0_10px_40px_rgba(115,194,251,0.15)] backdrop-blur-xl">
            <div className="text-center mb-6">
              <h1 ref={titleRef} className="text-3xl font-bold text-gradient-primary">Create Account</h1>
              <p ref={subtitleRef} className="text-muted-foreground mt-2">Join UniAI today</p>
            </div>
            
            <div ref={formRef}>
              <SignUp 
                path="/signup" 
                routing="path" 
                redirectUrl="/profile" 
                
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
