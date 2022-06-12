import {EventEmitter} from 'events'
import {useEffect, useState} from "react";

class Basket extends EventEmitter {
    _basket = {};

    get items() {
        return this._basket;
    }

    addItem(product) {
        if (this.items[product.id]) {
            this.items[product.id].quantity++;
        } else {
            this.items[product.id] = {
                quantity: 1,
                product,
            };
        }

        this.emit('added', product);
        this.emit('changed', this.items);
    }

    removeItem(product) {
        if (typeof product === "object" && product.hasOwnProperty('id')) {
            product = product.id;
        }

        delete this.items[product];

        this.emit('removed', product);
        this.emit('changed', this.items);
    }

    setQuantity(productId, quantity) {
        if (!this.items[productId]) {
            return;
        }

        if (quantity === '') {
            this.items[productId].quantity = quantity;
            this.emit('changed', this.items);
        } else if (quantity < 1) {
            this.removeItem(productId);
        } else {
            let amount = parseInt(quantity);
            if (isNaN(amount)) {
                amount = 1;
            }

            this.items[productId].quantity = Math.min(amount, 99);
            this.emit('changed', this.items);
        }
    }
}

const basketService = new Basket();

export const useBasket = () => {
    const [basket, setBasket] = useState({});

    useEffect(() => {
        const update = (items) => {
            setBasket({...items});
        }

        basketService.on('changed', update);

        return () => basketService.removeListener('changed', update);
    });

    return [basket];
}

export default basketService;
