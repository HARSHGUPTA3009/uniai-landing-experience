
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const SignUp = () => {
  const navigate = useNavigate();
  
  // GSAP animation for SignUp page
  useEffect(() => {
    gsap.from('.signup-container', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
        <div className="container mx-auto max-w-md px-4 signup-container">
          <div className="glass-morphism p-8 rounded-2xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gradient-primary">Create Account</h1>
              <p className="text-muted-foreground mt-2">Join UniAI today</p>
            </div>
            
            <ClerkSignUp 
              signInUrl="/signin"
              redirectUrl="/profile"
              routing="path"
              path="/signup"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  formButtonPrimary: 
                    "bg-gradient-to-r from-uniai-blue to-uniai-blue/80 text-uniai-dark hover:from-uniai-blue/90 hover:to-uniai-blue/70",
                  formFieldInput: "bg-background border border-border text-foreground",
                  footerActionLink: "text-uniai-blue hover:text-uniai-blue/80",
                }
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
