export class Orders {

  customer: {
    fullName: string,
    phone: string,
    email: string,
    address: {
      county: string,
      city: string,
      ZIP: string,
      street: string,
      houseNumber: string,
      extra: string

    }
  }
  shippingOption: string;

  constructor(fullName,phone,email,county,city,ZIP,street,houseNumber,extra,shippingOption) {
    this.customer.fullName = fullName;
    this.customer.phone = phone;
    this.customer.email = email;
    this.customer.address.county = county;
    this.customer.address.city = city;
    this.customer.address.ZIP = ZIP;
    this.customer.address.houseNumber = houseNumber;
    this.customer.address.extra = extra;
    this.shippingOption = shippingOption;
  }
}
