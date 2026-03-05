"use client";

import { useState } from "react";
import { Github, Linkedin, Award, BookOpen, Trophy, FileText } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description: string;
  tokens: number;
}

export default function Profile() {

  const [activeTab, setActiveTab] = useState<
    "certifications" | "workshops" | "achievements" | "publications"
  >("certifications");

  const student = {
    name: 'Arjun Kumar',
    rollNo: '22CSE001',
    registerNo: 'REG2022001',
    department: 'CSE',
    program: 'B-Tech',
    year: '3rd Year',
    gender: 'Male',
    bloodGrp: 'O+',
    section: 'A1',
    supervisor: 'Dr. Rajesh',
    github: 'https://github.com/arjun',
    linkedin: 'https://linkedin.com/in/arjun',
    hackerrank: 'arjun_hr',
    leetcode: 'arjun_lc',
    codechef: 'arjun_cc',
  };

  const certifications: Activity[] = [
    { id: 1, title: "NPTEL - Python", description: "Completed Python Programming", tokens: 3 },
    { id: 2, title: "AWS Cloud", description: "AWS Practitioner Certification", tokens: 4 },
    { id: 3, title: "Google Data Analytics", description: "Data Analytics Professional Certificate", tokens: 3 },
    { id: 4, title: "Azure Fundamentals", description: "Microsoft Azure AZ-900 Certification", tokens: 4 },
  ];

  const workshops: Activity[] = [
    { id: 5, title: "AI Workshop", description: "Hands-on AI Workshop", tokens: 2 },
    { id: 6, title: "Cybersecurity Bootcamp", description: "Ethical Hacking Basics", tokens: 2 },
    { id: 7, title: "Blockchain Seminar", description: "Introduction to Web3 & Smart Contracts", tokens: 2 },
    { id: 8, title: "UI/UX Design Sprint", description: "Design Thinking & Prototyping", tokens: 2 },
  ];

  const achievements: Activity[] = [
    { id: 9, title: "NCC Camp", description: "Participated in NCC Annual Camp", tokens: 3 },
    { id: 10, title: "Intercollege Sports", description: "Won 2nd place in Football", tokens: 3 },
    { id: 11, title: "Hackathon Winner", description: "1st place in 24hr National Hackathon", tokens: 5 },
    { id: 12, title: "Coding Contest", description: "Top 10 in State-Level Coding Contest", tokens: 4 },
  ];

  const publications: Activity[] = [
    { id: 13, title: "AI Research Paper", description: "Published in IEEE Conference", tokens: 5 },
    { id: 14, title: "IoT Smart Farming", description: "Paper on IoT-based Agriculture Monitoring", tokens: 4 },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case "certifications":
        return certifications;
      case "workshops":
        return workshops;
      case "achievements":
        return achievements;
      case "publications":
        return publications;
    }
  };

  const getTotalTokens = (data: Activity[]) =>
    data.reduce((sum, item) => sum + item.tokens, 0);

  const currentData = getCurrentData();

  return (
    <div className="grid grid-cols-3 gap-8">

      {/* LEFT PANEL (unchanged) */}
      <div className="col-span-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6">

        <div className="flex flex-col items-center">
          <img
            src="/assets/img/student.jpg"
            className="w-28 h-28 rounded-md object-cover border border-zinc-200 dark:border-zinc-700 mb-4"
          />
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            {student.name}
          </h2>
        </div>

        {/* DETAILS */}
        <div className="mt-6 border-t border-zinc-200 dark:border-zinc-700 pt-6 flex text-sm text-zinc-600 dark:text-zinc-400">

          <div className="w-1/2 space-y-2 pr-4">
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Roll No:</span> {student.rollNo}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Register No:</span> {student.registerNo}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Department:</span> {student.department}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Program:</span> {student.program}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Section:</span> {student.section}</p>
          </div>

          <div className="w-px bg-zinc-200 dark:bg-zinc-700 mx-3"></div>

          <div className="w-1/2 space-y-2 pl-4">
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Year:</span> {student.year}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Gender:</span> {student.gender}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Blood Group:</span> {student.bloodGrp}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">Supervisor:</span> {student.supervisor}</p>
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="mt-6 border-t border-zinc-200 dark:border-zinc-700 pt-6">

          <div className="flex justify-center gap-6 mb-4 text-zinc-700 dark:text-zinc-300">
            <a href={student.github} target="_blank">
              <Github className="w-5 h-5 hover:text-rose-500 transition cursor-pointer" />
            </a>

            <a href={student.linkedin} target="_blank">
              <Linkedin className="w-5 h-5 hover:text-rose-500 transition cursor-pointer" />
            </a>
          </div>

          <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">LeetCode:</span> {student.leetcode}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">HackerRank:</span> {student.hackerrank}</p>
            <p><span className="font-medium text-zinc-800 dark:text-zinc-200">CodeChef:</span> {student.codechef}</p>
          </div>

        </div>

      </div>

      {/* RIGHT PANEL (NEW TABS) */}
      <div className="col-span-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6">

        {/* TAB HEADERS */}
        <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-700 mb-6">

          {[
            { key: "certifications", label: "Certifications", icon: <Award className="w-4 h-4" />, count: certifications.length },
            { key: "workshops", label: "Workshops", icon: <BookOpen className="w-4 h-4" />, count: workshops.length },
            { key: "achievements", label: "Achievements", icon: <Trophy className="w-4 h-4" />, count: achievements.length },
            { key: "publications", label: "Publications", icon: <FileText className="w-4 h-4" />, count: publications.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition
                ${
                  activeTab === tab.key
                    ? "bg-rose-600 text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-rose-500"
                }`}
            >
              {tab.icon}
              {tab.label}
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* TOKEN SUMMARY */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold capitalize text-zinc-800 dark:text-zinc-100">
            {activeTab}
          </h2>
          <span className="text-xs bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 px-3 py-1 rounded-full">
            Total Tokens: {getTotalTokens(currentData)}
          </span>
        </div>

        {/* TAB CONTENT */}
        <div className="grid md:grid-cols-2 gap-4">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-zinc-800 dark:text-zinc-100">
                  {item.title}
                </h3>
                <span className="text-xs bg-rose-600 text-white px-2 py-1 rounded-full">
                  {item.tokens}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}