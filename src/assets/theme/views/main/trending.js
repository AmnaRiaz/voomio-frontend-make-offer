const componentStyles = () => ({
    trend: {
        padding: '0% 8% 0 8% !important',
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
        "& img": {
            width: '100%',
            borderRadius: '10px'
        },
        "&:first-child": {
            paddingLeft: '0'
        },
        "&:last-child": {
            paddingRight: '0'
        }
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
            height: '22px',
            width: '22px !important'
        }
    },
    Ptitle: {
        // display: 'flex',
        alignItems: 'center',
        color: 'black !important',
        fontWeight: 'bold !important'
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
        cursor: "pointer",
        borderRadius: '10px !important',
        boxShadow: '4px 1px 5px -1px rgb(0 0 0 /20%), 0px 1px 1px 0px rgb(0 0 0 /14%), 0px 1px 3px 0px rgb(0 0 0 /12%) !important'
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
    btnselect: {
        // color: 'white',
        width: '200px',
        color: ' #6549F6 !important',
        borderRadius: '10px !important',
        // border: 'none !important',
        boxShadow: 'none',
        // background: 'linear-gradient(98.93deg, #7B61FF -6.98%, #00DAD9 108.86%)',
        background: 'white',
        border: '1px solid #6549F6 !important',
        // color: '',
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
    }
})
export default componentStyles
