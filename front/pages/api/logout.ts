import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req
  try {
    const { data, headers: returnedHeaders } = await axios.delete(`${config.NETWORK_API}/auth/logout`, {
      headers
    })

    Object.keys(returnedHeaders).forEach((key) => res.setHeader(key, returnedHeaders[key]))
    res.send(data)
  } catch (error) {
    res.send(error)
  }
}
