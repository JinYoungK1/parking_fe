import { useMemo } from 'react';
import { ContentsWrap, Wrap } from '~/components/common';
import { useGetParkingStatus, useGetParkingCars } from '~/api/dashboard';

const ParkingDetailPage = () => {
  const { data: parkingStatus, isLoading: statusLoading } = useGetParkingStatus();
  const { data: parkingCars, isLoading: carsLoading } = useGetParkingCars();

  const isLoading = statusLoading || carsLoading;

  // 주차된 공간 번호 Set 생성
  const occupiedSpaces = useMemo(() => {
    if (!parkingCars?.data) return new Set<number>();
    
    const occupied = new Set<number>();
    parkingCars.data.forEach((car) => {
      // space_number가 있으면 사용, 없으면 id를 공간 번호로 사용
      const spaceNum = car.space_number || car.id;
      occupied.add(spaceNum);
    });
    return occupied;
  }, [parkingCars]);

  // 그리드 렌더링을 위한 주차 공간 배열 생성
  const totalSpaces = parkingStatus?.data?.total_spaces || 0;
  const spaces = useMemo(() => {
    return Array.from({ length: totalSpaces }, (_, i) => i + 1);
  }, [totalSpaces]);

  // 그리드 열 수 계산 (화면 크기에 따라 조정)
  const columnsPerRow = 50; // 한 줄에 50개씩 표시

  if (isLoading) {
    return (
      <div style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', height: '100vh' }}>
        <Wrap className="main_wrap" title={'주차장 상세'}>
          <ContentsWrap className="min-w-0">
            <div
              className="relative w-full p-6"
              style={{ maxWidth: '100%', boxSizing: 'border-box', height: 'calc(100vh - 53px)', overflowY: 'auto' }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <p className="mt-2 text-gray-600">로딩 중...</p>
                </div>
              </div>
            </div>
          </ContentsWrap>
        </Wrap>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'hidden', overflowY: 'hidden', width: '100%', height: '100vh' }}>
      <Wrap className="main_wrap" title={'주차장 상세'}>
        <ContentsWrap className="min-w-0">
          <div
            className="relative w-full p-6"
            style={{ maxWidth: '100%', boxSizing: 'border-box', height: 'calc(100vh - 53px)', overflowY: 'auto' }}
          >
            <div className="relative z-10 w-full max-w-full mx-auto">
              <div className="bg-white bg-opacity-95 rounded-xl shadow-2xl p-6 mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  주차장 상세 현황
                </h2>
                
                {/* 범례 */}
                <div className="flex justify-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 border border-gray-300"></div>
                    <span className="text-sm text-gray-700">빈 공간</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 border border-gray-300"></div>
                    <span className="text-sm text-gray-700">주차 중</span>
                  </div>
                </div>

                {/* 통계 정보 */}
                {parkingStatus?.data && (
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <p className="text-sm text-gray-600">전체 공간</p>
                      <p className="text-xl font-bold text-blue-700">{parkingStatus.data.total_spaces}</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                      <p className="text-sm text-gray-600">사용 중</p>
                      <p className="text-xl font-bold text-red-700">{parkingStatus.data.occupied_spaces}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-sm text-gray-600">남은 공간</p>
                      <p className="text-xl font-bold text-green-700">{parkingStatus.data.available_spaces}</p>
                    </div>
                  </div>
                )}

                {/* 주차 공간 그리드 */}
                <div className="overflow-auto max-h-[calc(100vh-400px)]">
                  <div
                    className="grid gap-1"
                    style={{
                      gridTemplateColumns: `repeat(${columnsPerRow}, minmax(0, 1fr))`,
                    }}
                  >
                    {spaces.map((spaceNum) => {
                      const isOccupied = occupiedSpaces.has(spaceNum);
                      return (
                        <div
                          key={spaceNum}
                          className={`
                            aspect-square flex items-center justify-center text-xs font-semibold
                            border border-gray-300 rounded transition-all hover:scale-105
                            ${isOccupied ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}
                          `}
                          style={{ minWidth: '24px', minHeight: '24px' }}
                          title={`주차 공간 ${spaceNum}${isOccupied ? ' (주차 중)' : ' (빈 공간)'}`}
                        >
                          {spaceNum}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentsWrap>
      </Wrap>
    </div>
  );
};

export default ParkingDetailPage;

