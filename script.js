async function main() {
  const BROONS = await get_upcoming_bruins_game()
  const EVENTS = [
    {
      id: 'sun',
      time: get_upcoming_solar_event(),
      desc: 'Tics until next solar event',
    },
    {
      id: 'bruins',
      time: BROONS.time,
      desc: BROONS.desc,
    },
    {
      id: 'xmas',
      time: new Date('2022-12-25T00:00:00-05:00').getTime(),
      desc: 'Tics until Christmas',
    },
    {
      id: 'ma',
      time: new Date('2023-05-27T00:00:00-05:00').getTime(),
      desc: "Ma's Birthday",
    },
    {
      id: 'covid',
      time: new Date('2020-02-01T00:00:00-05:00').getTime(),
      desc: 'Covid-19 outbreak',
    },
    {
      id: 'old',
      time: new Date('1988-02-14T00:00:00-05:00').getTime(),
      desc: 'How old I am',
    },
    {
      id: 'mayflower',
      time: new Date('1620-11-20T00:00:00-05:00').getTime(),
      desc: "Mayflower's voyage",
    },
  ]

  EVENTS.forEach((e) => {
    create_dom_element(e)
  })

  setInterval(() => {
    document.getElementById('bang-time').innerHTML =
      '14~47000000' + convert_secs(0).replace(/0+$/, '')
    EVENTS.forEach((e) => {
      modify_element(e.id, convert_secs(e.time), e.desc)
    })
  }, 1000 * 0.56)
}

function create_dom_element(e) {
  $('.container').append(
    $('<div class="wrapper"></div>').append(
      $('<h2 id="' + e.id + '"></h2>'),
      $('<p id="' + e.id + '-desc" class="info"></p>')
    )
  )
}

function modify_element(el_name, tics, desc) {
  document.getElementById(el_name).innerHTML =
    (tics.length - 1).toString(12) +
    '~' +
    tics.substring(0, 3).replace(/0+$/, '')
  document.getElementById(el_name + '-desc').innerHTML = desc
}

function convert_secs(x) {
  a = Math.abs((Date.now() - x) / 1000)
  let tics = Math.floor(a * 1.78)
  return tics.toString(12)
}

async function get_upcoming_bruins_game() {
  let res = {}
  let data = {}
  await $.getJSON('bruins.json', (json) => {
    data = json
  })
  for (let i = 0; i < data.schedule.length; i++) {
    let d = new Date(data.schedule[i].DTSTART).getTime()
    if (d > Date.now()) {
      res.desc = data.schedule[i].SUMMARY
      res.time = d
      break
    }
  }
  return res
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

main()
