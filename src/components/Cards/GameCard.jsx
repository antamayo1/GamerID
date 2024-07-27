import React from 'react'
import { MdCreate, MdDelete } from 'react-icons/md'

const GameCard = ({GameTitle, GamerID, onEdit, onDelete}) => {
    return (
        <div className="border wt-6 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium ">{GameTitle}</h6>
                </div>
                <p className="text-xs text-slate-600">{GamerID}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
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