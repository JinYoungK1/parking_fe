import { useEffect, useRef, useState } from 'react';
import {
  DateRangePicker,
  createStaticRanges, // defaultStaticRanges,
} from 'react-date-range';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { endOfMonth, format, startOfMonth, subDays, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';

type Props = {
  placeholder?: string;
  onRangeChange?(v: any | null): void;
  dateFormat?: string;
  className?: string; 
};

const _defaultStaticRanges = [
  {
    label: '오늘',
    range: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
  {
    label: '최근 일주일',
    range: () => ({
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
    }),
  },
  {
    label: '최근 한달',
    range: () => ({
      startDate: subMonths(new Date(), 1),
      endDate: new Date(),
    }),
  },
  {
    label: '최근 2개월',
    range: () => ({
      startDate: subMonths(new Date(), 2),
      endDate: new Date(),
    }),
  },
  {
    label: '최근 3개월',
    range: () => ({
      startDate: subMonths(new Date(), 3),
      endDate: new Date(),
    }),
  },
  {
    label: '이번달',
    range: () => ({
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
    }),
  },
];

const INIT_STATE = {
  startDate: null,
  endDate: null,
  key: 'selection',
};

function DateRanges({ placeholder = '', onRangeChange = () => null, dateFormat = 'yyyy-MM-dd' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<any>([INIT_STATE]);
  const wrapperRef = useRef(null);
  const [lastSelectedDate, setLastSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !(wrapperRef.current as any).contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const onClearDate = () => {
    setState([INIT_STATE]);

    if (onRangeChange) {
      onRangeChange({
        startDate: null,
        endDate: null,
      });
    }
  };

  const handleSelect = (ranges: any) => {
    const { selection } = ranges;
    setState([selection]);

    if (selection.startDate && selection.endDate) {
      const currentDate = format(new Date(selection.startDate), 'yyyy-MM-dd');
      
      // 같은 날짜를 두 번 클릭한 경우
      if (lastSelectedDate === currentDate) {
        setIsOpen(false);
        setLastSelectedDate(null);
      } else {
        setLastSelectedDate(currentDate);
      }

      onRangeChange({
        startDate: format(new Date(selection.startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(selection.endDate), 'yyyy-MM-dd'),
      });
    }
  };

  const renderStaticRangeLabel = (label?: string) => {
    // 여기서 정적 범위 라벨을 커스터마이즈할 수 있습니다.
    // 예를 들어, 라벨 앞에 "범위: "를 추가합니다.
    return `${label ?? '-'}`;
  };

  // 기존 정적 범위에 커스터마이즈된 라벨을 적용
  const customStaticRanges = createStaticRanges(
    _defaultStaticRanges.map((range) => {
      return {
        ...range,
        label: renderStaticRangeLabel(range.label),
      };
    })
  );

  const formatDate = (date: any) => {
    if (!date) {
      return null;
    }
    return format(new Date(date), dateFormat);
  };

  const _endDate =
    state[0]?.endDate === null
      ? formatDate(state[0].startDate)
      : formatDate(state[0].endDate) ?? null;

  const startDate = state[0].startDate ? formatDate(state[0].startDate) : null;

  return (
    <div
      ref={wrapperRef}
      className="relative left-0 top-0 flex w-[200px] cursor-pointer items-center justify-start rounded-lg border border-gray-200 text-sm hover:bg-blue-100">
      <div
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          // e.stopPropagation();
          setIsOpen(!isOpen);
        }}>
        {!isOpen && _endDate === null && startDate === null ? (
          <p className="whitespace-nowrap text-sm text-gray-800">
            {placeholder}
          </p>
        ) : (
          <div className="whitespace-nowrap text-sm text-gray-800">
            {startDate ?? ''} - {_endDate ?? ''}
          </div>
        )}
      </div>
      <button
        type="button"
        className="absolute right-1 top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center rounded-full border"
        onClick={onClearDate}>
        <Icon
          icon="material-symbols-light:close-small"
          width="16"
          height="16"
        />
      </button>
      {isOpen && (
        <DateRangePicker
          className={clsx('absolute left-0 top-[50px] z-50')}
          onChange={handleSelect}
          locale={ko}
          showDateDisplay={false}
          // moveRangeOnFirstSelection={false}
          // retainEndDateOnFirstSelection={false}
          // preventSnapRefocus={false}
          months={2}
          ranges={state}
          direction="horizontal"
          calendarFocus="backwards"
          dateDisplayFormat="yyyy-MM-dd"
          staticRanges={customStaticRanges}
          inputRanges={[]}
        />
      )}
    </div>
  );
}

export default DateRanges;
