import { TextField, Select, MenuItem, Stack, Button, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { styles } from "/src/assets/theme/views/nftgenerator/create"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAllCollection } from "../../redux/actions/main"
import { notification } from "../../utils/utility"
import componentStyles from "/src/assets/theme/views/nftgenerator/upload"
import { makeStyles } from "@mui/styles"
import { useNavigate } from "react-router-dom"

const CreateCmp = (props) => {
    const useStyles = makeStyles(componentStyles)
    const classes = useStyles()
    const navigate = useNavigate()

    const userData = useSelector(state => state.user)

    const { newNftItem, setNewNftItem } = props
    const [collections, setCollections] = useState([])
    const [collectionId, setCollectionId] = useState(0)

    const onChangeItem = (value, type) => {
        setNewNftItem({ ...newNftItem, [type]: value })
    }

    const createCollection = () => {
        navigate("/create-collection")
    }


    const onChangeCollection = (collectionId) => {
        const collection = collections.find((c) => c._id === collectionId);
        setNewNftItem({
            ...newNftItem,
            collectionId,
            collectionAddress: collection.collectionAddress,
            tokenId: collection.tokenCount
        })
        setCollectionId(collectionId)
    }

    useEffect(() => {
        (async () => {
            const result = await getAllCollection({
                query: {
                    createdBy: userData?.user?._id || '',
                    blockchain: newNftItem.blockchain
                }
            });
            if (result.message) {
                notification(result.message);
                return;
            }
            if (result.collections.length > 0) {
                setCollections(result.collections)
                setNewNftItem({
                    ...newNftItem,
                    collectionId: result.collections[0]._id,
                    collectionAddress: result.collections[0].collectionAddress,
                    tokenId: result.collections[0].tokenCount
                })
                setCollectionId(result.collections[0]._id)
            }
        })();
    }, [])

    return (
        <Grid sx={styles.createSection} container>
            <Grid sx={styles.properties} item xs={12}>
                <Box mb={3} sx={styles.formControl}>
                    <Box mb={1} component={"label"} display="flex">Name <Box sx={{ color: "red" }}>*</Box></Box>
                    <TextField value={newNftItem.name} onChange={(e) => { onChangeItem(e.target.value, "name") }} sx={styles.formTextField} placeholder="Item name" variant="outlined" />
                </Box>
                <Box mb={3} sx={styles.formControl}>
                    <Box mb={1} component={"label"}>External link</Box>
                    <TextField value={newNftItem.link} onChange={(e) => { onChangeItem(e.target.value, "website") }} sx={styles.formTextField} placeholder="https://yoursite.io/item/123" variant="outlined" />
                </Box>
                <Box mb={3} sx={styles.formControl}>
                    <Box mb={1} component={"label"}>Description</Box>
                    <TextField value={newNftItem.description} onChange={(e) => { onChangeItem(e.target.value, "description") }} sx={styles.formTextField} multiline rows={3} placeholder="Provide a detailed description of your item" variant="outlined" />
                </Box>
                <Box mb={3} sx={styles.formControl}>
                    <Box mb={1} component={"label"}>Royalty Percentage</Box>
                    <TextField type="number" value={newNftItem.royaltyPercentage} onChange={(e) => { onChangeItem(e.target.value, "royaltyPercentage") }} sx={styles.formTextField} placeholder="%" variant="outlined" />
                </Box>
                <Box mb={3} sx={styles.formControl}>
                    <Box mb={1} component={"label"} display="flex">Collection<Box sx={{ color: "red" }}>*</Box></Box>
                    <Grid container display={"flex"} flexDirection={"row"} alignItems="center">
                        <Grid item xs={8}>
                            <Select
                                value={collectionId}
                                displayEmpty
                                onChange={(e) => { onChangeCollection(e.target.value) }}
                                sx={styles.selectButton}
                            >
                                {collections.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                                    )
                                })}
                            </Select>

                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={() => createCollection()} variant="outlined">
                                Create Collection
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}

export default CreateCmp