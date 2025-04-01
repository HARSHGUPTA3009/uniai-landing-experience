import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const usersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
    tl.fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    tl.fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    tl.fromTo(usersRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");
    tl.fromTo(statsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.3");

    return () => {
      tl.kill(); // Properly clean up GSAP animations
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-20 flex items-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 max-w-xl">
            <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Your AI Career Companion
            </h1>
            <p ref={descRef} className="text-lg text-gray-400">
              UniAI helps you optimize your resume for ATS systems, prepare for interviews, and land your dream job with AI-powered tools.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium"
                onClick={() => navigate('/signup')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-600 text-white hover:bg-gray-800"
                onClick={() => navigate('/ats-checker')}
              >
                Learn More
              </Button>
            </div>

            <div ref={usersRef} className="flex items-center gap-4 mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="w-8 h-8 rounded-full bg-gray-600 ring-2 ring-black"></div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                Trusted by <span className="text-blue-400 font-medium">10,000+</span> job seekers
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="p-2 rounded-2xl shadow-lg bg-gray-900/80 backdrop-blur-md">
              <div className="aspect-square rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500/20 to-gray-900/90 p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Resume Analysis</h3>
                  <p className="text-gray-400">Optimize your resume for ATS systems with our advanced AI tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: '95%', label: 'ATS Pass Rate' },
            { value: '3x', label: 'Interview Success' },
            { value: '1000+', label: 'Companies Supported' }
          ].map((stat, idx) => (
            <div key={idx} className="p-8 rounded-xl text-center bg-gray-800">
              <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
