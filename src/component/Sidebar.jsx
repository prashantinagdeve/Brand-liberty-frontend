import React from 'react';
import { FaTachometerAlt, FaProjectDiagram, FaKey, FaBlog, FaImage, FaUser, FaEnvelope, FaSms, FaClipboard, FaAd, FaCog, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-white text-black">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <span className="text-2xl font-bold text-blue-700">Logo</span>
            </div>
            <div className="flex flex-col p-4 space-y-4">
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaTachometerAlt className="text-black hover:text-white" />
                    <span>Dashboard</span>
                </a>
                
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaProjectDiagram className="text-black hover:text-white" />
                    <span>Projects</span>
                    
                </a>
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaKey className="text-black hover:text-white" />
                    <span>Keyword Research</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaBlog className="text-black hover:text-white" />
                    <span>Blog Writing</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaImage className="text-black hover:text-white" />
                    <span>Media</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaUser className="text-black hover:text-white" />
                    <span>Users</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaEnvelope className="text-black hover:text-white" />
                    <span>Email Campaign</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaSms className="text-black hover:text-white" />
                    <span>SMS Configuration</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaClipboard className="text-black hover:text-white" />
                    <span>Affiliate</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaAd className="text-black hover:text-white" />
                    <span>Ad's Block</span>
                </a>
                <a href="#" className="flex items-center space-x-2 hover:bg-blue-700 hover:text-white p-2 rounded">
                    <FaCog className="text-black hover:text-white" />
                    <span>Settings</span>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
