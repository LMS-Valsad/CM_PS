import React, { useState } from 'react';
import './style.css';
const SplitLayout = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({ name: '', education: '', position: '' });
    const [modalOpen, setModalOpen] = useState(false);

    const jobs = [
        { title: 'Data Entries', positions: 3 },
        { title: 'Welder', positions: 5 },
        { title: 'Electrician', positions: 2 },
        { title: 'Fitter', positions: 4 },
        { title: 'Rigger', positions: 3 },
        { title: 'Plumber', positions: 6 },
        { title: 'Mechanic', positions: 7 },
        { title: 'Carpenter', positions: 2 },
        { title: 'Driver', positions: 8 },
        { title: 'Painter', positions: 3 }
    ];

    const openModal = (jobTitle) => {
        setSelectedJob(jobTitle);
        setFormData({ ...formData, position: jobTitle });
        setModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert('Application Submitted Successfully!');
        setFormData({ name: '', education: '', position: '' });
        setModalOpen(false);
    };

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col lg:flex-row w-full pt-2 gap-3 min-h-[31rem]">
            {/* Left Section */}
            <div className="text-white flex flex-col w-full p-3 shadow rounded bg-[#3d5561] relative">
                <h2 className="mb-3">Recent Openings</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="p-3 text-left">Job Title</th>
                                <th className="p-3 text-left">Open Positions</th>
                                <th className="p-3 text-left">Apply</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 text-white divide-y divide-gray-700">
                            {currentJobs.map((job, index) => (
                                <tr key={index} className="hover:bg-gray-600">
                                    <td className="p-3">{job.title}</td>
                                    <td className="p-3">{job.positions}</td>
                                    <td className="p-3">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => openModal(job.title)}>
                                            Apply
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav className="mt-3">
                    <ul className="flex justify-center space-x-2">
                        {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, index) => (
                            <li key={index + 1} className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
                                <button onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                {modalOpen && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className=" p-5 rounded shadow-lg w-96" id="bg-im">
                            <h2 className="text-lg font-bold">Apply for {selectedJob}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Name</label>
                                    <input id="inp" type="text" className="w-full border p-2 rounded" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Education</label>
                                    <input id="inp" type="text" className="w-full border p-2 rounded" name="education" value={formData.education} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Position</label>
                                    <input id='inp2' type="text" className="w-full border p-2 rounded " name="position" value={formData.position} readOnly />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button type="button" className="bg-danger-400 text-white px-4 py-2 rounded" onClick={() => setModalOpen(false)}>Cancel</button>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            {/* Right Section */}
            <div id='rightDiv' className="flex flex-col items-center justify-center w-full p-3 shadow rounded">
                <h2 className="font-bold text-lg">Share your CV with us!</h2>
                <p className="my-2 pb-3">We will get back to you soon.</p>
                <a 
                href="https://api.whatsapp.com/send?phone=919601505408&text=Hi there !" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700">
                    Send Your CV
                </a>
                <p className="text-sm pt-3 mt-2">Apply for hundreds of jobs across Surat.</p>
            </div>
        </div>
    );
};

export default SplitLayout;
