var _ = require("underscore");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

//Variables
var urlimages = "http://192.168.16.106:8081/Images/Inmuebles/";

// colecciones BD
// P=propietario C=corredor I=interesados
var user = [
  {
    id: 0,
    user: "usermm@mmm.mm",
    pass: "passmm",
    rol: "P",
    phone: "phone00",
    active: true
  },
  {
    id: 1,
    user: "user01",
    pass: "pass01",
    rol: "P",
    phone: "phone01",
    active: true
  },
  {
    id: 2,
    user: "user02",
    pass: "pass02",
    rol: "C",
    phone: "phone02",
    active: true
  },
  {
    id: 3,
    user: "user03",
    pass: "pass03",
    rol: "I",
    phone: "phone03",
    active: true
  },
  {
    id: 4,
    user: "user04",
    pass: "pass04",
    rol: "P",
    phone: "phone04",
    active: true
  },
  {
    id: 5,
    user: "user05",
    pass: "pass05",
    rol: "C",
    phone: "phone05",
    active: true
  },
  {
    id: 6,
    user: "user06",
    pass: "pass06",
    rol: "I",
    phone: "phone06",
    active: true
  },
  {
    id: 7,
    user: "user07",
    pass: "pass07",
    rol: "P",
    phone: "phone07",
    active: true
  },
  {
    id: 8,
    user: "user08",
    pass: "pass08",
    rol: "C",
    phone: "phone08",
    active: true
  },
  {
    id: 9,
    user: "user09",
    pass: "pass09",
    rol: "I",
    phone: "phone09",
    active: true
  }
];
var inmueble = [
  {
    id: 0,
    name: "Apartamento",
    place: "Valencia",
    pics: ["a01", "a02", "a03", "a04", "a05", "a06"],
    active: true
  },
  {
    id: 1,
    name: "casa",
    place: "Hatillo",
    pics: ["c01", "c02", "c03", "c04"],
    active: true
  },
  {
    id: 2,
    name: "Terreno",
    place: "Guacara",
    pics: ["t01", "t02", "t03"],
    active: true
  }
];
var citas = [
  {
    id: 0,
    idinmueble: 0,
    iduser: 0,
    dia1: "ss",
    dia2: "ss",
    dia3: "ss",
    hora1a: "",
    hora1b: "",
    hora1c: "",
    hora2a: "",
    hora2b: "",
    hora2c: "",
    hora3a: "",
    hora3b: "",
    hora3c: "",
    hora1aX: "",
    hora1bX: "",
    hora1cX: "",
    hora2aX: "",
    hora2bX: "",
    hora2cX: "",
    hora3aX: "",
    hora3bX: "",
    hora3cX: "",
    hora1aXX: "",
    hora1bXX: "",
    hora1cXX: "",
    hora2aXX: "",
    hora2bXX: "",
    hora2cXX: "",
    hora3aXX: "",
    hora3bXX: "",
    hora3cXX: "",

    active: true
  }
];

// dando acceso a Imagenes   http://192.168.16.106:8081/Images/Inmuebles/a01.jpg
app.use(express.static("public"));
app.use("/Images/Inmuebles", express.static(__dirname + "/Images/Inmuebles"));

// para procesamiento post
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Preparando el puerto
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at :%s", port);
});

// api default
app.get("/listUsers", function(req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
    console.log(data);
    console.log("consulta hecha.." + _.now());
    res.end(data);
  });
  res.status(200).send({ jfjfjf: "dffffffffffffffffffffffffffffffffffff" });
});

// api imagenes  http://localhost:8081/image?id=0
app.get("/image", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.type("application/json");
  try {
    var fin = _.findWhere(inmueble, { id: parseInt(req.query.id) });
    res.status(200).send(fin); // responde array de datos de ese inmueble
  } catch (error) {
    res.status(200).send({ error: true, message: "Incoherencia en datos " });
  }
});

// api imagenes  http://localhost:8081/image?id=0
app.get("/inmuebles", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.type("application/json");
  try {
    // var fin = _.findWhere(inmueble, { id: parseInt(req.query.id) });
    // var fin = inmueble
    res.status(200).send(inmueble); // responde array de datos de ese inmueble
  } catch (error) {
    res.status(200).send({ error: true, message: "Incoherencia en datos " });
  }
});

// api user trae toda la inf del usuario  http://192.168.16.106:8081/user?id=3
app.get("/user", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.type("application/json");
  try {
    var fin = _.findWhere(user, { id: parseInt(req.query.id) });
    res.status(200).send(fin); // responde array de todos los datos de ese usuario
  } catch (error) {
    res.status(200).send({ error: true, message: "Incoherencia en datos " });
  }
});

// confirmar usuario y pass http://localhost:8081/confirm?user=user03&pass=pass03
app.get("/confirm", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.type("application/json");
  try {
    myfilter = { user: req.query.user, pass: req.query.pass };
    var fin = _.where(user, myfilter);
    res.status(200).send(fin); // responde array con todos los datos de ese usuario
  } catch (error) {
    res.status(200).send({ error: true, message: "Incoherencia en datos " });
  }
});

// AGREGAR usuario COMPLETO http://localhost:8081/adduser?user=usernn&pass=passnn&rol=P&phone=phonenn
app.get("/adduser", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.type("application/json");
  try {
    myfilter = { user: req.query.user };
    var fin = _.where(user, myfilter);
    if (fin.length === 0) {
      //{ id: 0, user: "user00", pass: "pass00", rol: "P", phone: "phone00" },

      var mi_usuario = {
        id: user.length,
        user: req.query.user,
        pass: req.query.pass,
        rol: req.query.rol,
        phone: req.query.phone
      };
      let antes = user.length;
      user.push(mi_usuario);
      let despues = user.length;
      res.status(200).send({ error: false, message: "Registrado" });
      console.log(
        "Agregado un usuario, antes habian " + antes + " ahora hay " + despues
      );
    } else {
      res.status(200).send({
        error: true,
        message: "Usuario No registrado, faltan datos" + fin.length
      });
    }
  } catch (error) {
    res.status(200).send({
      error: true,
      message: "Incoherencia en datos " + error.message + fin.length
    });
  }
});

// borra un usuario  http://localhost:8081/deleteuser?id=1
app.get("/deleteuser", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.type("application/json");
  try {
    var fin = _.findWhere(user, { id: parseInt(req.query.id) });

    //  arr = _.without(arr, _.findWhere(arr, { id: 3 }));
    var finSinUsuario = _.without(
      user,
      _.findWhere(user, { id: parseInt(req.query.id) })
    );
    user = finSinUsuario;
    console.log(user);
    res.status(200).send(fin); // responde array de todos los datos de ese usuario
  } catch (error) {
    res.status(200).send({ error: true, message: "Incoherencia en datos " });
  }
});

// POST http://localhost:8081/api/users
// parameters sent with
app.get("/api/users", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.type("application/json");
  res.send("holaaaaaaaaaaaaaa");
});
