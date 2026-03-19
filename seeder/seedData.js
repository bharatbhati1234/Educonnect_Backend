// seedData.js file -----------------------------------------------------------------------

// ye file jo postman me ek ek data save kerte the course,categories,etc k vh sab esme ek sath multiple data bhej sakte hai 

// "node seeder/seedData.js"  ( ye file ko run kerne k liye ye command hai terminal k liye)


import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";

import Category from "../models/Category.js";
import Instructor from "../models/Instructor.js";
import Course from "../models/Course.js";
import Section from "../models/Section.js";
import Lesson from "../models/Lesson.js";

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        console.log("DB Connected");

        // ❌ Clear old data
        await Category.deleteMany();
        await Instructor.deleteMany();
        await Course.deleteMany();
        await Section.deleteMany();
        await Lesson.deleteMany();

        console.log("Old data deleted");

        // ======================
        // Categories
        // ======================
        const categories = await Category.insertMany([
            { name: "Web Development" },
            { name: "Data Science" },
            { name: "Digital Marketing" },
            { name: "Business" },
            { name: "Design" }
        ]);

        // ======================
        // Instructors
        // ======================
        const instructors = await Instructor.insertMany([
            {
                name: "Rahul Sharma",
                email: "rahul@example.com",
                bio: "MERN Stack Developer"
            },
            {
                name: "Anjali Verma",
                email: "anjali@example.com",
                bio: "Data Scientist"
            },
            {
                name: "Amit Kapoor",
                email: "amit@example.com",
                bio: "Marketing Expert"
            },
            {
                name: "Sneha Gupta",
                email: "sneha@example.com",
                bio: "UI/UX Designer"
            }
        ]);

        // Helper function
        const createCourseWithContent = async (
            title,
            category,
            instructor,
            lessonsData
        ) => {
            const course = await Course.create({
                title,
                description: `${title} full course`,
                price: 1999,
                level: "Beginner",
                language: "English",
                category,
                instructor,
                certificate: true
            });

            for (let i = 0; i < lessonsData.length; i++) {
                const section = await Section.create({
                    title: `Section ${i + 1}`,
                    course: course._id
                });

                for (let lessonTitle of lessonsData[i]) {
                    const lesson = await Lesson.create({
                        title: lessonTitle,
                        duration: "10 min",
                        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        section: section._id
                    });

                    section.lessons.push(lesson._id);
                }

                await section.save();
                course.sections.push(section._id);
            }

            await course.save();
        };

        // ======================
        // 10 COURSES
        // ======================

        await createCourseWithContent(
            "MERN Stack Development",
            categories[0]._id,
            instructors[0]._id,
            [
                ["Intro to MERN", "Node Basics"],
                ["React Basics", "Redux Toolkit"]
            ]
        );

        await createCourseWithContent(
            "Advanced React",
            categories[0]._id,
            instructors[0]._id,
            [
                ["Hooks Deep Dive", "Context API"],
                ["Performance Optimization", "SSR"]
            ]
        );

        await createCourseWithContent(
            "Node.js Backend Mastery",
            categories[0]._id,
            instructors[0]._id,
            [
                ["Express Basics", "Middleware"],
                ["JWT Auth", "API Security"]
            ]
        );

        await createCourseWithContent(
            "Python for Data Science",
            categories[1]._id,
            instructors[1]._id,
            [
                ["Python Basics", "Numpy"],
                ["Pandas", "Data Visualization"]
            ]
        );

        await createCourseWithContent(
            "Machine Learning Basics",
            categories[1]._id,
            instructors[1]._id,
            [
                ["ML Intro", "Regression"],
                ["Classification", "Clustering"]
            ]
        );

        await createCourseWithContent(
            "Digital Marketing Mastery",
            categories[2]._id,
            instructors[2]._id,
            [
                ["SEO Basics", "Content Marketing"],
                ["Google Ads", "Analytics"]
            ]
        );

        await createCourseWithContent(
            "Business Strategy",
            categories[3]._id,
            instructors[2]._id,
            [
                ["Business Models", "Market Research"],
                ["Growth Strategy", "Case Studies"]
            ]
        );

        await createCourseWithContent(
            "UI/UX Design",
            categories[4]._id,
            instructors[3]._id,
            [
                ["Design Principles", "Wireframing"],
                ["Figma Basics", "Prototyping"]
            ]
        );

        await createCourseWithContent(
            "Full Stack Next.js",
            categories[0]._id,
            instructors[0]._id,
            [
                ["Next.js Basics", "Routing"],
                ["API Routes", "Deployment"]
            ]
        );

        await createCourseWithContent(
            "Advanced JavaScript",
            categories[0]._id,
            instructors[0]._id,
            [
                ["Closures", "Promises"],
                ["Async/Await", "Event Loop"]
            ]
        );

        console.log("🔥 10 Courses Seeded Successfully");
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedData();