// FiltersModal.js
import React from 'react';
import Overlay from './Overlay';

function FiltersModal({ isOpen, closeModal }) {
    return (
        <>
            <Overlay isOpen={isOpen} onClose={closeModal} />
            <dialog open={isOpen} className="modal z-50">
                <div className="modal-box bg-gray-800 text-white">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Category:</label>
                        <select className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white">
                            <option>All</option>
                            <option>Category 1</option>
                            <option>Category 2</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Tags:</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                            placeholder="Enter tags"
                        />
                    </div>
                    <div className="modal-action">
                        <button className="btn" onClick={closeModal}>Close</button>
                        <button className="btn btn-primary">Apply</button>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default FiltersModal;