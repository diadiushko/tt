import { Product } from '../models/product';
import { OrderDocType } from '../models/order';
import logger from '../../utils/logger';

export function updateProductsQuantities(products: OrderDocType['products'], shouldIncrease: boolean): Array<Promise<unknown>> {
    const productQuantities = new Map<string, number>();
    for (const { product_id, quantity } of products) {
        const stringId = product_id.toString();
        const previousQuantity = productQuantities.get(stringId) ?? 0;
        productQuantities.set(stringId, quantity + previousQuantity);
    }
    const multiplier = shouldIncrease ? 1 : -1;
    return [...productQuantities.entries()].map(async ([product_id, quantity]) => {
        await Product.findByIdAndUpdate(product_id, { $inc: { quantity: multiplier * quantity } }, { runValidators: true });
        logger.info(`Quantity was changed by ${multiplier * quantity} for product ${product_id}`);
    });
}
