const express	=	require('express'),
  bodyParser = require('body-parser'),
  multer =	require('multer'),
  app	=	express(),
  storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  }),
  upload = multer({ storage : storage}).single('files'),
  path = require('path');

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://runner.telerik.io");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(function(req, res, next){
  let accept = req.accepts('html', 'json', 'xml'),
    ext = path.extname(req.path);

  if(req.path.startsWith('/uploads/')){
    res.sendFile(req.path);
  }

  if(accept !== 'html' || ext !== '' || req.path.startsWith('/api/')) {
    return next();
  }

  res.sendFile(path.join(__dirname, 'dist') + '/index.html');
});

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/file',function(req, res){
  console.log(req.file);
	upload(req, res, function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}

    return res.send('http://localhost:3000/uploads/' + res.req.file.filename);
	});
});

app.post('/api/form', function(req, res){
	return res.send({
    username: req.body.userName,
    url: req.body.fileUrl,
    fileUid: req.body.fileUid
  });
});

app.listen(3000, function(){
    console.log("Working on port 3000");
});
