
import React from 'react';
import { FileCheck, MessageSquare, Award } from 'lucide-react';

const Features: React.FC = () => {
  const featureItems = [
    {
      icon: <FileCheck className="h-10 w-10 text-uniai-blue" />,
      title: "ATS Checker",
      description: "Ensure your resume passes through Applicant Tracking Systems with our AI-powered analysis and optimization tool."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-uniai-blue" />,
      title: "Interview Preparation",
      description: "Practice with our AI interviewer to gain confidence and master answers to common industry questions."
    },
    {
      icon: <Award className="h-10 w-10 text-uniai-blue" />,
      title: "Career Coaching",
      description: "Receive personalized career advice and job search strategies from our AI career coach."
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-4">Supercharge Your Job Search</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered tools help you stand out from the competition and land your dream job faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((item, idx) => (
            <div key={idx} className="glass-morphism p-8 rounded-xl flex flex-col items-center text-center group hover:bg-white/5 transition-all duration-300">
              <div className="p-3 bg-uniai-blue/10 rounded-full mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
