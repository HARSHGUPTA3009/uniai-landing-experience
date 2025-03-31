import React, { useState } from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogIn, LogOut, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react"; 

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk(); 

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "ATS Checker", href: "/ats-checker" },
    { label: "Interview", href: "/interview" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

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
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-morphism border border-border/30 bg-black/70">
              {isSignedIn ? (
                <>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-400" onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/signin")}>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Sign In</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/signup")}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign Up</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            className="bg-gradient-to-r from-uniai-blue to-uniai-blue/80 text-uniai-dark hover:from-uniai-blue/90 hover:to-uniai-blue/70"
            onClick={() => navigate(isSignedIn ? "/ats-checker" : "/signup")}
          >
            Get Started
          </Button>
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
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
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
                    className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </button>
                  <button 
                    onClick={() => signOut()}
                    className="flex items-center w-full text-left text-sm text-red-400 hover:text-red-300 transition-colors py-2"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleNavigation("/signin")}
                    className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </button>
                  <button 
                    onClick={() => handleNavigation("/signup")} 
                    className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </button>
                </>
              )}
            </div>
            
            <Button 
              className="bg-gradient-to-r from-uniai-blue to-uniai-blue/80 text-uniai-dark hover:from-uniai-blue/90 hover:to-uniai-blue/70 mt-2"
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
