
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-6">My Profile</h1>
          <p className="text-muted-foreground">User profile functionality will be implemented here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
