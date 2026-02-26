import { useState } from 'react';
import {
  Activity,
  GraduationCap,
  Home,
  ListChecks,
  LogOut,
  Map,
  Trophy,
  LayoutDashboard,
  ClipboardList,
  Flag,
  BarChart3,
} from 'lucide-react';
import Feed from './Feed';
import SelectActivities from './SelectActivities';
import Dashboard from './Dashboard';
import MyCurrentActivities from './MyCurrentActivities';
import RaceTo16 from './RaceTo16';
import DepartmentStats from './DepartmentStats';
import ActivityManagement from './ActivityManagement';
import StaffStudentManagement from './StaffStudentManagement';
import { Coins } from 'lucide-react';
import UserManagement from './UserManagement';
import MyJourney from './MyJourney';
import Profile from './Profile';
import Leaderboard from './Leaderboard';
import SemesterPlan from './SemesterPlan';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Page =
  | 'feed'
  | 'select'
  | 'current'
  | 'journey'
  | 'leaderboard'
  | 'activityManagement'
  | 'profile'
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

      ]
      : []),

    ...(isStaff === 2
      ? [
        { id: 'activityManagement' as Page, name: 'Activity Management', icon: ClipboardList },
        { id: 'userManagement' as Page, name: 'User Management', icon: ClipboardList }
      ]
      : []),

    ...(isStaff === 0
      ? [
        { id: 'plan' as Page, name: 'Semester Plan', icon: ClipboardList },
        { id: 'select' as Page, name: 'Select Activities', icon: Activity },
        { id: 'current' as Page, name: 'My Current Activities', icon: ListChecks },
        { id: 'journey' as Page, name: 'My Journey', icon: Map },
        { id: 'leaderboard' as Page, name: 'Leaderboard', icon: Trophy },
        { id: 'race' as Page, name: 'Race to 16', icon: Flag },
        { id: 'department' as Page, name: 'Department Stats', icon: BarChart3 },
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
      case 'plan':
        return <SemesterPlan />;
      case 'activityManagement':
        return <ActivityManagement />;
        case 'studentManagement':
          return <StaffStudentManagement />;
        case 'userManagement':
        return <UserManagement />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">SkillStack</h1>
                <p className="text-xs text-gray-600">Sathyabama Activity Portal</p>
              </div>
            </div>
            <div className="relative flex items-center gap-4">

  {/* Tokens - Only Student */}
  {isStaff === 0 && (
    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
      <Coins className="w-4 h-4" />
      {tokens}
    </div>
  )}

  {/* User Avatar */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="w-9 h-9 rounded-full overflow-hidden border"
  >
    <img
      src="/assets/img/user icon.png"
      alt="User"
      className="w-full h-full object-cover"
    />
  </button>

  {/* Dropdown */}
  {menuOpen && (
    <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-lg border z-50">
      <button
        onClick={() => {
          setCurrentPage('profile');
          setMenuOpen(false);
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        Profile
      </button>

      <button
        onClick={() => {
          onLogout();
          setMenuOpen(false);
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
      >
        Logout
      </button>
    </div>
  )}
</div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Left Arrow */}
          <button
            onClick={() => scrollContainer?.scrollBy({ left: -200, behavior: 'smooth' })}
            className={`absolute left-0 top-0 bottom-0 z-10 px-2 ${showLeft ? 'flex' : 'hidden'
              } items-center`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>

          {/* Scroll Container */}
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
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${currentPage === item.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollContainer?.scrollBy({ left: 200, behavior: 'smooth' })}
            className={`absolute right-0 top-0 bottom-0 z-10 px-2 ${showRight ? 'flex' : 'hidden'
              } items-center`}
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderPage()}</main>
    </div>
  );
}
