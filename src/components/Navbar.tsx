
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Menu, User, LogIn, LogOut, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { gsap } from 'gsap';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'ATS Checker', href: '/ats-checker' },
    { label: 'Interview', href: '/interview' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // GSAP animation for the navbar
  useEffect(() => {
    const navbar = document.querySelector('header');
    gsap.from(navbar, { 
      y: -100, 
      opacity: 0, 
      duration: 0.8, 
      ease: 'power3.out'
    });

    const navItems = document.querySelectorAll('.nav-item');
    gsap.from(navItems, {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.3,
      ease: 'power2.out'
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-morphism">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors nav-item"
            >
              {link.label}
            </a>
          ))}
          
          {/* Auth Buttons */}
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <UserButton afterSignOutUrl="/" />
              <Button 
                className="bg-gradient-to-r from-uniai-blue to-uniai-blue/80 text-uniai-dark hover:from-uniai-blue/90 hover:to-uniai-blue/70 nav-item"
                onClick={() => navigate("/ats-checker")}
              >
                Get Started
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="nav-item">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
              
              <SignUpButton mode="modal">
                <Button 
                  className="bg-gradient-to-r from-uniai-blue to-uniai-blue/80 text-uniai-dark hover:from-uniai-blue/90 hover:to-uniai-blue/70 nav-item"
                >
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-morphism border-t border-white/10 py-4 px-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a 
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            <div className="border-t border-white/10 my-2 pt-2">
              {isSignedIn ? (
                <>
                  <button 
                    onClick={() => handleNavigation("/profile")} 
                    className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2 nav-item"
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </button>
                  <button 
                    onClick={() => signOut(() => navigate("/"))}
                    className="flex items-center w-full text-left text-sm text-red-400 hover:text-red-300 transition-colors py-2 nav-item"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button 
                      className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2 nav-item"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </button>
                  </SignInButton>
                  
                  <SignUpButton mode="modal">
                    <button 
                      className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2 nav-item"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
            
            <Button 
              className="bg-gradient-to-r from-uniai-blue to-uniai-blue/80 text-uniai-dark hover:from-uniai-blue/90 hover:to-uniai-blue/70 mt-2 nav-item"
              onClick={() => handleNavigation(isSignedIn ? "/ats-checker" : "/signup")}
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
