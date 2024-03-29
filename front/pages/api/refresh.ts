import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req
  try {
    const { data, headers: returnedHeaders } = await axios.post(`${config.NETWORK_API}/auth/refresh`, undefined, {
      headers
    })

    Object.keys(returnedHeaders).forEach((key) => res.setHeader(key, returnedHeaders[key]))
    res.status(200).json({ ...data, refreshToken: res.getHeader('set-cookie')[0] })
  } catch (error) {
    res.send(error)
  }
}
