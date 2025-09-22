// src/ambassador.js
import React from "react";

/**
 * Ambassador component
 * - Shows user's ambassador path with milestones and a progress bar
 * - Accepts props or can later be wired to a user API
 *
 * Example usage:
 * <Ambassador current={2} milestones={[{title:'Sign Up'},{title:'Host Closet'}]} />
 */

function Milestone({ index, title, achieved }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${achieved ? 'bg-indigo-600' : 'bg-gray-300'}`}>
        {achieved ? '✓' : index + 1}
      </div>
      <div className="text-sm">{title}</div>
    </div>
  );
}

export default function Ambassador({
  current = 1, // index (1-based) of current milestone
  milestones = [
    { title: "Apply" },
    { title: "Training" },
    { title: "Host Your First Closet" },
    { title: "Refer Others" },
    { title: "Ambassador Certified" },
  ],
}) {
  const achievedCount = Math.max(0, Math.min(milestones.length, current));
  const pct = Math.round((achievedCount / milestones.length) * 100);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">Ambassador Path</h3>
          <p className="text-sm text-gray-500">Complete milestones to become a certified ambassador.</p>
        </div>
        <div className="text-sm text-gray-600">{pct}%</div>
      </div>

      <div className="mt-4">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="h-4 rounded-full" style={{ width: `${pct}%`, backgroundColor: "#7c3aed" }} />
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {milestones.map((m, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border">
              <Milestone index={idx} title={m.title} achieved={idx < achievedCount} />
              <div className="ml-auto text-xs text-gray-500">{idx < achievedCount ? "Completed" : "Incomplete"}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">View Training</button>
        <button className="px-4 py-2 border rounded-md">Invite Members</button>
        <div className="ml-auto text-sm text-gray-500">Next: {milestones[Math.min(achievedCount, milestones.length - 1)].title}</div>
      </div>
    </div>
  );
}
