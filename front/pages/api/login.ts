import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req

  try {
    const { data, headers: returnedHeaders } = await axios.post(`${config.NETWORK_API}/auth/signin`, body, { headers })

    // transfer headers to next response
    Object.entries(returnedHeaders).forEach((keyArr) => res.setHeader(keyArr[0], keyArr[1] as string))
    res.send(data)
  } catch (err) {
    const { status, data } = err.response
    res.status(status).json(data)
  }
}
