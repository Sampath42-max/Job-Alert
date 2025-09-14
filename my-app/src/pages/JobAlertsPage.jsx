import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import UploadCloudIcon from '../components/icons/UploadCloudIcon.jsx';
import XIcon from '../components/icons/XIcon.jsx';

const SKILLS_DATA = ["Java", "Python", "JavaScript", "TypeScript", "HTML", "CSS", "React.js", "Angular", "Vue.js", "Node.js", "Express.js", "Spring Boot", "Django", "Flask", "SQL", "MySQL", "PostgreSQL", "MongoDB", "Oracle DB", "AWS", "Microsoft Azure", "Google Cloud Platform (GCP)", "DevOps", "Docker", "Kubernetes", "Git/GitHub", "REST API", "GraphQL", "Machine Learning", "Deep Learning", "Data Science", "Artificial Intelligence (AI)", "Natural Language Processing (NLP)", "Computer Vision", "Cybersecurity", "Ethical Hacking", "Blockchain", "Web Development", "Mobile App Development", "UI/UX Design", "Figma", "Adobe XD", "Project Management", "Agile / Scrum", "Communication Skills", "Problem Solving", "Leadership", "Teamwork", "Other"];
const JOB_TITLES_DATA = ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile App Developer", "Web Developer", "Data Scientist", "Machine Learning Engineer", "AI Engineer", "Data Analyst", "Business Analyst", "Cloud Engineer", "DevOps Engineer", "Cybersecurity Analyst", "Security Engineer", "Blockchain Developer", "Database Administrator (DBA)", "Systems Administrator", "Product Manager", "Project Manager", "QA Engineer / Tester", "Automation Engineer", "UI/UX Designer", "Graphic Designer", "Content Writer", "Digital Marketing Specialist", "SEO Specialist", "Customer Support Executive", "HR Executive", "Sales Executive", "Financial Analyst", "Marketing Manager", "Research Intern", "Software Intern", "Teaching Assistant", "Other"];
const EXPERIENCE_DATA = ["Fresher", "Internship", "Entry-Level (0-2 years)", "Mid-Level (3-6 years)", "Senior (7+ years)", "Other"];
const INTERESTS_DATA = ["Software Development", "Web Development", "Mobile App Development", "Data Science & AI", "Cybersecurity", "Cloud Computing", "UI/UX & Design", "Business & Management", "Marketing & Sales", "Finance & Accounting", "Education & Research", "Healthcare & MedTech", "Startups & Entrepreneurship", "Freelancing / Remote Work", "Other"];

function CustomSelect({ items, placeholder, selected, setSelected, isMulti = false }) {
    const options = items.map(item => ({ value: item, label: item }));
    return (
        <Select
            options={options}
            value={isMulti ? selected.map(s => ({ value: s, label: s })) : selected ? { value: selected, label: selected } : null}
            onChange={(option) => {
                if (isMulti) {
                    setSelected(option ? option.map(o => o.value) : []);
                } else {
                    setSelected(option ? option.value : '');
                }
            }}
            placeholder={placeholder}
            isMulti={isMulti}
            isClearable
            className="basic-multi-select"
            classNamePrefix="select"
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: 'white',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.75rem',
                    padding: '0.5rem',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    '&:hover': { borderColor: '#3b82f6' },
                }),
                menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }),
                option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected ? '#3b82f6' : isFocused ? '#e2e8f0' : 'white',
                    color: isSelected ? 'white' : '#1e293b',
                    cursor: 'pointer',
                }),
            }}
        />
    );
}

function JobAlertsPage() {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [customSkills, setCustomSkills] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [interests, setInterests] = useState([]);
    const [resume, setResume] = useState(null);
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('idle');
    const fileInputRef = useRef(null);

    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });

    const handleSubmit = async () => {
        setSubmissionStatus('submitting');
        let resumeFileData = "";
        if (resume) {
            try {
                resumeFileData = await fileToBase64(resume);
            } catch (error) {
                console.error("Error converting file to base64:", error);
                setSubmissionStatus('error');
                return;
            }
        }

        const allSkills = [
            ...selectedSkills,
            ...(customSkills.trim() ? customSkills.split(',').map(s => s.trim()).filter(s => s) : [])
        ].join(', ');

        const dataToSend = {
            email: email,
            resumeFileName: resume ? resume.name : "",
            resumeFileData: resumeFileData,
            skills: allSkills,
            jobTitle: jobTitle,
            experienceLevel: experience,
            interests: interests.join(', ')
        };

        const webhookUrl = 'https://mrtheone007.app.n8n.cloud/webhook/inputfields';
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setEmail('');
                setSelectedSkills([]);
                setCustomSkills('');
                setJobTitle('');
                setExperience('');
                setInterests([]);
                setResume(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                setSubmissionStatus('error');
                console.error("Webhook submission failed:", response.status, response.statusText);
            }
        } catch (error) {
            setSubmissionStatus('error');
            console.error("Error submitting to webhook:", error);
        }
    };

    const handleRemoveResume = () => {
        setResume(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <section id="get-alerts" className="py-20 sm:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Create Your Job Alert</h2>
                    <p className="mt-4 text-lg text-slate-600">Tell us what you're looking for, and we'll handle the rest. Stop scrolling, start applying.</p>
                </div>
                <motion.div
                    className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Your Preferences</h3>
                    <div className="space-y-6">
                        <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                            <UploadCloudIcon className="w-10 h-10 mx-auto text-slate-400" />
                            <p className="mt-2 text-sm text-slate-600">
                                <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => setResume(e.target.files[0])}
                                ref={fileInputRef}
                            />
                            {resume && (
                                <div className="mt-2 flex items-center justify-center gap-2">
                                    <p className="text-xs text-green-600">Uploaded: {resume.name}</p>
                                    <button
                                        type="button"
                                        onClick={handleRemoveResume}
                                        className="text-red-500 hover:text-red-700"
                                        title="Remove resume"
                                    >
                                        <XIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Skills (Select from list)</label>
                            <CustomSelect
                                items={SKILLS_DATA}
                                placeholder="Select your skills..."
                                selected={selectedSkills}
                                setSelected={setSelectedSkills}
                                isMulti={true}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Custom Skills (Enter additional skills, comma-separated)</label>
                            <input
                                type="text"
                                placeholder="Enter additional skills (e.g., C++, TensorFlow)"
                                value={customSkills}
                                onChange={(e) => setCustomSkills(e.target.value)}
                                className="w-full p-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                            <CustomSelect
                                items={JOB_TITLES_DATA}
                                placeholder="Select a job title..."
                                selected={jobTitle}
                                setSelected={setJobTitle}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                            <CustomSelect
                                items={EXPERIENCE_DATA}
                                placeholder="Select experience level..."
                                selected={experience}
                                setSelected={setExperience}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Interests</label>
                            <CustomSelect
                                items={INTERESTS_DATA}
                                placeholder="Select your interests..."
                                selected={interests}
                                setSelected={setInterests}
                                isMulti={true}
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={submissionStatus === 'submitting'}
                            className="w-full text-white font-semibold py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submissionStatus === 'submitting' ? 'Saving...' : 'Save & Get Daily Alerts'}
                        </button>
                        <AnimatePresence>
                            {submissionStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-4 text-center p-3 rounded-lg bg-green-100 text-green-800 text-sm"
                                >
                                    In 5 minutes you will get the details in mail.
                                </motion.div>
                            )}
                            {submissionStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-4 text-center p-3 rounded-lg bg-red-100 text-red-800 text-sm"
                                >
                                    Submission failed. This is likely a CORS issue. Please ensure your webhook endpoint allows requests from this origin.
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


export default JobAlertsPage;

