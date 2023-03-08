const componentStyles = () => ({
    trend: {
        padding: '6% 8% 0 8% !important',
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
        padding: '2% 2% 2% 0',
        borderRadius: '10px !important',
        paddngBottom: '20px !important',
        // width: "auto !important",
        // "& img": {
        //     width: '100%',
        //     borderRadius: '10px !important'
        // },
        width: "25% !important",
        "@media (max-width: 1024px)": {
            width: "50% !important"
        },
        "@media (max-width: 768px)": {
            width: "100% !important"
        },
        margin: '0 !important'
        // "&:first-child": {
        //     paddingLeft: '0'
        // },
        // "&:last-child": {
        //     paddingRight: '0'
        // }
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
        fontWeight: 'bold !important'
        // justifyContent: 'space-between'
        // "& img": {
        //     height: '30px',
        //     width: '17px !important'
        // }
    },
    cardimg: {
        // width: "130px !important"
        // width: '100%',
        // height: '100%'
    },
    jem: {
        height: '15px',
        width: '10% !important'
    },
    card: {
        cursor: "pointer",
        borderRadius: '10px !important',
        boxShadow: '4px 1px 5px -1px rgb(0 0 0 /20%), 0px 1px 1px 0px rgb(0 0 0 /14%), 0px 1px 3px 0px rgb(0 0 0 /12%) !important'
    },
    btnselect: {
        // color: 'white', 
        color: ' #6549F6 !important',
        width: '200px',
        borderRadius: '10px !important',
        // border: 'none !important',
        boxShadow: 'none',
        background: 'white',
        // background: 'linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)',
        border: '1px solid #6549F6 !important',
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
    cirimage: {
        width: "50px",
        height: "50px",
        marginRight: "10px",
        // width: '25%',
        // height: '25% !important',
        borderRadius: '50%'
    },
    introlist: {
        padding: '7% !important',
        marginTop: '-10%',
        justifyContent: 'space-between'
    }
})
export default componentStyles
