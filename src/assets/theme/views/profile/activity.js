const componentStyles = () => ({
    nabar: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        margin: "0px !important",
        color: "black"
    },
    nabarhead: {
        margin: "0px !important"
    },
    filters: {
        fontWeight: "700 !important",
        fontSize: "22px !important",
        lineHeight: "25px !important",
        color: "#6549F6"
    },
    filtervalue: {
        // width: "118px",
        height: "25px !important",
        background: "#6549F6",
        borderRadius: "50px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
            background: "#f66565",
            color: "black"
        }
    },
    clearall: {
        // width: "118px",
        height: "25px !important",
        border: "1px solid #6549F6",
        borderRadius: "50px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
            background: "#f66565",
            color: "white"
        }
    },
    cardimggroup: {
        height: 40,
        width: 40
    },
    NFTtype: {
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "120%",
        color: "#919191"
    },
    NFTstyle: {
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "120%",
        color: "#000000"
    },
    NFTprice: {
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "120%",
        color: "#6549F6"
    },
    ethereumicon: {
        width: 20,
        height: 20
    },
    nftcheck: {
        width: 15,
        height: 15
    },
    pendingFrom: {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px",
        color: "#1465DD"
    },
    pendingTime: {
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "20px",
        color: "#000000"
    },
    filterresult: {
        width: "16px"
    },
    tablehead: {
        paddingBottom: 5
    },
    collapseevent: {
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: "120%",
        color: "#000000"
    },
    itemhead: {
        fontWeight: "600 !important",
        color: "black !important"
    },
    NFTitemlist: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    activitybar: {
        flexWrap: "wrap",
        gap: "5px",
        '@media only screen and (max-width: 992px)': {
            whiteSpace: "nowrap",
            padding: "0px !important",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "5px"
        }
    },
    activityfilter: {
        '@media only screen and (max-width: 992px)': {
            padding: "0px !important",
            display: "flex",
            flexDirection: "column !important",
            gap: "10px"
        }
    }

})

export default componentStyles
