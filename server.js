// const { createServer } = require('http');
const express = require("express");
const next = require('next');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer'); // "^1.3.0"
const multerS3 = require('multer-s3'); //"^2.7.0"

aws.config.update({
  secretAccessKey: 'Y51oH9TGdGybJvQ1/b9Dy7D7+TDTTda4gw+AvkBd',
  accessKeyId: 'AKIAJQOZDYBUDU7KMKZA',
  region: 'ap-southeast-2'
});

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  conf: {
    webpack: config => {
      config.devtool = false;
  
      for (const r of config.module.rules) {
        if (r.loader === 'babel-loader') {
          r.options.sourceMaps = false;
        }
      }

      return config;
    }
  }
});



const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();
  console.log ("next prepared now setup express")
  const s3 = new aws.S3();
  console.log("new s3 object")
  const upload = multer({
      storage: multerS3({
          s3: s3,
          acl: 'public-read',
          bucket: 'blockchain-images',
          key: function (req, file, cb) {
              console.log(file);
              req.dvt = "add on dvt"
              cb(null, file.originalname); //use Date.now() for unique file keys
          }
      })
  });

  server.get('/test', (request, response) => {
    console.log("test get api post call");
    return response.end("we made it")
  });

  // server.post('/test-upload', upload.array('upl',1), (req, res, next) => {
  //     console.log("post route detected - upload")
  //     console.log("req dvt is " + req.dvt)
  //     console.log("files are " + req.files)
     
  //     console.log ("uploaded ...")
  //     res.send("Uploaded!");
  // });

  const singleUpload = upload.single('upl')

  server.post('/test-upload', (req, res, next) => {
    console.log("post route detected - upload")
    console.log("req dvt is " + req.dvt)

    singleUpload(req, res, function(err, some) {
      console.log("some is")
      console.log(some)
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
      }

      return res.json({'imageUrl': req.file.location});
    });
    
});

  // server.post('/test-upload', (request, response) => {
  //   console.log("test upload api post call");
  //   return response.end("we made it")
  // });

  server.get('*', (req, res) => {
    return handler(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })

 });
