import React from 'react';
import ProjectList from './component/ProjectList';
import Sidebar from './component/Sidebar';


function App() {
    return (
      <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
          <ProjectList />
      </div>
  </div>
    );
}

export default App;