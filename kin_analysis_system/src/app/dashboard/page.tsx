/**
 * Dashboard page component
 * Displays the main dashboard with analytics and user information
 */

import React from 'react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Dashboard page component
 * @returns {JSX.Element} Rendered dashboard page
 */
export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500">
          Welcome to the {SITE_CONFIG.name} dashboard. View your analytics and manage your content.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Users" 
          value="1,258" 
          change="+12.5%" 
          isPositive={true} 
        />
        <StatCard 
          title="Engagement" 
          value="42.3%" 
          change="+5.7%" 
          isPositive={true} 
        />
        <StatCard 
          title="Completion Rate" 
          value="68.7%" 
          change="-2.4%" 
          isPositive={false} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem 
              title="New user registered" 
              time="2 hours ago" 
              description="John Smith joined the platform" 
            />
            <ActivityItem 
              title="Course completed" 
              time="5 hours ago" 
              description="Maria Garcia completed Advanced Analytics" 
            />
            <ActivityItem 
              title="Report generated" 
              time="Yesterday" 
              description="Monthly performance report was generated" 
            />
            <ActivityItem 
              title="System update" 
              time="2 days ago" 
              description="System was updated to version 2.4.0" 
            />
          </div>
          <div className="mt-4 text-center">
            <Button variant="ghost" className="text-sm">
              View All Activity
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start">
              Create New Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Invite Team Member
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Update Profile
            </Button>
          </div>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Upcoming Tasks</h2>
          <div className="space-y-3">
            <TaskItem 
              title="Review analytics report" 
              dueDate="Today" 
              priority="high" 
            />
            <TaskItem 
              title="Team meeting" 
              dueDate="Tomorrow" 
              priority="medium" 
            />
            <TaskItem 
              title="Update dashboard" 
              dueDate="Next week" 
              priority="low" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Statistic card component
 * @param {Object} props - Component props
 * @param {string} props.title - Statistic title
 * @param {string} props.value - Statistic value
 * @param {string} props.change - Change percentage
 * @param {boolean} props.isPositive - Whether the change is positive
 * @returns {JSX.Element} Rendered stat card component
 */
function StatCard({ 
  title, 
  value, 
  change, 
  isPositive 
}: { 
  title: string; 
  value: string; 
  change: string; 
  isPositive: boolean;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-gray-500 font-medium text-sm mb-2">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{value}</span>
        <span className={`ml-2 text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

/**
 * Activity item component
 * @param {Object} props - Component props
 * @param {string} props.title - Activity title
 * @param {string} props.time - Time of activity
 * @param {string} props.description - Activity description
 * @returns {JSX.Element} Rendered activity item component
 */
function ActivityItem({ 
  title, 
  time, 
  description 
}: { 
  title: string; 
  time: string; 
  description: string;
}) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div className="flex justify-between mb-1">
        <h4 className="font-medium">{title}</h4>
        <span className="text-gray-400 text-sm">{time}</span>
      </div>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}

/**
 * Task item component
 * @param {Object} props - Component props
 * @param {string} props.title - Task title
 * @param {string} props.dueDate - Task due date
 * @param {string} props.priority - Task priority
 * @returns {JSX.Element} Rendered task item component
 */
function TaskItem({ 
  title, 
  dueDate, 
  priority 
}: { 
  title: string; 
  dueDate: string; 
  priority: 'low' | 'medium' | 'high';
}) {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-gray-500 text-xs">Due: {dueDate}</p>
      </div>
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </div>
    </div>
  );
}