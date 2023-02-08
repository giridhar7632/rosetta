import authenticationMiddleware from '../../../utils/authorizationMiddleware'
import prisma from '../../../utils/prisma'

export default authenticationMiddleware(async function handle(req, res) {
  const { data } = req.body
  console.log(req.body)
  try {
    const userId = req.user
    const link = await prisma.links.create({
      data: { ...data, User: { connect: { id: userId } } },
    })
    res.status(200).json({ message: 'Link created!', link, type: 'success' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error?.message || 'Something went wrong!',
      type: 'error',
    })
  } finally {
    await prisma.$disconnect()
  }
})
