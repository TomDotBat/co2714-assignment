import Dashboard from "./Dashboard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {usePage} from "@inertiajs/inertia-react";

export default function Admin() {
    const user = usePage().props.auth.user;

    return (
        <Dashboard>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5">
                            Welcome to the admin dashboard, {user.name}!
                        </Typography>
                        <Typography variant="subtitle1">
                            Use the navigation drawer on the left to start managing your business.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}
