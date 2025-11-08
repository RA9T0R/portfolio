import React from 'react';
import { Phone, Mail, MapPin, type LucideProps } from 'lucide-react'; // 1. Import LucideProps

interface InputFieldProps {
    label: string;
    type?: string; // Optional prop
    placeholder: string;
}

const InputField = ({ label, type = 'text', placeholder }: InputFieldProps) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={label} className="text-sm font-medium text-subtext dark:text-Dark_subtext">{label}</label>
        <input
            type={type}
            id={label}
            placeholder={placeholder}
            className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);

// 3. Define types for TextareaField
interface TextareaFieldProps {
    label: string;
    placeholder: string;
    rows?: number; // Optional prop
}

const TextareaField = ({ label, placeholder, rows = 5 }: TextareaFieldProps) => (
    <div className="flex flex-col gap-2">
        <label htmlFor={label} className="text-sm font-medium text-subtext dark:text-Dark_subtext">{label}</label>
        <textarea
            id={label}
            placeholder={placeholder}
            rows={rows}
            className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);

// 4. Define types for ContactInfoItem
interface ContactInfoItemProps {
    icon: React.ComponentType<LucideProps>; // Type for a Lucide icon component
    text: string;
}

const ContactInfoItem = ({ icon: Icon, text }: ContactInfoItemProps) => (
    <div className="flex items-center gap-4 py-4">
        <Icon size={20} className="text-primary flex-shrink-0" />
        <span className="text-sm font-medium">{text}</span>
    </div>
);


// --- Contact Page Component ---

const Contact = () => {
    return (
        <div className="w-full h-full flex flex-col gap-6 py-3">
            <p className="lg:w-1/2 text-subtext dark:text-Dark_subtext">You can connect me with this form OR copy my address.</p>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

                {/* 1. LEFT COLUMN: "Get In Touch" Form (70%) */}
                <div className="lg:col-span-7">
                    <div className="bg-surface dark:bg-Dark_surface p-6 sm:p-8 rounded-2xl border border-subtext/20">
                        <h3 className="font-bold text-2xl mb-6">Get In Touch</h3>

                        <form className="flex flex-col gap-6">
                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InputField label="Your Name" placeholder="Enter your name" />
                                <InputField label="Your Email" type="email" placeholder="Enter your email" />
                            </div>

                            {/* Subject Row */}
                            <InputField label="Your Subject" placeholder="Enter the subject" />

                            {/* Message Row */}
                            <TextareaField label="Message" placeholder="Enter your message" />

                            {/* Button */}
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary/90 transition-colors text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider w-full sm:w-auto"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: "Contact Information" (30%) */}
                <div className="lg:col-span-3">
                    <div className="bg-surface dark:bg-Dark_surface p-6 sm:p-8 rounded-2xl border border-subtext/20 h-full flex flex-col gap-4">
                        <h3 className="font-bold text-2xl">Contact Information</h3>
                        <p className="text-subtext dark:text-Dark_subtext">It is a long established fact tha t a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        <div className="flex flex-col">
                            <ContactInfoItem icon={Phone} text="094-417-8888" />
                            <ContactInfoItem icon={Mail} text="phongphatbangkha@gmail.com" />
                            <ContactInfoItem icon={MapPin} text="Bangkok, Thailand" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;