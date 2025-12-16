import { ColumnDef } from '@tanstack/react-table';

import { IndeterminateCheckbox } from '~/components/input';
import { threeCommaFormatter } from '../formatterUtil';

interface generalstatementInfo {
  use_dt?: string;
  card_num?: string;
  card_approval_num?: string;
  card_approval_type?: string;
  card_approval_cost?: string | number;
  use_store_name?: string;
  tax?: string | number;
  account_subject?: string;
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
export const generalstatementInfoColumn: ColumnDef<generalstatementInfo>[] = [
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
  {
    id: 'use_dt',
    accessorFn: (row: generalstatementInfo) => {
      if (!row.use_dt) return "";
      // 20250108185723 → 2025-01-08
      const str = String(row.use_dt);
      if (str.length >= 8) {
        const year = str.substring(0, 4);
        const month = str.substring(4, 6);
        const day = str.substring(6, 8);
        return `${year}-${month}-${day}`;
      }
      return "";
    },
    header: ({ column }) => <SortableHeader column={column} title="사용일시" />,
  },
  {
    id: 'card_num',
    accessorFn: (row: generalstatementInfo) => row.card_num,
    header: ({ column }) => <SortableHeader column={column} title="카드번호" />,
  },
  {
    id: 'card_approval_num',
    header: ({ column }) => (
      <SortableHeader column={column} title="카드 승인번호" />
    ),
    accessorFn: (row: generalstatementInfo) => row.card_approval_num || "",
  },
  {
    id: 'card_approval_type',
    header: ({ column }) => (
      <SortableHeader column={column} title="카드 승인형태" />
    ),
    accessorFn: (row: generalstatementInfo) => row.card_approval_type || "",
  },
  {
    id: 'card_approval_cost',
    header: ({ column }) => (
      <SortableHeader column={column} title="카드 승인금액" />
    ),
    accessorFn: (row: generalstatementInfo) => threeCommaFormatter(row.card_approval_cost) || "",
  },
  {
    id: 'use_store_name',
    header: ({ column }) => (
      <SortableHeader column={column} title="사용처" />
    ),
    accessorFn: (row: generalstatementInfo) => row.use_store_name || "",
  },
  {
    id: 'amount',
    header: ({ column }) => <SortableHeader column={column} title="공급가액" />,
    accessorFn: (row: generalstatementInfo) => {
      const approvalCost = Number(row.card_approval_cost || 0);
      const tax = Number(row.tax || 0);
      const supplyAmount = approvalCost - tax;
      return threeCommaFormatter(supplyAmount.toString()) || "0";
    },
  },
  
  {
    id: 'tax',
    header: ({ column }) => <SortableHeader column={column} title="세액" />,
    accessorFn: (row: generalstatementInfo) => threeCommaFormatter(row.tax) || "",
  },
  // {
  //   id: 'service_charge',
  //   header: ({ column }) => <SortableHeader column={column} title="봉사료" />,
  //   accessorFn: (row: CardInfo) => threeCommaFormatter(row.service_charge),
  // },
  {
    id: 'account_subject',
    header: ({ column }) => <SortableHeader column={column} title="계정과목" />,
    accessorFn: (row: generalstatementInfo) => row.account_subject  || "",
  },
  // {
  //   id: 'total_amount',
  //   header: ({ column }) => <SortableHeader column={column} title="합계금" />,
  //   accessorFn: (row: generalstatementInfo) => threeCommaFormatter(row.total_amount)  || "",
  // },


];
