export const componentStyles = () => ({
    nativeselect: {
        width: "189px",
        height: "44px",
        border: "2px solid #6549F6",
        borderRadius: "10px",
        padding: "10px",
        '& fieldset': {
            display: 'none'
        },
        '& svg': {
            color: "#6549F6"
        },
        '& .MuiSelect-select': {
            color: "#6549F6"
        }
    },
    iconsearch: {
        width: "25px",
        height: "25px"
    },
    searchinput: {
        width: "80%"
    },
    searchform: {
        width: "400px",
        height: "40px",
        border: "2px solid #6549F6",
        borderRadius: "50px !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        '@media only screen and (max-width: 1200px)': {
            width: "270px !important"
        }
    },
})

export const styles = {
    cardFooter: {
        position: "absolute",
        width: "100%",
        bottom: "0px",
        background: "#FFFFFF"
    },
    selectButton: {
        border: "2px solid #6549F6",
        // width: "100%",
        "& .MuiSelect-select": {
            padding: "12px 15px"
        },
        borderRadius: "10px",
        "& fieldset": {
            border: "none"
        }
    },
    dSelectMenuItem: {
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
    },
}
