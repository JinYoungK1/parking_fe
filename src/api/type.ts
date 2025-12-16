/*
 * API 타입을 통일화 하기 위한 타인 선언\
 * */

export interface ResponseBase {
  result: boolean;
  message?: string;
}

export interface ResponseList<T> extends ResponseBase {
  data: T[];
}

export interface ResponseDetail<T> extends ResponseBase {
  data: T;
  totalCount: number;
}

export interface ResponseDetailIo<T> {
  result: boolean;
  message: string;
  data: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    tableData: T[]; // tableData 속성 추가
  };
}

// 공공데이터 동기화 응답 타입
export interface SyncPublicDataResponse extends ResponseBase {
  data: {
    totalFetched: number;
    totalCreated: number;
    totalUpdated: number;
    createdData: any[];
    updatedData: any[];
  };
}
