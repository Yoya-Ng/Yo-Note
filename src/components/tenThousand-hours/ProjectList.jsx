
import { useState, useEffect } from 'react';
import { getProjects, deleteProject, updateProject } from 'src/utils/store';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadProjects();
  }, []);

  const loadProjects = () => {
    if (typeof window !== 'undefined') {
      const projectData = getProjects();
      setProjects(projectData);
    }
  };

  const handleDelete = (id) => {
    if (deleteProject(id)) {
      loadProjects();
    }
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditName(project.name);
  };

  const saveEdit = () => {
    if (!editName.trim()) return;
    
    const updatedProject = updateProject(editingId, { name: editName });
    if (updatedProject) {
      setProjects(projects.map(p => 
        p.id === editingId ? updatedProject : p
      ));
      setEditingId(null);
      setEditName('');
    }
  };

  if (!isClient) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="space-y-4 mb-6">
      {projects.length === 0 ? (
        <p className="text-gray-500">尚未添加任何項目</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {projects.map(project => (
            <li key={project.id} className="py-3 flex justify-between items-center">
              {editingId === project.id ? (
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border rounded px-2 py-1 mr-2 flex-grow"
                  />
                  <button 
                    onClick={saveEdit}
                    className="text-green-600 hover:text-green-800 px-2"
                  >
                    儲存
                  </button>
                  <button 
                    onClick={() => setEditingId(null)}
                    className="text-gray-600 hover:text-gray-800 px-2"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <span className="font-medium">{project.name}</span>
                    <p className="text-sm text-gray-500">
                      開始於: {new Date(project.startDate).toLocaleDateString()}
                      {project.totalHours > 0 && ` · 累計: ${project.totalHours.toFixed(1)} 小時`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => startEdit(project)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      編輯
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      刪除
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
