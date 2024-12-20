import './Dropdown.css';
import { DeleteModal } from './DeleteModal/DeleteModal';

export function Dropdown({
  setisOpenDropdown,
  isOpenDropdown,
  newArray,
  allTasks,
  id,
  setIsEdit,
  add,
  minus,
}) {
  return (
    <>
      {isOpenDropdown && (
        <div className="d-flex justify-content-center dropdownMenu">
          <div className="dropdownContent">
            <ul>
              <li
                className="pt-2 dropdownMenuItem"
                onClick={() => {
                  add();
                  setisOpenDropdown(false);
                }}
              >
                Увеличить
              </li>
              <li
                className="pt-2 dropdownMenuItem"
                onClick={() => {
                  minus();
                  setisOpenDropdown(false);
                }}
              >
                Уменьшить
              </li>
              <li
                className="pt-2 dropdownMenuItem"
                onClick={() => {
                  setIsEdit(true);
                  setisOpenDropdown(false);
                }}
              >
                Редактировать
              </li>
              <DeleteModal
                id={id}
                setisOpenDropdown={setisOpenDropdown}
                allTasks={allTasks}
                newArray={newArray}
              />
              <li
                className="pt-2 dropdownMenuItem"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Удалить
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
