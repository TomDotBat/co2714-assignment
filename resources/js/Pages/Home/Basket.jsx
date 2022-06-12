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
            open={basketKeys.length !== 0}
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
