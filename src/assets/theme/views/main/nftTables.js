const componentStyles = () => ({
    nftTable: {
        padding: '0% 8% 0 8% !important',
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
    selectbtns: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: '0% 15% 5% 15%',
        "@media (max-width: 768px)": {
            display: 'block'
        }

    },
    table: {
        boxShadow: 'none !important',
        "& .css-15lr7lp-MuiPaper-root-MuiTableContainer-root": {
            boxShadow: 'none !important',
            display: 'none !important'
        }
    },
    namebox: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: '2px solid black',
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    tdbox: {
        display: 'flex !important',
        alignItems: 'center'
    },
    ether: {
        color: '#6549F6 !important',
        fontWeight: 'bold !important',
        "& img": {
            width: '20px !important',
            verticalAlign: 'text-bottom'
        }
    },
    percent: {
        // border: '1px solid #5ae378 !important',
        // width: '75px',
        padding: '2%',
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #00A825',
        borderRadius: '20px',
        "& p": {
            color: '#00A825 !important',
            fontWeight: 'bold !important'
        }
    },
    mpercent: {
        // border: '1px solid #eb6363 !important',
        // width: '75px',
        padding: '2%',
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FF0000',
        borderRadius: '20px',
        "& p": {
            color: '#FF0000 !important',
            fontWeight: 'bold !important'
        }
    },
    volletter: {
        color: '#6549F6 !important',
        fontWeight: 'bold !important',
        display: 'inline',
        textAlign: 'right',
        marginLeft: '5px !important'
    },
    name: {
        fontWeight: 'bold !important',
        color: 'black'
    },
    thead: {
        fontSize: '1.2rem !important',
        color: 'black !important',
        border: '0px !important'
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
    }
})
export default componentStyles
