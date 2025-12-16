import { Icon } from '@iconify/react';
import { ColumnDef } from '@tanstack/react-table';

import { IndeterminateCheckbox } from '~/components/input';

interface EmployeeInfo {
  employee_regular_worker?: string;
  employee_name?: string;
  employee_department?: string;
  employee_rank?: string;
  employee_money_day?: string;
  employee_join_date?: string;
  employee_email?: string;
  employee_email_domain?: string;
  employee_gubun?: string;
  [key: string]: any;
}

interface EmployeeAccount {
  id?: string;
  employee_code?: string;
  employee_userid?: string;
  group_name?: string;
  [key: string]: any;
}

interface employeePlusInfo {
  employee_code?: string;
  employeedegree?: string;
  employeecareer?: string;
  employeequalification?: string;
  employeeaward?: string;
  [key: string]: any;
}

interface EmployeeFileInfo {
  file?: string;
  [key: string]: any;
}

// 공통 정렬 헤더 컴포넌트
const SortableHeader = ({ column, title }: { column: any; title: string }) => (
  <div
    onClick={column.getToggleSortingHandler()}
    style={{
      fontWeight: column.getIsSorted() ? 'bold' : 'normal',
      color: column.getIsSorted() ? 'blue' : 'inherit', // 정렬된 상태일 때 파란색으로 설정
      cursor: 'pointer', // 클릭 가능한 UI임을 명확히 하기 위해 추가
    }}>
    {title}
    {column.getIsSorted() === 'asc'
      ? ' ▲'
      : column.getIsSorted() === 'desc'
        ? ' ▼'
        : ''}
  </div>
);


export const employeeInfoColumn: ColumnDef<EmployeeInfo>[] = [
  {
    id: 'select-col',
    header: ({ table }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      </div>
    ),
    size: 10,
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
   // ✅ 새로운 행 번호(순번) 컬럼 추가
 {
  id: 'row-number',
  header: ({ column }) => (
    <div style={{ textAlign: 'center', alignItems: 'center', whiteSpace: 'nowrap' }}>
      <SortableHeader column={column} title="번호" />
    </div>
  ),
  size: 64,
  cell: ({ row }) => (
    <div style={{ textAlign: 'center', alignItems: 'center' }}>{row.index + 1}</div>
  ),
},
  // {
  //   id: 'select-col',
  //   header: ({ table }) => (
  //     <div className="px-1" style={{ whiteSpace: 'nowrap' }}>
  //       <IndeterminateCheckbox
  //         {...{
  //           checked: table.getIsAllRowsSelected(),
  //           indeterminate: table.getIsSomeRowsSelected(),
  //           onChange: table.getToggleAllRowsSelectedHandler(),
  //         }}
  //       />
  //     </div>
  //   ),
  //   size: 10,
  //   cell: ({ row }) => (
  //     <div className="px-1">
  //       <IndeterminateCheckbox
  //         {...{
  //           checked: row.getIsSelected(),
  //           indeterminate: row.getIsSomeSelected(),
  //           onChange: row.getToggleSelectedHandler(),
  //           value: row.original.employee_code
  //         }}
  //       />
  //     </div>
  //   ),
  // },
  // {
  //   id: 'employee_current_site_name',
  //   accessorFn: (row: EmployeeInfo) => row.employee_current_site_name,
  //   header: ({ column }) => (
  //     <div style={{ whiteSpace: 'nowrap', width: '100px' }}>
  //       <SortableHeader column={column} title="현재 작업현장명" />
  //     </div>
  //   ),
  //   cell: ({ cell }) => {
  //     const value = cell.getValue();
  //     return (
  //       <div style={{ textAlign: 'center' }}>{String(value ?? '')}</div>
  //     );
  //   },
  // },
  // {
  //   id: 'employee_login_id',
  //   accessorFn: (row: EmployeeInfo) => row.employee_login_id,
  //   header: ({ column }) => (
  //     <div style={{ whiteSpace: 'nowrap' }}>
  //       <SortableHeader column={column} title="아이디" />
  //     </div>
  //   ),
  //   cell: ({ cell }) => {
  //     const value = cell.getValue();
  //     return (
  //       <div style={{ textAlign: 'center' }}>{String(value ?? '')}</div>
  //     );
  //   },
  // },

  {
    id: 'employee_regular_worker',
    accessorFn: (row: EmployeeInfo) => row.employee_regular_worker,
    header: ({ column }) => (
      <div style={{ whiteSpace: 'nowrap' }}>
        <SortableHeader column={column} title="구분" />
      </div>
    ),
  },
  {
    id: 'employee_name',
    accessorFn: (row: EmployeeInfo) => row.employee_name,
    header: ({ column }) => (
      <div style={{ whiteSpace: 'nowrap' }}>
        <SortableHeader column={column} title="성명" />
      </div>
    ),
  },
  {
    id: 'employee_department',
    accessorFn: (row: EmployeeInfo) => row.employee_department,
    header: ({ column }) => (
      <div style={{ whiteSpace: 'nowrap' }}>
        <SortableHeader column={column} title="부서 및 직종" />
      </div>
    ),
  },
  {
    id: 'employee_rank',
    accessorFn: (row: EmployeeInfo) => row.employee_rank,
    header: ({ column }) => (
      <div style={{ whiteSpace: 'nowrap' }}>
        <SortableHeader column={column} title="직급명" />
      </div>
    ),
  },
  {
    id: 'employee_money_day',
    accessorFn: (row: EmployeeInfo) => row.employee_money_day,
    header: ({ column }) => (
      <div style={{ whiteSpace: 'nowrap' }}>
        <SortableHeader column={column} title="급여일" />
      </div>
    ),
  },
  {
    id: 'employee_join_date',
    accessorFn: (row: EmployeeInfo) => row.employee_join_date,
    header: ({ column }) => (
      <div style={{ whiteSpace: 'nowrap' }}>
        <SortableHeader column={column} title="입사일" />
      </div>
    ),
  },
  {
    id: 'employee_email',
    accessorFn: (row: EmployeeInfo) => {
      const email = row.employee_email || '';
      const domain = row.employee_email_domain || '';
      return domain ? `${email}@${domain}` : email;
    },
    header: ({ column }) => (
      <div style={{ whiteSpace: 'nowrap' }}>
        <SortableHeader column={column} title="이메일" />
      </div>
    ),
  },
  
  {
    id: 'employee_gubun',
    accessorFn: (row: EmployeeInfo) => row.employee_gubun,
    header: ({ column }) => (
      <div style={{ whiteSpace: 'nowrap' }}>
        <SortableHeader column={column} title="계약구분" />
      </div>
    ),
  },
  // {
  //   id: 'employee_quit_date',
  //   accessorFn: (row: EmployeeInfo) => row.employee_quit_date,
  //   header: ({ column }) => <SortableHeader column={column} title="퇴사일" />,
  // },
];

export const employeeAccountDetailInfoColumn: ColumnDef<EmployeeAccount>[] = [
  {
    id: 'select-col',
    header: '선택',
    size: 10,
    cell: ({ row }) => {
      return (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      );
    },
  },
  {
    id: 'id',
    header: 'No.',
    accessorFn: (row: EmployeeAccount) => row.id,
  },

  {
    id: 'employee_code',
    header: '사원코드',
    accessorFn: (row: EmployeeAccount) => row.employee_code,
  },
  {
    id: 'employee_userid',
    header: '아이디',
    accessorFn: (row: EmployeeAccount) => row.employee_userid,
  },
  // {
  //   id: 'employee_password',
  //   header: '비밀번호',
  //   accessorFn: (row: EmployeeAccount) => row.employee_password,
  // },
  {
    id: 'group_name',
    header: '그룹명',
    accessorFn: (row: EmployeeAccount) => row.group_name,
  },
];
export const employeePlusInfoDetailInfoColumn: ColumnDef<employeePlusInfo>[] = [
  {
    id: 'select-col',
    header: '선택',
    size: 10,
    cell: ({ row }) => {
      return (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      );
    },
  },

  {
    id: 'employee_code',
    header: '사원코드',
    accessorFn: (row: employeePlusInfo) => row.employee_code,
  },
  {
    id: 'employeedegree',
    header: '학위',
    accessorFn: (row: employeePlusInfo) => row.employeedegree,
  },
  {
    id: 'employeecareer',
    header: '경력',
    accessorFn: (row: employeePlusInfo) => row.employeecareer,
  },
  {
    id: 'employeequalification',
    header: '자격취득',
    accessorFn: (row: employeePlusInfo) => row.employeequalification,
  },
  {
    id: 'employeeaward',
    header: '수상내역',
    size: 100,
    accessorFn: (row: employeePlusInfo) => row.employeeaward,
  },
];

export const ManFileInfoColumn: ColumnDef<EmployeeFileInfo>[] = [
  {
    id: 'select-col',
    header: '선택',
    size: 10,
    cell: ({ row }) => {
      return (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      );
    },
  },

  {
    id: 'file',
    header: () => <div className="text-center">파일</div>,
    accessorFn: (row: EmployeeFileInfo) => row.file,
    cell: ({ cell }) => {
      const fileName = cell.getValue() as string;

      return (
        <div className="flex items-center">
          <Icon
            className="mr-8"
            icon="vscode-icons:default-folder-opened"
            width="30"
            height="30"
          />
          {fileName}
        </div>
      );
    },
  },
];
