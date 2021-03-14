const Moltin = moltin.gateway({
  client_id: 'bQU1aPuJDtuM8P0XmUiBQ4RRNlsblf4FXmYzr32ONt'
});

const products = Moltin.Products.All().then((products) => {
  console.log(products);
});
