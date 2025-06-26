import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

import { ListItemButton, ListItemText } from '@mui/material'

const NavItem = ({
  setOpen,
  item,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
  item: iDrawerItem
}) => {
  const navigate = useNavigate()

  const redirect = (url: string) => {
    navigate(url)
    setOpen(false)
  }

  return item.condition() ? (
    <React.Fragment key={item.id}>
      <ListItemButton onClick={() => redirect(item.url)}>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </React.Fragment>
  ) : (
    <></>
  )
}

export default NavItem
