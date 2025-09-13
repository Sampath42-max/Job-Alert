import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CustomSelect from '../components/CustomSelect';
import UploadCloudIcon from '../components/icons/UploadCloudIcon';

const SKILLS_DATA = ["Java", "Python", "JavaScript", "TypeScript", "HTML", "CSS", "React.js", "Angular", "Vue.js", "Node.js", "Express.js", "Spring Boot", "Django", "Flask", "SQL", "MySQL", "PostgreSQL", "MongoDB", "Oracle DB", "AWS", "Microsoft Azure", "Google Cloud Platform (GCP)", "DevOps", "Docker", "Kubernetes", "Git/GitHub", "REST API", "GraphQL", "Machine Learning", "Deep Learning", "Data Science", "Artificial Intelligence (AI)", "Natural Language Processing (NLP)", "Computer Vision", "Cybersecurity", "Ethical Hacking", "Blockchain", "Web Development", "Mobile App Development", "UI/UX Design", "Figma", "Adobe XD", "Project Management", "Agile / Scrum", "Communication Skills", "Problem Solving", "Leadership", "Teamwork", "Other"];
const JOB_TITLES_DATA = ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile App Developer", "Web Developer", "Data Scientist", "Machine Learning Engineer", "Al Engineer", "Data Analyst", "Business Analyst", "Cloud Engineer", "DevOps Engineer", "Cybersecurity Analyst", "Security Engineer", "Blockchain Developer", "Database Administrator (DBA)", "Systems Administrator", "Product Manager", "Project Manager", "QA Engineer / Tester", "Automation Engineer", "UI/UX Designer", "Graphic Designer", "Content Writer", "Digital Marketing Specialist", "SEO Specialist", "Customer Support Executive", "HR Executive", "Sales Executive", "Financial Analyst", "Marketing Manager", "Research Intern", "Software Intern", "Teaching Assistant", "Other"];
const EXPERIENCE_DATA = ["Fresher", "Internship", "Entry-Level (0-2 years)", "Mid-Level (3-6 years)", "Senior (7+ years)", "Other"];
const INTERESTS_DATA = ["Software Development", "Web Development", "Mobile App Development", "Data Science & AI", "Cybersecurity", "Cloud Computing", "UI/UX & Design", "Business & Management", "Marketing & Sales", "Finance & Accounting", "Education & Research", "Healthcare & MedTech", "Startups & Entrepreneurship", "Freelancing / Remote Work", "Other"];

function JobAlertsPage() {
    const [skills, setSkills] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [interests, setInterests] = useState([]);
    const [resume, setResume] = useState(null);
    const [email, setEmail] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('idle');

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

        const dataToSend = {
            email: email,
            resumeFileName: resume ? resume.name : "",
            resumeFileData: resumeFileData,
            skills: skills.join(', '),
            jobTitle: jobTitle,
            experienceLevel: experience,
            interests: interests.join(', ')
        };

        const webhookUrl = 'https://mrtheone007.app.n8n.cloud/webhook-test/inputfields';
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setSubmissionStatus('success');
            } else {
                setSubmissionStatus('error');
                console.error("Webhook submission failed:", response.status, response.statusText);
            }
        } catch (error) {
            setSubmissionStatus('error');
            console.error("Error submitting to webhook:", error);
        }
    };

    return (
        <section id="get-alerts" className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-900/70 relative overflow-hidden">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Create Your Job Alert</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Tell us what you're looking for, and we'll handle the rest. Stop scrolling, start applying.</p>
                </div>
                <motion.div
                    className="max-w-2xl mx-auto p-6 md:p-8 bg-white/60 dark:bg-slate-800/40 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-lg shadow-xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Your Preferences</h3>
                    <div className="space-y-6">
                        <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                            <UploadCloudIcon className="w-10 h-10 mx-auto text-slate-400 dark:text-slate-500" />
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setResume(e.target.files[0])} />
                            {resume && <p className="text-xs text-green-600 dark:text-green-400 mt-2">Uploaded: {resume.name}</p>}
                        </div>
                        <input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-white/5 dark:bg-slate-800/30 border border-slate-300/50 dark:border-slate-700/50 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                            />
                        <CustomSelect items={SKILLS_DATA} placeholder="Select your skills..." selected={skills} setSelected={setSkills} isMulti={true} />
                        <CustomSelect items={JOB_TITLES_DATA} placeholder="Select a job title..." selected={jobTitle} setSelected={setJobTitle} />
                        <CustomSelect items={EXPERIENCE_DATA} placeholder="Select experience level..." selected={experience} setSelected={setExperience} />
                        <CustomSelect items={INTERESTS_DATA} placeholder="Select your interests..." selected={interests} setSelected={setInterests} isMulti={true} />
                        <button
                            onClick={handleSubmit}
                            disabled={submissionStatus === 'submitting'}
                            className="w-full text-white font-semibold py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submissionStatus === 'submitting' ? 'Saving...' : 'Save & Get Daily Alerts'}
                        </button>
                        {submissionStatus === 'success' && (
                            <div className="mt-4 text-center p-3 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm">
                                Preferences saved successfully!
                            </div>
                        )}
                        {submissionStatus === 'error' && (
                            <div className="mt-4 text-center p-3 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 text-sm">
                                Submission failed. This is likely a CORS issue. Please ensure your webhook endpoint allows requests from this origin.
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default JobAlertsPage;