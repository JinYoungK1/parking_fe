import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ContentsWrap, Wrap } from '~/components/common';
import { useGetParkingStatus, useUpdateParkingLot } from '~/api/dashboard';

const ParkingSettingsPage = () => {
  const navigate = useNavigate();
  const { data: parkingStatus, isLoading } = useGetParkingStatus();
  const { mutate: updateParkingLot, isPending } = useUpdateParkingLot();

  const [formData, setFormData] = useState({
    total_spaces: 0,
    price_per_hour: 0,
    price_per_minute: 0,
    setting_time: 60,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (parkingStatus?.data && !isInitialized) {
      setFormData({
        total_spaces: parkingStatus.data.total_spaces,
        price_per_hour: Math.round(parkingStatus.data.price_per_hour),
        price_per_minute: Math.round(parkingStatus.data.price_per_minute),
        setting_time: parkingStatus.data.setting_time,
      });
      setIsInitialized(true);
    }
  }, [parkingStatus, isInitialized]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (formData.total_spaces < 0) {
      toast.error('전체 주차 공간은 0 이상이어야 합니다.');
      return;
    }
    if (formData.price_per_hour < 0) {
      toast.error('시간당 요금은 0 이상이어야 합니다.');
      return;
    }
    if (formData.price_per_minute < 0) {
      toast.error('분당 요금은 0 이상이어야 합니다.');
      return;
    }
    if (formData.setting_time < 1) {
      toast.error('설정 시간은 1 이상이어야 합니다.');
      return;
    }

    updateParkingLot(
      {
        total_spaces: formData.total_spaces,
        price_per_hour: formData.price_per_hour,
        price_per_minute: formData.price_per_minute,
        setting_time: formData.setting_time,
      },
      {
        onSuccess: () => {
          toast.success('주차장 정보가 성공적으로 저장되었습니다.');
          navigate('/main');
        },
        onError: (error) => {
          toast.error('주차장 정보 저장에 실패했습니다.');
          console.error('Error:', error);
        },
      }
    );
  };

  const handleCancel = () => {
    navigate('/main');
  };

  if (isLoading) {
    return (
      <Wrap className="main_wrap" title={'주차장 설정'}>
        <ContentsWrap>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-600">로딩 중...</p>
            </div>
          </div>
        </ContentsWrap>
      </Wrap>
    );
  }

  return (
    <div style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', height: '100vh' }}>
      <Wrap className="main_wrap" title={'주차장 설정'}>
        <ContentsWrap className="min-w-0">
          <div
            className="relative w-full p-6"
            style={{ maxWidth: '100%', boxSizing: 'border-box', height: 'calc(100vh - 53px)', overflowY: 'auto' }}
          >
            <div className="relative z-10 w-full max-w-4xl mx-auto" style={{ maxWidth: '100%' }}>
              <div className="bg-white bg-opacity-95 rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  주차장 정보 설정
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 전체 주차 공간 */}
                  <div>
                    <label htmlFor="total_spaces" className="block text-sm font-medium text-gray-700 mb-2">
                      전체 주차 공간 (개)
                    </label>
                    <input
                      type="number"
                      id="total_spaces"
                      name="total_spaces"
                      value={formData.total_spaces}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* 시간당 요금 */}
                  <div>
                    <label htmlFor="price_per_hour" className="block text-sm font-medium text-gray-700 mb-2">
                      시간당 요금 (원)
                    </label>
                    <input
                      type="number"
                      id="price_per_hour"
                      name="price_per_hour"
                      value={formData.price_per_hour}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* 분당 요금 */}
                  <div>
                    <label htmlFor="price_per_minute" className="block text-sm font-medium text-gray-700 mb-2">
                      분당 요금 (원)
                    </label>
                    <input
                      type="number"
                      id="price_per_minute"
                      name="price_per_minute"
                      value={formData.price_per_minute}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* 설정 시간 */}
                  <div>
                    <label htmlFor="setting_time" className="block text-sm font-medium text-gray-700 mb-2">
                      설정 시간 (분)
                    </label>
                    <input
                      type="number"
                      id="setting_time"
                      name="setting_time"
                      value={formData.setting_time}
                      onChange={handleChange}
                      min="1"
                      step="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* 현재 주차장 정보 표시 */}
                  {parkingStatus?.data && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">현재 주차장 정보</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">사용 중인 공간:</span>
                          <span className="ml-2 font-semibold text-red-600">
                            {parkingStatus.data.occupied_spaces.toLocaleString()}개
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">남은 공간:</span>
                          <span className="ml-2 font-semibold text-green-600">
                            {parkingStatus.data.available_spaces.toLocaleString()}개
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 버튼 */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isPending ? '저장 중...' : '저장'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isPending}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ContentsWrap>
      </Wrap>
    </div>
  );
};

export default ParkingSettingsPage;

