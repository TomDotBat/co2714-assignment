import Dashboard from "./Dashboard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Admin() {
    return (
        <Dashboard>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            hello
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>
    );
}
