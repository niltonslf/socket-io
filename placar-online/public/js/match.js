$(function() {
  const socket = io()
  socket.on('connect', () => {
    console.log('connected')
  })
  socket.on('score', score => {
    console.log({ score })
  })
})
