import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import useMediaQuery from '@mui/material/useMediaQuery'
import componentStyles from "/src/assets/theme/components/bottom"
import { makeStyles } from "@mui/styles"
import { useNavigate } from 'react-router-dom'
import { Typography, Box } from '@mui/material'

const useStyles = makeStyles(componentStyles)

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents')
  const matches = useMediaQuery('(max-width:768px)')
  const classes = useStyles()
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const MenuList = [
    { title: "Explore", navlink: "/explore" },
    { title: "Sell", navlink: "/pricing" },
    { title: "Create", navlink: "/pricing" },
    { title: "Ranking", navlink: "/ranking" },
  ]
  const onpush = (path) => {
    navigate(path)
  }
  return (
    <React.Fragment>
      {
        matches && <>
          <BottomNavigation className={classes.pageroot} value={value} onChange={handleChange}>
            <Box className={classes.bottomitem} >
              {
                MenuList.map((item, i) => (
                  <Typography sx={{ cursor: "pointer" }} key={i} onClick={() => onpush(item.navlink)} variant="h3">{item.title}</Typography>
                ))
              }
            </Box>
          </BottomNavigation>
        </>
      }
    </React.Fragment>
  )
}