export class Product {
  id: string;
  name: string;
  name_lowercase: string
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  qty: number;

  constructor(id, name, name_lowercase, description = "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
              price = 0, imageUrl ="assets/1.webp", category = "other",qty=1) {

    this.id = id
    this.name = name
    this.name_lowercase = name_lowercase
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
    this.category = category
    this.qty = qty
  }
}
