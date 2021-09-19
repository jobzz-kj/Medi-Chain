var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'PharmaChain' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'PharmaChain' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'PharmaChain' });
});

router.get('/customer_home', function (req, res, next) {
  res.render('customer_home', { title: 'PharmaChain' });
});

router.get('/customer_view_products', function (req, res, next) {
  res.render('customer_view_products', { title: 'PharmaChain' });
});

router.get('/manufactor_home', function (req, res, next) {
  res.render('manufactor_home', { title: 'PharmaChain' });
});

router.get('/manufactor_product_sell', function (req, res, next) {
  res.render('manufactor_product_sell', { title: 'PharmaChain' });
});

router.get('/manufactor_view_products', function (req, res, next) {
  res.render('manufactor_view_products', { title: 'PharmaChain' });
});

router.get('/product_register', function (req, res, next) {
  res.render('product_register', { title: 'PharmaChain' });
});

router.get('/QR_code', function (req, res, next) {
  res.render('QR_code', { title: 'PharmaChain' });
});

router.get('/retailer_home', function (req, res, next) {
  res.render('retailer_home', { title: 'PharmaChain' });
});

router.get('/retailer_product_sell', function (req, res, next) {
  res.render('retailer_product_sell', { title: 'PharmaChain' });
});

router.get('/wholesaler_home', function (req, res, next) {
  res.render('wholesaler_home', { title: 'PharmaChain' });
});

router.get('/wholesaler_product_sell', function (req, res, next) {
  res.render('wholesaler_product_sell', { title: 'PharmaChain' });
});

router.get('/wholesaler_view_products', function (req, res, next) {
  res.render('wholesaler_view_products', { title: 'PharmaChain' });
});

router.get('/retailer_view_products', function (req, res, next) {
  res.render('retailer_view_products', { title: 'PharmaChain' });
});


router.post('/register',async function (req, res, next) {
  data = req.body;
  console.log(data);
  let register = await message.methods.setActorProfile(data.name, data.mobile,
    data.gender, data.address, data.password, data.sel_type)
    .send({ from: coinbase, gas: 4721975 })
      res.send(register)
});

router.post('/login', async function (req, res, next) {
  let dataLogin = await message.methods.getLogin(req.body.mobile)
    .call({ from: coinbase })
  if (req.body.password == dataLogin._password) {
    if (dataLogin._actorType == 'Manufacturer') {
      res.render("manufactor_home", { title: 'PharmaChain' });
    }
    else if (dataLogin._actorType == 'Wholesaler') {
      res.render("wholesaler_home", { title: 'PharmaChain' });
    }
    else if (dataLogin._actorType == 'Retailer') {
      res.render("retailer_home", { title: 'PharmaChain' });
    }
    else if (dataLogin._actorType == 'Customer') {
      res.render("customer_home", { title: 'PharmaChain' });
    }
    else {
      res.send({ res: dataLogin });
    }
  }

  console.log("dataLogin", dataLogin)

});

router.post('/upload', function (req, res, next) {
  pid = req.body.phone;
  fileBytes = req.files.report.data;

  console.log("ID", pid);
  console.log("fileBytes", fileBytes);

  const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });

  ipfs.files.add(fileBytes, function (err, file) {
    if (err) throw err;
    ifpsHash = file[0].hash;
    console.log("ipfs hash", ifpsHash);
    message.methods.setReport(pid, ifpsHash).send({ from: coinbase, gas: 4721975 }).then(function (result) {
      res.send(result);
    })

  });

});

router.post('/getreport', async function (req, res, next) {
  phno = req.body.phone;
  let ipfspath = [];
  let ipfs = [];
  let limit = await message.methods.certificatieCount(phno)
    .call({ from: coinbase })
  console.log("limit", limit);
  var arr = [];
  for (i = 1; i <= limit; i++) {
    console.log("ghh", i);
    arr[i] = await message.methods.getReport(phno, i).call({ from: coinbase })
    console.log(arr[i])
    ipfspath[i] = 'https://ipfs.io/ipfs/' + arr[i];
    ipfs = ipfspath;
    //res.render('patient_medical_details', { data: [value] })
  }
  let hashes = {};
  hashes["ipfs"] = ipfs;
  console.log("ipfspath", [hashes])
    res.render('patient_details', { data: [hashes] })


});

router.post('/man_sell', function (req, res, next) {
  data = req.body;
  console.log(data);
  // message.methods.setActorProfile(data.name, data.mobile,
  //   data.gender, data.address, data.password, data.sel_type)
  //   .send({ from: coinbase, gas: 4721975 }).then((tx) => {
  //     res.send(tx)
  //   })
});

router.post('/product_register', function (req, res, next) {
  data = req.body;
  console.log(data);
  // message.methods.setActorProfile(data.name, data.mobile,
  //   data.gender, data.address, data.password, data.sel_type)
  //   .send({ from: coinbase, gas: 4721975 }).then((tx) => {
  //     res.send(tx)
  //   })
});



module.exports = router;
