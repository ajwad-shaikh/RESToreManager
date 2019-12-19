'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');
const express = require('express');
const bodyParser = require('body-parser');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
exports.app = app;
const main = express();
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/api/v1', app);
const productsCollection = 'products';
exports.webApi = functions.https.onRequest(main);
// Add new product
app.post('/products', async (req, res) => {
  try {
    const product = {
      productName: req.body['productName'],
      brandName: req.body['brandName'],
      images: req.body['images'],
      categories: req.body['categories'],
    };
    const newDoc = await firebaseHelper.firestore.createNewDocument(
      db,
      productsCollection,
      product,
    );
    res.status(201).send(`Created a new product: ${newDoc.id}`);
  } catch (error) {
    res
      .status(400)
      .send(
        `Product should only contains brandName, productName, images and categories!!!`,
      );
  }
});
// Update new product
app.patch('/products/:productId', async (req, res) => {
  const updatedDoc = await firebaseHelper.firestore.updateDocument(
    db,
    productsCollection,
    req.params.productId,
    req.body,
  );
  res.status(204).send(`Update a new product: ${updatedDoc}`);
});
// View a product
app.get('/products/:productId', (req, res) => {
  firebaseHelper.firestore
    .getDocument(db, productsCollection, req.params.productId)
    .then(doc => res.status(200).send(doc))
    .catch(error => res.status(400).send(`Cannot get product: ${error}`));
});
// View all product
app.get('/products', (req, res) => {
  firebaseHelper.firestore
    .backup(db, productsCollection)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(`Cannot get products: ${error}`));
});
// Delete a product
app.delete('/products/:productId', async (req, res) => {
  const deletedProduct = await firebaseHelper.firestore.deleteDocument(
    db,
    productsCollection,
    req.params.productId,
  );
  res.status(204).send(`Product is deleted: ${deletedProduct}`);
});
//# sourceMappingURL=index.js.map
