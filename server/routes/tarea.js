const express = require("express");

const moment = require("moment");
const uuidv4 = require("uuid/v4");

let {
  verificaToken,
  verificaAdmin_Role,
  verificaSuper_Admin_Role
} = require("../middlewares/autenticacion");

let app = express();

let Tarea = require("../models/tarea");

// =================================
// Mostrar todas las tareas
// =================================
app.get("/tarea", verificaToken, (req, res) => {
  Tarea.find({})
    .sort({ _id: -1 })
    .exec((err, tareas) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // añadir la expiración de la tarea en la llamada para saber si hay tareas expiradas y poder modificar el parametro de expirado
      // no sé si es mejor añadirlo aquí o hacer una llamada para que se actualice cada x tiempo ese parámetro y que cuando lo actualice 
      // haga el push notification al usuario
      
      Tarea.countDocuments({}, (err, conteo) => {
        res.json({
          ok: true,
          tareas,
          total: conteo
        });
      });
    });
});

// =================================
// Mostrar todas las tareas de un usuario
// =================================
app.get("/tareas", verificaToken, (req, res) => {
  let id = req.usuario._id;

  let desde = req.query.desde || 0;
    desde = Number(desde);

  let limite = req.query.limite || 10;
  limite = Number(limite);

  Tarea.find({usuario: id})
    .sort({ fechaFin: 1 })
    .skip(desde)
    .limit(limite)
    .exec((err, tareas) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      Tarea.countDocuments({usuario: id}, (err, conteo) => {
        res.json({
          ok: true,
          tareas,
          total: conteo
        });
      });
    });
});

// =================================
// Mostrar tarea por id
// =================================
app.get("/tarea/:id", verificaToken, (req, res) => {
  let id = req.params.id;

  Tarea.findById(id).exec((err, tareas) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      tareas
    });
  });
});

// =================================
// Crear tarea
// =================================
app.post("/tarea", verificaToken, (req, res) => {
  let body = req.body;
  let idUnico = uuidv4();


  let tarea = new Tarea({
    codigo: body.codigo || idUnico,
    nombre: body.nombre,
    tipo: body.tipo,
    repeticion: body.repeticion,
    repeticiones: body.repeticiones || null,
    fechaInicio: body.fechaInicio || null,
    fechaFin: body.fechaFin || null,
    fechasAleatoria: body.fechasAleatoria,
    usuario: body.usuario
  });

  if (moment().isSameOrAfter(tarea.fechaInicio) && tarea.fechaInicio !== null) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "La fecha de inicio debe ser mayor o igual al día de hoy"
      }
    });
  }

  switch (tarea.repeticion) {
    /* Tarea puntual crea una tarea dada una fecha con una misma fecha de inicio que de fin*/
    case "PUNTUAL":
      // tarea fecha fin es igual a fecha inicio
      tarea.fechaFin = tarea.fechaInicio;

      tarea.save((err, tareaDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        if (!tareaDB) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        res.json({
          ok: true,
          tareaDB
        });
      });

      break;
    /* tarea puntual-semanal crea una tarea puntual en la fecha de inicio y tantas veces como repeticiones se hayan asignado 
      ej: 3 repeticiones, pues si la fecha es de un miercoles pues se creará 3 repeticiones en los proximos 3 miercoles de las 3 semanas desde la fecha */
    case "PUNTUAL-SEMANAL":
      // array para las tareas de la tarea
      const tareasPS = [];
      const diffPS = tarea.repeticiones - 1;
      // creo una variable para guardar la fecha de inicio
      let fechaPS = tarea.fechaInicio;
      let tareaRepePS;

      // recorro un array para crear todas las tareas dentro de la tarea
      for (let i = 0; i <= diffPS; i++) {
        // pregunto si es la primea vuelta del bucle
        if (i === 0) {
          tareaRepePS = new Tarea({
            codigo: body.codigo || idUnico,
            nombre: body.nombre,
            tipo: body.tipo,
            repeticion: body.repeticion,
            repeticiones: body.repeticiones,
            fechaInicio: fechaPS,
            fechaFin: fechaPS,
            usuario: body.usuario
          });
        } else {
          // sumo una semana a la fecha
          fechaPS = moment(fechaPS).add(7, "d");

          // creo una tarea por cada repeticion
          tareaRepePS = new Tarea({
            codigo: body.codigo || idUnico,
            nombre: body.nombre,
            tipo: body.tipo,
            repeticion: body.repeticion,
            repeticiones: body.repeticiones,
            fechaInicio: fechaPS,
            fechaFin: fechaPS,
            usuario: body.usuario
          });
        }
        tareasPS.push(tareaRepePS);
      }

      Tarea.insertMany(tareasPS, (err, tareasDB) => {

        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }
        
        res.json({
          ok: true,
          tareasDB
        });
      });

      break;

    /* tarea puntual-mensual crea una tarea puntual en la fecha de inicio y tantas veces como repeticiones se hayan asignado 
      ej: 3 repeticiones, pues si la fecha es de un dia 10 pues se creará 3 repeticiones en los proximos 3 dias 10 de los 3 meses siguientes desde la fecha */
    case "PUNTUAL-MENSUAL":
      // array para las tareas de la tarea
      const tareasPM = [];
      const diffPM = tarea.repeticiones - 1;
      // creo una variable para guardar la fecha de inicio
      let fechaPM = tarea.fechaInicio;
      let tareaRepePM;

      // recorro un array para crear todas las tareas dentro de la tarea
      for (let i = 0; i <= diffPM; i++) {
        // pregunto si es la primea vuelta del bucle
        if (i === 0) {
          tareaRepePM = new Tarea({
            codigo: body.codigo || idUnico,
            nombre: body.nombre,
            tipo: body.tipo,
            repeticion: body.repeticion,
            repeticiones: body.repeticiones,
            fechaInicio: fechaPM,
            fechaFin: fechaPM,
            usuario: body.usuario
          });
        } else {
          // sumo una semana a la fecha
          fechaPM = moment(fechaPM).add(1, "M");

          // creo una tarea por cada repeticion
          tareaRepePM = new Tarea({
            codigo: body.codigo || idUnico,
            nombre: body.nombre,
            tipo: body.tipo,
            repeticion: body.repeticion,
            repeticiones: body.repeticiones,
            fechaInicio: fechaPM,
            fechaFin: fechaPM,
            usuario: body.usuario
          });
        }
        tareasPM.push(tareaRepePM);
      }

      Tarea.insertMany(tareasPM, (err, tareasDB) => {

        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }
        
        res.json({
          ok: true,
          tareasDB
        });
      });
      break;

    /* tarea puntual-aleatoria crea una tarea puntual en cada fecha que trae el array fechasAleatoria
      ej: 3 repeticiones, pues si la fecha es de un dia 10 pues se creará 3 repeticiones en los proximos 3 dias 10 de los 3 meses siguientes desde la fecha */
    case "PUNTUAL-ALEATORIA":
      // array para las tareas de la tarea
      const tareasA = [];
      let tareaRepeA;
      let fechasAleatoria = tarea.fechasAleatoria;

      console.log(fechasAleatoria);


      // recorro un array para crear todas las tareas dentro de la tarea
      for (let i = 0; i <= fechasAleatoria.length - 1; i++) {
        tareaRepeA = new Tarea({
          codigo: body.codigo || idUnico,
          nombre: body.nombre,
          tipo: body.tipo,
          repeticion: body.repeticion,
          repeticiones: body.repeticiones,
          fechaInicio: tarea.fechasAleatoria[i],
          fechaFin: tarea.fechasAleatoria[i],
          usuario: body.usuario
        });

        tareasA.push(tareaRepeA);
      }

      Tarea.insertMany(tareasA, (err, tareasDB) => {

        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }
        
        res.json({
          ok: true,
          tareasDB
        });
      });
      break;

    /* tarea semanal crea una tarea con un rango de semana dependiendo de la fecha de inicio, si la fecha de inicio cae en martes se creará una tarea que se deberá de realizar
    en un plazo de una semana desde f.inicio a f.fin que será el martes de la siguiente semana. se crearán tantas tareas como repetieciones asignadas 
      ej: 3 repeticiones, pues si la fecha es el martes 7 de Enero pues se creará 3 repeticiones en las proximas 3 semanas con fecha de inicio en martes y fin en martes */
    case "SEMANAL":
  
      let tareaSem;
      // array para las tareas de la tarea
      const tareasSem = [];
      // fecha inicio semana
      let startOf = moment(tarea.fechaInicio);
      // fecha fin semana
      let endOf = moment(tarea.fechaInicio).add(1, "w");
      

      for (let i = 0; i <= tarea.repeticiones - 1; i++) {

        tareaSem = new Tarea({
          codigo: body.codigo || idUnico,
          nombre: body.nombre,
          tipo: body.tipo,
          repeticion: body.repeticion,
          repeticiones: body.repeticiones,
          fechaInicio: startOf,
          fechaFin: endOf,
          usuario: body.usuario
        });

        tareasSem.push(tareaSem);
        startOf = endOf;
        endOf = moment(startOf).add(1, "w");
      }

      Tarea.insertMany(tareasSem, (err, tareasDB) => {

        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }
        
        res.json({
          ok: true,
          tareasDB
        });
      });
      break;

    case "MENSUAL":
      let tareaMen;
      // array para las tareas de la tarea
      const tareasMen = [];
      // fecha inicio semana
      let startOfM = moment(tarea.fechaInicio);
      // fecha fin semana
      let endOfM = moment(tarea.fechaInicio).add(1, "M");
      
      
      for (let i = 0; i < tarea.repeticiones; i++) {
        tareaMen = new Tarea({
          codigo: body.codigo || idUnico,
          nombre: body.nombre,
          tipo: body.tipo,
          repeticion: body.repeticion,
          repeticiones: body.repeticiones,
          fechaInicio: startOfM,
          fechaFin: endOfM,
          usuario: body.usuario
        });
        
        tareasMen.push(tareaMen);
        startOfM = endOfM;
        endOfM = moment(startOfM).add(1, "M");
      }

      Tarea.insertMany(tareasMen, (err, tareasDB) => {

        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }
        
        res.json({
          ok: true,
          tareasDB
        });
      });

      break;
  }
});

// =================================
// Actualizar tarea
// =================================
app.put("/tarea/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  let options = {
    new: true,
    runValidators: true,
    context: "query"
  };

  let tarea = {
    nombre: body.nombre,
    tipo: body.tipo,
    repeticion: body.repeticion,
    fechaFin: body.fechaFin,
    expirado: body.expirado,
    usuario: body.usuario
  };

  Tarea.findByIdAndUpdate(id, body, options, (err, tareaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!tareaDB) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      basura: tareaDB
    });
  });
});

// =================================
// Purgar tareas
// =================================
app.put(
  "/purgar-tareas",
  [verificaToken, verificaSuper_Admin_Role],
  (req, res) => {
    Tarea.deleteMany({}, (err, tareas) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        message: "tareas Borradas",
        historicos: tareas
      });
    });
  }
);

// =================================
// Borrar una tarea
// =================================
app.delete("/tarea/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
  // solo un administrador puede borrar una basura
  let id = req.params.id;

  Tarea.findByIdAndRemove(id, (err, tareaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!tareaDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El id no existe"
        }
      });
    }

    res.json({
      ok: true,
      message: "Tarea Borrada",
      tarea: tareaDB
    });
  });
});

// =================================
// borrar todas las tareas repetitivas
// =================================
app.delete("/tarea-repe/:codigo", [verificaToken, verificaAdmin_Role], (req, res) => {
  // solo un administrador puede borrar una basura
  let codigo = req.params.codigo;

  Tarea.deleteMany({codigo: codigo}, (err, tareaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!tareaDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El código no existe"
        }
      });
    }

    if( tareaDB.n === 0 ){
      return res.status(400).json({
        ok: false,
        err: {
          message: "El código no existe o ya ha sido eliminado"
        }
      });
    }

    res.json({
      ok: true,
      message: "Tareas Borradas",
      tarea: tareaDB
    });
  });
});


module.exports = app;
