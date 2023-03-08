const componentStyles = (theme) => ({
    pageroot:{
      backgroundColor: `${theme.palette.primary.main} !important`,
      width: "100%", 
      position: "fixed", 
      bottom: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      // justifyContent: 'space-evenly',
      "& h3, & h2": {
        paddingRight: '1rem',
        fontWeight: 'bold'
      }
    },
    bottomitem: {
      width: "100%", 
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: 'space-around',
      "& h3, & h2": {
        paddingRight: '1rem',
        fontWeight: 'bold'
      }
    }
  })
  
  export default componentStyles
  