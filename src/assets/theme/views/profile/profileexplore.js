const componentStyles = () => ({
    bannerbackgroundimg: {
        width: "100%",
        height: "514px",
        marginTop: "-269px",
        background: 'url(images/profile/banner.jpg)',
        backgroundSize: "cover",
        '@media only screen and (max-width: 1200px)': {
            height: "376px",
            marginTop: "-200px"
        },
        '@media only screen and (max-width: 865px)': {
            height: "327px",
            marginTop: "-173px"
        },
        '@media only screen and (max-width: 765px)': {
            height: "292px",
            marginTop: "-153px"
        },
        '@media only screen and (max-width: 660px)': {
            height: "250px",
            marginTop: "-132px"
        },
        '@media only screen and (max-width: 576px)': {
            height: "218px",
            marginTop: "-112px"
        }
    },
    collectionexplore: {
        padding: "40px 100px",
        "@media only screen and (max-width: 1200px)": {
            padding: "40px 100px"
        },
        "@media only screen and (max-width: 992px)": {
            padding: "40px 38px"
        },
        "@media only screen and (max-width: 765px)": {
            padding: "40px 30px"
        },
        "@media only screen and (max-width: 576px)": {
            padding: "40px 25px"
        }
    },
    exploretitle: {
        fontWeight: "800 !important",
        fontSize: "44px !important",
        color: "#222222",
        paddingBottom: "20px !important"
    },
    tabindicator: {
        '& .MuiTabs-scroller': {
            '& .MuiTabs-indicator': {
                height: 8,
                background: "#6549F6"
            },
            '& .Mui-selected': {
                color: "#6549F6"
            },
            '& .MuiTabs-flexContainer': {
                width: "100%",
                overflow: "auto"
            }
        }
    },
    tabitems: {
        padding: "0px !important",
        textTransform: "none !important"
    },
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
    cardheader: {
        marginTop: "-40px",
        paddingRight: "0px !important"
    },
    cardavatar: {
        width: "70px !important",
        height: "70px !important"
    },
    doodles: {
        fontWeight: "600 !important",
        fontSize: "16px",
        color: "#000000"
    },
    nftTable: {
        padding: '6% 8% 0 8% !important',
        "& h1": {
            color: 'black !important',
            fontSize: '2.5rem !important',
            fontWeight: 'bold !important'
        }
    },
    load: {
        padding: '5%',
        display: 'flex',
        justifyContent: 'center',
        '& button': {
            width: '20%',
            borderRadius: '20px',
            background: '#8551E6',
            border: 'none !important'
        },
        '& .MuiButton-contained:hover': {
            background: '#8551E6'
        },
        "& .MuiButton-contained:active": {
            boxShadow: 'none'
        }
    },
    cardtable: {
        minWidth: '275',
        padding: ' 5% 5% 0% 5%',
        textAlign: 'center',
        boxShadow: '3px 3px 5px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important'
    },
    btnselect: {
        width: '200px',
        color: ' #6549F6 !important',
        background: 'white',
        border: '1px solid #6549F6 !important',
        borderRadius: '10px !important',
        boxShadow: 'none',
        "& :hover": {
            transform: 'none'
        },
        "& svg": {
            paddingLeft: '40px'
        }
    },
    dropmenu: {
        width: '200px',
        border: '1px solid transparent !important',
        "& li": {
            fontWeight: 'bold !important',
            color: '#250C50 !important'
        },
        "& li:hover": {
            color: '#6549F6 !important'
        },
        background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(123, 97, 255, 1), rgba(0, 218, 217, 1)) border-box'
    },
    drop: {
        zIndex: '9 !important'
    },
    table: {
        display: "flex",
        boxShadow: 'none !important',
        columnGap: "5%",
        "& .css-15lr7lp-MuiPaper-root-MuiTableContainer-root": {
            boxShadow: 'none !important',
            display: 'none !important'
        }
    },
    imgbox: {
        position: "absolute",
        inset: "0px",
        boxSizing: "border-box",
        padding: "0px",
        border: "none",
        margin: "auto",
        display: "block",
        width: "0px",
        height: "0px",
        minWidth: "100%",
        maxWidth: "100%",
        minHeight: "100%",
        maxHeight: "100%",
        objectFit: "cover",
        "overflow-clip-margin": "content-box",
        overflow: "clip",
    },
    spanbox: {
        boxSizing: "border-box",
        display: "block",
        overflow: "hidden",
        width: "initial",
        height: "initial",
        background: "none",
        opacity: "1",
        border: "0px",
        margin: "0px",
        padding: "0px",
        position: "absolute",
        inset: "0px"
    },
    namebox: {
        width: '72px',
        height: '72px',
        borderRadius: '12px',
        border: '2px solid rgb(255, 255, 255)',
        backgroundColor: 'white',
        flex: "0 0 auto",
        position: "relative",
        overflow: "hidden",
        "&::after": {
            display: "block",
            content: "",
            position: "absolute",
            inset: "0px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "10px"
        },

    },
    tdbox: {
        display: 'flex !important',
        alignItems: 'center',
    },
    tdbox1: {
        padding: "0 90px !important"
    },
    ether: {
        color: '#6549F6 !important',
        fontWeight: 'bold !important',
        width: "15% !important",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& img": {
            width: '30px !important',
            height: "30px",
            verticalAlign: 'text-bottom'
        }
    },
    percent: {
        // border: '1px solid #5ae378 !important',
        padding: '2%',
        "& p": {
            color: '#00A825 !important',
            fontWeight: 'bold !important'
        }
    },
    mpercent: {
        // border: '1px solid #eb6363 !important',
        padding: '2%',
        "& p": {
            color: '#FF0000 !important',
            fontWeight: 'bold !important'
        }
    },
    noalert: {
        // border: '1px solid #eb6363 !important',
        width: '100%',
        padding: '2%',
        "& p": {
            color: '#FF0000 !important',
            fontWeight: 'bold !important'
        }
    },
    volletter: {
        color: '#6549F6 !important',
        fontWeight: 'bold !important',
        display: 'inline'
    },
    name: {
        fontWeight: 'bold !important',
        color: 'black'
    },
    thead: {
        fontSize: '12px !important',
        color: '#707a83 !important',
        border: '0px !important',
        width: "15% !important",
        fontWeight: "600 !important",
        lineHeight: "18px",
        textTransform: "uppercase"
    },
    volmenu: {
        display: 'inline !important',
        verticalAlign: 'inherit !important',
        "& svg": {
            fontSize: '2.5rem !important'
        }
    },
    tgrid: {
        width: '100% !important'
    },
    pasttime: {
        '@media only screen and (max-width: 576px)': {
            flexDirection: "column !important"
        }
    },
    cardimggroup: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    collectionCard: {
        cursor: "pointer",
        width: "100%",
        height: "300px",
        position: "relative",
        "&:hover": {
            // filter: "blur(3px)"
        }
    },
    chainsearchbtn: {
        borderRadius: "9 0 0 9",
        borderRight: "1px solid #bbb !important",
        height: "100%",
        padding: "0 15px",
        fontWeight: "700 !important",
        color: "#666 !important",
        textTransform: "none !important",
        "&:hover": {
            color: "#222 !important"
        }
    },
    chainsearchbtn1: {
        borderRight: "1px solid #bbb !important",
        height: "100%",
        padding: "0 15px",
        fontWeight: "700 !important",
        color: "#666 !important",
        "&:hover": {
            color: "#222 !important"
        }
    },
    chainsearchbtn2: {
        borderRadius: "0 9 9 0",
        height: "100%",
        padding: "0 15px",
        fontWeight: "700 !important",
        color: "#666 !important",
        "&:hover": {
            color: "#222 !important"
        }
    }
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
    }
}

export default componentStyles