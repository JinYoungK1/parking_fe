import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { ContentsWrap, Wrap } from '~/components/common';
import { useGetParkingStatus } from '~/api/dashboard';

interface Props {
  type?: 'create' | 'edit';
  id?: number;
  projecttodo_code?: string;
}

const DashboardPage = ({ id, projecttodo_code, type = 'create' }: Props) => {
  const navigate = useNavigate();
  const { data: parkingStatus, isLoading, error } = useGetParkingStatus();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price);
  };

  return (
    <div style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', height: '100vh' }}>
      <Wrap className="main_wrap" title={'대시보드'}>
        <ContentsWrap className="min-w-0">
          <div className="relative w-full p-6" style={{ maxWidth: '100%', boxSizing: 'border-box', height: 'calc(100vh - 53px)', overflowY: 'auto' }}>
            {/* 배경 레이어 */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                opacity: 0.3,
              }}
            >
              {/* 투명도 적용용 오버레이 */}
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>

            {/* 주차장 상태 정보 카드 */}
            <div className="relative z-10 w-full max-w-6xl mx-auto" style={{ maxWidth: '100%' }}>
            <div className="bg-white bg-opacity-95 rounded-xl shadow-2xl p-8 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  주차장 현황
                </h2>
                <button
                  onClick={() => navigate('/parking/settings')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  설정
                </button>
              </div>

              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <p className="mt-2 text-gray-600">로딩 중...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600 text-lg">
                    주차장 상태를 불러오는데 실패했습니다.
                  </p>
                </div>
              )}

              {parkingStatus?.data && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* 전체 주차 공간 */}
                  <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">전체 주차 공간</p>
                        <p className="text-3xl font-bold text-blue-700">
                          {parkingStatus.data.total_spaces.toLocaleString()}개
                        </p>
                      </div>
                      <div className="text-4xl">🚗</div>
                    </div>
                  </div>

                  {/* 사용 중인 공간 */}
                  <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">사용 중</p>
                        <p className="text-3xl font-bold text-red-700">
                          {parkingStatus.data.occupied_spaces.toLocaleString()}개
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {parkingStatus.data.total_spaces > 0
                            ? (
                                (parkingStatus.data.occupied_spaces /
                                  parkingStatus.data.total_spaces) *
                                100
                              ).toFixed(1)
                            : 0}
                          % 사용률
                        </p>
                      </div>
                      <div className="text-4xl">🔴</div>
                    </div>
                  </div>

                  {/* 남은 공간 */}
                  <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">남은 공간</p>
                        <p className="text-3xl font-bold text-green-700">
                          {parkingStatus.data.available_spaces.toLocaleString()}개
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {parkingStatus.data.total_spaces > 0
                            ? (
                                (parkingStatus.data.available_spaces /
                                  parkingStatus.data.total_spaces) *
                                100
                              ).toFixed(1)
                            : 0}
                          % 여유율
                        </p>
                      </div>
                      <div className="text-4xl">🟢</div>
                    </div>
                  </div>

                  {/* 시간당 요금 */}
                  <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">시간당 요금</p>
                        <p className="text-2xl font-bold text-yellow-700">
                          {formatPrice(parkingStatus.data.price_per_hour)}
                        </p>
                      </div>
                      <div className="text-4xl">💰</div>
                    </div>
                  </div>

                  {/* 분당 요금 */}
                  <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">분당 요금</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {formatPrice(parkingStatus.data.price_per_minute)}
                        </p>
                      </div>
                      <div className="text-4xl">⏱️</div>
                    </div>
                  </div>

                  {/* 설정 시간 */}
                  <div className="bg-indigo-50 rounded-lg p-6 border-2 border-indigo-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">설정 시간</p>
                        <p className="text-3xl font-bold text-indigo-700">
                          {parkingStatus.data.setting_time}분
                        </p>
                      </div>
                      <div className="text-4xl">⏰</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 사용률 그래프 */}
              {parkingStatus?.data && parkingStatus.data.total_spaces > 0 && (
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    주차 공간 사용률
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold transition-all duration-500"
                      style={{
                        width: `${
                          (parkingStatus.data.occupied_spaces /
                            parkingStatus.data.total_spaces) *
                          100
                        }%`,
                      }}
                    >
                      {(
                        (parkingStatus.data.occupied_spaces /
                          parkingStatus.data.total_spaces) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ContentsWrap>
    </Wrap>
    </div>
  );
};

export default DashboardPage;
