export const styles = {
    profileSection: {
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    profileHeader: {
        fontFamily: 'Termina, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "28px",
        lineHeight: "100%",
        color: "#7B61FF"
    },
    profileUpload: {
        display: "flex",
        alignItems: "center"
    },
    profileUploadContent: {
        display: "flex",
        flexDirection: "column",
        "& span": {
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#333333",
            textTransform: "capitalize"
        }
    },
    profileUploadButton: {
        padding: "10px 50px",
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        // color: "#000000",
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        color: "#8551E6",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px"
    },
    profileForm: {
        display: "flex",
        flexDirection: "column",
        width: { lg: "25%", md: "50%", sm: "75%", xs: "100%" }
    },
    profileFormControl: {
        display: "flex",
        flexDirection: "column",
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
    profileFormTextField: {
        border: "2px solid #6549F6",
        borderRadius: "10px",
        ".MuiInputBase-multiline": {
            padding: "0px !important"
        },
        "& .MuiInputBase-input": {
            padding: "10px 15px"
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
        }
    },
    button: {
        border: "none",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif !important',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        color: "#FFFFFF",
        padding: "10px 20px",
        textTransform: "capitalize",
        background: "#8551E6",
        // background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        // background: "linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)",
        borderRadius: "154.863px"
    },
    profileImage: {
        width: { md: "300px", xs: "100%" },
        borderRadius: "5px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
    }
}