import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const View = ({ setOpenView, employee }) => {

    return (
        <Dialog open={true} fullWidth >
            <DialogTitle>Emmployee details</DialogTitle>
            <DialogContent sx={{mt:2}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar sx={{ width: 100, height: 100, border: '1px solid #888' }} alt={employee.name} src={employee.photo} variant="rounded" >
                            {employee.name.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="subtitle1" component="div">
                                <b>ID:</b> {employee._id}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">
                                <b>Name:</b> {employee.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">
                                <b>Email:</b> {employee.email}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="text.secondary">
                                <b>Description:</b> {employee.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                <Button variant="contained" size="small" color="error" onClick={() => setOpenView(false)} >Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default View;
