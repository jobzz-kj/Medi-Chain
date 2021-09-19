var express = require('express');
var ipfsAPI = require("ipfs-api");
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});


router.get('/login', function (req, res, next) {
    res.render('login');
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

router.get('/sell', function (req, res, next) {
    res.render('sell', { title: 'PharmaChain' });
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

router.post('/login', async function (req, res, next) {
    console.log(req.body)
    let dataLogin = await message.methods.getLogin(req.body.mobileno)
        .call({ from: req.body.waddress })
    if (req.body.password == dataLogin._password) {
        if (dataLogin._actorType == 'Manufacturer') {
            console.log("m")
            res.render("manufactor_home", { title: 'PharmaChain' });
        } else if (dataLogin._actorType == 'Wholesaler') {
            res.render("wholesaler_home", { title: 'PharmaChain' });
            console.log("m")
        } else if (dataLogin._actorType == 'Retailer') {
            res.render("retailer_home", { title: 'PharmaChain' });
            console.log("r")
        } else if (dataLogin._actorType == 'Customer') {
            res.render("customer_home", { title: 'PharmaChain' });
            console.log("c")
        } else {
            res.send({ res: dataLogin });
            console.log("o")
        }
    } else {
        res.render('login');
    }
});


router.get('/register', function (req, res, next) {
    res.render('register');
});

router.get('/balance', function (req, res, next) {
    res.render('balance');
});

router.post('/register', async function (req, res, next) {
    data = req.body;
    console.log(data);
    let register = await message.methods.setActorProfile(data.name, data.mobile,
        data.gender, data.address, data.password, data.sel_type)
        .send({ from: data.waddress, gas: 4721975 })
    console.log(register);
    res.redirect('/login')
});

router.post('/product_register', function (req, res, next) {
    data = req.body;
    console.log(data);
    message.methods.createProduct(data.product_id, data.product_name,
        data.quantity, data.ingredients)
        .send({ from: data.waddress, gas: 4721975 }).then((tx) => {
            res.send(tx)
        })
});

router.post('/getProduct', async function (req, res, next) {
    console.log(req.body)
    let dataregister = await message.methods.displayProduct(req.body.id)
        .call({ from: req.body.waddress })
    console.log("dataregister", dataregister)
    res.render("manufactor_view_products", { myData: [dataregister] });
});

// router.post('/getProduct', async function (req, res, next) {
//     console.log(req.body)
//     let dataregister = await message.methods.displayProduct(req.body.id)
//         .call({ from: req.body.waddress })
//     console.log("dataregister", dataregister)
//     res.render("wholesaler_view_products", { myData: [dataregister] });
// });

// router.post('/getProduct', async function (req, res, next) {
//     console.log(req.body)
//     let dataregister = await message.methods.displayProduct(req.body.id)
//         .call({ from: req.body.waddress })
//     console.log("dataregister", dataregister)
//     res.render("retailer_view_products", { myData: [dataregister] });
// });

// router.post('/getProduct', async function (req, res, next) {
//     console.log(req.body)
//     let dataregister = await message.methods.displayProduct(req.body.id)
//         .call({ from: req.body.waddress })
//     console.log("dataregister", dataregister)
//     res.render("customer_view_products", { myData: [dataregister] });
// });

router.post('/getreport', function (req, res, next) {
    data = req.body;
    console.log("data",data);
    message.methods.getCertificate(data.id)
        .call({ from: coinbase }).then((val) => {
            ipfspath = 'https://ipfs.io/ipfs/'+val;
            let ipfsdata ={}
            ipfsdata['ipfslinks']=ipfspath;
            console.log([ipfsdata]);
            res.render('QR_code', { data: [ipfsdata] })
            
        });
});

router.post('/sell', async function (req, res, next) {
    console.log(req.body)
    let data = req.body;
    console.log(data)
    message.methods.transferProduct(data.from_address, data.to_address, data.product_id)
        .send({ from: data.from_address, value: data.price, gas: 4721975 }).then((tx) => {
            res.send(tx)
        })
    // let dataregister = await message.methods.transferProduct(data.from_address, data.to_address, data.product_id)
    //     .send({ from: data.from_address, value: data.price, gas: 4721975 })
    // console.log("dataregister", dataregister)
    // res.send(dataregister)

});
router.get('/owner', function (req, res, next) {
    res.render('owner');
});
router.get('/ownerdata', async function (req, res, next) {
    let data = req.query
    console.log(data)
    message.methods.displayOwner(data.id)
        .call({ from: data.waddress ? data.waddress : coinbase }).then((tx) => {
            console.log("tx", tx)
            let accounts = {}
            accounts["account"] = tx
            res.render("owner", { myData: [accounts] });
        })

});
router.post('/previousOwner', async function (req, res, next) {
    let data = req.query;
    message.methods.previousOwner()
        .call({ from: data.waddress ? data.waddress : coinbase }).then((tx) => {
            console.log("tx", tx)
            let accounts = {}
            accounts["account"] = tx
            res.render("owner", { myData2: [accounts] });
        })

});

router.post('/upload', function (req, res, next) {
    manid = req.body.id;
    fileBytes = req.files.report.data;

    const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });

    ipfs.files.add(fileBytes, async function (err, file) {
        if (err) throw err;
        ifpsHash = file[0].hash;
        console.log("ipfs hash", ifpsHash);
let response = await message.methods.setCertificate(manid, ifpsHash).send({ from: coinbase, gas: 4721975 })
// .then(function (result) {
//             res.send(result);
//         })
res.send(response);
    });

});


router.get('/displayBalance', function (req, res, next) {
    data = req.query;
    console.log(data.waddress);
    web3.eth.getBalance(data.waddress).then((val)=>{
      var bal = web3.utils.fromWei(val,'ether');
      console.log(bal);
      let accounts = {}
            accounts["balance"] = bal
      res.render("balance",{balance:[accounts]});
     
    })
       
  });

module.exports = router;
