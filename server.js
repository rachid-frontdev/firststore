const express = require('express'),
      path = require('path'),
      app = express();
app.listen('3000', () => {
  console.log('server run')
});
app.use(express.static(path.join(__dirname, 'folder')));
app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});
