const componentStyles = () => ({
    buybutton: {
        width: "180px",
        height: "40px",
        background: "linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)",
        borderRadius: "386.071px !important",
        textTransform: "none !important",
        display: "flex",
        fontSize: '18px !important',
        alignItems: "center",
        justifyContent: "center",
        color: "white !important"
    },  
    nativeselects: {
        border: "2px solid #6549F6",
        '& fieldset': {
            display: "none"
        },
        '& select': {
            color: "rgba(101, 73, 246, 1)"
        },
        '& svg': {
            color: "rgba(101, 73, 246, 1)"
        },
        height: "40px"

    },
    generateModalHeader: {
        flexDirection: "row",
        alignItems: "center",
        "& span": {
            fontFamily: 'Termina, sans-serif',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "28px",
            lineHeight: "100%",
            color: "#000000"
        },
        "& h3": {
            color: "#000"
        }
    },
    generateModal: {
        "& .MuiDialog-paper": {
            padding: { md: "20px 40px", xs: "0px" },
            maxWidth: "700px !important"
        },
        "& .MuiBackdrop-root": {
            background: "#000000c7 !important"
        },
        // width: { md: "600px", xs: "300px" },
    },
    generateModalContent: {
        width: "526px",
        // width: { md: "600px", xs: "300px" },
        // justifyContent: "space-between"
    },
    generateModalContent1: {
        width: "700px",
        // width: { md: "600px", xs: "300px" },
        // justifyContent: "space-between"
    },
    generateModalFooter: {
        flexDirection: { md: "row", sm: "column" },
        gap: { md: 5, xs: 3 },
        justifyContent: "end",
        padding: "10px"
    },
    generateModalClosebtn: {
        position: "absolute",
        top: "16px",
        right: "0px"
    },
    makeofferimg: {
        width: "72px",
        height: "72px",
        borderRadius: "10px"
    },
    makeofferimg1: {
        width: "80px",
        height: "80px",
        borderRadius: "10px"
    },
    datepicker: {
        width: "100%",
        "& .MuiInputBase-adornedEnd": {
            height:"40px"
        }
    }
})

export default componentStyles
