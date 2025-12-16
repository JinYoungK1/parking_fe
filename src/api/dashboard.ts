import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Cookies } from 'react-cookie';

import { APIError, apiAxios } from './apiQuery';
import { configEnv } from '~/config/environment';

// ======== [ 주차장 상태 조회 ] ========
export interface ParkingStatusData {
  total_spaces: number;
  occupied_spaces: number;
  available_spaces: number;
  price_per_hour: number;
  price_per_minute: number;
  setting_time: number;
}

export interface ParkingStatusResponse {
  result: boolean;
  message: string;
  data: ParkingStatusData;
}

// 주차장 상태 조회
export function useGetParkingStatus() {
  const result = useQuery<ParkingStatusResponse, APIError>({
    queryKey: ['/reference/parking/status'],
    refetchOnMount: true,
    refetchInterval: 30000, // 30초마다 자동 새로고침
  });

  return {
    ...result,
    data: result.data,
  };
}

// ======== [ 주차장 정보 설정/수정 ] ========
export interface ParkingLotUpdateRequest {
  total_spaces: number;
  price_per_hour: number;
  price_per_minute?: number;
  setting_time?: number;
}

export interface ParkingLotUpdateResponse {
  result: boolean;
  message: string;
  data: ParkingStatusData;
}

// 주차장 정보 설정/수정
export function useUpdateParkingLot() {
  const queryClient = useQueryClient();
  const cookies = new Cookies();

  return useMutation<ParkingLotUpdateResponse, APIError, ParkingLotUpdateRequest>({
    mutationFn: async (data: ParkingLotUpdateRequest) => {
      const AuthorizationToken = cookies?.get('osung_food_access_token');
      const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      if (AuthorizationToken) {
        headers.Authorization = 'Bearer ' + AuthorizationToken;
      }

      const response = await apiAxios.post<ParkingLotUpdateResponse>(
        '/reference/parking/lot',
        data,
        {
          baseURL: configEnv.API_URL,
          headers,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // 주차장 상태 조회 쿼리 무효화하여 자동 새로고침
      queryClient.invalidateQueries({ queryKey: ['/reference/parking/status'] });
    },
  }); 
}

// ======== [ 주차 중인 차량 목록 조회 ] ========
export interface ParkingCar {
  id: number;
  car_number: string;
  entry_time: string;
  exit_time: string | null;
  space_number?: number; // 주차 공간 번호 (옵션)
}

export interface ParkingCarListResponse {
  result: boolean;
  message: string;
  data: ParkingCar[];
}

// 주차 중인 차량 목록 조회
export function useGetParkingCars() {
  const result = useQuery<ParkingCarListResponse, APIError>({
    queryKey: ['/reference/parking/list'],
    refetchOnMount: true,
    refetchInterval: 30000, // 30초마다 자동 새로고침
  });

  return {
    ...result,
    data: result.data,
  };
}

//========================
// ======== [ 상세 정보 ] ========
interface OrderReceiptInfoData {
  totalCount: number;
  totalPages: number;
  totalSales?: number;
}

interface OrderReceiptInfoAllParams {
  page: number;
  size?: number;
  orderStartDate?: string | null;
  orderEndDate?: string | null;
  search?: string | null;
}
export interface OrderReceiptInfoResponse {
  result: boolean;
  message: string;
  data: OrderReceiptInfoData;
}

// 일 이익
export function useGetDayProfitInfos({
  page = 1,
  size = 20,
  search,
}: OrderReceiptInfoAllParams) {
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'yyyy-MM-dd' 형식으로 변환

  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    orderStartDate: today, // 기본값으로 오늘 날짜
    orderEndDate: today, // 기본값으로 오늘 날짜
  });

  if (search) params.append('search', search);

  const result = useQuery<OrderReceiptInfoResponse, APIError>({
    queryKey: [`/reference/dayprofits?${params}`],
    refetchOnMount: true,
  });

  return {
    ...result,
    data: result.data,
  };
}
