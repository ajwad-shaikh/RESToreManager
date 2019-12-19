import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper/dist';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

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

// Add new contact
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
    res.status(201).send(`Created a new contact: ${newDoc.id}`);
  } catch (error) {
    res
      .status(400)
      .send(`Contact should only contains firstName, lastName and email!!!`);
  }
});

// Update new contact
app.patch('/products/:productId', async (req, res) => {
  const updatedDoc = await firebaseHelper.firestore.updateDocument(
    db,
    productsCollection,
    req.params.productId,
    req.body,
  );
  res.status(204).send(`Update a new contact: ${updatedDoc}`);
});

// View a contact
app.get('/products/:productId', (req, res) => {
  firebaseHelper.firestore
    .getDocument(db, productsCollection, req.params.productId)
    .then(doc => res.status(200).send(doc))
    .catch(error => res.status(400).send(`Cannot get contact: ${error}`));
});

// View all contacts
app.get('/products', (req, res) => {
  firebaseHelper.firestore
    .backup(db, productsCollection)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(400).send(`Cannot get products: ${error}`));
});

// Delete a contact
app.delete('/products/:productId', async (req, res) => {
  const deletedProduct = await firebaseHelper.firestore.deleteDocument(
    db,
    productsCollection,
    req.params.productId,
  );
  res.status(204).send(`Contact is deleted: ${deletedProduct}`);
});

export { app };
