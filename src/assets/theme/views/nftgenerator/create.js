export const styles = {
    createSection: {
        display: "flex",
    },
    preview: {
        padding: "10px 20px",
        textAlign: "start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    previewTitle: {
        fontSize: "26px",
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "600"
    },
    properties: {
        padding: "10px 20px",
        width: "100%"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: { lg: "50%", md: "75%", xs: "100%" }
    },
    formControl: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        "& label": {
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#333333"
            // display: "flex",
            // alignItems: "center"
        }
    },
    formTextField: {
        border: "solid 1px #d1daf1",
        borderRadius: "10px",
        width: "100%",
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
        },
        "& .MuiInputBase-multiline, input": {
            padding: "12px 15px",
        }
    },
    previewImage: {
        width: { md: "300px", xs: "100%" },
        borderRadius: "5px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
    },
    selectButton: {
        border: "solid 1px #d1daf1",
        width: "100%",
        "& .MuiSelect-select": {
            padding: "12px 15px"
        },
        borderRadius: "10px",
        "& fieldset": {
            border: "none"
        }
    },
    nextButton: {
        border: "none",
        width: "100%",
        // padding: "14px 44px",
        // background: "#7B61FF",
        background: "#7B61FF",
        // transform: "matrix(1, 0, 0, -1, 0, 0)",
        borderRadius: "154.863px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "32px",
        textAlign: "center",
        color: "#FFFFFF"
    }
}
