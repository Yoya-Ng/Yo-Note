import { useState, useEffect } from "react";

export default function TenThousandHoursCalculator() {
    // State for life settings
    const [lifeLength, setLifeLength] = useState(80);
    const everyDay = [1, 2, 3, 4, 5, 6, 7];
    const [activities, setActivities] = useState([
        { id: 1, name: "睡覺", category: "日常生活", hoursPerSession: 8, daysPerWeek: 7, startAge: 0, endAge: 80, showInReport: false, color: "bg-gray-200" },
        { id: 2, name: "學校", category: "日常生活", hoursPerSession: 8, daysPerWeek: 5, startAge: 6, endAge: 18, showInReport: false, color: "bg-yellow-200" },
        { id: 3, name: "練習吉他", category: "學習", hoursPerSession: 1, daysPerWeek: 3, startAge: 15, endAge: 30, showInReport: true, color: "bg-blue-200" },
    ]);
    const [newActivity, setNewActivity] = useState({
        name: "",
        category: "日常生活",
        hoursPerSession: 1,
        daysPerWeek: 1,
        startAge: 0,
        endAge: lifeLength,
        showInReport: false,
        color: "bg-green-200",
    });

    // Calculate total hours per activity and percentages
    const calculateStats = () => {
        const hoursInLife = lifeLength * 365.25 * 24;
        const updatedActivities = activities.map((activity) => {
            const yearsActive = Math.min(activity.endAge, lifeLength) - Math.max(activity.startAge, 0);
            const weeksActive = yearsActive * 52;
            const totalHours = weeksActive * activity.daysPerWeek * activity.hoursPerSession;
            const percentage = ((totalHours / hoursInLife) * 100).toFixed(2);
            const reachedTenThousand = totalHours >= 10000;

            return {
                ...activity,
                totalHours,
                percentage,
                reachedTenThousand,
            };
        });

        // Calculate unallocated time
        const allocatedHours = updatedActivities.reduce((sum, act) => sum + act.totalHours, 0);
        const unallocatedHours = hoursInLife - allocatedHours;
        const unallocatedPercentage = ((unallocatedHours / hoursInLife) * 100).toFixed(2);

        return {
            activities: updatedActivities,
            unallocatedHours,
            unallocatedPercentage,
            hoursInLife,
        };
    };

    const stats = calculateStats();

    // Handle adding new activity
    const handleAddActivity = () => {
        if (!newActivity.name) return;

        setActivities([
            ...activities,
            {
                ...newActivity,
                id: activities.length + 1,
            },
        ]);

        // Reset new activity form
        setNewActivity({
            name: "",
            category: "學習",
            hoursPerSession: 1,
            daysPerWeek: 1,
            startAge: 0,
            endAge: lifeLength,
            showInReport: true,
            color: "bg-green-200",
        });
    };

    // Handle removing activity
    const handleRemoveActivity = (id) => {
        setActivities(activities.filter((activity) => activity.id !== id));
    };

    // Handle activity changes
    const handleActivityChange = (id, field, value) => {
        setActivities(activities.map((activity) => (activity.id === id ? { ...activity, [field]: value } : activity)));
    };

    const colorOptions = ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-red-200", "bg-purple-200", "bg-pink-200", "bg-indigo-200"];

    const filteringNumbers = (value, min, max) => {
        // 移除非數字的字元，只留下數字
        const digitsOnly = value.replace(/\D/g, ''); // \D 表示「非數字」

        const parsed = parseInt(digitsOnly, 10);
        // 限制在 0~24 區間
        return isNaN(parsed) ? 0 : Math.min(Math.max(parseInt(parsed), min), max);
    }

    return (
        <div className="container mx-auto p-4 glass">
            <h1 className="text-3xl font-bold mb-6 text-center">一萬小時計算器</h1>

            {/* Settings & Add Activity Combined Section */}
            <div className="mb-8 p-4 rounded-lg bg-opacity-20 bg-blue-50 dark:bg-opacity-10 dark:bg-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                    {/* Life Settings */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">生命設定</h2>
                        <div className="flex items-center mb-4">
                            <label className="mr-4 w-32">預期壽命：</label>
                            <input type="text"
                                className="p-2 border rounded w-24 dark:bg-gray-700 dark:border-gray-600"
                                value={lifeLength}
                                onChange={(e) => setLifeLength(filteringNumbers(e.target.value, 1, 120))}
                                min="1" max="120" />
                            <span className="ml-2">歲</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">* 根據計算，你一生中大約有 {Math.round(stats.hoursInLife).toLocaleString()} 小時</div>
                    </div>

                    {/* Add New Activity */}
                    <div className="lg:col-span-5">
                        <h2 className="text-xl font-semibold mb-4">新增活動</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                                <label className="block mb-1">活動名稱</label>
                                <input type="text" className="p-2 border rounded w-full dark:bg-gray-700 dark:border-gray-600" value={newActivity.name} onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })} placeholder="例如：練習吉他" />
                            </div>

                            <div>
                                <label className="block mb-1">類別</label>
                                <select className="p-2 border rounded w-full dark:bg-gray-700 dark:border-gray-600"
                                    value={newActivity.category}
                                    onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}>
                                    <option value="學習">學習</option>
                                    <option value="日常生活">日常生活</option>
                                    <option value="工作">工作</option>
                                    <option value="休閒">休閒</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1">每次時數</label>
                                <input type="text"
                                    className="p-2 border rounded w-full dark:bg-gray-700 dark:border-gray-600"
                                    value={newActivity.hoursPerSession}
                                    onChange={(e) =>
                                        setNewActivity({
                                            ...newActivity,
                                            hoursPerSession: filteringNumbers(e.target.value, 0, 24)
                                        })
                                    }
                                    min="0" max="24" />
                            </div>

                            <div>
                                <label className="block mb-1">開始年齡</label>
                                <input type="text"
                                    className="p-2 border rounded w-full dark:bg-gray-700 dark:border-gray-600"
                                    value={newActivity.startAge}
                                    onChange={(e) =>
                                        setNewActivity({
                                            ...newActivity,
                                            startAge: filteringNumbers(e.target.value, 0, lifeLength - 1)
                                        })
                                    }
                                    onBlur={(e) => {
                                        if (newActivity.startAge >= newActivity.endAge) {
                                            setNewActivity({
                                                ...newActivity,
                                                endAge: e.target.value
                                            })
                                        }
                                    }}
                                    min="0" max={newActivity.endAge} />
                            </div>

                            <div>
                                <label className="block mb-1">結束年齡</label>
                                <input type="text"
                                    className="p-2 border rounded w-full dark:bg-gray-700 dark:border-gray-600"
                                    value={newActivity.endAge}
                                    onChange={(e) =>
                                        setNewActivity({
                                            ...newActivity,
                                            endAge: filteringNumbers(e.target.value, 0, lifeLength)
                                        })
                                    }
                                    onBlur={(e) => {
                                        setNewActivity({
                                            ...newActivity,
                                            endAge: filteringNumbers(e.target.value, newActivity.startAge, lifeLength)
                                        })
                                    }}
                                    min={newActivity.startAge} max={lifeLength} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                            <div className="col-span-2">
                                <label className="block text-lg font-medium mb-2">每週投入天數</label>
                                <div className="grid grid-cols-7 gap-2">
                                    {everyDay.map((days) => (
                                        <button key={days}
                                            className={`py-2 rounded-lg ${newActivity.daysPerWeek === days ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                                            onClick={() => setNewActivity({ ...newActivity, daysPerWeek: parseInt(days) })}>
                                            {days}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1">顏色</label>
                                <select className="p-2 border rounded w-1/2 dark:bg-gray-700 dark:border-gray-600" value={newActivity.color} onChange={(e) => setNewActivity({ ...newActivity, color: e.target.value })}>
                                    {colorOptions.map((color) => (
                                        <option key={color} value={color}>
                                            {color.replace("bg-", "").replace("-200", "")}
                                        </option>
                                    ))}
                                </select>
                                {/* <div className="flex items-end pb-2">
                                <div className="flex items-center">
                                    <input type="checkbox" id="showInReport" checked={newActivity.showInReport}
                                        onChange={(e) => setNewActivity({ ...newActivity, showInReport: e.target.checked })}
                                        className="w-4 h-4 mr-2" />
                                    <label htmlFor="showInReport">顯示於報表</label>
                                </div>
                                </div> */}
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={handleAddActivity}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 w-full"
                                    disabled={!newActivity.name}>
                                    新增活動
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Activities List */}
            <div className="mb-8 p-4 rounded-lg bg-opacity-20 bg-gray-50 dark:bg-opacity-10 dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4">活動清單</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="p-3 text-left">活動名稱</th>
                                <th className="p-3 text-left">類別</th>
                                <th className="p-3 text-left">每次時數</th>
                                <th className="p-3 text-left">每週天數</th>
                                <th className="p-3 text-left">開始年齡</th>
                                <th className="p-3 text-left">結束年齡</th>
                                <th className="p-3 text-left">顏色</th>
                                <th className="p-3 text-left">總時數</th>
                                <th className="p-3 text-left">佔比</th>
                                <th className="p-3 text-left">一萬小時計畫</th>
                                <th className="p-3 text-left">達成一萬小時</th>
                                <th className="p-3 text-left">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.activities.map((activity) => (
                                <tr key={activity.id} className={`border-b dark:border-gray-700 ${activity.showInReport ? "bg-opacity-20 " + activity.color : ""}`}>
                                    <td className="p-3 font-medium">{activity.name}</td>
                                    <td className="p-3">{activity.category}</td>
                                    <td className="p-3">
                                        <input type="text"
                                            className="p-1 border rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                                            value={activity.hoursPerSession}
                                            onChange={(e) => handleActivityChange(activity.id, "hoursPerSession", filteringNumbers(e.target.value, 0, 24))}
                                            min="0" max="24" />
                                    </td>
                                    <td className="p-3 ">
                                        <select className="p-1 border rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                                            value={activity.daysPerWeek}
                                            onChange={(e) => handleActivityChange(activity.id, "daysPerWeek", parseInt(e.target.value))}>
                                            {everyDay.map((num) => (
                                                <option key={num} value={num}>
                                                    {num}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-3">
                                        <input type="text"
                                            className="p-1 border rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                                            value={activity.startAge}
                                            onChange={(e) => handleActivityChange(activity.id, "startAge", filteringNumbers(e.target.value, 0, lifeLength - 1))}
                                            onBlur={(e) => {
                                                if (activity.startAge >= activity.endAge) {
                                                    handleActivityChange(activity.id, "endAge", e.target.value)
                                                }
                                            }}
                                            min="0" max={activity.endAge} />
                                    </td>
                                    <td className="p-3">
                                        <input type="text"
                                            className="p-1 border rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                                            value={activity.endAge}
                                            onChange={(e) => handleActivityChange(activity.id, "endAge", filteringNumbers(e.target.value, 0, lifeLength))}
                                            onBlur={(e) => handleActivityChange(activity.id, "endAge", filteringNumbers(e.target.value, activity.startAge, lifeLength))}
                                            min={activity.startAge} max={lifeLength} />
                                    </td>

                                    <td className="p-3">
                                        <select className="p-1 border rounded w-16 dark:bg-gray-700 dark:border-gray-600"
                                            value={activity.color}
                                            onChange={(e) => handleActivityChange(activity.id, "color", e.target.value)}>
                                            {colorOptions.map((color) => (
                                                <option key={color} value={color} className={color}>
                                                    {color.replace("bg-", "").replace("-200", "")}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-3 font-semibold">{Math.round(activity.totalHours).toLocaleString()}</td>
                                    <td className="p-3">{activity.percentage}%</td>
                                    <td className="p-3">
                                        <input type="checkbox" checked={activity.showInReport} onChange={(e) => handleActivityChange(activity.id, "showInReport", e.target.checked)} className="w-4 h-4" />
                                    </td>
                                    <td className="p-3">{activity.reachedTenThousand
                                        ? <span className="text-green-600 dark:text-green-400">✓ 專家級</span>
                                        : <span className="text-red-600 dark:text-red-400">✗ 新手小白</span>}</td>
                                    <td className="p-3 ">
                                        <button onClick={() => handleRemoveActivity(activity.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
                                            刪除
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-50 dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-600">
                                <td className="p-3 font-semibold">未分配時間</td>
                                <td className="p-3">-</td>
                                <td className="p-3">-</td>
                                <td className="p-3">-</td>
                                <td className="p-3">-</td>
                                <td className="p-3">-</td>
                                <td className="p-3">-</td>
                                <td className="p-3 font-semibold">{Math.round(stats.unallocatedHours).toLocaleString()}</td>
                                <td className="p-3">{stats.unallocatedPercentage}%</td>
                                <td className="p-3">-</td>
                                <td className="p-3">-</td>
                                <td className="p-3">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 10,000 Hours Report */}
            <div className="mb-8 p-4 rounded-lg bg-opacity-20 bg-green-50 dark:bg-opacity-10 dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4">一萬小時報表</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Activities that count toward 10,000 hours */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">邁向精通的技能</h3>
                        <div className="space-y-4">
                            {stats.activities
                                .filter((a) => a.showInReport)
                                .sort((a, b) => b.totalHours - a.totalHours)
                                .map((activity) => (
                                    <div key={activity.id} className="relative">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-medium">{activity.name}</span>
                                            <span>
                                                {Math.round(activity.totalHours).toLocaleString()} 小時 ({activity.percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                            <div className={`${activity.color} h-4 rounded-full dark:opacity-80`} style={{ width: `${Math.min(100, (activity.totalHours / 10000) * 100)}%` }}></div>
                                        </div>
                                        {activity.totalHours >= 10000 && <div className="absolute right-0 -top-2 text-green-600 dark:text-green-400">已達成</div>}
                                    </div>
                                ))}

                            {stats.activities.filter((a) => a.showInReport).length === 0 && <p className="text-gray-500 dark:text-gray-400 italic">尚未設定要顯示於報表的活動</p>}
                        </div>
                    </div>

                    {/* Life percentage breakdown */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">一生時間分配</h3>
                        <div className="space-y-4">
                            {stats.activities
                                .sort((a, b) => b.totalHours - a.totalHours)
                                .map((activity) => (
                                    <div key={activity.id} className="relative">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-medium">{activity.name}</span>
                                            <span>
                                                {Math.round(activity.totalHours).toLocaleString()} 小時 ({activity.percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                            <div className={`${activity.color} h-4 rounded-full dark:opacity-80`} style={{ width: `${activity.percentage}%` }}></div>
                                        </div>
                                    </div>
                                ))}

                            <div className="relative">
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">未分配時間</span>
                                    <span>
                                        {Math.round(stats.unallocatedHours).toLocaleString()} 小時 ({stats.unallocatedPercentage}%)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                    <div className="bg-gray-400 h-4 rounded-full dark:opacity-80" style={{ width: `${stats.unallocatedPercentage}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">一萬小時理論</h2>
                <p>根據馬爾科姆·格拉德威爾在《異數》一書中提出的理論，要在任何領域達到專業水平，需要投入約10,000小時的刻意練習。</p>
                <p className="mt-2">此計算器幫助您規劃如何分配時間，以及了解達成特定技能掌握所需的時間。</p>
            </div>
        </div>
    );
}
