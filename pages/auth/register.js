import { LockOutlined } from '@mui/icons-material'
import { Avatar, Button, Container, Grid, Paper, Tooltip, Typography } from '@mui/material'
import CropIcon from '@mui/icons-material/Crop';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { signUp } from '../../actions/actions/auth'
import Input from '../../components/auth/Input'
import styles from "../../styles/register.module.css";
import ImageCrop from '../../components/ImageCrop';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', photo: '' }
const Register = () => {
    const router = useRouter();
    const [openCrop, setOpenCrop] = useState(false);
    const [showPassword, setShowPasswrod] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPasswrod((showPassword) => !showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(formData)
        router.push('/auth/login');
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const assignPhoto = (photo) => {
        setFormData({ ...formData, photo: photo })
    }

    return (
        <>
            {openCrop && (
                <ImageCrop output={formData.photo} assignPhoto={assignPhoto} setOpenCrop={setOpenCrop} />
            )}
            <Container component="main" maxWidth="xs">
                <Paper className={styles.paper} elevation={3}>
                    <Avatar className={styles.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">Sign Up</Typography>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <Avatar sx={{ width: 100, height: 100, border: '1px solid #888', mb: 2 }} alt={formData?.firstName ?? '/img/profile.png'} src={formData.photo ?? '/img/profile.png'} variant="rounded" >
                                {formData?.firstName.charAt(0)}
                            </Avatar>
                            <div>
                                <Tooltip title='Add/Edit and Crop photo' arrow placement="top">
                                    <CropIcon color='primary' sx={{ m: 1 }} onClick={() => setOpenCrop(true)} />
                                </Tooltip>
                            </div>
                        </div>
                        <Grid container spacing={2}>
                            <Input name="firstName" label="First name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last name" handleChange={handleChange} half />
                            <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                            />
                            <Input
                                name="confirmPassword"
                                label="Repeat password"
                                handleChange={handleChange}
                                type="password"
                            />
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submit}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button>
                                    <Link href='/auth/login'>Already have an acount? Sign In</Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Register
