/* const firebase = require('firebase/app');
const firestore = require('firebase/firestore');
const storage = require('firebase/storage'); */
require('dotenv').config();
require('firebase/firestore');
const express = require('express');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const database = require('@adminjs/firebase').default;
require('@adminjs/firebase/build/resource-type/firestore')
require('@adminjs/firebase/build/database-type/firestore')
const firebase = require('firebase');



const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENR_ID
};
  
firebase.initializeApp(firebaseConfig);
  

const PORT = 3000;
const app = express();


const start = async () => {
    
    const app = express()
  
    const admin = new AdminJS({})
  
    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)
  
    app.listen(PORT, () => {
      console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}
  
AdminJS.registerAdapter(database);
  

const setupAdmin = async expressApp => {
  
  const adminJS = new AdminJS({
    branding: {
      articleTitle: 'Firebase example',
    },
    resources: [
      {
        collection: firebase.firestore().collection('Articles'),
        schema: {
          title: 'string',
          content: 'string',
          published: 'boolean',
          createdAt: 'date',
          updatedAt: 'date',
          image: {
            type: 'url',
          },
        },
      }
    ]
  })
  const router = await AdminJSExpress.buildRouter(adminJS);
  app.use(AdminJS.options.rootPath, router);
}
start();
setupAdmin(app);