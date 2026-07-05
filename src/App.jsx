import StarfieldCanvas from './components/StarfieldCanvas';
import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import BadgePage from './views/BadgePage';

const path = window.location.pathname;
const isBadgePage = path === '/badge';

export default function App() {
  if (isBadgePage) {
    return <BadgePage />;
  }

  return (
    <div className="relative min-h-screen bg-space text-white overflow-x-hidden">
      <StarfieldCanvas />
      <Navbar />
      <div className="relative" style={{ zIndex: 1 }}>
        <HomePage />
      </div>
    </div>
  );
}
