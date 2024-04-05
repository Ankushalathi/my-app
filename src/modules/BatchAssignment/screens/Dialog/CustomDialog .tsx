import React from 'react'
import MOLFormDialog from '../../../../components/molecules/MOLFormDialog/MOLFormDialog';
type Component = {
    onClose: () => void;
}
const CustomDialog = ({ onClose }: Component) => {
    return (
        <MOLFormDialog
            title=""
            onClose={onClose}
            isSubmitting={false}

        >
            <div className="grid grid-cols-12 ">
                <div className="col-span-4 border-2 border-black ">Heading</div>
                <div className="col-span-8">Heading</div>
            </div>
        </MOLFormDialog>
    )
}

export default CustomDialog 