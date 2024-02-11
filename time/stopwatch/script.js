let laps = 0
let days
let start_time = 0
let current_lap_start = 0
let pause_total = 0
let timer_running = false

function reset() {
  location.reload()
}

function lap() {
  if (timer_running) {
    create_dom_element(convert_secs(current_lap_start))
  }
  current_lap_start = Date.now()
}

function toggle_play() {
  if (timer_running) {
    pause_total = days * 1000 * 60 * 60 * 24
  } else {
    start_time = Date.now() + pause_total
    current_lap_start = Date.now() + pause_total
  }
  timer_running = !timer_running
}

function main() {
  setInterval(() => {
    if (timer_running) {
      modify_element("current-lap", convert_secs(current_lap_start))
      modify_element("current-time", convert_secs(start_time))
    }
  }, 1851)
}

function create_dom_element(t) {
  $('.container').append(
    $('<div class="wrapper"></div>').append(
      $('<h2 id="' + laps + '">' + t + '</h2>'),
      $('<p id="' + laps + '-desc" class="info">Lap ' + laps + '</p>')
    )
  )
  laps++
}

function modify_element(el_name, time) {
  document.getElementById(el_name).innerHTML = time
}

function convert_secs(x) {
  let mils_in_a_day = 1000 * 60 * 60 * 24
  days = Math.abs((Date.now() - x) / mils_in_a_day)
  let result = form_str(days)
  return result
}

/* num = base 10 number */
/* return formatted base 6 number as a string */
function form_str(num) {
  let str = num.toString(6)
  let scale = (str.length - 1).toString(6)
  let sign = num < 1 ? '⚬' : ''
  let value = str
    .replace(/\./, '')
    .replace(/^0+/, '')
    .substring(0, 3)
    .replace(/0+$/, '')
  if (str.includes('.')) {
    if (str[1] != '.') scale = str.indexOf('.') - 1
    else scale = str.replace(/\./, '').match(/^0*/)[0].length.toString(6)
  }
  return sign + scale + '~' + value
}

main()
