'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});
  const [touched, setTouched] = useState<{name?: boolean, email?: boolean, message?: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = (field: string, value: string) => {
    let error = '';
    if (field === 'name') {
      if (!value) error = 'Name is required';
      else if (value.length < 2) error = 'Name must be at least 2 characters';
    }
    if (field === 'email') {
      if (!value) error = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
    }
    if (field === 'message') {
      if (!value) error = 'Message is required';
      else if (value.length < 20) error = 'Message must be at least 20 characters';
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    setErrors(prev => ({ ...prev, [id]: validate(id, value) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (touched[id as keyof typeof touched]) {
      setErrors(prev => ({ ...prev, [id]: validate(id, value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    
    const nameErr = validate('name', formData.name);
    const emailErr = validate('email', formData.email);
    const messageErr = validate('message', formData.message);
    
    if (nameErr || emailErr || messageErr) {
      setErrors({ name: nameErr, email: emailErr, message: messageErr });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-8 text-center text-cyan-400">
        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3 className="text-xl font-bold mb-2 text-white">Message received</h3>
        <p>I&apos;ll respond within 48 hours.</p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
        <input 
          type="text" 
          id="name" 
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full bg-zinc-950/50 border ${errors.name && touched.name ? 'border-red-500' : 'border-zinc-800'} rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`} 
          placeholder="Your name" 
        />
        {errors.name && touched.name && <p className="mt-1 text-[var(--color-error)] text-sm">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full bg-zinc-950/50 border ${errors.email && touched.email ? 'border-red-500' : 'border-zinc-800'} rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`} 
          placeholder="you@example.com" 
        />
        {errors.email && touched.email && <p className="mt-1 text-[var(--color-error)] text-sm">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-2">Subject</label>
        <select 
          id="subject" 
          value={formData.subject}
          onChange={handleChange}
          className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors appearance-none"
        >
          <option>General Inquiry</option>
          <option>Technical Collaboration</option>
          <option>Consulting Request</option>
          <option>Content Feedback</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
        <textarea 
          id="message" 
          rows={5} 
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full bg-zinc-950/50 border ${errors.message && touched.message ? 'border-red-500' : 'border-zinc-800'} rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`} 
          placeholder="How can I help you?"
        ></textarea>
        {errors.message && touched.message && <p className="mt-1 text-[var(--color-error)] text-sm">{errors.message}</p>}
      </div>
      
      {submitError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">
          There was an error sending your message. Please try again.
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-colors flex justify-center items-center gap-2"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
        {!isSubmitting && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
      </button>
    </form>
  );
}
