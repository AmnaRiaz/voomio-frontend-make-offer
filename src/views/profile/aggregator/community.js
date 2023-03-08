import React, { useState } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
// core components
import componentStyles from "/src/assets/theme/views/profile/aggregatorcommunity"
import { Box, Stack } from "@mui/system"
import { Accordion, AccordionSummary, Avatar, Button, Card, CardContent, CardHeader, Checkbox, InputBase, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
// icon 
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Messageboth from "/src/assets/image/views/profile/explore/messageboth.svg"
import NFTcheck from "/src/assets/image/views/profile/collection/NFTcheck.svg"
import MonkeyNFT from "/src/assets/image/views/profile/collection/monkeyNFT.svg"


const useStyles = makeStyles(componentStyles)
const Profile = () => {
    const classes = useStyles()

    const [threadadd, setThreadadd] = useState(true)

    const threadChange = () => {
        setThreadadd(!threadadd)
    }

    const [chatadd, setChatadd] = useState(true)

    const chataddChange = () => {
        setChatadd(!chatadd)
    }

    return (
        <React.Fragment>
            <Stack className={classes.communityhead}>
                <Stack>
                    <Stack>
                        <Accordion className={classes.collectionhead} >
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                onClick={chataddChange}
                            >
                                <Stack direction={"row"} gap={1} className={classes.nabarhead} justifyContent={"space-around"} alignItems={"center"}>
                                    <Typography className={classes.nfttraits} >Collection Chat</Typography>
                                    {chatadd ? <AddIcon className={classes.nftaddicon} /> : <RemoveIcon className={classes.nftaddicon} />}
                                </Stack>
                            </AccordionSummary>
                            <Stack direction={"row"} className={classes.bgcolorcard} gap={3} alignItems={"center"}>
                                <Stack alignItems={"center"}>
                                    <ArrowDropUpIcon className={classes.maxnum} />
                                    <Typography className={classes.pagenum}>5</Typography>
                                    <ArrowDropDownIcon className={classes.minnum} />
                                </Stack>
                                <Stack justifyContent={"flex-start"} gap={3}>
                                    <Stack direction={"row"} gap={3}>
                                        <Typography className={classes.messageid}>@user1234567</Typography>
                                        <Typography className={classes.messagedate}>2 days ago</Typography>
                                    </Stack>
                                    <Typography className={classes.reportdetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget justo nec nisi blandit feugiat. Vestibulum vel ex nec neque varius pharetra.</Typography>
                                    <Stack direction={"row"} gap={2}>
                                        <Stack direction={"row"} gap={1}>
                                            <Box component="img" className={classes.messageboth} src={Messageboth.src} ></Box>
                                            <Typography className={classes.messagemumber} >44 Comments</Typography>
                                        </Stack>
                                        <Stack direction={"row"} gap={1}>
                                            <WarningAmberIcon className={classes.dangericon} />
                                            <Typography className={classes.dangericon}>Report</Typography>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </Stack>
                        </Accordion>
                    </Stack>
                    <Stack>
                        <Accordion className={classes.collectionhead} >
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                onClick={threadChange}
                            >
                                <Stack direction={"row"} gap={1} className={classes.nabarhead} justifyContent={"space-around"} alignItems={"center"}>
                                    <Typography className={classes.nfttraits} >Collection Threads</Typography>
                                    {threadadd ? <AddIcon className={classes.nftaddicon} /> : <RemoveIcon className={classes.nftaddicon} />}
                                </Stack>
                            </AccordionSummary>
                            <Stack gap={5}>
                                <Stack direction={"row"} className={classes.bgcolorcard} gap={3}>
                                    <Stack alignItems={"center"}>
                                        <ArrowDropUpIcon className={classes.maxnum} />
                                        <Typography className={classes.pagenum}>5</Typography>
                                        <ArrowDropDownIcon className={classes.minnum} />
                                    </Stack>
                                    <Stack justifyContent={"flex-start"} gap={3}>
                                        <Stack direction={"row"} gap={3}>
                                            <Typography className={classes.messageid}>@user1234567</Typography>
                                            <Typography className={classes.messagedate}>2 days ago</Typography>
                                        </Stack>
                                        <Typography className={classes.reportdetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget justo nec nisi blandit feugiat. Vestibulum vel ex nec neque varius pharetra.</Typography>
                                        <Stack direction={"row"} gap={2}>
                                            <Stack direction={"row"} gap={1}>
                                                <Box component="img" className={classes.messageboth} src={Messageboth.src} ></Box>
                                                <Typography className={classes.messagemumber} >44 Comments</Typography>
                                            </Stack>
                                            <Stack direction={"row"} gap={1}>
                                                <WarningAmberIcon className={classes.dangericon} />
                                                <Typography className={classes.dangericon}>Report</Typography>
                                            </Stack>
                                        </Stack>

                                    </Stack>
                                </Stack>
                            </Stack>
                        </Accordion>
                    </Stack>
                </Stack>
                <Stack>
                    <List className={classes.filterlist} >
                        <Typography className={classes.nfttraits}>Users online</Typography>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
                            const labelId = `checkbox-list-label-${value}`
                            return (
                                <ListItem
                                    key={value}
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} dense>
                                        <ListItemText id={labelId} primary={<Stack direction={"row"} gap={2}>
                                            <Avatar aria-label="recipe">
                                                <Box component="img" className={classes.cardimggroup} src={MonkeyNFT.src} ></Box>
                                            </Avatar>
                                            <Typography className={classes.NFTtype}>@user123789</Typography>
                                            {value % 3 === 0 && <Box component="img" className={classes.nftcheck} src={NFTcheck.src} ></Box>
                                            }
                                        </Stack>} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Stack>
            </Stack >
        </React.Fragment >
    )
}

export default Profile