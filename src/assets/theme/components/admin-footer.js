const componentStyles = (theme) => ({
  listItemRoot: {
    width: "auto",
    color: theme.palette.gray[600],
    fontSize: ".875rem"
  },
  copyrightWrapper: {
    color: theme.palette.gray[600],
    fontSize: ".875rem",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      textAlign: "left"
    }
  },
  copyrightLink: {
    fontWeight: "600",
    marginLeft: ".25rem",
    color: theme.palette.primary.main,
    backgroundColor: "initial",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.dark
    }
  },
  justifyContentCenter: {
    [theme.breakpoints.down("lg")]: {
      justifyContent: "center!important"
    }
  },
  flexDirectionColumn: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column!important"
    }
  },
  bannerfooter: {
    paddingBottom: 40


  },
  stayloop: {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "100%",
    color: "#7B61FF"
  },
  footertext: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "150%",
    color: "black",
    padding: "10px",
    "@media only screen and (max-width: 576px)": {
      padding: 0
    }
  },
  followbutton: {
    background: "linear-gradient(98.79deg, #9B53E0 20.34%, #8551E6 77.89%) !important",
    color: "#FFFFFF",
    borderWidth: "0px !important",
    borderRadius: "154.863px !important",
    width: "209px !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60spx !important",
    fontWeight: "500 !important",
    fontSize: "26px !important",
    lineHeight: "32px !important",
    textAlign: "center",
    textTransform: "none !important",
    "@media only screen and (max-width: 992px)": {
      width: "170px"
    },
    "@media only screen and (max-width: 768px)": {
      width: "140px"
    },
    "@media only screen and (max-width: 576px)": {
      width: "140px"
    }
  },
  footerinput: {
    width: "459px",
    height: "54px",
    border: "2px solid #6549F6 !important",
    borderRadius: "10px",
    padding: 15,
    '& fieldset': {
      display: 'none'
    },
    display: "flex",
    justifyContent: "center",
    "@media only screen and (max-width: 992px)": {
      width: "359px"
    },
    "@media only screen and (max-width: 768px)": {
      width: "259px"
    },
    "@media only screen and (max-width: 576px)": {
      width: "259px",
      padding: 0
    }
  },
  footerlogo: {
    width: "70px"
  },
  footeritems: {
    padding: "50px",
    display: "flex",
    justifyContent: "center",
    "@media only screen and (max-width: 992px)": {
      justifyContent: "flex-start"
    },
    "@media only screen and (max-width: 768px)": {
      justifyContent: "flex-start"
    },
    "@media only screen and (max-width: 576px)": {
      justifyContent: "flex-start"
    }
  },
  dribbleicon: {
    width: "30px",
    color: '#9CA3AF',
    fontSize: "30px !important"
  },
  footericongroup: {
    '& .css-nen11g-MuiStack-root': {
      display: "flex",
      flexDirection: "row"
    }
  },
  voomiotext: {
    fontWeight: "500 !important",
    fontSize: "18px !important",
    color: "#250C50",
    padding: 5
  },
  textitems: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    "@media only screen and (max-width: 576px)": {
      justifyContent: "flex-start",
      flexDirection: "column !important",
      gap: "55px"
    }
  },
  textitem: {
    paddingTop: "20px"
  },
  footerhead: {
    color: "#9CA3AF",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    cursor: "pointer"
  },
  textfooter: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#6B7280",
    cursor: "pointer"
  },
  athertext: {
    paddingTop: "20px",
    paddingBottom: "20px"
  },
  dividerwidth: {
    width: "100%"
  },
  footerbuttongroup: {
    "@media only screen and (max-width: 576px)": {
      padding: "0px !important"
    }
  },
  footerheaditem: {
    padding: "20px",
    '@media only screen and (max-width: 576px)': {
      padding: "20px"
    },
    '& a': {
      textDecoration: 'none'
    }
  },
  logoitem: {
    maxWidth: 300
  },
  itemspace: {
    '@media only screen and (max-width: 576px)': {
      justifyContent: "flex-start !important"
    }
  }
})

export default componentStyles
