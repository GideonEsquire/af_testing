const BASE = 12
const SOLAR = get_upcoming_solar_event()
const BROONS = new Date('2022-12-15T19:00:00-05:00').getTime()

function set_it() {
  document.getElementById('bang-time').innerHTML =
    '14~47000000' + convert_secs(0).replace(/0+$/, '')
  modify_element('sun', convert_secs(SOLAR))
  modify_element('bruins', convert_secs(BROONS))
}

function modify_element(el_name, tics) {
  document.getElementById(el_name).innerHTML =
    (tics.length - 1).toString(BASE) +
    '~' +
    tics.substring(0, 3).replace(/0+$/, '')
}

function convert_secs(x) {
  a = Math.abs((Date.now() - x) / 1000)
  let tics = Math.floor(a * 1.78)
  return tics.toString(BASE)
}

function get_upcoming_solar_event() {
  let req_url =
    'https://api.sunrise-sunset.org/json?lat=43.008663&lng=-71.454391&formatted=0'
  let res = make_request(req_url)
  if (Date.now() - res.rise > 0) {
    if (Date.now() - res.set > 0) {
      let res = make_request(req_url + '&date=tomorrow')
      return res.rise
    }
    document.getElementById('until').innerHTML = 'Tics until sunset'
    return res.set
  }
  return res.rise
}

function make_request(url) {
  let res = { rise: 0, set: 0 }
  $.ajax({
    url: url,
    dataType: 'json',
    /* how to make this work when 'true'? */
    async: false,
    success: (data) => {
      res.rise = new Date(data.results.sunrise).getTime()
      res.set = new Date(data.results.sunset).getTime()
    },
  })
  return res
}

setInterval(() => {
  set_it()
}, 1000 * 0.56)
