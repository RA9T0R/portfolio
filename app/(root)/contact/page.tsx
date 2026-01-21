"use client";

import React, { useState } from 'react';
// 1. Added 'Download' to imports
import { Phone, Mail, MapPin, type LucideProps, Loader2, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import emailjs from 'emailjs-com';

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type = 'text', placeholder, name, value, onChange }: InputFieldProps) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={label} className="text-sm font-medium text-subtext dark:text-Dark_subtext">{label}</label>
        <input
            type={type}
            id={label}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);

interface TextareaFieldProps {
    label: string;
    placeholder: string;
    rows?: number;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField = ({ label, placeholder, rows = 5, name, value, onChange }: TextareaFieldProps) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={label} className="text-sm font-medium text-subtext dark:text-Dark_subtext">{label}</label>
        <textarea
            id={label}
            placeholder={placeholder}
            rows={rows}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);

interface ContactInfoItemProps {
    icon: React.ComponentType<LucideProps>;
    text: string;
}
const ContactInfoItem = ({ icon: Icon, text }: ContactInfoItemProps) => (
    <div className="flex items-center gap-4 py-4">
        <Icon size={20} className="text-primary flex-shrink-0" />
        <span className="text-sm font-medium">{text}</span>
    </div>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: '', message: '' });

        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICEID || "";
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID || "";
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY || "";

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
            setFormStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
            setFormData({ from_name: '', from_email: '', subject: '', message: '' });
        } catch (error) {
            console.error('EmailJS error:', error);
            setFormStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 py-3">
            <p className="lg:w-1/2 text-subtext dark:text-Dark_subtext">You can connect me with this form OR copy my address.</p>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                {/* LEFT COLUMN: "Get In Touch" Form (70%) */}
                <div className="lg:col-span-7">
                    <div className="bg-surface dark:bg-Dark_surface p-6 sm:p-8 rounded-2xl border border-subtext/20">
                        <h3 className="font-bold text-2xl mb-6">Get In Touch</h3>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InputField
                                    label="Your Name"
                                    placeholder="Enter your name"
                                    name="from_name"
                                    value={formData.from_name}
                                    onChange={handleChange}
                                />
                                <InputField
                                    label="Your Email"
                                    type="email"
                                    placeholder="Enter your email"
                                    name="from_email"
                                    value={formData.from_email}
                                    onChange={handleChange}
                                />
                            </div>

                            <InputField
                                label="Your Subject"
                                placeholder="Enter the subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />

                            <TextareaField
                                label="Message"
                                placeholder="Enter your message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary hover:bg-primary/90 transition-colors text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider w-full sm:w-auto flex items-center justify-center disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    'Send Message'
                                )}
                            </button>

                            {formStatus.message && (
                                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                                    formStatus.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                }`}>
                                    {formStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                                    <span className="text-sm">{formStatus.message}</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* RIGHT COLUMN: "Contact Information" (30%) */}
                <div className="lg:col-span-3">
                    <div className="bg-surface dark:bg-Dark_surface p-6 sm:p-8 rounded-2xl border border-subtext/20 h-full flex flex-col gap-4">
                        <h3 className="font-bold text-2xl">Contact Information</h3>
                        <p className="text-subtext dark:text-Dark_subtext">It is a long established fact tha t a reader will be distracted by the readable content of a page when looking at its layout.</p>

                        <div className="flex flex-col">
                            <ContactInfoItem icon={Phone} text="094-417-8888" />
                            <ContactInfoItem icon={Mail} text="phongphatbangkha@gmail.com" />
                            <ContactInfoItem icon={MapPin} text="Bangkok, Thailand" />
                        </div>

                        {/* --- NEW RESUME BUTTON --- */}
                        <div className="mt-4 pt-4 border-t border-subtext/20">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-colors text-white font-bold py-3 px-4 rounded-xl w-full"
                            >
                                <Download size={20} />
                                <span>Download Resume</span>
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;