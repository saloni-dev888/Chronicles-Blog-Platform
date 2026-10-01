const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const connectDB = require("../config/db");
const User = require("../models/User");
const Category = require("../models/Category");
const Post = require("../models/Post");
const Contact = require("../models/Contact");
const Subscriber = require("../models/Subscriber");

const categoriesData = [
  ["Technology", "cat-tech"], ["Travel", "cat-travel"], ["Lifestyle", "cat-life"],
  ["Education", "cat-education"], ["Health", "cat-health"], ["Food", "cat-food"],
];

const postsData = [
  ["The Future of Web Development", "Technology", "A practical look at the tools and ideas shaping modern web experiences.", 6],
  ["Building Better Digital Habits", "Technology", "Small changes to the way we use technology can make work calmer and more focused.", 5],
  ["What AI Means for Everyday Creators", "Technology", "From writing to design, AI is becoming another useful tool in the creative workflow.", 7],
  ["A Simple Guide to Modern JavaScript", "Technology", "A beginner-friendly tour through the concepts that make JavaScript useful for real projects.", 8],
  ["Designing Interfaces People Enjoy Using", "Technology", "The small interface decisions that make digital products easier to understand and use.", 6],
  ["Exploring the Hidden Gems of Uttarakhand", "Travel", "Uttarakhand is not just about popular tourist spots, but also about hidden gems that offer peace, adventure, and natural beauty.", 5],
  ["A Weekend in the Hills", "Travel", "A slow travel guide for finding mountain views, local food and quiet corners away from crowded routes.", 6],
  ["How to Plan a Meaningful Road Trip", "Travel", "A simple framework for balancing scenic stops, rest, food and flexible plans on the road.", 5],
  ["Travel Light, Experience More", "Travel", "Useful habits for packing less while still being ready for the moments that matter.", 4],
  ["Small Habits, Big Changes", "Lifestyle", "Simple routines can create more space for the things that matter every day.", 5],
  ["Creating a Calm Morning Routine", "Lifestyle", "A realistic morning routine built around consistency rather than perfection.", 4],
  ["Why Learning Never Stops", "Lifestyle", "Curiosity keeps life moving, whether you are learning a skill, a language or something completely new.", 5],
  ["How to Build a Study System That Works", "Education", "A practical way to organize notes, revision and focused study sessions.", 7],
  ["Learning to Learn", "Education", "The techniques that help turn passive reading into active understanding and recall.", 6],
  ["Everyday Wellness Without Complicated Rules", "Health", "A balanced approach to movement, sleep, food and recovery for busy days.", 5],
  ["Making Movement Part of Your Day", "Health", "Small amounts of regular movement can fit naturally into a college or work schedule.", 4],
  ["Comfort Food for a Slow Evening", "Food", "A warm, simple recipe story about making an ordinary evening feel a little more special.", 4],
];

const run = async () => {
  await connectDB();
  await Promise.all([Post.deleteMany(), Category.deleteMany(), Contact.deleteMany(), Subscriber.deleteMany()]);

  let admin = await User.findOne({ email: "admin@example.com" });
  if (!admin) {
    admin = await User.create({
      name: "Admin", email: "admin@example.com", password: "admin123", role: "admin",
      bio: "Writer and editor sharing stories about technology, travel, lifestyle and learning."
    });
  }

  const categories = await Category.insertMany(categoriesData.map(([name, seed]) => ({
    name, image: `https://picsum.photos/seed/${seed}/700/450`
  })));
  const cat = Object.fromEntries(categories.map((c) => [c.name, c._id]));

  for (let i = 0; i < postsData.length; i++) {
    const [title, category, excerpt, readTimeMinutes] = postsData[i];
    await Post.create({
      title,
      excerpt,
      content: `${excerpt}\n\nThis sample article is part of the Chronicle demo. Replace this text with your own long-form story, notes, research, images or project documentation. The layout is designed to keep reading comfortable while giving related stories and categories a clear place beside the article.`,
      coverImage: `https://picsum.photos/seed/chronicle-${i + 1}/1200/700`,
      categories: [cat[category]],
      readTimeMinutes,
      featured: i < 3,
      author: admin._id,
      published: true,
    });
  }

  console.log("Seed complete.");
  console.log("Admin login -> email: admin@example.com / password: admin123");
  process.exit(0);
};

run().catch((err) => { console.error(err); process.exit(1); });
