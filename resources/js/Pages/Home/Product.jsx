import Typography from "@mui/material/Typography";
import {Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import {useRef} from "react";
import price from "../../Services/price";
import Basket from "../../Services/Basket";
import {InertiaLink, usePage} from "@inertiajs/inertia-react";

export default function Product({card}) {
    const img = useRef();
    const user = usePage().props.auth.user;

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card
                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            >
                <CardMedia
                    ref={img}
                    component="img"
                    image={`/storage/products/${card.id}`}
                    alt=""
                    onError={() => {
                        img.current.src = '/images/fallback.svg';
                    }}
                />

                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {card.title}
                    </Typography>

                    {
                        card.description && (
                            <Typography>
                                {card.description}
                            </Typography>
                        )
                    }
                </CardContent>

                <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Typography sx={{fontWeight: 600, fontSize: 15}}>
                        {price(card.price)}
                    </Typography>
                    {!!user && (
                        <Button size="small" onClick={() => Basket.addItem(card)}>
                            Add to cart
                        </Button>
                    )}
                    {!user && (
                        <Button component={InertiaLink} size="small" href="/login">
                            Login
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
}
