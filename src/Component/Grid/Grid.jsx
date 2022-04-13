import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TrackWrapper from '../Tracks';



function FormRow() {
    return (
        <React.Fragment>
        for (var = i , )
            <Grid item xs={2}>
                <TrackWrapper />
            </Grid>
            <Grid item xs={2}>
                <TrackWrapper />
            </Grid>
            <Grid item xs={2}>
                <TrackWrapper />
            </Grid>
        </React.Fragment>
    );

}

export default function NestedGrid() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid>
                    <FormRow />
                </Grid>
                <Grid>
                    <FormRow />
                </Grid>
                <Grid >
                    <FormRow />
                </Grid>
            </Grid>
            <Button
                variant={isSelected ? 'primary' : 'secondary'}
                onClick={handleToggleSelect}
            >
                {isSelected ? 'Deselect' : 'Select'}
            </Button>
        </Box>
    );
}