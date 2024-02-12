let laps = 0
let days
let cur_days
let start_time = 0
let current_lap_start = 0
let pause_total = 0
let cur_total = 0
let timer_running = false

function reset() {
  location.reload()
}

function lap() {
  if (timer_running) {
    // TODO: Still haven't figured this out...
    create_dom_element(convert_secs('lap', current_lap_start - cur_total))
  }
  current_lap_start = Date.now()
}

function toggle_play() {
  if (timer_running) {
    document.getElementById("button-play").style["background-color"] = "var(--dark0)";
    pause_total = days * 1000 * 60 * 60 * 24
    cur_total = cur_days * 1000 * 60 * 60 * 24
  } else {
    document.getElementById("button-play").style["background-color"] = "var(--dark3)";
    start_time = Date.now() - pause_total
    current_lap_start = Date.now() - cur_total
  }
  timer_running = !timer_running
}

function main() {
  setInterval(() => {
    if (timer_running) {
      modify_element("current-lap", convert_secs('lap', current_lap_start))
      modify_element("current-time", convert_secs('total', start_time))
    }
  }, 1851/6)
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

function convert_secs(t, x) {
  let mils_in_a_day = 1000 * 60 * 60 * 24
  let result
  if (t === 'total') {
    days = Math.abs((Date.now() - x) / mils_in_a_day)
    result = form_str(days)
  }
  if (t === 'lap') {
    cur_days = Math.abs((Date.now() - x) / mils_in_a_day)
    result = form_str(cur_days)
  }
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
