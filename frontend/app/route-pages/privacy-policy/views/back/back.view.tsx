import { ArrowBack as ArrowLeftIcon } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate } from '@remix-run/react'

export const Back = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <div className="text-center">
      <Button
        startIcon={<ArrowLeftIcon />}
        sx={{
          textTransform: 'uppercase',
          fontWeight: 700,
          '.MuiButton-icon>*:nth-of-type(1)': {
            fontSize: 28,
          },
        }}
        onClick={goBack}
        size="large"
      >
        Back
      </Button>
    </div>
  )
}
