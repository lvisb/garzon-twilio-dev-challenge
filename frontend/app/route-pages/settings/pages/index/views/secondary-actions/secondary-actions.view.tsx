import { Button, Link } from '@mui/material'
import { Link as RemixLink, useNavigate } from '@remix-run/react'
import { useState } from 'react'

export const SecondaryActions = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex justify-between items-center">
        <Link
          component={RemixLink}
          to="/logout"
          sx={{
            textTransform: 'lowercase',
            fontSize: 20,
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Logout
        </Link>

        <Button
          type="button"
          variant="text"
          color="error"
          size="small"
          sx={{ textTransform: 'lowercase', fontSize: 12 }}
          onClick={() => {
            navigate('/settings/delete-account')
          }}
        >
          Delete my account
        </Button>
      </div>
    </>
  )
}
