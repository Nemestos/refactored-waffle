import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../config'
import { IUser } from '../../types/user.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req

  try {
    const { data } = await axios.get<IUser>(`${config.NETWORK_API}/auth/me`, { headers })

    res.send(data)
  } catch (error) {
    const { status, data } = error.response
    res.status(status).json(data)
  }
}
