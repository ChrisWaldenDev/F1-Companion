import {useLocation} from "react-router";
import {Box, Typography} from "@mui/material";

function PageNotFound() {
    const location = useLocation();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '4rem',
                color: '#f1f1f1',
            }}
        >
            <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem' }}>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                The requested URL <strong>{location.pathname}</strong> was not found on this server.
            </Typography>
        </Box>
    );
}

export default PageNotFound;