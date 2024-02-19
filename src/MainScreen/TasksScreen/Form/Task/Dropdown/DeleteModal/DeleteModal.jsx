export function DeleteModal({ newArray, allTasks, setisOpenDropdown, id }) {
    return (
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="d-flex justify-content-end pe-1 mt-1">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-header m-0">
                        <div className="d-flex justify-content-center modal-title-content">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Удалить задачу?</h1>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className='d-flex justify-content-center'>
                            <button className="button-delete" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => {
                                newArray = newArray.filter((item) => item.id !== id);
                                allTasks.set(newArray);
                                setisOpenDropdown(false);
                            }}>Удалить</button>
                        </div>
                        <div className="d-flex justify-content-center mt-3 mb-3">
                            <a className="noDelete" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Отмена</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}