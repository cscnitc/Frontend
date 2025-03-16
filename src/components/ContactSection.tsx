
import React, { useState } from 'react';
import { Mail, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('idle'); // Reset status

    try {
      const response = await fetch('http://localhost:1337/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        }),
      });
  
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  
    // Reset status after 3 seconds
    setTimeout(() => setFormStatus('idle'), 3000);
  };
  return (
    <section id="contact" className="py-20 bg-cyber-blue relative overflow-hidden">
      <div className="absolute inset-0 matrix-grid opacity-10"></div>
      
      <div className="section-container relative z-10">
        <h2 className="section-title">Contact Us</h2>
        <p className="text-gray-300 mb-10 max-w-3xl">
          Have questions about joining the club, our events, or collaboration opportunities? Get in touch with us!
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div>
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-white">Send us a message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-cyber-blue/50 border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-cyber-blue/50 border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-cyber-blue/50 border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="membership">Club Membership</option>
                      <option value="event">Event Inquiry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-cyber-blue/50 border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-cyber-green text-cyber-blue font-bold py-3 px-4 rounded-md hover:bg-cyber-light-green transition-colors flex items-center justify-center"
                      disabled={formStatus === 'success'}
                    >
                      {formStatus === 'idle' && (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                      {formStatus === 'success' && (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Message Sent!
                        </>
                      )}
                      {formStatus === 'error' && (
                        <>
                          <AlertCircle className="h-5 w-5 mr-2" />
                          Error Sending
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="glass-card p-8 rounded-xl mb-6">
              <h3 className="text-xl font-bold mb-6 text-white">Club Information</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <Mail className="h-6 w-6 text-cyber-green mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Email Us</h4>
                    <p className="text-gray-300 text-sm">
                      <a href="mailto:cybersec@nitc.ac.in" className="hover:text-cyber-green">
                        cybersec@nitc.ac.in
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <MapPin className="h-6 w-6 text-cyber-green mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Club Location</h4>
                    <p className="text-gray-300 text-sm">
                      Computer Science Department<br />
                      NIT Calicut, Kerala<br />
                      India - 673601
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-white">Meeting Schedule</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-cyber-green pl-4">
                  <h4 className="font-medium text-white">General Meetings</h4>
                  <p className="text-gray-300 text-sm">Every Friday, 5:00 PM - 6:30 PM</p>
                </div>
                
                <div className="border-l-2 border-cyber-green pl-4">
                  <h4 className="font-medium text-white">CTF Practice</h4>
                  <p className="text-gray-300 text-sm">Every Tuesday, 6:00 PM - 8:00 PM</p>
                </div>
                
                <div className="border-l-2 border-cyber-green pl-4">
                  <h4 className="font-medium text-white">Project Work</h4>
                  <p className="text-gray-300 text-sm">Every Sunday, 2:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
