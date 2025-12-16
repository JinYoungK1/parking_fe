import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import DashboardPage from '~/pages/DashboardPage';
import ParkingSettingsPage from '~/pages/ParkingSettingsPage';
import ParkingDetailPage from '~/pages/ParkingDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Navigate to="/main" replace />} />
        <Route path={'/main'} element={<DashboardPage />} />
        <Route path={'/parking/settings'} element={<ParkingSettingsPage />} />
        <Route path={'/parking/detail'} element={<ParkingDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
