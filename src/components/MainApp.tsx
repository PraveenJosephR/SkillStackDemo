import { useState,useEffect } from 'react';
import {
  Activity,
  GraduationCap,
  Home,
  ListChecks,
  LogOut,
  Brain,
  Plus,
  BellRing,
  Sun,
  Moon,
  Users,
  Map,
  Trophy,
  LayoutDashboard,
  ClipboardList,
  Bell,
  Flag,
  BarChart3,
} from 'lucide-react';
import Feed from './Feed';
import SelectActivities from './SelectActivities';
import Dashboard from './Dashboard';
import MyCurrentActivities from './MyCurrentActivities';
import RaceTo16 from './RaceTo16';
import DepartmentStats from './DepartmentStats';
import NotificationCenter from './NotificationCenter';
import SkillConnect from './SkillConnect';
import ProgramManagement from './ProgramManagement';
import ActivityManagement from './ActivityManagement';
import StaffStudentManagement from './StaffStudentManagement';
import { Coins } from 'lucide-react';
import UserManagement from './UserManagement';
import MyJourney from './MyJourney';
import Profile from './Profile';
import Leaderboard from './Leaderboard';
import SemesterPlan from './SemesterPlan';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StageManagement from './StageManagement';
import WorkflowManagement from './WorkflowManagement';

type Page =
  | 'feed'
  | 'select'
  | 'current'
  | 'journey'
  | 'leaderboard'
  | 'activityManagement'
  | 'programManagement'
  | 'stageManagement'
  | 'workflowManagement'
  | 'profile'
  | 'skillConnect'
  | 'notification'
  | 'race'
  | 'dashboard'
  | 'userManagement'
  | 'studentManagement'
  | 'plan'
  | 'department';


interface MainAppProps {
  onLogout: () => void;
  isStaff: number;
}

export default function MainApp({ onLogout, isStaff }: MainAppProps) {
  const [currentPage, setCurrentPage] = useState<Page>('feed');
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const notifications = [
    { id: 1, message: "Your Internship activity was approved." },
    { id: 2, message: "Minimum tokens per semester updated." },
    { id: 3, message: "Malpractice reported for a student." },
  ];
  const tokens = Number(localStorage.getItem('tokens') || 18);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const navigation = [
    { id: 'feed' as Page, name: 'Feed', icon: Home },

    ...(isStaff === 1
      ? [
        { id: 'dashboard' as Page, name: 'Dashboard', icon: LayoutDashboard },
        { id: 'studentManagement' as Page, name: 'Student Management', icon: LayoutDashboard },
        { id: 'skillConnect' as Page, name: 'Skill Connect', icon: Users },

      ]
      : []),

    ...(isStaff === 2
      ? [
        { id: 'activityManagement' as Page, name: 'Activity Management', icon: ClipboardList },
        { id: 'userManagement' as Page, name: 'User Management', icon: Users },
        { id: 'programManagement' as Page, name: 'Program Management', icon: GraduationCap },
        { id: 'stageManagement' as Page, name: 'Stage Management', icon: GraduationCap },
        { id: 'workflowManagement' as Page, name: 'Workflow Management', icon: GraduationCap },
        { id: 'notification' as Page, name: 'Notification Center', icon: BellRing },
      ]
      : []),

    ...(isStaff === 0
      ? [
        { id: 'plan' as Page, name: 'Semester Plan', icon: ClipboardList },
        { id: 'select' as Page, name: 'Select Activities', icon: Activity },
        { id: 'current' as Page, name: 'My Current Activities', icon: ListChecks },
        { id: 'journey' as Page, name: 'My Journey', icon: Map },
        { id: 'race' as Page, name: 'Race to 16', icon: Flag },
        { id: 'department' as Page, name: 'Department Stats', icon: BarChart3 },
      ]
      : []),
    ...(isStaff !== 2
      ? [
        { id: 'leaderboard' as Page, name: 'Leaderboard', icon: Trophy },
      ]
      : []),
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'feed':
        return <Feed />;
      case 'select':
        return <SelectActivities />;
      case 'current':
        return <MyCurrentActivities />;
      case 'journey':
        return <MyJourney />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'race':
        return <RaceTo16 />;
      case 'department':
        return <DepartmentStats />;
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'stageManagement':
        return <StageManagement />;
      case 'workflowManagement':
        return <WorkflowManagement />;
      case 'notification':
        return <NotificationCenter />;
      case 'skillConnect':
        return <SkillConnect />;
      case 'plan':
        return <SemesterPlan />;
      case 'activityManagement':
        return <ActivityManagement />;
      case 'programManagement':
        return <ProgramManagement />;
      case 'studentManagement':
        return <StaffStudentManagement />;
      case 'userManagement':
        return <UserManagement />;
      default:
        return <Feed />;
    }
  };

  return (
  <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
    <header className="bg-white dark:bg-zinc-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-rose-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-800 dark:text-white">
                SkillStack
              </h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Sathyabama Activity Portal
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-4">

            {/* Tokens - Only Student */}
            {isStaff === 0 && (
              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                <Coins className="w-4 h-4" />
                {tokens}
                <Plus
                  onClick={() => { setCurrentPage('select') }}
                  className="w-4 h-4 hover:cursor-pointer"
                />
              </div>
            )}

            {/* Dark Mode Toggle */}
            {darkMode ? (
              <Moon
                onClick={() => setDarkMode(false)}
                className="w-5 h-5 text-white hover:cursor-pointer"
              />
            ) : (
              <Sun
                onClick={() => setDarkMode(true)}
                className="w-5 h-5 text-yellow-500 hover:cursor-pointer"
              />
            )}

            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
              >
                <Bell className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />

                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-zinc-800"></span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-zinc-800 shadow-xl rounded-xl border border-zinc-200 dark:border-zinc-700 z-50 transition-colors duration-300">
                  <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 font-semibold text-zinc-700 dark:text-zinc-200">
                    Notifications
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-sm text-zinc-500 dark:text-zinc-400">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="px-4 py-3 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0 text-zinc-700 dark:text-zinc-200"
                        >
                          {n.message}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-600"
            >
              <img
                src="/assets/img/user icon.png"
                alt="User"
                className="w-full h-full object-cover"
                onDoubleClick={() => { setCurrentPage('profile') }}
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-40 bg-white dark:bg-zinc-800 shadow-lg rounded-lg border border-zinc-200 dark:border-zinc-700 z-50 transition-colors duration-300">
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-white">
                    Joseph E
                  </p>
                </div>

                <div className="h-px bg-zinc-200 dark:bg-zinc-700" />

                {isStaff === 0 && (
                  <button
                    onClick={() => {
                      setCurrentPage('profile');
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-sm text-zinc-700 dark:text-zinc-200"
                  >
                    Profile
                  </button>
                )}

                <button
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-sm text-rose-600 dark:text-rose-400 rounded-b-lg"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

    <nav className="bg-white dark:bg-zinc-800 shadow-sm border-b border-zinc-200 dark:border-zinc-700 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <button
          onClick={() => scrollContainer?.scrollBy({ left: -200, behavior: 'smooth' })}
          className={`absolute left-0 top-0 bottom-0 z-10 px-2 ${showLeft ? 'flex' : 'hidden'} items-center`}
        >
          <ChevronLeft className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
        </button>

        <div
          ref={(el) => setScrollContainer(el)}
          onScroll={(e) => handleScroll(e)}
          className="flex overflow-x-auto scrollbar-hide"
        >
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  currentPage === item.id
                    ? 'border-rose-600 text-rose-600'
                    : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{item.name}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollContainer?.scrollBy({ left: 200, behavior: 'smooth' })}
          className={`absolute right-0 top-0 bottom-0 z-10 px-2 ${showRight ? 'flex' : 'hidden'} items-center`}
        >
          <ChevronRight className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
        </button>

      </div>
    </nav>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderPage()}
    </main>
  </div>
);
}
