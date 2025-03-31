
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-20 flex items-center">
      <div className="absolute top-1/4 right-0 left-0 -z-10 mx-auto w-3/4 h-80 bg-uniai-blue/20 blur-[100px] rounded-full"></div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 max-w-xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient-primary leading-tight">
              Your AI Career Companion
            </h1>
            <p className="text-lg text-muted-foreground">
              UniAI helps you optimize your resume for ATS systems, prepare for interviews, and land your dream job with AI-powered tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="bg-gradient-to-r from-uniai-blue to-uniai-blue/80 text-uniai-dark hover:from-uniai-blue/90 hover:to-uniai-blue/70 font-medium">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 ring-2 ring-background"></div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by <span className="text-uniai-blue font-medium">10,000+</span> job seekers
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-uniai-blue/30 blur-[60px] rounded-full"></div>
            <div className="relative animate-float">
              <div className="p-2 glass-morphism rounded-2xl shadow-lg">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-uniai-blue/10 to-uniai-blue/5">
                  <img 
                    src="public/lovable-uploads/137075c3-dbba-4e97-9df2-ad96e139e0c6.png"
                    alt="UniAI AI Assistant"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-4 -right-4 glass-morphism p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium">AI Assistant Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: '95%', label: 'ATS Pass Rate' },
            { value: '3x', label: 'Interview Success' },
            { value: '1000+', label: 'Companies Supported' }
          ].map((stat, idx) => (
            <div key={idx} className="glass-morphism p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-uniai-blue mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
