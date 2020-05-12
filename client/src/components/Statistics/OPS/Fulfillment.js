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
    "ops#1": 148,
    "ops#1Color": "hsl(299, 70%, 50%)",
    "ops#2": 75,
    "ops#2Color": "hsl(103, 70%, 50%)",
    "ops#3": 104,
    "ops#3Color": "hsl(19, 70%, 50%)",
    "ops#4": 59,
    "ops#4Color": "hsl(327, 70%, 50%)",
    "ops#5": 199,
    "ops#5Color": "hsl(334, 70%, 50%)",
    "ops#6": 154,
    "ops#6Color": "hsl(204, 70%, 50%)"
  },
  {
    "country": "Febrero",
    "ops#1": 88,
    "ops#1Color": "hsl(66, 70%, 50%)",
    "ops#2": 146,
    "ops#2Color": "hsl(30, 70%, 50%)",
    "ops#3": 11,
    "ops#3Color": "hsl(105, 70%, 50%)",
    "ops#4": 23,
    "ops#4Color": "hsl(292, 70%, 50%)",
    "ops#5": 187,
    "ops#5Color": "hsl(36, 70%, 50%)",
    "ops#6": 40,
    "ops#6Color": "hsl(347, 70%, 50%)"
  },
  {
    "country": "Marzo",
    "ops#1": 120,
    "ops#1Color": "hsl(275, 70%, 50%)",
    "ops#2": 199,
    "ops#2Color": "hsl(259, 70%, 50%)",
    "ops#3": 161,
    "ops#3Color": "hsl(36, 70%, 50%)",
    "ops#4": 178,
    "ops#4Color": "hsl(222, 70%, 50%)",
    "ops#5": 8,
    "ops#5Color": "hsl(343, 70%, 50%)",
    "ops#6": 8,
    "ops#6Color": "hsl(343, 70%, 50%)"
  },
  {
    "country": "Abril",
    "ops#1": 33,
    "ops#1Color": "hsl(326, 70%, 50%)",
    "ops#2": 171,
    "ops#2Color": "hsl(183, 70%, 50%)",
    "ops#3": 112,
    "ops#3Color": "hsl(351, 70%, 50%)",
    "ops#4": 149,
    "ops#4Color": "hsl(209, 70%, 50%)",
    "ops#5": 122,
    "ops#5Color": "hsl(234, 70%, 50%)",
    "ops#6": 122,
    "ops#6Color": "hsl(293, 70%, 50%)"
  },
  {
    "country": "Mayo",
    "ops#1": 162,
    "ops#1Color": "hsl(287, 70%, 50%)",
    "ops#2": 91,
    "ops#2Color": "hsl(124, 70%, 50%)",
    "ops#3": 102,
    "ops#3Color": "hsl(283, 70%, 50%)",
    "ops#4": 86,
    "ops#4Color": "hsl(334, 70%, 50%)",
    "ops#5": 12,
    "ops#5Color": "hsl(177, 70%, 50%)",
    "ops#6": 37,
    "ops#6Color": "hsl(105, 70%, 50%)"
  },
  {
    "country": "Junio",
    "ops#1": 133,
    "ops#1Color": "hsl(244, 70%, 50%)",
    "ops#2": 163,
    "ops#2Color": "hsl(56, 70%, 50%)",
    "ops#3": 51,
    "ops#3Color": "hsl(90, 70%, 50%)",
    "ops#4": 152,
    "ops#4Color": "hsl(339, 70%, 50%)",
    "ops#5": 146,
    "ops#5Color": "hsl(73, 70%, 50%)",
    "ops#6": 8,
    "ops#6Color": "hsl(289, 70%, 50%)"
  },
  {
    "country": "Julio",
    "ops#1": 83,
    "ops#1Color": "hsl(207, 70%, 50%)",
    "ops#2": 189,
    "ops#2Color": "hsl(136, 70%, 50%)",
    "ops#3": 78,
    "ops#3Color": "hsl(164, 70%, 50%)",
    "ops#4": 117,
    "ops#4Color": "hsl(156, 70%, 50%)",
    "ops#5": 140,
    "ops#5Color": "hsl(139, 70%, 50%)",
    "ops#6": 193,
    "ops#6Color": "hsl(262, 70%, 50%)"
  }
]
export const Fulfillment = () => (
  <Box height={500} width="100%">
    <Box height="90%" mx={0.5} width="100%" display="inline-block">
      <ResponsiveBar
          data={data}
          keys={[ 'ops#1', 'ops#2', 'ops#3', 'ops#4', 'ops#5', 'ops#6' ]}
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
                      id: 'ops#5'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'ops#3'
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