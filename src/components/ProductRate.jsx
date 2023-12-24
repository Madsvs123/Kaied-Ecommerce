import { Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useTheme } from '@emotion/react';

const ProductRate = ({rate, style}) => {

    const NoRate = [StarBorderIcon, StarBorderIcon, StarBorderIcon, StarBorderIcon, StarBorderIcon]
    const newRate= NoRate.fill(StarIcon, 0 ,rate)
    const { palette } = useTheme()
    
  return (
    <Box display="flex"
    alignItems="center"
    sx={style}>
        {newRate.map((Element, key) => {
            return <Element sx={{color : palette.primary.main}} key={key} />
        })}
        <span
           style={{
            color : palette.neutral.dark,
            marginLeft : "3px"
           }}
        >
            ({rate})
        </span>
    </Box>
  )
}

export default ProductRate