export const styles = {
    mintLoadingDialog: {
        "& .MuiPaper-root": {
            padding: "15px 30px"
        }
    },
    mintLoadingTitle: {
        fontSize: "20px",
        color: "#000000",
        padding: "15px 30px"
    },
    mintLoadingBox: {
        display: "flex",
        justifyContent: "center",
        padding: "15px 30px"
    },
    cardanoSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    card: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "2px solid #6549F6",
        padding: "20px",
        borderRadius: "10px"
    },
    content: {
        display: "flex",
        flexDirection: "column"
    },
    headerImage: {
        width: "32px",
        height: "40px"
    },
    headerTitle: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "100%",
        letterSpacing: "0.12em",
        textTransform: "capitalize",
        color: "#222222"
    },
    headerDescription: {
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
        color: "#333333"
    },
    cardanoFooter: {
        display: "flex",
        justifyContent: "end"
    },
    selectButton: {
        border: "none",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif !important',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        color: "#FFFFFF",
        padding: "10px 50px !important",
        textTransform: "capitalize !important",
        background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px !important"
    },
    generateSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px"
    },
    properties: {
        display: "flex",
        width: "100%",
        flexDirection: "column"
    },
    propertyTitle: {
        // fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        // fontStyle: "normal",
        fontWeight: "500",
        fontSize: "20px"
    },
    propertyList: {
        display: "flex",
        flexDirection: "row",
        alignItems: "end"
    },
    addMore: {
        display: "flex",
        justifyContent: "end"
    },
    footer: {
        display: "flex",
        flexDirection: "column",
        // minWidth: { lg: "500px" }
    },
    generate: {
        display: "flex",
        justifyContent: "end"
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
    // selectButton: {
    //     border: "2px solid #6549F6",
    //     width: "100%",
    //     "& .MuiSelect-select": {
    //         padding: "12px 15px"
    //     },
    //     borderRadius: "10px",
    //     "& fieldset": {
    //         border: "none"
    //     }
    // },
    addButton: {
        border: "none",
        color: "#8551E6",
        padding: "10px 30px",
        textTransform: "capitalize",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px"
    },
    deleteButton: {
        "& .MuiSvgIcon-root": {
            color: "#826CF7"
        }
    },
    generateButton: {
        border: "none",
        marginLeft: "20px",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif !important',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "120%",
        color: "#FFFFFF",
        padding: "12px 30px",
        // textTransform: "capitalize",
        background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px !important"
    },
    selectMenuItem: {
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        padding: "14px 23px",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#250C50",
        "&:hover": {
            color: "#6549F6"
        },
        "&.Mui-disabled": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "14px 23px",
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "18px",
            background: "linear-gradient(93.69deg, #7B61FF 0%, #00DAD9 107.12%)",
            borderRadius: "5px",
            lineHeight: "22px",
            color: "#FFFFFF",
            opacity: "1"
        }
    }
}
