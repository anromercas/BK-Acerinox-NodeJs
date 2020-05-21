
const { ChecklistInstance, validateStatus } = require('../models/ChecklistInstance')
const Auditor = require('../models/User');

///ASSIGNER///

// @desc    Get latest checklist instances
// @route   GET /api/v1/latests/:quantity
// @access  Public
exports.getLatest = async (req, res, next) => {
  try {
    const quantity = req.params.quantity;
    
    console.log("getLatest " + quantity);
    //const tasks = [{"_id": "5e891d5fc9f690e83aef6577", "name": "OPS Revisar Puertas Pabellón #1", "type": 'PUNTUAL', "auditor": "Manolo" , "dueDate": new Date(Date.now()).toLocaleString()}];
  
    const checklistInstances = await ChecklistInstance.find().sort({ createdAt: 'desc' }).limit(Number(quantity)).populate('user_id', 'fullname').populate('checklist_id', 'name');
    //console.log("instances: " + JSON.stringify(checklistInstances));
      console.log("find.sort.limit checklist instances " + checklistInstances.length);
    
    return res.status(200).json({
      success: true,
      count: checklistInstances.length,
      data: checklistInstances
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error. Couldn´t get latests checklist instances' + err
    });
  }
}

// @desc    Get all auditors
// @route   GET /api/v1/queries/auditors
// @access  Public
exports.getAuditors = async (req, res, next) => {
  try {
    const auditors = await Auditor.find({role: {$ne: 'ADMINISTRATOR'}, active: true}, 'firstname lastname fullname avatar role department');

    return res.status(200).json({
      success: true,
      count: auditors.length,
      data: auditors
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error. Couldn´t get auditors'
    });
  }
}

///STATISTICS///

// @desc    Get
// @route   GET /api/v1/queries/statistics/checklistsByCategory
// @access  Public
exports.getChecklistsByCategory = async (req, res, next) => {
  try {
    const data = [
      {
        "id": "Acería",
        "color": "hsl(239, 70%, 50%)",
        "data": [
          {
            "x": "categoría_1",
            "y": 296
          },
          {
            "x": "categoría_2",
            "y": 14
          },
          {
            "x": "categoría_3",
            "y": 264
          },
          {
            "x": "categoría_4",
            "y": 215
          },
          {
            "x": "categoría_5",
            "y": 162
          },
          // {
          //   "x": "categoría_6",
          //   "y": 139
          // },
          // {
          //   "x": "categoría_7",
          //   "y": 227
          // },
          // {
          //   "x": "categoría_8",
          //   "y": 105
          // },
          // {
          //   "x": "categoría_9",
          //   "y": 184
          // },
          // {
          //   "x": "categoría_10",
          //   "y": 233
          // },
          // {
          //   "x": "categoría_11",
          //   "y": 4
          // },
          // {
          //   "x": "categoría_12",
          //   "y": 189
          // }
        ]
      },
      {
        "id": "Office",
        "color": "hsl(309, 70%, 50%)",
        "data": [
          {
            "x": "categoría_1",
            "y": 285
          },
          {
            "x": "categoría_2",
            "y": 222
          },
          {
            "x": "categoría_3",
            "y": 82
          },
          {
            "x": "categoría_4",
            "y": 95
          },
          {
            "x": "categoría_5",
            "y": 261
          },
          // {
          //   "x": "categoría_6",
          //   "y": 96
          // },
          // {
          //   "x": "categoría_7",
          //   "y": 188
          // },
          // {
          //   "x": "categoría_8",
          //   "y": 31
          // },
          // {
          //   "x": "categoría_9",
          //   "y": 222
          // },
          // {
          //   "x": "categoría_10",
          //   "y": 67
          // },
          // {
          //   "x": "categoría_11",
          //   "y": 205
          // },
          // {
          //   "x": "categoría_12",
          //   "y": 296
          // }
        ]
      },
      {
        "id": "Corte",
        "color": "hsl(138, 70%, 50%)",
        "data": [
          {
            "x": "categoría_1",
            "y": 130
          },
          {
            "x": "categoría_2",
            "y": 285
          },
          {
            "x": "categoría_3",
            "y": 37
          },
          {
            "x": "categoría_4",
            "y": 167
          },
          {
            "x": "categoría_5",
            "y": 137
          },
          // {
          //   "x": "categoría_6",
          //   "y": 178
          // },
          // {
          //   "x": "categoría_7",
          //   "y": 162
          // },
          // {
          //   "x": "categoría_8",
          //   "y": 160
          // },
          // {
          //   "x": "categoría_9",
          //   "y": 290
          // },
          // {
          //   "x": "categoría_10",
          //   "y": 47
          // },
          // {
          //   "x": "categoría_11",
          //   "y": 191
          // },
          // {
          //   "x": "categoría_12",
          //   "y": 105
          // }
        ]
      },
      {
        "id": "Distribución",
        "color": "hsl(118, 70%, 50%)",
        "data": [
          {
            "x": "categoría_1",
            "y": 128
          },
          {
            "x": "categoría_2",
            "y": 215
          },
          {
            "x": "categoría_3",
            "y": 0
          },
          {
            "x": "categoría_4",
            "y": 86
          },
          {
            "x": "categoría_5",
            "y": 126
          },
          // {
          //   "x": "categoría_6",
          //   "y": 34
          // },
          // {
          //   "x": "categoría_7",
          //   "y": 96
          // },
          // {
          //   "x": "categoría_8",
          //   "y": 131
          // },
          // {
          //   "x": "categoría_9",
          //   "y": 228
          // },
          // {
          //   "x": "categoría_10",
          //   "y": 34
          // },
          // {
          //   "x": "categoría_11",
          //   "y": 299
          // },
          // {
          //   "x": "categoría_12",
          //   "y": 118
          // }
        ]
      },
      {
        "id": "Limpieza",
        "color": "hsl(170, 70%, 50%)",
        "data": [
          {
            "x": "categoría_1",
            "y": 293
          },
          {
            "x": "categoría_2",
            "y": 191
          },
          {
            "x": "categoría_3",
            "y": 255
          },
          {
            "x": "categoría_4",
            "y": 77
          },
          {
            "x": "categoría_5",
            "y": 267
          },
          // {
          //   "x": "categoría_6",
          //   "y": 88
          // },
          // {
          //   "x": "categoría_7",
          //   "y": 31
          // },
          // {
          //   "x": "categoría_8",
          //   "y": 252
          // },
          // {
          //   "x": "categoría_9",
          //   "y": 296
          // },
          // {
          //   "x": "categoría_10",
          //   "y": 100
          // },
          // {
          //   "x": "categoría_11",
          //   "y": 7
          // },
          // {
          //   "x": "categoría_12",
          //   "y": 63
          // }
        ]
      }
    ] //mockup data
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error. Couldn´t get checklist category data'
    });
  }
}
// @desc    Get
// @route   GET /api/v1/queries/statistics/checklistsByPeriod/:type/:period
// @access  Public
exports.getChecklistsByPeriod = async  (req, res, next) => {
  try {
    let data = [];
    const byMonthData = [
      {
        "id": "Acería",
        "color": "hsl(239, 70%, 50%)",
        "data": [
          {
            "x": "lunes, 2",
            "y": 296
          },
          {
            "x": "martes, 3",
            "y": 14
          },
          {
            "x": "miércoles, 4",
            "y": 264
          },
          {
            "x": "jueves, 5",
            "y": 215
          },
          {
            "x": "viernes, 6",
            "y": 162
          },
          {
            "x": "sábado, 7",
            "y": 139
          },
          {
            "x": "domingo, 8",
            "y": 227
          },
          {
            "x": "lunes, 9",
            "y": 105
          },
          {
            "x": "martes, 10",
            "y": 184
          },
          {
            "x": "miércoles, 11",
            "y": 233
          },
          {
            "x": "jueves, 12",
            "y": 4
          },
          {
            "x": "viernes, 13",
            "y": 189
          }
        ]
      },
      {
        "id": "Office",
        "color": "hsl(309, 70%, 50%)",
        "data": [
          {
            "x": "lunes, 2",
            "y": 285
          },
          {
            "x": "martes, 3",
            "y": 222
          },
          {
            "x": "miércoles, 4",
            "y": 82
          },
          {
            "x": "jueves, 5",
            "y": 95
          },
          {
            "x": "viernes, 6",
            "y": 261
          },
          {
            "x": "sábado, 7",
            "y": 96
          },
          {
            "x": "domingo, 8",
            "y": 188
          },
          {
            "x": "lunes, 9",
            "y": 31
          },
          {
            "x": "martes, 10",
            "y": 222
          },
          {
            "x": "miércoles, 11",
            "y": 67
          },
          {
            "x": "jueves, 12",
            "y": 205
          },
          {
            "x": "viernes, 13",
            "y": 296
          }
        ]
      },
      {
        "id": "Corte",
        "color": "hsl(138, 70%, 50%)",
        "data": [
          {
            "x": "lunes, 2",
            "y": 130
          },
          {
            "x": "martes, 3",
            "y": 285
          },
          {
            "x": "miércoles, 4",
            "y": 37
          },
          {
            "x": "jueves, 5",
            "y": 167
          },
          {
            "x": "viernes, 6",
            "y": 137
          },
          {
            "x": "sábado, 7",
            "y": 178
          },
          {
            "x": "domingo, 8",
            "y": 162
          },
          {
            "x": "lunes, 9",
            "y": 160
          },
          {
            "x": "martes, 10",
            "y": 290
          },
          {
            "x": "miércoles, 11",
            "y": 47
          },
          {
            "x": "jueves, 12",
            "y": 191
          },
          {
            "x": "viernes, 13",
            "y": 105
          }
        ]
      },
      {
        "id": "Distribución",
        "color": "hsl(118, 70%, 50%)",
        "data": [
          {
            "x": "lunes, 2",
            "y": 128
          },
          {
            "x": "martes, 3",
            "y": 215
          },
          {
            "x": "miércoles, 4",
            "y": 0
          },
          {
            "x": "jueves, 5",
            "y": 86
          },
          {
            "x": "viernes, 6",
            "y": 126
          },
          {
            "x": "sábado, 7",
            "y": 34
          },
          {
            "x": "domingo, 8",
            "y": 96
          },
          {
            "x": "lunes, 9",
            "y": 131
          },
          {
            "x": "martes, 10",
            "y": 228
          },
          {
            "x": "miércoles, 11",
            "y": 34
          },
          {
            "x": "jueves, 12",
            "y": 299
          },
          {
            "x": "viernes, 13",
            "y": 118
          }
        ]
      },
      {
        "id": "Limpieza",
        "color": "hsl(170, 70%, 50%)",
        "data": [
          {
            "x": "lunes, 2",
            "y": 293
          },
          {
            "x": "martes, 3",
            "y": 191
          },
          {
            "x": "miércoles, 4",
            "y": 255
          },
          {
            "x": "categoría_4",
            "y": 77
          },
          {
            "x": "viernes, 6",
            "y": 267
          },
          {
            "x": "sábado, 7",
            "y": 88
          },
          {
            "x": "domingo, 8",
            "y": 31
          },
          {
            "x": "lunes, 9",
            "y": 252
          },
          {
            "x": "martes, 10",
            "y": 296
          },
          {
            "x": "miércoles, 11",
            "y": 100
          },
          {
            "x": "jueves, 12",
            "y": 7
          },
          {
            "x": "viernes, 13",
            "y": 63
          }
        ]
      }
    ] //mockup data
    const byYearData = [
      {
        "id": "Acería",
        "color": "hsl(239, 70%, 50%)",
        "data": [
          {
            "x": "Marzo´19",
            "y": 80
          },
          {
            "x": "Abril´19",
            "y": 80
          },
          {
            "x": "Mayo´19",
            "y": 76
          },
          {
            "x": "Junio´19",
            "y": 90
          },
          {
            "x": "Julio´19",
            "y": 162
          },
          {
            "x": "Agosto´19",
            "y": 139
          },
          {
            "x": "Septiembre´19",
            "y": 90
          },
          {
            "x": "Octubre´19",
            "y": 105
          },
          {
            "x": "Noviembre´19",
            "y": 184
          },
          {
            "x": "Diciembre´19",
            "y": 233
          },
          {
            "x": "Enero´20",
            "y": 280
          },
          {
            "x": "Febrero´20",
            "y": 289
          }
        ]
      },
      {
        "id": "Office",
        "color": "hsl(309, 70%, 50%)",
        "data": [
          {
            "x": "Marzo´19",
            "y": 20
          },
          {
            "x": "Abril´19",
            "y": 50
          },
          {
            "x": "Mayo´19",
            "y": 82
          },
          {
            "x": "Junio´19",
            "y": 95
          },
          {
            "x": "Julio´19",
            "y": 80
          },
          {
            "x": "Agosto´19",
            "y": 96
          },
          {
            "x": "Septiembre´19",
            "y": 188
          },
          {
            "x": "Octubre´19",
            "y": 100
          },
          {
            "x": "Noviembre´19",
            "y": 222
          },
          {
            "x": "Diciembre´19",
            "y": 67
          },
          {
            "x": "Enero´20",
            "y": 205
          },
          {
            "x": "Febrero´20",
            "y": 296
          }
        ]
      },
      {
        "id": "Corte",
        "color": "hsl(138, 70%, 50%)",
        "data": [
          {
            "x": "Marzo´19",
            "y": 80
          },
          {
            "x": "Abril´19",
            "y": 80
          },
          {
            "x": "Mayo´19",
            "y": 50
          },
          {
            "x": "Junio´19",
            "y": 60
          },
          {
            "x": "Julio´19",
            "y": 79
          },
          {
            "x": "Agosto´19",
            "y": 100
          },
          {
            "x": "Septiembre´19",
            "y": 162
          },
          {
            "x": "Octubre´19",
            "y": 160
          },
          {
            "x": "Noviembre´19",
            "y": 220
          },
          {
            "x": "Diciembre´19",
            "y": 220
          },
          {
            "x": "Enero´20",
            "y": 240
          },
          {
            "x": "Febrero´20",
            "y": 299
          }
        ]
      },
      {
        "id": "Distribución",
        "color": "hsl(118, 70%, 50%)",
        "data": [
          {
            "x": "Marzo´19",
            "y": 12
          },
          {
            "x": "Abril´19",
            "y": 21
          },
          {
            "x": "Mayo´19",
            "y": 45
          },
          {
            "x": "Junio´19",
            "y": 78
          },
          {
            "x": "Julio´19",
            "y": 78
          },
          {
            "x": "Agosto´19",
            "y": 80
          },
          {
            "x": "Septiembre´19",
            "y": 90
          },
          {
            "x": "Octubre´19",
            "y": 90
          },
          {
            "x": "Noviembre´19",
            "y": 110
          },
          {
            "x": "Diciembre´19",
            "y": 120
          },
          {
            "x": "Enero´20",
            "y": 222
          },
          {
            "x": "Febrero´20",
            "y": 230
          }
        ]
      },
      {
        "id": "Limpieza",
        "color": "hsl(170, 70%, 50%)",
        "data": [
          {
            "x": "Marzo´19",
            "y": 21
          },
          {
            "x": "Abril´19",
            "y": 32
          },
          {
            "x": "Mayo´19",
            "y": 50
          },
          {
            "x": "Junio´19",
            "y": 77
          },
          {
            "x": "Julio´19",
            "y": 90
          },
          {
            "x": "Agosto´19",
            "y": 160
          },
          {
            "x": "Septiembre´19",
            "y": 76
          },
          {
            "x": "Octubre´19",
            "y": 76
          },
          {
            "x": "Noviembre´19",
            "y": 60
          },
          {
            "x": "Diciembre´19",
            "y": 100
          },
          {
            "x": "Enero´20",
            "y": 150
          },
          {
            "x": "Febrero´20",
            "y": 122
          }
        ]
      }
    ] //mockup data
    const period = req.params.period;
    const type = req.params.type;
    switch (period) {
      case 'month':
        console.log('Period: month');
        data = byMonthData;
        break;
      case 'year':
        console.log('Period: year');
        data = byYearData;
        break;
      default:
        console.log('Period: ??');
        break;
    }
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error. Couldn´t get checklists by period data'
    });
  }
}
// @desc   Get
// @route   GET /api/v1/queries/statistics/aggregationTableData/:type
// @access  Public
exports.getAggregationTable = async  (req, res, next) => {
  try {
    var rows = [];
    var columns = [];
    switch (req.params.type){
      case 'ops':
        //console.log('Aggregation ops')
        rows = [
          createData('Ops#1', 44, 56, 22, 43, 0),
          createData('Ops#2', 12, 43, 78, 50, 0),
          createData('Ops#3', 32, 33, 65, 43, 0),
          createData('Ops#4', 55, 44, 12, 10, 0),
          createData('Ops#5', 0, 34, 2, 3, 0)
        ];
        columns = [
          'Nombre',
          'categoría_1',
          'categoría_2',
          'categoría_3',
          'categoría_4',
          'categoría_5'
        ];
        break;
      case 'checklist':
        //console.log('Aggregation checklist')
        rows = [
          createData('Checklist#1', 54, 32, 12, 89, 0),
          createData('Checklist#2', 80, 54, 87, 90, 0),
          createData('Checklist#3', 32, 33, 65, 43, 0),
          createData('Checklist#4', 12, 43, 78, 90, 0),
          createData('Checklist#5', 44, 56, 22, 43, 0)
        ];
        columns = [
          'Nombre',
          'categoría_1',
          'categoría_2',
          'categoría_3',
          'categoría_4',
          'categoría_5'
        ];
        break;
      case 'incident':
        rows = [
          createData('Acería', 134),
          createData('Distribución', 89),
          createData('Office', 31),
          createData('Comercial', 9),
          createData('Corte', 121)
        ];
        columns = [
          'Nombre',
          'Número de Incidencias'
        ];
        break;
      default:
        break;
    }
    function createData(Nombre, categoría_1, categoría_2, categoría_3, categoría_4, categoría_5) {
      return { Nombre, categoría_1, categoría_2, categoría_3, categoría_4, categoría_5 };
    }
    // const columns = [
    //     "Dessert (100g serving)",
    //     "Calories",
    //     "Fat",
    //     "Carbs",
    //     "Protein"
    // ]
    // const rows = [
    //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //   createData('Eclair', 262, 16.0, 24, 6.0),
    //   createData('Cupcake', 305, 3.7, 67, 4.3),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];
    const data = {columns, rows};
    //console.log('data aggregate', JSON.stringify(data));
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error. Couldn´t get table´s data'
    });
  }
}