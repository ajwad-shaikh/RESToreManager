import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper/dist';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const app = express();
const main = express();

app.use(cors());

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/api/v1', app);

const productsCollection = 'products';

export const webApi = functions.https.onRequest(main);

interface Product {
  productName: String;
  brandName: String;
  images: String[];
  categories: String[];
}

// Add new product
app.post('/products', async (req, res) => {
  try {
    const product: Product = {
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
        'Product should only contains productName, brandName, images and categories!!!',
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

// View all products
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

// Query products by category
app.get('/categories/:categoryName', (req, res) => {
  const categoryQuery = [
    ['categories', 'array-contains', req.params.categoryName],
  ];
  firebaseHelper.firestore
    .queryData(db, productsCollection, categoryQuery)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(`Cannot find products: ${error}`));
});

export { app };
