
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { User, Save } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { gsap } from 'gsap';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters" }).optional(),
  location: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
});

const Profile = () => {
  const { toast } = useToast();
  const { isLoaded, isSignedIn, user } = useUser();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.fullName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      bio: "",
      location: "",
      website: "",
    },
  });

  // Update form values when user data is loaded
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      form.setValue('name', user?.fullName || "");
      form.setValue('email', user?.primaryEmailAddress?.emailAddress || "");
    }
  }, [isLoaded, isSignedIn, user]);

  // GSAP animations
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Animate the profile sections
      gsap.from('.profile-section', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, [isLoaded, isSignedIn]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Profile updated successfully!",
      description: "Your profile information has been saved.",
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-6">Loading...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-6">Please Sign In</h1>
            <p className="text-muted-foreground mb-8">You need to be signed in to view your profile.</p>
            <Button onClick={() => window.location.href = '/signin'}>Sign In</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-6">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 profile-section">
              <div className="glass-morphism p-6 rounded-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    {user?.hasImage ? (
                      <img 
                        src={user.imageUrl} 
                        alt={user.fullName || "Profile picture"} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-uniai-blue/30 flex items-center justify-center">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold">{user?.fullName}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
                  <div className="mt-4 w-full">
                    <Button 
                      variant="outline" 
                      className="w-full border-white/10 hover:bg-white/5"
                      onClick={() => window.location.href = '/ats-checker'}
                    >
                      ATS Checker
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 profile-section">
              <div className="glass-morphism p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly className="bg-secondary/20" />
                          </FormControl>
                          <FormDescription>
                            Email cannot be changed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Tell us a bit about yourself"
                              className="resize-none" 
                              rows={4}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="City, Country" 
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="https://example.com"
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-uniai-blue to-uniai-blue/80 text-uniai-dark hover:from-uniai-blue/90 hover:to-uniai-blue/70"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
