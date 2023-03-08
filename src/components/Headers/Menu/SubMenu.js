import {Fade, MenuItem, Paper, Typography} from "@mui/material"
import {Box} from "@mui/system"
import {useNavigate} from "react-router-dom"
import {MenuList} from '@mui/material'
import {useState} from "react"
import {useSelector} from "react-redux";

export const SubMenuItem = ({items, isLastChild}) => {
    const navigate = useNavigate()

    return (
        <>
            <MenuItem onClick={() => {
                navigate(items.navlink)
            }} sx={{cursor: "pointer"}}>
                <Box mr={1} sx={{display: "flex"}} component={"span"}>{items.image} </Box>
                <Typography sx={{color: "black !important"}} textAlign="center">{items.title}</Typography>
            </MenuItem>
            {!isLastChild && <hr/>}
        </>
    )
}

export const SubMenu = ({onpush, item}) => {
    const [open, setOpen] = useState(false)

    const userData = useSelector(state => state.user.user)

    const handleMenuOpen = () => {
        setOpen(true)
    }

    const handleMenuClose = () => {
        setOpen(false)
    }

    return (
        <Box
            sx={{position: 'relative'}}
            onMouseOver={handleMenuOpen}
            onMouseLeave={handleMenuClose}
        >
            <Typography
                p={"16px 0px"}
                onClick={() => onpush(item)}
                aria-owns={open ? "simple-menu" : null}
                aria-haspopup="true"
                sx={{cursor: "pointer"}}
                variant="h2"
            >
                {item.title}
            </Typography>

            <Fade in={open}>
                <Paper sx={{position: "absolute"}}>
                    <MenuList
                        id="simple-menu"
                    >
                        {
                            item.submenu?.map((items, index) => {
                                    if (!items.isPrivate) {
                                        return (
                                            <SubMenuItem key={index} isLastChild={item.submenu.length === index + 1}
                                                         items={items}/>
                                        )
                                    } else if (items.isPrivate && userData) {
                                        return (
                                            <SubMenuItem key={index} isLastChild={item.submenu.length === index + 1}
                                                         items={items}/>
                                        )
                                    }
                                }
                            )
                        }
                    </MenuList>
                </Paper>
            </Fade>
        </Box>
    )
}