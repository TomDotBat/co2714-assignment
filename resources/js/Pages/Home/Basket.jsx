import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {Drawer, ListItem, TextField} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Delete} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import BasketService, {useBasket} from "../../Services/Basket";
import IconButton from "@mui/material/IconButton";
import productTypeIcon from "../../Services/productTypeIcon";

const drawerWidth = 340;

export default function Basket(props) {
    const [basket] = useBasket();

    const handleQuantityChange = (productId, quantity) => {
        BasketService.setQuantity(productId, quantity);
    }

    const handleProductRemoval = (product) => {
        BasketService.removeItem(product);
    }

    const basketKeys = Object.keys(basket);

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
                    height: 'calc(100% - 64px)',
                },
            }}
            variant="persistent"
            anchor="right"
            open={props.userVisibility && basketKeys.length !== 0}
        >
            <Toolbar>
                Basket
            </Toolbar>

            <Divider/>

            <List>
                {basketKeys.map((key) => (
                    <ListItem key={key}>
                        <ListItemIcon sx={{
                            minWidth: 36
                        }}>
                            {productTypeIcon(basket[key].product)}
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
                            value={basket[key].quantity}
                            onChange={(e) => {
                                handleQuantityChange(key, e.target.value)
                            }}
                            type="number"
                        />

                        <ListItemText primary={basket[key].product.title}/>

                        <IconButton onClick={() => handleProductRemoval(basket[key].product)}>
                            <Delete/>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
