import { useNavigate } from 'react-router-dom';
import Sidebar from '~/components/sidebar';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex min-w-full items-center bg-white py-1 mb-1">
      <Sidebar />
      <nav className="flex w-full justify-end px-4" aria-label="Global">
        <div className="flex flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/parking/detail')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            주차장 상세
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
