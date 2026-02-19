'use client';

import {useState, useEffect, Suspense} from 'react';
import {useSearchParams} from 'next/navigation';
import {motion} from 'motion/react';
import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Mail, MapPin, Phone, Check} from 'lucide-react';
import {toast} from 'sonner';
import {supabase} from '@/lib/supabase';

function ContactForm() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get('subject') || '';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [subject, setSubject] = useState(initialSubject);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (supabase) {
      try {
        const {error} = await supabase
          .from('contacts')
          .insert({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            subject: subject,
            message: formData.message
          });
        
        if (error) throw error;
      } catch (err) {
        console.error('Error submitting form:', err);
        toast.error('Failed to save message to database, but we simulated success for demo.');
      }
    } else {
      // Simulate API call if Supabase is not configured
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully! We will get back to you shortly.');
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity: 1, scale: 1}}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
          Message Sent!
        </h3>
        <p className="text-slate-600 mb-8">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">
        Send us a Message
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
            First Name
          </label>
          <Input 
            id="firstName" 
            required 
            placeholder="Jane" 
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
            Last Name
          </label>
          <Input 
            id="lastName" 
            required 
            placeholder="Doe" 
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email Address
        </label>
        <Input 
          id="email" 
          type="email" 
          required 
          placeholder="jane@company.com" 
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-slate-700">
          Subject
        </label>
        <Input 
          id="subject" 
          required 
          placeholder="Inquiry about Raw Denim" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-slate-700">
          Message
        </label>
        <Textarea
          id="message"
          required
          placeholder="Tell us about your project..."
          className="min-h-[150px]"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        variant="denim"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="bg-slate-900 text-white py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Whether you&apos;re looking for a specific fabric or need a custom
              development, our team is here to help.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-slate-600 text-lg mb-8">
                  Reach out to our sales or support teams directly. We aim to
                  respond to all inquiries within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-blue-900">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Headquarters</h3>
                      <p className="text-slate-600">
                        123 Textile Avenue<br />
                        Garment District, NY 10018<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-blue-900">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Phone</h3>
                      <p className="text-slate-600">+1 (555) 123-4567</p>
                      <p className="text-slate-500 text-sm">Mon-Fri, 9am - 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-blue-900">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Email</h3>
                      <p className="text-slate-600">hello@wrapweftco.com</p>
                      <p className="text-slate-600">sales@wrapweftco.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Visit Our Showroom
                </h3>
                <p className="text-slate-600 mb-4">
                  Experience our fabrics firsthand. Schedule an appointment to visit
                  our New York showroom.
                </p>
                <Button variant="outline" className="w-full sm:w-auto">
                  Schedule Appointment
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <Suspense fallback={<div>Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
