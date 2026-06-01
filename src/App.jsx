import StarfieldCanvas from './components/StarfieldCanvas';
import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-space text-white overflow-x-hidden">
      {/* Layer 0: Starfield canvas — fixed, behind everything */}
      <StarfieldCanvas />

      {/* Layer 1: Navbar */}
      <Navbar />

      {/* Layer 2: Page content */}
      <div className="relative" style={{ zIndex: 1 }}>
        <HomePage />
        <Footer />
      </div>
    </div>
  );
}
