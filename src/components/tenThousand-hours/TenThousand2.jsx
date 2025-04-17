import { useState, useEffect } from "react";

export default function TenThousandHoursCalculator() {
  const [lifespan, setLifespan] = useState(80);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [activities, setActivities] = useState([
    { name: "學習編程", hoursPerDay: 2 },
    { name: "閱讀", hoursPerDay: 1 },
  ]);
  const [newActivity, setNewActivity] = useState("");
  const [newHours, setNewHours] = useState(1);
  const [totalHoursPerDay, setTotalHoursPerDay] = useState(0);
  const [availableHoursPerDay, setAvailableHoursPerDay] = useState(0);
  const [dailyHours, setDailyHours] = useState(8);

  // Calculate hours between start and end time
  useEffect(() => {
    const start = startTime.split(":").map(Number);
    const end = endTime.split(":").map(Number);
    let hours = end[0] - start[0];
    const minutes = end[1] - start[1];
    hours += minutes / 60;
    setDailyHours(Math.max(0, hours));
  }, [startTime, endTime]);

  // Calculate total hours used and available
  useEffect(() => {
    const totalUsed = activities.reduce((sum, act) => sum + act.hoursPerDay, 0);
    setTotalHoursPerDay(totalUsed);
    setAvailableHoursPerDay(Math.max(0, dailyHours - totalUsed));
  }, [activities, dailyHours]);

  const addActivity = () => {
    if (newActivity.trim() && newHours > 0) {
      setActivities([...activities, { name: newActivity, hoursPerDay: newHours }]);
      setNewActivity("");
      setNewHours(1);
    }
  };

  const removeActivity = (index) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    setActivities(newActivities);
  };

  const calculateLifetimeHours = (hoursPerDay) => {
    const weeksInLife = lifespan * 52;
    return Math.round(weeksInLife * daysPerWeek * hoursPerDay);
  };

  const calculateTimeToReachGoal = (hoursPerDay) => {
    if (hoursPerDay <= 0) return "永遠不會達成";
    const hoursPerWeek = hoursPerDay * daysPerWeek;
    const weeksNeeded = 10000 / hoursPerWeek;
    const yearsNeeded = weeksNeeded / 52;
    
    if (yearsNeeded > lifespan) return "一生無法達成";
    
    const years = Math.floor(yearsNeeded);
    const months = Math.floor((yearsNeeded - years) * 12);
    
    return `${years}年${months}個月`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">一萬小時計算器</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">預期壽命（年）</label>
            <div className="flex items-center">
              <input
                type="range"
                min="1"
                max="100"
                value={lifespan}
                onChange={(e) => setLifespan(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-4 text-xl font-bold">{lifespan}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-lg font-medium mb-2">每週投入天數</label>
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                <button
                  key={days}
                  className={`py-2 rounded-lg ${
                    daysPerWeek === days 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                  onClick={() => setDaysPerWeek(days)}
                >
                  {days}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium mb-2">開始時間</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">結束時間</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
            <p className="font-medium">每天可用時間: <span className="font-bold text-lg">{dailyHours.toFixed(1)} 小時</span></p>
            <p className="font-medium">已分配時間: <span className="font-bold text-lg">{totalHoursPerDay.toFixed(1)} 小時</span></p>
            <p className="font-medium">未分配時間: <span className="font-bold text-lg">{availableHoursPerDay.toFixed(1)} 小時</span></p>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">添加活動</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="活動名稱"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={newHours}
                onChange={(e) => setNewHours(Number(e.target.value))}
                className="w-20 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
              <button
                onClick={addActivity}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                添加
              </button>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">活動列表</h2>
            {activities.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">尚未添加活動</p>
            ) : (
              <ul className="space-y-2">
                {activities.map((activity, index) => (
                  <li key={index} className="flex justify-between items-center bg-white dark:bg-gray-600 p-3 rounded-lg">
                    <span>{activity.name}</span>
                    <div className="flex items-center space-x-2">
                      <span>{activity.hoursPerDay} 小時/天</span>
                      <button
                        onClick={() => removeActivity(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-8">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-3 text-left">活動</th>
              <th className="p-3 text-right">每日小時</th>
              <th className="p-3 text-right">每週小時</th>
              <th className="p-3 text-right">每年小時</th>
              <th className="p-3 text-right">預期一生累積</th>
              <th className="p-3 text-right">達成一萬小時</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => {
              const hoursPerWeek = activity.hoursPerDay * daysPerWeek;
              const hoursPerYear = hoursPerWeek * 52;
              const lifetimeHours = calculateLifetimeHours(activity.hoursPerDay);
              const timeToReachGoal = calculateTimeToReachGoal(activity.hoursPerDay);
              
              return (
                <tr key={index} className="border-b border-gray-300 dark:border-gray-600">
                  <td className="p-3">{activity.name}</td>
                  <td className="p-3 text-right">{activity.hoursPerDay}</td>
                  <td className="p-3 text-right">{hoursPerWeek}</td>
                  <td className="p-3 text-right">{hoursPerYear}</td>
                  <td className="p-3 text-right">{lifetimeHours}</td>
                  <td className="p-3 text-right">{timeToReachGoal}</td>
                </tr>
              );
            })}
            {activities.length > 0 && (
              <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                <td className="p-3">總計</td>
                <td className="p-3 text-right">{totalHoursPerDay}</td>
                <td className="p-3 text-right">{totalHoursPerDay * daysPerWeek}</td>
                <td className="p-3 text-right">{totalHoursPerDay * daysPerWeek * 52}</td>
                <td className="p-3 text-right">{calculateLifetimeHours(totalHoursPerDay)}</td>
                <td className="p-3 text-right">-</td>
              </tr>
            )}
            <tr className="bg-blue-100 dark:bg-blue-900">
              <td className="p-3">未分配時間</td>
              <td className="p-3 text-right">{availableHoursPerDay.toFixed(1)}</td>
              <td className="p-3 text-right">{(availableHoursPerDay * daysPerWeek).toFixed(1)}</td>
              <td className="p-3 text-right">{(availableHoursPerDay * daysPerWeek * 52).toFixed(1)}</td>
              <td className="p-3 text-right">{calculateLifetimeHours(availableHoursPerDay)}</td>
              <td className="p-3 text-right">-</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">一萬小時理論</h2>
        <p>根據馬爾科姆·格拉德威爾在《異數》一書中提出的理論，要在任何領域達到專業水平，需要投入約10,000小時的刻意練習。</p>
        <p className="mt-2">此計算器幫助您規劃如何分配時間，以及了解達成特定技能掌握所需的時間。</p>
      </div>
    </div>
  );
}