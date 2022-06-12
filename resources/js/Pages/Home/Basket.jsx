import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {Drawer, ListItem, SvgIcon, TextField} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Cookie, Delete, Error, LocalDrink, LocalPizza} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import BasketService, {useBasket} from "../../Services/Basket";
import IconButton from "@mui/material/IconButton";

const drawerWidth = 340;

function getProductIcon(product) {
    switch (product.type) {
        case "pizza":
            return <LocalPizza/>
        case "side":
            return <SvgIcon viewBox="0 0 384 512">
                <path
                    d="M368 223.1l-34-.0027c-6.875 0-13.75 4.25-15.25 11c-8.5 39-62 69-126.8 69c-64.62 0-118.1-30-126.8-69C63.75 228.2 56.1 223.1 49.1 223.1l-34 .0027c-4.875 0-9.522 2.281-12.52 6.031C.4768 233.8-.6266 238.7 .3734 243.5l54.13 243.5c3.25 14.63 16.25 25 31.25 25h212.5c14.1 0 28-10.37 31.25-25l54.13-243.5c.1-4.75-.1035-9.716-3.103-13.47C377.5 226.3 372.9 223.1 368 223.1zM287.5 228.1c.5-1.75 1.5-3.25 2.125-4.875l30.12-172.5c1-5.5-.9999-11-5.125-14.63c-4.125-3.75-9.875-5-15.25-3.375l-34.25 10.25c-4.25 1.25-7.125 4.5-9.125 8.25v207.3C273.5 250.1 285.1 238.1 287.5 228.1zM367.5 191.1l16.25-93.26c1-5.5-.1-11-5.125-14.63c-4.125-3.75-9.875-5-15.25-3.375l-17.25 5.125l-18.75 107.3c2.25-.375 4.25-1.125 6.625-1.125H367.5zM223.1 268.7V31.97c0-6-3.375-11.63-8.875-14.25L183.1 1.722C178.3-.7781 172.3-.5281 167.6 2.347C162.9 5.222 160 10.47 160 15.97v252.8C181.1 273.1 202.9 273.1 223.1 268.7zM50 191.1c3.625 0 6.1 1 10.37 1.75L40.38 86.6L20.63 80.73C15.25 79.1 9.504 80.35 5.379 83.98C1.254 87.73-.7458 93.23 .2542 98.73l16.25 93.26H50zM128 258.5V33.1L124.3 13.1c-.1-5.5-4.75-10-9.1-12C109.1-.9031 103.3-.1531 98.88 3.222L70.38 24.85C65.5 28.47 63.13 34.6 64.25 40.6l36.87 197.1C106.5 245.4 115.6 252.6 128 258.5z"/>
            </SvgIcon>
        case "dessert":
            return <Cookie/>
        case "drink":
            return <LocalDrink/>
        default:
            return <Error/>
    }
}

export default function Basket() {
    const [basket] = useBasket();

    const handleQuantityChange = (productId, quantity) => {
        BasketService.setQuantity(productId, quantity);
    }

    const handleProductRemoval = (product) => {
        BasketService.removeItem(product);
    }

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    top: 'auto',
                    bottom: 0,
                    height: 'calc(100% - 68px)',
                },
            }}
            variant="permanent"
            anchor="right"
        >
            <Toolbar>
                Basket
            </Toolbar>

            <Divider/>

            <List>
                {Object.entries(basket).map(([key, item]) => (
                    <ListItem key={key}>
                        <ListItemIcon sx={{
                            minWidth: 36
                        }}>
                            {getProductIcon(item.product)}
                        </ListItemIcon>

                        <TextField
                            sx={{
                                width: 62,
                                marginRight: 1.5,
                                '& input': {
                                    padding: '5px 10px'
                                }
                            }}
                            size="small"
                            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(key, e.target.value ?? 1)}
                            type="number"
                        />

                        <ListItemText primary={item.product.title}/>

                        <IconButton onClick={() => handleProductRemoval(item.product)}>
                            <Delete/>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}