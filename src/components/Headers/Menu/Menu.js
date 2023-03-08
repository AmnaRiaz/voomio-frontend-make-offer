import {Favorite, GridView} from "@mui/icons-material"
import ImageIcon from '@mui/icons-material/Image';
import { Typography } from "@mui/material";
import { SubMenu } from "./SubMenu";

export const MenuBar = ({ onpush }) => {
  const MenuList = [
    {
      title: "Explore",
      navlink: "/explore",
      submenu:
        [
          {
            image: <GridView />, title: "All Collections", navlink: "/explore", isPrivate: false
          },
          {
            image: <ImageIcon />, title: "All Nfts", navlink: "/nfts", isPrivate: false
          },
          {
            image: <Favorite />, title: "Favorites", navlink: "/settings/favorited", isPrivate: true
          }
        ]
    },
    { title: "Sell", navlink: "/sell" },
    {
      title: "Create", navlink: "/create", auth: true, submenu: [
        {
          image: <GridView />, title: "Create Collection", navlink: "/create-collection"
        },
        {
          image: <ImageIcon />, title: "Create Nft", navlink: "/create"
        },
        {
          image: <ImageIcon />, title: "Beta Collection minting", navlink: "/beta-collection-minting"
        }
      ]
    },
    { title: "Ranking", navlink: "/ranking" },
  ]

  return (
    <>
      {
        MenuList.map((item, i) => {
          if (item.title === 'Explore' || item.title === 'Create') {
            return <SubMenu item={item} onpush={onpush} />
          }
          else {
            return (
              <Typography key={i} sx={{ cursor: "pointer" }} onClick={() => onpush(item)} variant="h2">{item.title}</Typography>
            )
          }
        })
      }
    </>
  )
}