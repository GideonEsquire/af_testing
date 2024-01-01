async function main() {
  const BROONS = await get_upcoming_bruins_game()
  // const SCHED = await get_upcoming_sched()
  const SOLAR = await get_upcoming_solar_event()
  const EVENTS = [
    {
      id: 'sun',
      time: SOLAR,
      desc: 'Days until next solar event',
    },
    // {
    //   id: 'sched',
    //   time: SCHED.time,
    //   desc: 'Start work',
    // },
    {
      id: 'bruins',
      time: BROONS.time,
      desc: BROONS.desc,
    },
    {
      id: 'ma',
      time: '2024-05-27T00:00:00-05:00',
      desc: "Ma's Birthday",
    },
    {
      id: 'xmas',
      time: '2024-12-25T00:00:00-05:00',
      desc: 'Days until Christmas',
    },
    {
      id: 'covid',
      time: '2020-02-01T00:00:00-05:00',
      desc: 'Days since start of Covid',
    },
    {
      id: 'old',
      time: '1988-02-14T00:00:00-05:00',
      desc: 'How old I am',
    },
    {
      id: 'mayflower',
      time: '1620-11-20T00:00:00-05:00',
      desc: "Days since Mayflower's voyage",
    },
  ]

  EVENTS.forEach((e) => {
    create_dom_element(e)
  })

  setInterval(() => {
    document.getElementById('current-time').innerHTML = '5~' + convert_secs(0)
      .replace(/0+$/, '')
    EVENTS.forEach((e) => {
      modify_element(e.id, convert_secs(e.time), e.desc)
    })
  }, 1000)
}

function create_dom_element(e) {
  $('.container').append(
    $('<div class="wrapper"></div>').append(
      $('<h2 id="' + e.id + '"></h2>'),
      $('<p id="' + e.id + '-desc" class="info"></p>')
    )
  )
}

function modify_element(el_name, days, desc) {
  document.getElementById(el_name).innerHTML =
    (days.length - 5).toString(6) +
    '~' +
    days.substring(0, 4).replace(/0+$/, '')
  document.getElementById(el_name + '-desc').innerHTML = desc
}

function convert_secs(x) {
  let get_time = new Date(x).getTime()
  let mils_in_a_day = 1000 * 60 * 60 * 24
  let days = Math.abs((Date.now() - get_time) / mils_in_a_day)
  let result = Number(days.toString(6)).toFixed(4).replace(/\./, '')
  return result
}

async function get_upcoming_sched() {
  let res = {}
  let data = {}
  await $.getJSON('../sched.json', (json) => {
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

async function get_upcoming_bruins_game() {
  let res = {}
  let data = {}
  await $.getJSON('../bruins.json', (json) => {
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

async function get_upcoming_solar_event() {
  let store = window.localStorage
  let local_item = Number(store.getItem('solar'))
  if (local_item && local_item > Date.now()) {
    return local_item
  }

  console.log('api request made')
  let req_url =
    //'https://api.sunrise-sunset.org/json?lat=43.008663&lng=-71.454391&formatted=0'//manch
    'https://api.sunrise-sunset.org/json?lat=34.0445189&lng=-118.2450975&formatted=0' //LA
  let res = await make_request(req_url)
  if (Date.now() > res.rise) {
    if (Date.now() > res.set) {
      let res = await make_request(req_url + '&date=tomorrow')
      store.setItem('solar', res.rise)
      return res.rise
    }
    store.setItem('solar', res.set)
    return res.set
  }
  store.setItem('solar', res.rise)
  return res.rise
}

async function make_request(url) {
  let res = { rise: 0, set: 0 }
  await $.ajax({
    url: url,
    dataType: 'json',
    success: (data) => {
      res.rise = new Date(data.results.sunrise).getTime()
      res.set = new Date(data.results.sunset).getTime()
    },
  })
  return res
}

main()