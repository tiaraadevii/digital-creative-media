import { useState } from 'react';
import { Mail, Phone, Instagram, MapPin, Send, Info } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    type: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only form for now — no backend submission
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-offwhite">
      <div className="container-max px-6 md:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">Contact</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mt-3 mb-4">
            Get in Touch.
          </h2>
          <p className="text-slate text-lg">
            Reach out for partnerships, inquiries, or general questions.
          </p>
        </div>

        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid lg:grid-cols-5 gap-8`}
        >
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'contact@digitalcreativemedia.id', placeholder: true },
              { icon: Phone, label: 'WhatsApp', value: '+62 xxx-xxxx-xxx', placeholder: true },
              { icon: Instagram, label: 'Instagram', value: '@digitalcreativemedia', placeholder: true },
              { icon: MapPin, label: 'Address', value: 'Available upon request', placeholder: true },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-5 bg-white border border-border rounded-xl"
                >
                  <div className="w-11 h-11 rounded-lg bg-navy/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-slate text-xs uppercase tracking-wider font-medium">{item.label}</p>
                    <p className="text-navy text-sm font-medium mt-0.5">{item.value}</p>
                    {item.placeholder && (
                      <p className="text-gold text-xs mt-0.5">Placeholder — update with actual info</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-border rounded-xl p-6 md:p-8">
              {/* Info banner */}
              <div className="flex items-start gap-3 p-4 bg-offwhite border border-border rounded-lg mb-6">
                <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-slate text-xs leading-relaxed">
                  This form is a UI preview. Messages are not sent or stored yet.
                  Backend integration will be available in the next development phase.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-navy placeholder:text-slate/40 transition-all focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/5"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-navy mb-1.5">
                    Email or WhatsApp
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formState.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-navy placeholder:text-slate/40 transition-all focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/5"
                    placeholder="Email or WhatsApp number"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-navy mb-1.5">
                    Type of Inquiry
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formState.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-navy transition-all focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/5"
                  >
                    <option value="">Select an option</option>
                    <option value="partnership">Partnership</option>
                    <option value="paid-promote">Paid Promote</option>
                    <option value="media-partnership">Media Partnership</option>
                    <option value="event">Event Collaboration</option>
                    <option value="creative">Creative Services</option>
                    <option value="property">Property Management</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-navy placeholder:text-slate/40 transition-all focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/5 resize-none"
                    placeholder="Tell us about your project or inquiry"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Inquiry
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
