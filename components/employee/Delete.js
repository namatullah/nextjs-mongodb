import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { deleteEmployee } from "../../actions/actions/employee";

const Delete = ({ openDelete, handleCloseDelete, employee }) => {

    const handelDelete = async (e) => {
        e.preventDefault();
        const res = await deleteEmployee(employee._id);
        handleCloseDelete();
    }

    return (
        <Dialog open={open} fullWidth >
            <DialogTitle>Do you want to delete employee <b>{employee.name}</b> ?</DialogTitle>
            <DialogContent>
                <p>Note: after deletion you will not see this record.</p>
            </DialogContent>
            <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                <Button variant="contained" size="small" type="submit" onClick={handelDelete}>Yes</Button>
                <Button variant="contained" size="small" color="error" onClick={() => handleCloseDelete()}>No</Button>
            </DialogActions>
        </Dialog >
    )
}
export default Delete
