import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../../config'
import { IObjectResponse } from '../../../types/global.types'
import { IUser } from '../../../types/user.types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req
  console.log(headers)

  try {
    const { data } = await axios.get<IObjectResponse<IUser[]>>(`${config.NETWORK_API}/users`, { headers })

    res.send(data)
  } catch (error) {
    const { status, data } = error.response
    res.status(status).json(data)
  }
}
