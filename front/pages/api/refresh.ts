import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req
  try {
    const { data, headers: returnedHeaders } = await axios.post(`${config.PUBLIC_API}/auth/refresh`, undefined, {
      headers
    })

    Object.keys(returnedHeaders).forEach((key) => res.setHeader(key, returnedHeaders[key]))

    res.status(200).json(data)
  } catch (error) {
    res.send(error)
  }
}
