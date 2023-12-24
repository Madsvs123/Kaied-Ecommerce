import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useSpring, animated } from '@react-spring/web'
import { BarChart, LineChart } from '@mui/x-charts';


const DashboardBox = (props) => {
  const {palette} = useTheme()

  return (
    <Box sx={{
      backgroundColor : palette.background.alt,
      padding : '1rem',
      borderRadius : '1.5rem',
      boxShadow : `1px 1px 6px 3px rgba(0, 0, 0, .1)`,
      ...props.style
    }}
    >
      {props.children}
    </Box>
  )
}

const Counter = ({count}) => {
  const { number } = useSpring({
    from : {number : 0},
    number : count,
    delay : 300,
    config : {mass : 3, tension : 50, friction : 65, frequency: 3}
  })

  return (
    <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
  )
}

const Dashboard = () => {
  const {palette} = useTheme()
  

  
  return (
    <div style={{
      display : 'grid',
      gridTemplateColumns : 'repeat(12, minmax(0 , 1fr))',
      gridTemplateRows : 'repeat(12, minmax(0 , 1fr))',
      gap: "1rem"
    }}
    >

      <DashboardBox style={{gridColumn:"span 2", gridRow:"span 2"}}>
          <div>
          <Typography variant='h2' color={palette.primary.dark} noWrap fontWeight="600">
            <Counter count={400}/>
          </Typography>
          <Typography variant='h2' color={palette.neutral.dark} fontWeight="600">
            Customers
          </Typography >
          </div>
          <div>
          <Typography variant='h6' color={palette.neutral.dark} fontWeight="500">
          <span style={{color : palette.primary.dark}}>+8</span> this day
          </Typography>
          </div>
          </DashboardBox>


      <DashboardBox style={{gridColumn:"span 3", gridRow:"span 2"}}>
          <div>
          <Typography variant='h2' color={palette.primary.dark} noWrap fontWeight="600">
          <Counter count={320}/>
          </Typography>
          <Typography variant='h2' color={palette.neutral.dark} fontWeight="600">
            Products
          </Typography>
          </div>
          <div>
          <Typography variant='h6' color={palette.neutral.dark} fontWeight="500">
            <span style={{color : palette.primary.dark}}>+8</span> this day
          </Typography>
          </div>
      </DashboardBox>


      <DashboardBox style={{gridColumn:"span 4", gridRow:"span 6"}}>
          <div>
          <Typography variant='h2' color={palette.primary.dark} noWrap fontWeight="600">
          <Counter count={2987}/>
          </Typography>
          <Typography variant='h2' color={palette.neutral.dark} fontWeight="600">
            Orders
          </Typography>
          </div>
          <div>
          <Typography variant='h6' color={palette.neutral.dark} fontWeight="500">
            <span style={{color : palette.primary.dark}}>+8</span> this day
          </Typography>
          </div>
          <div>
            <LineChart 
             xAxis={[
              {data : [1 ,2 , 3, 4, 5, 6, 7]}
             ]}

             series={[{
              data : [3, 5.5, 6, 8.5, 9]
             }]}
             width={400}
             height={400}
            />
          </div>
      </DashboardBox>


      <DashboardBox style={{gridColumn:"span 3", gridRow:"span 2"}}>
          <div>
          <Typography variant='h2' color={palette.primary.dark} noWrap fontWeight="600">
          <Counter count={1240}/>
          </Typography>
          <Typography variant='h2' color={palette.neutral.dark} fontWeight="600">
            Customers
          </Typography>
          </div>
          <div>
          <Typography variant='h6' color={palette.neutral.dark} fontWeight="500">
            <span style={{color : palette.primary.dark}}>+8</span> this day
          </Typography>
          </div>
      </DashboardBox>


      <DashboardBox style={{gridRowStart:"3", gridRowEnd: "7", gridColumn:"span 5"}}>
      <BarChart
      xAxis={[
        {
          data: ['1 Month', '2 Month', "3 Month", '4 Month', '5 Month'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [1, 4, 6, 9 ,17],
          color : palette.primary.dark
        }
      ]}
      width={500}
      height={300}
    />

      </DashboardBox>
      
    </div>
  )
}

export default Dashboard