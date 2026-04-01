import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { submitDailyMeal, getDailyNutrition, getWeeklyData, getMonthlyData } from "../api/AuthApi";
import { toast } from "react-hot-toast";

const mealTypes = ["Breakfast", "Snack", "Lunch", "Dinner"];
const portionOptions = ["small", "medium", "half", "full"];
const activityOptions = [
  { label: "Sedentary (Office job)", value: "lowest" },
  { label: "Moderate (Daily exercise)", value: "medium" },
  { label: "Active (Heavy workout)", value: "heavy" }
];

export default function ReportAnalysis() {
  const { user, loading: authLoading } = useAuth();
  
  const initialMealState = mealTypes.map((meal) => ({ 
    mealType: meal, 
    items: "", 
    portion: "medium" 
  }));

  const [meals, setMeals] = useState(initialMealState);
  const [activityLevel, setActivityLevel] = useState("medium");
  const [dailyNutrition, setDailyNutrition] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    try {
      const [dailyRes, weeklyRes, monthlyRes] = await Promise.all([
        getDailyNutrition(),
        getWeeklyData(),
        getMonthlyData()
      ]);
      if (dailyRes.data?.length > 0) setDailyNutrition(dailyRes.data[0]);
      setWeeklyData(weeklyRes.data.entries || weeklyRes.data || []);
      setMonthlyData(monthlyRes.data.entries || monthlyRes.data || []);
    } catch (err) {
      console.error("Failed to fetch nutrition data:", err);
    }
  };

  useEffect(() => {
    if (user) refreshData();
  }, [user]);

  if (authLoading) return <div className="p-10 text-xs text-gray-400 uppercase tracking-widest">Authenticating...</div>;
  if (!user) return <div className="p-10 text-sm font-semibold text-red-500">Please log in.</div>;

  const handleMealChange = (index, field, value) => {
    const newMeals = [...meals];
    newMeals[index][field] = value;
    setMeals(newMeals);
  };

  const handleSubmitDay = async () => {
    const loadingToast = toast.loading("AI is analyzing your meals...");
    setLoading(true);
    try {
      const mealObj = {
        breakfast: meals.find(m => m.mealType === "Breakfast").items,
        snacks: meals.find(m => m.mealType === "Snack").items,
        lunch: meals.find(m => m.mealType === "Lunch").items,
        dinner: meals.find(m => m.mealType === "Dinner").items,
        portion: meals[0].portion, 
        activityLevel
      };
      await submitDailyMeal(mealObj);
      await refreshData(); 
      toast.success("Analysis Complete! 🎉", { id: loadingToast });
      setMeals(initialMealState);
    } catch (err) {
      toast.error("Server Error. Please try again.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const last7Entries = [...weeklyData]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 7);

  const getWeeklyReports = (allData) => {
    if (!allData || allData.length === 0) return [];
    const sorted = [...allData].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const reports = [];

    for (let i = 0; i < sorted.length; i += 7) {
      const slice = sorted.slice(i, i + 7);
      if (slice.length === 7) {
        const calculateAvg = (key) => Math.round(slice.reduce((sum, entry) => sum + (entry[key] || 0), 0) / 7);
        reports.push({
          weekNum: Math.floor(i / 7) + 1,
          weekLabel: `Week ${Math.floor(i / 7) + 1}`,
          avgCal: calculateAvg('calories'),
          avgProtein: calculateAvg('protein'),
          avgCarbs: calculateAvg('carbs'),
          avgFat: calculateAvg('fat'),
          unhealthyDays: slice.filter(entry => entry.segment === "Unhealthy").length,
          range: `${new Date(slice[0].createdAt).toLocaleDateString([], {month:'short', day:'numeric'})} - ${new Date(slice[6].createdAt).toLocaleDateString([], {month:'short', day:'numeric'})}`
        });
      }
    }
    return reports.slice(-4); 
  };

  const completedWeeks = getWeeklyReports(monthlyData);

  const getSegmentColor = (s) => {
    if (s === "Healthy") return "bg-green-50 border-green-100 text-green-700";
    if (s === "Moderate") return "bg-yellow-50 border-yellow-200 text-yellow-700";
    return "bg-red-50 border-red-200 text-red-700";
  };

  return (
    <div className="min-h-screen bg-green-100 p-3 lg:p-6 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <header className="flex justify-between items-end border-b pb-2 border-green-300">
          <h1 className="text-xl font-black tracking-tight text-gray-900 uppercase tracking-tighter">Nutrition <span className="text-green-600">Intel</span></h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.name}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <section className="lg:col-span-3 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest">Meal Entry</h3>
              <div className="flex flex-col items-end">
                <label className="text-[8px] font-bold uppercase text-gray-400 mb-1">Activity Level</label>
                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="text-[10px] font-bold bg-gray-50 border p-1 rounded outline-none cursor-pointer">
                  {activityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
              {meals.map((meal, index) => (
                <div key={meal.mealType} className="space-y-1">
                  <div className="flex justify-between items-end px-1">
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">{meal.mealType}</label>
                    <label className="text-[8px] font-bold text-gray-400 uppercase">Portion</label>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder={`Describe ${meal.mealType.toLowerCase()}...`} 
                      value={meal.items} 
                      onChange={(e) => handleMealChange(index, "items", e.target.value)} 
                      className="flex-1 bg-gray-50 border border-gray-200 p-2 rounded-lg text-xs outline-none focus:ring-1 focus:ring-green-400 placeholder:text-gray-300 shadow-sm"
                    />
                    <select 
                      value={meal.portion} 
                      onChange={(e) => handleMealChange(index, "portion", e.target.value)} 
                      className="w-20 bg-gray-50 border border-gray-200 rounded-lg text-[10px] outline-none shadow-sm font-medium"
                    >
                      {portionOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleSubmitDay} disabled={loading} className="mt-6 px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs uppercase tracking-widest disabled:bg-gray-300 shadow-md shadow-green-100 transition-all">
              {loading ? "Analyzing..." : "Run Analysis"}
            </button>
          </section>

          <section className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <h3 className="text-[10px] font-bold mb-3 uppercase text-gray-400 tracking-tighter">Today's Result</h3>
            {dailyNutrition ? (
              <div className={`p-4 rounded-lg border-2 text-center ${getSegmentColor(dailyNutrition.segment)}`}>
                <p className="text-xs font-bold uppercase opacity-60 mb-1">Status</p>
                <p className="text-lg font-black leading-none mb-4">{dailyNutrition.segment}</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-white/40 p-1.5 rounded">
                    <p className="text-[8px] font-bold uppercase opacity-60">Calories</p>
                    <p className="text-sm font-bold">{dailyNutrition.calories}</p>
                  </div>
                  <div className="bg-white/40 p-1.5 rounded">
                    <p className="text-[8px] font-bold uppercase opacity-60">Protein</p>
                    <p className="text-sm font-bold">{dailyNutrition.protein}g</p>
                  </div>
                  <div className="bg-white/40 p-1.5 rounded">
                    <p className="text-[8px] font-bold uppercase opacity-60">Carbs</p>
                    <p className="text-sm font-bold">{dailyNutrition.carbs}g</p>
                  </div>
                  <div className="bg-white/40 p-1.5 rounded">
                    <p className="text-[8px] font-bold uppercase opacity-60">Fat</p>
                    <p className="text-sm font-bold">{dailyNutrition.fat}g</p>
                  </div>
                </div>
              </div>
            ) : <p className="text-center text-xs text-gray-300 py-6 font-medium italic uppercase">Waiting for input</p>}
          </section>
        </div>

        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Finalized Weekly Performance (Last 4)</h3>
          {completedWeeks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {completedWeeks.slice().reverse().map((report) => (
                <div key={report.weekNum} className="bg-white p-4 rounded-xl border-t-4 border-green-500 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-between items-center mb-2 font-black text-[10px] uppercase">
                    <span>Week {report.weekNum}</span><span className="text-gray-300">{report.range}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                    <div className="flex justify-between text-gray-400 font-medium">Avg Cal: <span className="font-bold text-gray-800">{report.avgCal}</span></div>
                    <div className="flex justify-between text-gray-400 font-medium">Avg Pro: <span className="font-bold text-gray-800">{report.avgProtein}g</span></div>
                  </div>
                  <div className="mt-3 pt-2 border-t flex justify-between items-center">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">Unhealthy</span>
                    <span className={`text-xs font-black ${report.unhealthyDays > 2 ? 'text-red-500' : 'text-green-600'}`}>{report.unhealthyDays} / 7</span>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className="p-4 bg-white/50 border border-dashed text-center text-[10px] font-bold text-gray-400 uppercase">Reports appear after 7 full analysis days.</div>}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border shadow-sm h-64">
              <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-2">7-Day Progress (Cal & Carbs)</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={[...last7Entries].reverse()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="createdAt" tickFormatter={s => new Date(s).toLocaleDateString([], {day:'numeric', month:'short'})} tick={{fontSize: 9}} />
                  <YAxis tick={{fontSize: 9}} />
                  <Tooltip />
                  <Legend iconSize={8} wrapperStyle={{fontSize: '9px'}} />
                  <Line name="Calories" type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={2} dot={{r:3}} />
                  <Line name="Carbs" type="monotone" dataKey="carbs" stroke="#3b82f6" strokeWidth={2} dot={{r:3}} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-xl border shadow-sm h-64">
              <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Monthly Calorie Trend (Last 4 Weeks)</h3>
              {completedWeeks.length > 0 ? (
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={completedWeeks}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="weekLabel" tick={{fontSize: 9}} />
                    <YAxis tick={{fontSize: 9}} />
                    <Tooltip />
                    <Line name="Avg Cal" type="monotone" dataKey="avgCal" stroke="#f59e0b" strokeWidth={3} dot={{r:4}} />
                  </LineChart>
                </ResponsiveContainer>
              ) : <div className="h-full flex items-center justify-center text-[10px] text-gray-300 uppercase italic font-bold">Trend data pending</div>}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border shadow-sm h-[528px] flex flex-col">
            <h3 className="text-xs font-bold mb-4 text-gray-400 uppercase tracking-widest border-b pb-2">Last 7 Analysis Days</h3>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {last7Entries.map((entry) => (
                <div key={entry._id} className={`p-3 rounded-lg border-l-2 shadow-sm ${getSegmentColor(entry.segment)} hover:scale-[1.01] transition-transform`}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[9px] font-bold text-gray-400 uppercase">{new Date(entry.createdAt).toLocaleDateString([], {weekday:'short', day:'numeric', month:'short'})}</p>
                    <span className="text-[8px] font-black uppercase opacity-60">{entry.segment}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 text-[10px] text-gray-600 italic">
                    {entry.meals.map((m, i) => (
                      <p key={i} className="truncate"><span className="font-bold uppercase text-[8px] text-gray-400 not-italic">{m.mealType.charAt(0)}:</span> {m.items || "—"}</p>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] font-black text-gray-500 pt-1 border-t border-gray-200/40 uppercase mt-1 tracking-tighter">
                    <span>🔥 {entry.calories} CAL</span>
                    <span>🍞 {entry.carbs}G</span>
                    <span>🥩 {entry.protein}G</span>
                    <span>🥑 {entry.fat}G</span>
                  </div>
                </div>
              ))}
              {last7Entries.length === 0 && <p className="text-center text-[10px] text-gray-300 py-10 uppercase italic font-bold">No history found</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}