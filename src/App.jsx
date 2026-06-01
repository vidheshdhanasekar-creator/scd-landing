import StarfieldCanvas from './components/StarfieldCanvas';
import Navbar from './components/Navbar';
import HomePage from './views/HomePage';

export default function App() {
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
