// import { format, subDays } from "date-fns";
// import { configDotenv } from "dotenv";
// import { connectDB } from "../config/db.js";
// import User from "../models/User.js";
// import Habit from "../models/Habit.js";
// import HabitLog from "../models/HabitLog.js";
// import AIInsights from "../models/AIInsights.js";

// configDotenv()

// const EMAIL = 'seed@gmail.com'
// const PASSWORD = 'Pass@123'
// const NAME = 'Seed Data'

// const HABITS = [
//   {
//     name: "Drink 2L of water",
//     description: "Stay hydrated throughout the day.",
//     category: "Health",
//     color: "#0ea5e9",
//     icon: "💧",
//     order: 0,
//     _streakProb: 0.95,
//   },
//   {
//     name: "Morning run",
//     description: "30-minute run before breakfast.",
//     category: "Fitness",
//     targetDays: 5,
//     color: "#ef4444",
//     icon: "🏃",
//     order: 1,
//     _streakProb: 0.7,
//     _pattern: "weekdays",
//     _brokeAt: 20,
//   },
//   {
//     name: "Read 20 minutes",
//     description: "Fiction or non-fiction, no phone.",
//     category: "Learning",
//     color: "#6366f1",
//     icon: "📚",
//     order: 2,
//     _streakProb: 0.82,
//   },
//   {
//     name: "Meditate",
//     description: "10 minutes of breath-focused meditation.",
//     category: "Mindfulness",
//     color: "#8b5cf6",
//     icon: "🧘",
//     order: 3,
//     _streakProb: 0.6,
//   },
//   {
//     name: "Journal",
//     description: "Write 3 things I'm grateful for.",
//     category: "Mindfulness",
//     targetDays: 5,
//     color: "#ec4899",
//     icon: "✍️",
//     order: 4,
//     _streakProb: 0.75,
//     _pattern: "dropoff",
//   },
//   {
//     name: "Strength training",
//     description: "Push/pull/legs split.",
//     category: "Fitness",
//     frequency: "weekly",
//     targetDays: 3,
//     color: "#f59e0b",
//     icon: "💪",
//     order: 5,
//     _streakProb: 0.55,
//     _pattern: "weekdays",
//   },
//   {
//     name: "Side project — 1hr",
//     description: "Ship something small every day.",
//     category: "Productivity",
//     targetDays: 6,
//     color: "#14b8a6",
//     icon: "🎯",
//     order: 6,
//     _streakProb: 0.78,
//   },
// ];

// const buildLogs = (habit, totalDays = 90) => {
//   const logs = [];
//   const today = new Date();
//   for (let i = 0; i< totalDays; i++) {
//     const d = subDays(today, i);
//     const dow = d.getDay();
//     const key = format(d, "yyyy-MM-dd");
//     let p = habit._streakProb;
    
//     if (habit._pattern === "weekdays" && (dow === 0 || dow === 6)) p *= 0.35;
//     if (habit._pattern === "dropoff" && i < 14) p *= 0.25;
//     if (habit._brokeAt && i >= habit._brokeAt - 2 && i <= habit._brokeAt + 2) continue;

//     const seed = Math.sin(i * 9301 + habit.name.length * 49297) * 233280;
//     const rnd = seed - Math.floor(seed);
//     if (rnd < p) {
//     logs.push({completedDate: key,});
//     }
//   }
  
//   return logs;
// };

// const run = async () => {
//     await connectDB()

//     let user = await User.findOne({email:EMAIL})
//     if(user) {
//         console.log(`Found exisiting user ${EMAIL} - clearning their data...`)
//         await Habit.deleteMany({ userId: user._id})
//         await HabitLog.deleteMany({userId: user._id})
//         await AIInsights.deleteMany({userId:user._id})
//         user.name = NAME
//         user.avatar = NAME.charAt(0).toUpperCase()
//         user.morningMotivation = true;
//         user.password = PASSWORD
//         await user.save()
//     } else {
//         user = await User.create({
//             name: NAME,
//             email: EMAIL,
//             password: PASSWORD,
//             avatar: NAME.charAt(0).toUpperCase(),
//             morningMotivation: true,
//         })
//         console.log(`Created user ${EMAIL}`)
//     }

//     const createdHabits = []
//     for(let i =0;i<HABITS.length; i++){
//         const h = HABITS[i]
//         const habit = await Habit.create({
//             userId: user._id,
//             name: h.name,
//             description: h.description,
//             category: h.category,
//             frequency: h.frequency,
//             targetDays: h.targetDays,
//             color: h.color,
//             icon: h.icon,
//             order: i,
//             createdAt: subDays(new Date(), 89),
//             updatedAt: subDays(new Date(), 89),
//         })
//     }
// }