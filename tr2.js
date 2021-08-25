const throttle = (upTime, fn, ...args) => {
  let timer
  let isUpTime = true

  let STUFF = (...par) => {
    if (!timer) {
      timer = setTimeout((...par) => {
        timer = undefined
        if (!isUpTime) STUFF(...par)
      }, upTime, ...par)
      isUpTime = true
      return fn(...args, ...par)
    } else {
      isUpTime = false
    }
  }
  return STUFF
}

const someLog = (...args) => {
  console.log(`Ты можешь скушать пирожок: ${args}`)
}

const ft1000 = throttle(1000, someLog, 'каждые 1000 мс', ' печаль =(')

const timer = setInterval(() => {
  someLog('Да хоть когда!', ' Жирабас!')
  ft1000()
}, 50)

setTimeout(() => {
  clearInterval(timer)
}, 2000)
