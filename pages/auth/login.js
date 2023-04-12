import { LockOutlined } from '@mui/icons-material'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Input from '../../components/auth/Input'
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', photo: '' }
import styles from "../../styles/register.module.css";
import { signIn } from 'next-auth/react'
import Link from 'next/link'
const Login = () => {
  const router = useRouter()
  const [showPassword, setShowPasswrod] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleShowPassword = () => setShowPasswrod((showPassword) => !showPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password
      })
      if(res.status===200){
        router.push("/");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={styles.paper} elevation={3}>
        <Avatar className={styles.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Sign In</Typography>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input name="email" label="Email address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submit}>Sign In</Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button>
                <Link href='/auth/register'>Don't have an acount? Sign Up</Link>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
