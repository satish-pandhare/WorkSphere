// socket.js
import { Server } from 'socket.io'
import logger from './logger.js'

const userSocketMap = {}

let io

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173',
              'https://work-sphere-alpha.vercel.app'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    logger.info(`A user connected ${socket.id}`)

    const { userId } = socket.handshake.query
    if (userId) userSocketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
      logger.info(`A user disconnected ${socket.id}`)
      delete userSocketMap[userId]
      io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
  })
}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]
}

export { io }
