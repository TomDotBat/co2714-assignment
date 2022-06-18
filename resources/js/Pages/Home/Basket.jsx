import { Inertia } from '@inertiajs/inertia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Box, Drawer, ListItem, TextField } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Delete } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import BasketService, { useBasket } from '../../Services/Basket';
import IconButton from '@mui/material/IconButton';
import price from '../../Services/price';
import productTypeIcon from '../../Services/productTypeIcon';

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

    const handleCheckout = () => {
        Inertia.post('/checkout', {
            products: basketKeys.map(key => ({
                id: parseInt(key),
                quantity: basket[key].quantity
            })),
        });
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
                    height: 'calc(100% - 64px)',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
            variant="persistent"
            anchor="right"
            open={props.userVisibility && basketKeys.length !== 0}
        >
            <Toolbar>
                Basket
            </Toolbar>

            <Divider />

            <List sx={{
                flex: '1 1 0%',
            }}>
                {basketKeys.map((key) => (
                    <ListItem key={key}>
                        <ListItemIcon sx={{
                            minWidth: 36,
                        }}>
                            {productTypeIcon(basket[key].product)}
                        </ListItemIcon>

                        <TextField
                            sx={{
                                width: 62,
                                marginRight: 1.5,
                                '& input': {
                                    padding: '5px 10px',
                                },
                            }}
                            size="small"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            value={basket[key].quantity}
                            onChange={(e) => {
                                handleQuantityChange(key, e.target.value)
                            }}
                            type="number"
                        />

                        <ListItemText primary={basket[key].product.title} secondary={price(basket[key].product.price)} />

                        <IconButton onClick={() => handleProductRemoval(basket[key].product)}>
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            <Divider />

            <Box sx={{
                margin: 1.5
            }}>
                <Grid container>

                    <Button onClick={handleCheckout} variant="contained">
                        Checkout
                    </Button>
                    <Typography sx={{
                        ml: 'auto',
                        my: 'auto',
                    }}>
                        Total: {price(BasketService.totalPrice)}
                    </Typography>
                </Grid>
            </Box>
        </Drawer>
    )
}
