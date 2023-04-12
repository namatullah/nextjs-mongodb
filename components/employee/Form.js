import React, { useState } from 'react'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Tooltip,
} from "@mui/material";
import CropIcon from '@mui/icons-material/Crop';
import Image from 'next/image';
import ImageCrop from '../ImageCrop';
import { addEmployee, editEmployee } from '../../actions/actions/employee';

const Form = ({ open, closeForm, employee }) => {
    const [openCrop, setOpenCrop] = useState(false);
    const [formData, setFormData] = useState({
        name: employee?.name ?? '',
        email: employee?.email ?? '',
        description: employee?.description ?? '',
        photo: employee?.photo ?? null
    });
    const [errors, setErrors] = useState({ email: false, name: false });
    const [errorTexts, setErrorTexts] = useState({ name: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name) {
            setErrors({ name: true }); setErrorTexts({ name: "This field is required" });
        } else if (!formData.email) {
            setErrors({ email: true }); setErrorTexts({ email: "This field is required" });
        } else {
            if (employee) {
                const res = editEmployee(employee._id, formData);
                console.log(res)
            } else {
                addEmployee(formData);
            }
            handleCancel();
        }
    }

    const assignPhoto = (photo) => {
        setFormData({ ...formData, photo: photo })
    }

    const handleCancel = () => {
        setFormData({ name: '', email: '', description: '' })
        closeForm()
    }

    return (
        <>
            {openCrop && (
                <ImageCrop output={formData.photo} assignPhoto={assignPhoto} setOpenCrop={setOpenCrop} />
            )}

            <Dialog open={open} fullWidth >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add Employee</DialogTitle>

                    <DialogContent>
                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <Avatar sx={{ width: 80, height: 80, border: '1px solid #888', mb: 2 }} alt={employee?.name} src={formData.photo ? formData.photo : (employee?.photo ?? '/img/profile.png')} variant="rounded" >
                                {employee?.name.charAt(0)}
                            </Avatar>
                            <div>
                                <Tooltip title='Add/Edit and Crop photo' arrow placement="top">
                                    <CropIcon color='primary' sx={{ m: 1 }} onClick={() => setOpenCrop(true)} />
                                </Tooltip>
                            </div>
                        </div>
                        <TextField
                            error={errors.name}
                            margin="dense"
                            label='name'
                            fullWidth
                            variant="outlined"
                            value={formData.name}
                            helperText={errorTexts.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            error={errors.email}
                            margin="dense"
                            label='email'
                            fullWidth
                            type='email'
                            variant="outlined"
                            value={formData.email}
                            helperText={errorTexts.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label='description'
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                        <Button variant="contained" size="small" type="submit">Add</Button>
                        <Button variant="contained" size="small" color="error" onClick={handleCancel}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog >
        </>
    )
}
export default Form
