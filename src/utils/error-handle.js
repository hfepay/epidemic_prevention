window.addEventListener('unhandledrejection', event => {
  console.warn(event.reason)
})

window.addEventListener('rejectionhandled', event => {
  console.log(event)
})
