const componentStyles = () => ({
    checkBox: {
        color: "#9B53E0 !important"
    },
    pageroot: {
        paddingRight: '1rem',
        paddingTop: "0rem",
        paddingBottom: "4rem",
        width: "100%",
        height: "100%"
    },
    btnselect: {
        display: 'flex !important',
        width: '12rem',
        color: ' #303030 !important',
        background: 'white !important',
        justifyContent: 'space-between !important',
        padding: '0.5rem 0.5rem 0.5rem 0.5rem!important',
        border: '1px solid #DEDEDE !important',
        borderRadius: '5px !important',
        boxShadow: 'none',
        textTransform: 'none !important',
        "& :hover": {
            transform: 'none'
        },
        "& svg": {
            paddingLeft: '40px'
        }
    },
    listCard: {
        border: '1px solid #DEDEDE !important',
        padding: '2rem 1rem 1rem 1rem'
    },
    list: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '0.5rem',
        height: '2rem',
        "& h1": {
            color: '#464040',
            fontSize: '1.2rem',
            fontWeight: '430'
        }
    },
    cardcontent: {
        padding: '0px !important',
        paddingBottom: '1rem !important',
        paddingRight: '1rem !important',
    },
    listBtn: {
        padding: '0px !important',
        background: 'none !important'
    },
    listText: {
        "& span": {
            color: '#303030',
            fontWeight: '400 !important',
            fontSize: '1.1rem  !important'
        },
        '& svg': {
            // color: 'red !important',
            // fill: 'blue !important'
        }
    },
    listIco: {
        minWidth: '40px !important'
    },
    priceBtn: {
        "& button": {
            display: 'flex !important',
            width: '6rem',
            height: '2.3rem',
            fontSize: '1rem',
            color: ' #303030 !important',
            background: '#EDEDED !important',
            justifyContent: 'space-between !important',
            padding: '0.5rem 0.5rem 0.5rem 0.5rem!important',
            border: '1px solid #DEDEDE !important',
            borderRadius: '5px !important',
            boxShadow: 'none',
            textTransform: 'none !important',
            "& :hover": {
                transform: 'none'
            }
        }
    },
    priceRange: {
        paddingTop: '2rem',
        "& h1": {
            color: 'black',
            fontSize: '1.1rem',
            fontWeight: 'bold'
        }
    },
    priceBtnbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 0 1.5rem 0'
    },
    detailBtn: {
        border: "none",
        fontFamily: 'Neue Haas Grotesk Text Pro, Arial, sans-serif !important',
        color: "#FFFFFF",
        padding: "10px 20px !important",
        textTransform: "capitalize !important",
        background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%)",
        borderRadius: "154.863px !important",
        width: '100%'
    },
    price: {
        width: '6rem'
    }
})
export default componentStyles
