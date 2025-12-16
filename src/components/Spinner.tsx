import { PulseLoader } from 'react-spinners';

import { useSpinnerContext } from '~/providers/SpinnerProvider';

const Spinner = () => {
  const { spinnerState } = useSpinnerContext();
  return (
    <div className="block">
      <PulseLoader
        className="absolute left-1/2 top-1/2 z-[9999999] -translate-x-1/2 -translate-y-1/2 transform"
        color="blue"
        loading={spinnerState}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {spinnerState && (
        <div className="min-w-screen max-w-screen fixed left-0 top-0 z-[555555] h-screen w-screen bg-gray-500 bg-opacity-50" />
      )}
    </div>
  );
};

export default Spinner;
