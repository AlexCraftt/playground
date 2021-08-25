const throttle = (upTime, fn, ...args) => {
  let timer
  let wait = false
  let wrapped

  const throttled = (...par) => {
    timer = undefined
    if (wait) wrapped(...par)
  }

  wrapped = (...par) => {
    if (!timer) {
      timer = setTimeout(throttled, upTime, ...par)
      wait = false
      return fn(...args.concat(par))
    } else {
      wait = true
    }
  }

  return wrapped
}

const someLog = (...args) => {
  console.log(`Fn called! Arguments: ${args}`)
}

const ft200 = throttle(200, someLog, '200ms!')

const timer = setInterval(() => {
  someLog('everytime!')
  ft200()
}, 50)

setTimeout(() => {
  clearInterval(timer)
}, 2000)