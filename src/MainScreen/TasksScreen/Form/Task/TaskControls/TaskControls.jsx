import { Dots } from '../../../../../Icons/Dots';

export function TaskControls({ setIsOpenDropdown, isOpenDropdown }) {
  return (
    <div
      className="d-flex align-items-center"
      onClick={() => {
        setIsOpenDropdown(!isOpenDropdown);
      }}
    >
      <Dots />
    </div>
  );
}
