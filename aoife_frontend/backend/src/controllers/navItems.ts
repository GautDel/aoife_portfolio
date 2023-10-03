import { Request, Response, NextFunction } from 'express'

import NavItem from '../models/NavItem.js'

export const getNavItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const navItems = await NavItem.find()
    if (!navItems) {
      res
        .status(400)
        .json({ success: false, error: 'No navItems found in database' })
    }
    res.status(200).json({ success: true, data: navItems })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

