import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/main');
  };

  return (
    <div className="flex items-center w-full px-6">
      <button
        onClick={handleLogoClick}
        className="flex items-center cursor-pointer text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        type="button"
      >
        대시보드
      </button>
    </div>
  );
}

export default Sidebar;
