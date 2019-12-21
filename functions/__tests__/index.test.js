const request = require('supertest');
const { app } = require('../lib/index');

let createdProductId = '';

describe('POST /products', () => {
  test('should ok when sending productName, brandName, images and categories', () => {
    request(app)
      .post('/products')
      .send({
        productName: 'Instant Noodles',
        brandName: 'Maggi',
        images: [
          'https://images-na.ssl-images-amazon.com/images/I/81JI5O0qB5L._SX679_.jpg',
          'https://www.maggi.in/sites/default/files/2019-09/tak-banner.jpg',
          'https://images-na.ssl-images-amazon.com/images/I/71OPa99tUPL._SL1461_.jpg',
        ],
        categories: ['food', 'noodles', 'ready-to-eat'],
      })
      .expect(201)
      .end(function(err, res) {
        expect(result.startsWith('Created a new product: ')).toBeTruthy();
        createdProductId = result.split('Created a new product: ')[1];
        if (err) throw err;
      });
  });
  test('should throw when sending incorrect body', () => {
    request(app)
      .post('/products')
      .send({
        productName: 'Instant Noodles',
        brandName: 'Maggi',
        images: [
          'https://images-na.ssl-images-amazon.com/images/I/81JI5O0qB5L._SX679_.jpg',
          'https://www.maggi.in/sites/default/files/2019-09/tak-banner.jpg',
          'https://images-na.ssl-images-amazon.com/images/I/71OPa99tUPL._SL1461_.jpg',
        ],
        flavors: ['food', 'noodles', 'ready-to-eat'],
      })
      .expect(400)
      .end(function(err, res) {
        expect(res.text).toBe(
          'Product should only contains productName, brandName, images and categories!!!',
        );
        if (err) throw err;
      });
  });
});

describe('PATCH /products/:productId', () => {
  test('should patch ok', () => {
    request(app)
      .patch(`/products/${createdProductId}`)
      .send({
        productName: 'Instant Noodles',
        brandName: 'Yippee',
        images: [
          'https://images-na.ssl-images-amazon.com/images/I/81JI5O0qB5L._SX679_.jpg',
          'https://www.maggi.in/sites/default/files/2019-09/tak-banner.jpg',
          'https://images-na.ssl-images-amazon.com/images/I/71OPa99tUPL._SL1461_.jpg',
        ],
        categories: ['food', 'noodles', 'ready-to-eat'],
      })
      .expect(204)
      .end(function(err, res) {
        expect(res.text).toBe(`Update a new product: ${createdProductId}`);
        if (err) throw err;
      });
  });
});

describe('GET /products/:productId', () => {
  test('should get ok', () => {
    request(app)
      .get(`/products/${createdProductId}`)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).toMatchObject({
          productName: 'Instant Noodles',
          brandName: 'Yippee',
          images: [
            'https://images-na.ssl-images-amazon.com/images/I/81JI5O0qB5L._SX679_.jpg',
            'https://www.maggi.in/sites/default/files/2019-09/tak-banner.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71OPa99tUPL._SL1461_.jpg',
          ],
          categories: ['food', 'noodles', 'ready-to-eat'],
        });
        if (err) throw err;
      });
  });
  test('should 400 if not existed', () => {
    request(app)
      .get('/products/12345678')
      .expect(400)
      .end(function(err, res) {
        expect(res.text.startsWith('Cannot get product: ')).toBeTruthy();
        if (err) throw err;
      });
  });
});

describe('GET /categories/:categoryName', () => {
  test('should fetch category ok', () => {
    request(app)
      .get(`categories/ready-to-eat`)
      .expect(200);
  });
});

describe('DELETE /products/:productId', () => {
  test('should delete ok', () => {
    request(app)
      .delete(`/products/${createdProductId}`)
      .expect(204)
      .end(function(err, res) {
        expect(res.text).toBe(`Product is deleted: ${createdProductId}`);
        if (err) throw err;
      });
  });
});
