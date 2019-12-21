# RESTock Manager

### A RESTful API for managing product catalogs with CRUD and filter search features

#### Tech Stack - Node.js + Firebase Hosting + Firestore + Cloud Functions

The main aim was to create a REST API in a serverless environment. Firebase has a number of tools to help us in achieving the same.

### To make it easier to interact with the API and see results, a Dashboard has been hosted on [https://restockmanager.firebaseapp.com](https://restockmanager.firebaseapp.com)

- **Firebase Hosting** - Since any API needs a home address to receive calls, we need Firebase Hosting to host our function. Our functions are hosted at [https://restockmanager.firebaseapp.com/api/v1](https://restockmanager.firebaseapp.com/api/v1). The Hosting was also used to host a React App as a frontend dashboard to interact with the API.
- **Firestore** - Our API will be interacting with a database, so we choose Firestore, a smooth, powerful. no-nonsense, NoSQL database.
- **Cloud Functions** - The Firebase Cloud Function is a platform to host microservices. This will essentially handle all the logic and functionality that makes up the API.
- **Node.js** - Cloud Functions support a number of frameworks including Node.js and Python flask. We choose Node.js because of familiarity and support for it.

#### Host URL for API - [https://restockmanager.firebaseapp.com/api/v1/](https://restockmanager.firebaseapp.com/api/v1/)

## API Functions

- ### `POST /products` | Add products to catalog

  - Request body should contain **four** parameters.
    - **productName** | String - Name of the Product _e.g. - "Instant Noodles"_
    - **brandName** | String - Name of the Brand _e.g. - "Nestle Maggi"_
    - **images** | String Array - List of URLs to represent the Product
    - **categories** | String Array - List of categories that the product can be categorised in \*e.g. - ["food", "ready-to-eat"]
  - Sample Request

  ```
  POST /api/v1/products HTTP/1.1
  Host: restockmanager.firebaseapp.com
  Content-Type: application/json

  {
  "brandName": "Maggi",
  "categories": ["ready-to-eat", "food"],
  "productName": "Instant Noodles",
  "images": [
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Grofers-Logo-orange.png",
      "https://d1zx4fn8ox8446.cloudfront.net/filemanager.rboxfile/778326a1192f4fab897fbf14ebcb3b8c/Logo_Edge-2-Edge.png",
      "https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwio3J2RscHmAhUu4XMBHXPLDKIQjRx6BAgBEAQ&url=https%3A%2F%2Fcashkaro.com%2Fblog%2Fsave-upto-100-on-your-grocery-shopping%2F88251&psig=AOvVaw21VpzfMY4z0p9QjVH-0K7p&ust=1576833575002795"
  ]
  }

  ```

  - Sample Response with Product Id

  ```
  Created a new product: ZCZkLU7yu9oMFyJAGPAN
  ```

- ### `PATCH /products/:productId` | Update products in the catalog

  - Request body should contain **four** parameters.
    - **productName** | String - Name of the Product _e.g. - "Instant Noodles"_
    - **brandName** | String - Name of the Brand _e.g. - "Nestle Atta Maggi"_
    - **images** | String Array - List of URLs to represent the Product
    - **categories** | String Array - List of categories that the product can be categorised in \*e.g. - ["food", "ready-to-eat"]
  - Sample Request

  ```
  PATCH /api/v1/products HTTP/1.1
  Host: restockmanager.firebaseapp.com
  Content-Type: application/json

  {
  "brandName": "Atta Maggi",
  "categories": ["ready-to-eat", "food"],
  "productName": "Instant Noodles",
  "images": [
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Grofers-Logo-orange.png",
      "https://d1zx4fn8ox8446.cloudfront.net/filemanager.rboxfile/778326a1192f4fab897fbf14ebcb3b8c/Logo_Edge-2-Edge.png",
      "https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwio3J2RscHmAhUu4XMBHXPLDKIQjRx6BAgBEAQ&url=https%3A%2F%2Fcashkaro.com%2Fblog%2Fsave-upto-100-on-your-grocery-shopping%2F88251&psig=AOvVaw21VpzfMY4z0p9QjVH-0K7p&ust=1576833575002795"
  ]
  }

  ```

  - Sample Response with Product Id

  ```
  Update a new product: : ZCZkLU7yu9oMFyJAGPAN
  ```

- ### `GET /products/:productId` | Get/Read a product in the catalog with product Id
  - The GET Request should be made with the productId appended
  - Sample Request
  ```
  GET /api/v1/products/ZCZkLU7yu9oMFyJAGPAN HTTP/1.1
  Host: restockmanager.firebaseapp.com
  ```
  - Sample Response with Product Id
  ```
  {
      "brandName": "Atta Maggi",
      "categories": ["ready-to-eat", "food"],
      "productName": "Instant Noodles",
      "images": ["https://upload.wikimedia.org/wikipedia/commons/7/70/Grofers-Logo-orange.png", "https://d1zx4fn8ox8446.cloudfront.net/filemanager.rboxfile/778326a1192f4fab897fbf14ebcb3b8c/Logo_Edge-2-Edge.png", "https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwio3J2RscHmAhUu4XMBHXPLDKIQjRx6BAgBEAQ&url=https%3A%2F%2Fcashkaro.com%2Fblog%2Fsave-upto-100-on-your-grocery-shopping%2F88251&psig=AOvVaw21VpzfMY4z0p9QjVH-0K7p&ust=1576833575002795"]
  }
  ```
- ### `GET /products` | Get/Read the entire catalog
  - The GET Request should be made as it is
  - Sample Request
  ```
  GET /api/v1/products
  HTTP/1.1
  Host: restockmanager.firebaseapp.com
  ```
  - Sample Response with Product Id
  ```
  {
    "products": {
        "FUR6hXyzUuQKiAGTuC0u": {
            "images": ["https://upload.wikimedia.org/wikipedia/commons/7/70/Grofers-Logo-orange.png", "https://d1zx4fn8ox8446.cloudfront.net/filemanager.rboxfile/778326a1192f4fab897fbf14ebcb3b8c/Logo_Edge-2-Edge.png", "https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwio3J2RscHmAhUu4XMBHXPLDKIQjRx6BAgBEAQ&url=https%3A%2F%2Fcashkaro.com%2Fblog%2Fsave-upto-100-on-your-grocery-shopping%2F88251&psig=AOvVaw21VpzfMY4z0p9QjVH-0K7p&ust=1576833575002795"],
            "brandName": "Sunfeast Yippee",
            "categories": ["health", "food"],
            "productName": "Instant Noodles"
        },
        "QQo1FNQRvMDavw8mPfhR": {
            "images": ["https://upload.wikimedia.org/wikipedia/commons/7/70/Grofers-Logo-orange.png", "https://d1zx4fn8ox8446.cloudfront.net/filemanager.rboxfile/778326a1192f4fab897fbf14ebcb3b8c/Logo_Edge-2-Edge.png", "https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwio3J2RscHmAhUu4XMBHXPLDKIQjRx6BAgBEAQ&url=https%3A%2F%2Fcashkaro.com%2Fblog%2Fsave-upto-100-on-your-grocery-shopping%2F88251&psig=AOvVaw21VpzfMY4z0p9QjVH-0K7p&ust=1576833575002795"],
            "brandName": "Maggi",
            "categories": ["health", "nutrition", "food"],
            "productName": "Instant Noodles"
        },
        "ZCZkLU7yu9oMFyJAGPAN": {
            "brandName": "Maggi",
            "categories": ["ready-to-eat", "food"],
            "productName": "Instant Noodles",
            "images": ["https://upload.wikimedia.org/wikipedia/commons/7/70/Grofers-Logo-orange.png", "https://d1zx4fn8ox8446.cloudfront.net/filemanager.rboxfile/778326a1192f4fab897fbf14ebcb3b8c/Logo_Edge-2-Edge.png", "https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwio3J2RscHmAhUu4XMBHXPLDKIQjRx6BAgBEAQ&url=https%3A%2F%2Fcashkaro.com%2Fblog%2Fsave-upto-100-on-your-grocery-shopping%2F88251&psig=AOvVaw21VpzfMY4z0p9QjVH-0K7p&ust=1576833575002795"]
        }
    }
  }
  ```
- ### `DELETE /products/:productId` | Delete a product in the catalog with product Id
  - The Delete Request should be made with the productId appended
  - Sample Request
  ```
  DELETE /api/v1/products/ZCZkLU7yu9oMFyJAGPAN HTTP/1.1
  Host: restockmanager.firebaseapp.com
  ```
  - Sample Response
  ```
  Product is deleted
  ```
- ### `GET /categories/:categoryName` | Get products in a category (Search Filter)
  - The GET Request should be made with the categoryName appended
  - Sample Request
  ```
  GET /api/v1/categories/ready-to-eat HTTP/1.1
  Host: restockmanager.firebaseapp.com
  ```
  - Sample Response with Product Id
  ```
  {
      "QQo1FNQRvMDavw8mPfhR": {
          "brandName": "Maggi",
          "categories": ["health", "ready-to-eat", "food"],
          "productName": "Instant Noodles",
          "images": ["https://upload.wikimedia.org/wikipedia/commons/7/70/Grofers-Logo-orange.png", "https://d1zx4fn8ox8446.cloudfront.net/filemanager.rboxfile/778326a1192f4fab897fbf14ebcb3b8c/Logo_Edge-2-Edge.png", "https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwio3J2RscHmAhUu4XMBHXPLDKIQjRx6BAgBEAQ&url=https%3A%2F%2Fcashkaro.com%2Fblog%2Fsave-upto-100-on-your-grocery-shopping%2F88251&psig=AOvVaw21VpzfMY4z0p9QjVH-0K7p&ust=1576833575002795"]
      }
  }
  ```

## Requirements

[NodeJS](https://nodejs.org/en/)

You will need a Firebase project and Firebase tools cli

```
npm install -g firebase-tools
```

## Getting Started

### Clone this repository

```
git clone https://github.com/ajwad-shaikh/RESToreManager
```

You need to change the Firebase project name in _.firebaserc_ file.

After that, you can log in to Firebase in the terminal

```
firebase login
```

### Deploy to Firebase

For the first time, you have deploy the hosting and functions together

```
firebase deploy
```

After that, you just need to deploy functions only

```
firebase deploy --only functions
```

## Testing

Testing has been incorporated with [jest](https://jestjs.io/) and tests are written in the `__tests__` directory.

Note - `FIREBASE_CONFIG` environment variable needs to be set before testing to not cause failure.

#### Made with :heart: for Open Source!
