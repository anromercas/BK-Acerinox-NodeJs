import React from 'react'
import Box from '@material-ui/core/Box'
import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
  {
    "country": "Enero",
    "Acería": 148,
    "AceríaColor": "hsl(299, 70%, 50%)",
    "Office": 75,
    "OfficeColor": "hsl(103, 70%, 50%)",
    "Corte": 104,
    "CorteColor": "hsl(19, 70%, 50%)",
    "Distribución": 59,
    "DistribuciónColor": "hsl(327, 70%, 50%)",
    "Limpieza": 199,
    "LimpiezaColor": "hsl(334, 70%, 50%)",
    "Transporte": 154,
    "TransporteColor": "hsl(204, 70%, 50%)"
  },
  {
    "country": "Febrero",
    "Acería": 88,
    "AceríaColor": "hsl(66, 70%, 50%)",
    "Office": 146,
    "OfficeColor": "hsl(30, 70%, 50%)",
    "Corte": 11,
    "CorteColor": "hsl(105, 70%, 50%)",
    "Distribución": 23,
    "DistribuciónColor": "hsl(292, 70%, 50%)",
    "Limpieza": 187,
    "LimpiezaColor": "hsl(36, 70%, 50%)",
    "Transporte": 40,
    "TransporteColor": "hsl(347, 70%, 50%)"
  },
  {
    "country": "Marzo",
    "Acería": 120,
    "AceríaColor": "hsl(275, 70%, 50%)",
    "Office": 199,
    "OfficeColor": "hsl(259, 70%, 50%)",
    "Corte": 161,
    "CorteColor": "hsl(36, 70%, 50%)",
    "Distribución": 178,
    "DistribuciónColor": "hsl(222, 70%, 50%)",
    "Limpieza": 8,
    "LimpiezaColor": "hsl(343, 70%, 50%)",
    "Transporte": 8,
    "TransporteColor": "hsl(343, 70%, 50%)"
  },
  {
    "country": "Abril",
    "Acería": 33,
    "AceríaColor": "hsl(326, 70%, 50%)",
    "Office": 171,
    "OfficeColor": "hsl(183, 70%, 50%)",
    "Corte": 112,
    "CorteColor": "hsl(351, 70%, 50%)",
    "Distribución": 149,
    "DistribuciónColor": "hsl(209, 70%, 50%)",
    "Limpieza": 122,
    "LimpiezaColor": "hsl(234, 70%, 50%)",
    "Transporte": 122,
    "TransporteColor": "hsl(293, 70%, 50%)"
  },
  {
    "country": "Mayo",
    "Acería": 162,
    "AceríaColor": "hsl(287, 70%, 50%)",
    "Office": 91,
    "OfficeColor": "hsl(124, 70%, 50%)",
    "Corte": 102,
    "CorteColor": "hsl(283, 70%, 50%)",
    "Distribución": 86,
    "DistribuciónColor": "hsl(334, 70%, 50%)",
    "Limpieza": 12,
    "LimpiezaColor": "hsl(177, 70%, 50%)",
    "Transporte": 37,
    "TransporteColor": "hsl(105, 70%, 50%)"
  },
  {
    "country": "Junio",
    "Acería": 133,
    "AceríaColor": "hsl(244, 70%, 50%)",
    "Office": 163,
    "OfficeColor": "hsl(56, 70%, 50%)",
    "Corte": 51,
    "CorteColor": "hsl(90, 70%, 50%)",
    "Distribución": 152,
    "DistribuciónColor": "hsl(339, 70%, 50%)",
    "Limpieza": 146,
    "LimpiezaColor": "hsl(73, 70%, 50%)",
    "Transporte": 8,
    "TransporteColor": "hsl(289, 70%, 50%)"
  },
  {
    "country": "Julio",
    "Acería": 83,
    "AceríaColor": "hsl(207, 70%, 50%)",
    "Office": 189,
    "OfficeColor": "hsl(136, 70%, 50%)",
    "Corte": 78,
    "CorteColor": "hsl(164, 70%, 50%)",
    "Distribución": 117,
    "DistribuciónColor": "hsl(156, 70%, 50%)",
    "Limpieza": 140,
    "LimpiezaColor": "hsl(139, 70%, 50%)",
    "Transporte": 193,
    "TransporteColor": "hsl(262, 70%, 50%)"
  }
]
export const Fulfillment = () => (
  <Box height={500} width="100%">
    <Box height="90%" mx={0.5} width="100%" display="inline-block">
      <ResponsiveBar
          data={data}
          keys={[ 'Acería', 'Office', 'Corte', 'Distribución', 'Limpieza', 'Transporte' ]}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'nivo' }}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: 'Limpieza'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'Corte'
                  },
                  id: 'lines'
              }
          ]}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'mes',
              legendPosition: 'middle',
              legendOffset: 32
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '%realización',
              legendPosition: 'middle',
              legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          legends={[
              {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
      />
      </Box>
  <Box height="10%" mx={0.5} width="100%" display="inline-block">

  </Box>
</Box>
   
)