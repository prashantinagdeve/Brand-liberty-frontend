import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    _id: null,
    domain: '',
    category: '',
    subcategory: '',
    prompt: '',
  });

  useEffect(() => {
    axios
      .get('https://brand-liberty.onrender.com/api/v1/getproject')
      .then((response) => setProjects(response.data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://brand-liberty.onrender.com/api/v1/deleteprojects/${id}`)
      .then(() => {
        setProjects(projects.filter((project) => project._id !== id));
      })
      .catch((error) => console.error('Error deleting project:', error));
  };

  const openEditModal = (project) => {
    setNewProject({
      _id: project._id,
      domain: project.domain,
      category: project.category,
      subcategory: project.subcategory,
      prompt: project.prompt,
    });
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProject._id) {
      // Update existing project
      axios
        .put(`https://brand-liberty.onrender.com/api/v1/updateprojects/${newProject._id}`, newProject)
        .then((response) => {
          setProjects(projects.map((project) => (project._id === newProject._id ? response.data : project)));
          setModalIsOpen(false);
          setNewProject({
            _id: null,
            domain: '',
            category: '',
            subcategory: '',
            prompt: '',
          });
        })
        .catch((error) => console.error('Error updating project:', error));
    } else {
      // Add new project
      axios
        .post('https://brand-liberty.onrender.com/api/v1/addproject', newProject)
        .then((response) => {
          setProjects([...projects, response.data]);
          setModalIsOpen(false);
          setNewProject({
            _id: null,
            domain: '',
            category: '',
            subcategory: '',
            prompt: '',
          });
        })
        .catch((error) => console.error('Error adding project:', error));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Project List</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={() => {
            setNewProject({
              _id: null,
              domain: '',
              category: '',
              subcategory: '',
              prompt: '',
            });
            setModalIsOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add New Project
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Domain Name</th>
              <th className="py-2 px-4 border">Special Code</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Subcategory</th>
              <th className="py-2 px-4 border">Prompt</th>
              <th className="py-2 px-4 border">Site Connection</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="py-2 px-4 border text-center">{project.domain}</td>
                <td className="py-2 px-4 border text-center">{project.specialCode}</td>
                <td className="py-2 px-4 border text-center">{project.category}</td>
                <td className="py-2 px-4 border text-center">{project.subcategory}</td>
                <td className="py-2 px-4 border text-center ">{project.prompt}</td>
                <td className="py-2 px-4 border text-center">
                  {project.siteConnection === 'Done' && <span className="text-green-500">Done</span>}
                  {project.siteConnection === 'Pending' && <span className="text-yellow-500">Pending</span>}
                  {project.siteConnection === 'Error' && <span className="text-red-500">Error</span>}
                </td>
                <td className="py-2 px-4 border flex items-center space-x-2">
                  <button className="text-blue-500 hover:underline" onClick={() => openEditModal(project)}>
                    <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                  </button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(project._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel={newProject._id ? 'Edit Project' : 'Add New Project'}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">{newProject._id ? 'Edit Project' : 'Create New Project'}</h2>
        <p className="text-center mb-4">
          {newProject._id ? 'Update the fields below to edit the project.' : 'Fill the fields below to create a new project (Domain).'}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700">Domain Name</label>
              <input
                type="text"
                name="domain"
                value={newProject.domain}
                onChange={handleInputChange}
                placeholder="Placeholder"
                className="w-full p-2 border rounded"
              />
              <small className="block text-gray-500">Add your domain name</small>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Category</label>
              <select
                name="category"
                value={newProject.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  Placeholder
                </option>
                <option value="news">News</option>
                <option value="finance">Finance</option>
                <option value="sports">Sports</option>
                <option value="historical">Historical</option>
                <option value="informative">Informative</option>
                <option value="fashion">Fashion</option>
                <option value="technology">Technology</option>
              </select>
            </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700">Sub-Category</label>
              <select
                name="subcategory"
                value={newProject.subcategory}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                disabled={!['news', 'finance', 'fashion'].includes(newProject.category)}
              >
                <option value="" disabled>
                  Placeholder
                </option>
                <option value="news">News</option>
                <option value="finance">Finance</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Prompt</label>
              <select
                name="prompt"
                value={newProject.prompt}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  Placeholder
                </option>
                <option value="news anchor">News</option>
                <option value="coder">Finance</option>
                <option value="It-Professional">Sports</option>
                <option value="kids">Historical</option>
                <option value="informative">Informative</option>
                <option value="Teacher">Fashion</option>
                <option value="finance expert">Technology</option>
                <option value="legal advisor">Technology</option>
                <option value="politician">Technology</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setModalIsOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {newProject._id ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectList;
