
import { useState, useEffect } from 'react';
import { getProjects, addTimeEntry } from 'src/utils/store';

export default function TimeEntryForm() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [hours, setHours] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [description, setDescription] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const projectData = getProjects();
      setProjects(projectData);
      if (projectData.length > 0) {
        setProjectId(projectData[0].id);
      }
      setEntryDate(new Date().toISOString().split('T')[0]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!projectId || !hours || parseFloat(hours) <= 0) return;
    
    addTimeEntry({
      projectId,
      hours: parseFloat(hours),
      entryDate,
      description,
    });
    
    // 重置表單
    setHours('');
    setDescription('');
    setEntryDate(new Date().toISOString().split('T')[0]);
    
    // 重新載入頁面
    window.location.reload();
  };

  if (!isClient) {
    return <div className="loading">Loading form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700">
            項目
          </label>
          <select
            id="project"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="" disabled>選擇項目</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
            時數
          </label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            step="0.5"
            min="0.5"
            required
          />
        </div>

        <div>
          <label htmlFor="entryDate" className="block text-sm font-medium text-gray-700">
            日期
          </label>
          <input
            type="date"
            id="entryDate"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            描述（選填）
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        記錄時間
      </button>
    </form>
  );
}