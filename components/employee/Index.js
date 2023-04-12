import { useState } from 'react';
import { Alert, Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import Form from './Form';
import Delete from './Delete';
import View from './View';
import { useSession } from 'next-auth/react';

const Index = ({ employees }) => {
    const { status } = useSession()
    const [open, setOpen] = useState(false)
    const [employee, setEmployee] = useState(null)
    const [openDelete, setOpenDelete] = useState(false)
    const [openView, setOpenView] = useState(false)

    const handleEdit = (employee) => {
        setEmployee(employee)
        setOpen(true)
    }
    const closeForm = () => {
        setOpen(false)
        setEmployee(null)
    }
    const handleOpenDelete = (employee) => {
        setOpenDelete(true);
        setEmployee(employee);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
        setEmployee(null);
    }
    const handleOpenView = (employee) => {
        setOpenView(true)
        setEmployee(employee)
    }

    return (
        <>
            {openView && (<View
                setOpenView={setOpenView}
                employee={employee}
            />)}
            {open && (<Form
                open={open}
                closeForm={closeForm}
                employee={employee}
            />)}
            {openDelete && (<Delete
                openDelete={openDelete}
                handleCloseDelete={handleCloseDelete}
                employee={employee}
            />)}
            <TableContainer component={Paper} raised="true" elevation={6} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={5} style={{ fontWeight: 'bold' }} align="left">
                                {status === "authenticated" && (
                                    <Tooltip title='Add a new employee' arrow placement="left">
                                        <AddIcon color="primary" onClick={() => setOpen(true)} />
                                    </Tooltip>
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">#</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Photo</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Email</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {employees.length > 0 ? employees.map((employee, index) => (
                            <TableRow key={employee._id}>
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">
                                    <Avatar sx={{ width: 50, height: 50, border: '1px solid #888' }} alt={employee.name} src={employee.photo} >
                                        {employee.name.charAt(0)}
                                    </Avatar>
                                </TableCell>
                                <TableCell align="left">{employee.name}</TableCell>
                                <TableCell align="left">{employee.email}</TableCell>
                                <TableCell align="left">
                                    <Tooltip title='View employee detail' arrow placement="top">
                                        <SearchIcon
                                            color="primary"
                                            fontSize="small"
                                            sx={{ mr: 1 }}
                                            onClick={() => handleOpenView(employee)}
                                        />
                                    </Tooltip>
                                    {status === "authenticated" && (
                                        <>
                                            <Tooltip title='Edit employee detail' arrow placement="top">
                                                <EditIcon
                                                    color="primary"
                                                    fontSize="small"
                                                    sx={{ mr: 1 }}
                                                    onClick={() => handleEdit(employee)}
                                                />
                                            </Tooltip>
                                            <Tooltip title='Delete employee' arrow placement="top">
                                                <DeleteIcon
                                                    color="error"
                                                    fontSize="small"
                                                    sx={{ mr: 1 }}
                                                    onClick={() => handleOpenDelete(employee)}
                                                />
                                            </Tooltip>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Alert severity="info">No data inserted</Alert>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Index