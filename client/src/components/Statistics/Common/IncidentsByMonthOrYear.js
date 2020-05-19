import React, { useState, useEffect } from 'react'
import { ResponsiveLine } from '@nivo/line'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'

//  const data = [
//   {
//     "id": "Acería",
//     "color": "hsl(239, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 296
//       },
//       {
//         "x": "helicopter",
//         "y": 14
//       },
//       {
//         "x": "boat",
//         "y": 264
//       },
//       {
//         "x": "train",
//         "y": 215
//       },
//       {
//         "x": "subway",
//         "y": 162
//       },
//       {
//         "x": "bus",
//         "y": 139
//       },
//       {
//         "x": "car",
//         "y": 227
//       },
//       {
//         "x": "moto",
//         "y": 105
//       },
//       {
//         "x": "bicycle",
//         "y": 184
//       },
//       {
//         "x": "horse",
//         "y": 233
//       },
//       {
//         "x": "skateboard",
//         "y": 4
//       },
//       {
//         "x": "others",
//         "y": 189
//       }
//     ]
//   },
//   {
//     "id": "Office",
//     "color": "hsl(309, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 285
//       },
//       {
//         "x": "helicopter",
//         "y": 222
//       },
//       {
//         "x": "boat",
//         "y": 82
//       },
//       {
//         "x": "train",
//         "y": 95
//       },
//       {
//         "x": "subway",
//         "y": 261
//       },
//       {
//         "x": "bus",
//         "y": 96
//       },
//       {
//         "x": "car",
//         "y": 188
//       },
//       {
//         "x": "moto",
//         "y": 31
//       },
//       {
//         "x": "bicycle",
//         "y": 222
//       },
//       {
//         "x": "horse",
//         "y": 67
//       },
//       {
//         "x": "skateboard",
//         "y": 205
//       },
//       {
//         "x": "others",
//         "y": 296
//       }
//     ]
//   },
//   {
//     "id": "Corte",
//     "color": "hsl(138, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 130
//       },
//       {
//         "x": "helicopter",
//         "y": 285
//       },
//       {
//         "x": "boat",
//         "y": 37
//       },
//       {
//         "x": "train",
//         "y": 167
//       },
//       {
//         "x": "subway",
//         "y": 137
//       },
//       {
//         "x": "bus",
//         "y": 178
//       },
//       {
//         "x": "car",
//         "y": 162
//       },
//       {
//         "x": "moto",
//         "y": 160
//       },
//       {
//         "x": "bicycle",
//         "y": 290
//       },
//       {
//         "x": "horse",
//         "y": 47
//       },
//       {
//         "x": "skateboard",
//         "y": 191
//       },
//       {
//         "x": "others",
//         "y": 105
//       }
//     ]
//   },
//   {
//     "id": "Distribución",
//     "color": "hsl(118, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 128
//       },
//       {
//         "x": "helicopter",
//         "y": 215
//       },
//       {
//         "x": "boat",
//         "y": 0
//       },
//       {
//         "x": "train",
//         "y": 86
//       },
//       {
//         "x": "subway",
//         "y": 126
//       },
//       {
//         "x": "bus",
//         "y": 34
//       },
//       {
//         "x": "car",
//         "y": 96
//       },
//       {
//         "x": "moto",
//         "y": 131
//       },
//       {
//         "x": "bicycle",
//         "y": 228
//       },
//       {
//         "x": "horse",
//         "y": 34
//       },
//       {
//         "x": "skateboard",
//         "y": 299
//       },
//       {
//         "x": "others",
//         "y": 118
//       }
//     ]
//   },
//   {
//     "id": "Limpieza",
//     "color": "hsl(170, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 293
//       },
//       {
//         "x": "helicopter",
//         "y": 191
//       },
//       {
//         "x": "boat",
//         "y": 255
//       },
//       {
//         "x": "train",
//         "y": 77
//       },
//       {
//         "x": "subway",
//         "y": 267
//       },
//       {
//         "x": "bus",
//         "y": 88
//       },
//       {
//         "x": "car",
//         "y": 31
//       },
//       {
//         "x": "moto",
//         "y": 252
//       },
//       {
//         "x": "bicycle",
//         "y": 296
//       },
//       {
//         "x": "horse",
//         "y": 100
//       },
//       {
//         "x": "skateboard",
//         "y": 7
//       },
//       {
//         "x": "others",
//         "y": 63
//       }
//     ]
//   }
// ]
// This component must be given a height. Otherwise it will not render anything (nivo)
export const IncidentsByMonthOrYear = ({type}) => {
  const [checklistByMonthYear, setChecklistByMonthYear] = useState('month');//'month' || 'year'
  const [data, setData] = useState([]);
  async function retrieveDataBy(period) {
    try {
      const res = await axios.get(`/api/v1/queries/statistics/checklistsByPeriod/${type}/${period}`);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=> {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    retrieveDataBy(checklistByMonthYear);
  }, [checklistByMonthYear]);

  return (
    <>
    <Typography variant="h6" align="center" color="textSecondary">
      nota media por departamento
    </Typography>
    <Box height={500} width="100%">
      <Box height="90%" mx={0.5} width="100%" display="inline-block">
        <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'tiempo',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'nota media',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
          ]}
        />
      </Box>
      <Box height="10%" mx={0.5} width="100%" display="inline-block">
        {/* <FormControl component="fieldset">
        <RadioGroup aria-label="perioricidad" name="periodo" value={checklistByMonthYear} onChange={(event) => {setChecklistByMonthYear(event.target.value);}}> */}
          <FormControlLabel value="month" control={<Radio color="secondary" checked={checklistByMonthYear === 'month'}
            onChange={(event) => {setChecklistByMonthYear(event.target.value)}}/>} label="mensual" />
          <FormControlLabel value="year" control={<Radio color="secondary" checked={checklistByMonthYear === 'year'}
            onChange={(event) => {setChecklistByMonthYear(event.target.value)}}/>} label="anual" />
        {/* </RadioGroup>
        </FormControl> */}
      </Box>
    </Box>
    </>
  )
}

