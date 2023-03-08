const componentStyles = () => ({
    pageroot: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        '@media only screen and (max-width: 576px)': {
            display: "none"
        }
    },
    pagecontaner: {
        display: "flex",
        // justifyContent: "center",
        paddingTop: 0,
        padding: 20,
        marginBottom: '110px !important',
        "@media only screen and (max-width: 1200px)": {
            marginBottom: "100px !important"
        },
        "@media only screen and (max-width: 992px)": {
            marginBottom: "85px !important"
        },
        "@media only screen and (max-width: 768px)": {
            marginBottom: "75px  !important"
        },
        "@media only screen and (max-width: 576px)": {
            marginBottom: "100px !important"
        }
    },
    bannericon: {
        // position: "absolute",
        marginLeft: "100px",
        marginRight: "100px",
        "@media only screen and (max-width: 1200px)": {
            marginLeft: "55px",
        },
        "@media only screen and (max-width: 992px)": {
            marginLeft: "55px",
        },
        "@media only screen and (max-width: 768px)": {
            marginLeft: "55px",
        },
        "@media only screen and (max-width: 576px)": {
            marginLeft: "145px",
            display: "none"
        }
    },
    bannerbackground: {
        width: "220px",
        height: "220px",
        background: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        "@media only screen and (max-width: 1200px)": {
            width: "200px",
            height: "200px"
        },
        "@media only screen and (max-width: 992px)": {
            width: "170px",
            height: "170px"
        },
        "@media only screen and (max-width: 768px)": {
            width: "150px",
            height: "150px"
        },
        "@media only screen and (max-width: 576px)": {
            width: "200px",
            height: "200px"
        }
    },
    ellipseImg: {
        width: "100%",
        height: "100%",
        "@media only screen and (max-width: 1200px)": {
            width: "100%",
            height: "100%"
        },
        "@media only screen and (max-width: 992px)": {
            width: "100%",
            height: "100%"
        },
        "@media only screen and (max-width: 768px)": {
            width: "100%",
            height: "100%"
        },
        "@media only screen and (max-width: 576px)": {
            width: "100%",
            height: "100%"
        }
    },
    bannerbackgroundimg: {
        background: "linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)",
        width: "100%",
        height: "300px",
        objectFit: "cover",
        filter: "blur(50px)",
        transform: "scale(1.1)"
    },
    extrasoho: {
        fontSize: "44px !important",
        fontWeight: "700 !important",
        lineHeight: "44px !important",
        color: "black"
    },
    addressbutton: {
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%) !important",
        color: "#8551E6 !important",
        borderWidth: "0px",
        borderRadius: "154.863px !important",
        width: "170px",
        height: "42.37px"
    },
    followbutton: {
        background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%) !important",
        color: "#FFFFFF !important",
        borderWidth: "0px !important",
        borderRadius: "154.863px !important",
        width: "170px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "42.37px"
    },
    createbutton: {
        background: "linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)",
        color: "#FFFFFF",
        borderWidth: "0px",
        borderRadius: "154.863px !important",
        width: "170px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "42.37px"
    },
    createbuttonhead: {
        paddingTop: "100px",
        paddingBottom: "80px"
    },
    radiusbutton: {
        width: "40px",
        height: "39px",
        border: "0px",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%) !important",
        borderRadius: "82.47px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#6549F6 !important"
    },
    addicon: {
        color: "white"
    },
    pageheader: {

    },
    extrasohoemail: {
        fontWeight: "500 !important",
        fontSize: "22px !important",
        lineHeight: "27px !important",
        color: "#6549F6 !important"
    },
    extrasohodate: {
        width: "129px",
        height: "22px",
        border: "0px",
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "82.47px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Neue Haas Grotesk Text Pro',
        fontWeight: 600,
        fontSize: "12px",
        lineheight: "18px",
        color: "#6549F6"
    },
    fontformat: {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "24px",
        color: "#000000"
    },
    fontbold: {
        fontFamily: 'Termina',
        fontWeight: "700 !important",
        fontSize: "21.7625px !important",
        lineHeight: "26px !important",
        color: "#000000"
    },
    iconsearch: {
        width: "25px",
        height: "25px"
    },
    searchinput: {
        width: "80%"
    },
    searchforn: {
        width: "400px",
        height: "40px",
        border: "2px solid #6549F6",
        borderRadius: "50px !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    grounddemo: {
        width: "258px",
        height: "54px",
        borderRadius: "10px"
    },
    tablist: {},
    cachedicon: {
        color: "black",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px"
    },
    tabitems: {
        textTransform: "none !important",
        color: "#250C50 !important",
        minWidth: '120px !important',
        lineHeight: '2.65 !important',
        fontSize: '1.375rem !important',
        fontWeight: '600 !important'
    },
    tabitem: {
        display: "flex !important",
        flexDirection: "row-reverse !important",
        padding: "0px !important",
        textTransform: "none !important"
    },
    tabblock: {
        display: "none"
    },
    scrollicon: {
        width: "20px"
    },
    nativeselect: {
        width: "258px",
        height: "44px",
        border: "2px solid #6549F6 !important",
        borderRadius: "10px !important",
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
    icongroupleft: {
        border: "2px solid #6549F6",
        borderRadius: "10px 0px 0px 10px",
        bgcolor: "#6549F6"
    },
    icongroupright: {
        border: "2px solid #6549F6",
        borderRadius: "0px 10px 10px 0px",
        bgcolor: "#6549F6"
    },
    toggleicongroup: {
        height: "40px",
        '& .Mui-selected': {
            background: "#6549F6 !important"
        }
    },
    toggleiconleft: {
        color: "white"
    },
    activeleft: {
        color: "#6549F6"
    },
    toggleiconright: {
        width: "22px"
    },
    activeright: {
        background: "white",
        width: "22px"
    },
    toggleright: {
        color: "#6549F6"
    },
    cardimggroup: {
        borderRadius: "10px",
        width: "100%"
    },
    cardnftdetail: {
        fontWeight: "700 !important",
        fontSize: "20.9443px",
        lineHeight: "120%",
        color: "black"
    },
    cardprice: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: "100px"
    },
    cardnftfooter: {
        color: "#C4C4C4",
        fontWeight: "500 !important",
        fontSize: "18px",
        lineHeight: "120%"
    },
    nftethereum: {
        width: "22px",
        fontWeight: "700 !important",
        fontSize: "18px",
        lineHeight: "120%"
    },
    nftcheck: {
        width: "14px"
    },
    cardlogo: {
        position: "absolute",
        background: "white",
        borderRadius: "10px 0px",
        padding: 5
    },
    colorstyle: {
        width: "68.08px",
        height: "20px",
        background: "#F4EEFF !important",
        borderRadius: "4px !important",
        padding: 5,
        color: "#6549F6 !important",
        fontWeight: "700 !important",
        fontSize: "12px",
        lineHeight: "15px",
        textAlign: "center !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    griditems: {
        display: "flex"
    },
    boxshadow: {
        padding: "14px",
        boxShadow: "5.26833px 5.26833px 13.1708px #e1dada !important",
        cursor: "pointer"
    },
    tablistitem: {
        paddingLeft: "120px",
        '@media only screen and (max-width: 576px)': {
            padding: 0
        }
    },
    extrasohotext: {
        display: "flex !important",
        flexDirection: "column !important",
        alignContent: "center !important",
        "@media only screen and (max-width: 992px)": {
            flexDirection: "row !important",
            justifyContent: "center !important"
        }
    },
    displayicon: {
        "@media only screen and (max-width: 576px)": {
            display: "none !important",
            width: "81px !important"
        }
    },
    header: {
        padding: "24px 120px",
        "@media only screen and (max-width: 576px)": {
            padding: 0
        }
    },
    collectionhead: {
        padding: "24px 100px",
        "@media only screen and (max-width: 576px)": {
            padding: 0
        }
    },
    tabindicator: {
        display: "flex",
        alignItems: "center",
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
    moredetail: {
        color: "#250C50"
    },
    selectButton: {
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "22px",
        color: "#6549F6",
        width: "230px",
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
        "& .MuiMenu-list": {
            padding: "0px"
        }
        // ,
        // '& .MuiSelect-select': {
        //     color: "#6549F6"
        // }
    },
    selectMenuItem: {
        fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#250C50",
        "&:hover": {
            color: "#6549F6"
        },
        "&.Mui-disabled": {
            fontFamily: 'Neue Haas Grotesk Text Pro, sans-serif',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "18px",
            background: "linear-gradient(93.69deg, #7B61FF 0%, #00DAD9 107.12%)",
            borderRadius: "10px",
            lineHeight: "22px",
            color: "#FFFFFF",
            opacity: "1"
        },
        drop: {
            zIndex: '9 !important',
            position: "relative !important"
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
        }
    },
    filtermadal: {
        marginTop: "-50px !important",
        marginLeft: "-70px",
        padding: "20px",
        position: "fixed",
        '@media only screen and (max-width: 1200px)': {
            maxHeight: "400px !important"
        },
        '@media only screen and (max-width: 992px)': {
            maxHeight: "300px !important"

        },
        '@media only screen and (max-width: 765px)': {
            maxHeight: "300px !important"

        },
        '@media only screen and (max-width: 576px)': {
            maxHeight: "300px !important",
            maxWidth: "400px !important",
            marginLeft: "0px"
        },
        '& .MuiPaper-root ul': {
            borderRadius: "0px !important"
        }
    },
    collectionfilterlist: {
        background: "#D9D9D9",
        borderRadius: "50px",
        width: "32px",
        height: "32px"
    },
    filterparentitem: {
        fontWeight: "500 !important",
        fontSize: "18px !important",
        lineHeight: "22px !important",
        color: "#250C50"
    },
    collectionsearch: {
        fontWeight: "600 !important",
        fontSize: "18px",
        lineHeight: "22px",
        color: "#6549F6"
    }
})

export default componentStyles
