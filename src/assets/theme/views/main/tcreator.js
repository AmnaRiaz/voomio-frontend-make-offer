const componentStyles = () => ({
    tcreator: {
        "& h1": {
            color: 'black !important',
            fontSize: '2.5rem !important',
            fontWeight: 'bold !important'
        }
    },
    select: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    trending: {
        padding: '1.3%',
        borderRadius: '10px !important',
        paddingBottom: '20px !important',
        width: "auto !important",
        "& img": {
            width: '100%',
            borderRadius: '10px !important'
        },
        minWidth: "25% !important",
        // maxWidth: "350px !important",
        "@media (max-width: 1024px)": {
            width: "50% !important"
        },
        "@media (max-width: 768px)": {
            width: "100% !important"
        },
        "&:first-child": {
            // paddingLeft: '64px'
        },
        "&:last-child": {
            // paddingRight: '0'
        },
        marginRight: "0 !important"
    },
    formctrl: {
        float: 'right'
    },
    items: {
        marginTop: '5%'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        color: 'black !important',
        fontWeight: 'bold !important',
        justifyContent: 'space-between',
        "& img": {
            height: '30px',
            width: '17px !important'
        }
    },
    jem: {
        height: '15px',
        width: '10% !important'
    },
    content: {
        color: 'black !important',
        fontWeight: 'bold !important'
    },
    contentname: {
        color: '#C4C4C4 !important',
        fontWeight: 'bold !important'
    },
    card: {
        background: "linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), #EF972D !important",
        borderRadius: '10px !important',
        // "& h2": {
        //     textAlign: "center !important"
        // },
        // "& button": {
        //     textAlign: "center !important"
        // },
        boxShadow: '4px 1px 5px -1px rgb(0 0 0 /20%), 0px 1px 1px 0px rgb(0 0 0 /14%), 0px 1px 3px 0px rgb(0 0 0 /12%) !important'
    },
    load: {
        padding: '5% !important',
        display: 'flex',
        justifyContent: 'center',
        '& button': {
            width: '20%',
            borderRadius: '20px !important',
            background: '#8551E6 !important',
            border: 'none !important'
        },
        '& .MuiButton-contained:hover': {
            background: '#8551E6'
        },
        "& .MuiButton-contained:active": {
            boxShadow: 'none'
        }
    },
    tcreatorcontent: {
        background: 'white',
        borderRadius: '10px !important'
    },
    cardimg: {
        padding: '10% 25% 5% 25% !important',
        display: 'flex',
        justifyContent: 'center',
        "& img": {
            width: '130px !important',
            height: '130px',
            border: '3px solid white',
            borderRadius: '50% !important'
        }
    },
    cardbtn: {
        width: '50%',
        margin: "auto",
        // display: 'flex',
        // justifyContent: 'center',
        paddingBottom: '5% !important',
        "& button": {
            background: 'white !important',
            color: 'black !important',
            width: '100%',
            fontWeight: 'bold !important',
            textTransform: "none !important",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center !important",
            borderRadius: '100px !important'
        },

        "& button:hover": {
            background: 'white !important',
            boxShadow: 'none !important',
            transparent: 'none !important'
        }
    },
    list: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: "2% !important"
    },
    clist: {
        "& h2": {
            color: 'black !important',
            fontWeight: 'bold !important'
        },
        "& h5": {
            color: 'black !important',
            fontWeight: 'bold !important'
        }
    },
    plusbtn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '5% !important',
        paddingTop: '5% !important',
        "& button": {
            background: '#8551E6',
            color: 'white !important',
            fontWeight: 'bold !important',
            borderRadius: '100px !important',

            width: '75%'
        },
        "& button:hover": {
            background: '#8551E6',
            boxShadow: 'none',
            transparent: 'none'
        }
    },
    plusico: {
        color: 'white !important',
        height: '15px'

    },
    cryptobtn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '5% !important',
        "& button": {
            background: '#e0e5e5',
            color: 'black !important',
            fontWeight: 'bold !important',
            borderRadius: '100px !important',
            width: '75%',
            boxShadow: 'none'
        },
        "& button:hover": {
            background: '#e0e5e5',
            boxShadow: 'none',
            transparent: 'none'
        }
    }

})
export default componentStyles
