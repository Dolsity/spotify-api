import React, { type Dispatch, type SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'

const DrawerDropdown = ({
  setOpen,
  dropdown,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
  dropdown: iDrawerDropdown
}) => {
  const navigate = useNavigate()

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const redirect = (url: string) => {
    navigate(url)
    setOpen(false)
  }

  return dropdown.condition() ? (
    <React.Fragment key={dropdown.id}>
      <ListItemButton onClick={() => setDropdownOpen(!dropdownOpen)}>
        <ListItemText primary={dropdown.title} />
        {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {dropdown.items.map((item) =>
            item.condition() ? (
              <ListItemButton key={item.id} sx={{ pl: 4 }} onClick={() => redirect(item.url)}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ) : null
          )}
        </List>
      </Collapse>
    </React.Fragment>
  ) : (
    <></>
  )
}

export default DrawerDropdown
