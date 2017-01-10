const express	=	require("express"),
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
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(function(req, res, next){
  let accept = req.accepts('html', 'json', 'xml'),
    ext = path.extname(req.path);

  if(accept !== 'html' || ext !== '' || req.path.startsWith('/api/')) {
    return next();
  }

  res.sendFile(path.join(__dirname, 'dist') + '/index.html');
});

app.post('/api/file',function(req, res){
	upload(req, res, function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}

		res.end("File is uploaded");
	});
});

app.listen(3000, function(){
    console.log("Working on port 3000");
});
