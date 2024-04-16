import status from './index'

export default function handler(req, res) {
  const { status: n } = req.query
  status = n
  return res.json({ status })
}
