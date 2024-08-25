export function populateIsDiscounted(data: any | any[]) {
    if (data.length === undefined) {
        return populateOneProductPromotion(data)
    } else {
        return data?.map((item: any) => populateIsDiscounted(item))
    }
}



function populateOneProductPromotion<T>(product: any) {
    if (!product?.promotion?.endDate) return product as T

    const now = new Date()
    const promotionEndDate = new Date(product?.promotion?.endDate);
    const promotionStartDate = new Date(product?.promotion?.startDate);

    const isDiscounted =
        product?.promotion && now < promotionEndDate && now > promotionStartDate;

    const populatedProduct = {
        ...product,
        promotion: {
            isDiscounted,
            ...(product?.promotion ?? {})
        }
    }
    return populatedProduct as T & {
        promotion: {
            isDiscounted: any;
            discountPercentage: any;
            discountedPrice: any;
        }
    }
}