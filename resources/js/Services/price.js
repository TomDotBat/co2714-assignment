export default function price(value) {
    return new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
    }).format(value);
}
