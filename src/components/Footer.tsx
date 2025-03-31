
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground">
              AI-powered career companion helping job seekers land their dream jobs.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              {['ATS Checker', 'Interview Prep', 'Resume Builder', 'Career Coaching'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Press'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              {['Terms', 'Privacy', 'Cookies', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} UniAI. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map(social => (
              <a key={social} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
