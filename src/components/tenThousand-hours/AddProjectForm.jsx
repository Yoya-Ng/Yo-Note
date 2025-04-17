
import { useState, useEffect } from 'react';
import { addProject } from 'src/utils/store';

export default function AddProjectForm() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setStartDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    addProject({
      name,
      startDate,
    });
    
    // 重置表單
    setName('');
    setStartDate(new Date().toISOString().split('T')[0]);
    
    // 重新載入頁面
    window.location.reload();
  };

  if (!isClient) {
    return <div className="loading">Loading form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="border-t pt-4">
      <h3 className="text-lg font-medium mb-3">新增項目</h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            項目名稱
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            開始日期
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          新增項目
        </button>
      </div>
    </form>
  );
}