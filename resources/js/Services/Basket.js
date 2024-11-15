import {EventEmitter} from 'events'
import {useEffect, useState} from "react";

class Basket extends EventEmitter {
    _basket = {};
    _itemCount = 0;

    get items() {
        return this._basket;
    }

    get itemCount() {
        return this._itemCount;
    }

    get totalPrice() {
        return Object.values(this.items).reduce((total, item) => (
            total + item.product.price * item.quantity
        ), 0);
    }

    addItem(product) {
        if (this.items[product.id]) {
            this.setQuantity(product.id, this.items[product.id].quantity + 1);
            return;
        }

        this.items[product.id] = {
            quantity: 1,
            product,
        };

        this._itemCount++;

        this.emit('added', product);
        this.emit('changed', this.items);
    }

    removeItem(product) {
        if (typeof product === "object" && product.hasOwnProperty('id')) {
            product = product.id;
        }

        if (this.items[product]) {
            this._itemCount -= this.items[product].quantity;
            delete this.items[product];
        }

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

            const newQuantity = Math.min(amount, 99);
            const product = this.items[productId];

            this._itemCount += newQuantity - product.quantity;
            product.quantity = newQuantity;

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
