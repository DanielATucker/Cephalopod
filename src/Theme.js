import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: red,
    },
    components: {
        // Name of the component
        MuiCard: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    borderColor: "red",
                    borderRadius: 2,
                    position: "relative",
                    zIndex: 0,
                    backgroundColor: "black"
                },
            },
        },
    },
});