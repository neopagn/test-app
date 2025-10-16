export class Product {
    constructor(
        public id: number,
        public code: string,
        public name : string,
        public description: string,
        public image : string,
        public price: number,
        public category: string,
        public quantity: number,
        public inventoryStatus:string,
        public rating:number,
    ){}
}

/*

id: '1029',
        code: 'gwuby345v',
        name: 'Yoga Set',
        description: 'Product Description',
        image: 'yoga-set.jpg',
        price: 200000,
        category: 'Fitness',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 8,
*/