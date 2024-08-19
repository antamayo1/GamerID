import React from 'react'
import { MdCreate, MdDelete } from 'react-icons/md'

const GameCard = ({GameTitle, GamerID, onEdit, onDelete}) => {
    return (
        <div className="border rounded p-2 bg-white hover:shadow-xl transition-all ease-in-out w-full h-12">
            <div className="grid grid-cols-3 gap-4 place-items-center">
                <div>
                    <h6 className="text-xl font-medium">{GameTitle}</h6>
                </div>
                <p className="text-xl text-slate-600">{GamerID}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 justify-center">
                        <MdCreate
                            className="icon-btn hover:text-green-600"
                            onClick={ onEdit }
                        />
                        <MdDelete
                            className="icon-btn hover:text-red-500"
                            onClick={ onDelete }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameCard