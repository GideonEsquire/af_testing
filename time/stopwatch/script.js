const DAY_IN_MILS = 1000 * 60 * 60 * 24
let laps = 0
let elapsed_total
let cur_days
let timestamp_first_start = 0
let current_lap_start = 0
let pause_total = 0
let cur_total = 0
let timer_running = false

function main() {
  setInterval(() => {
    if (timer_running) {
      modify_element('current-lap', convert_secs('lap', current_lap_start))
      modify_element('total-time', convert_secs('total', timestamp_first_start))
    }
  }, 308)
}

function reset() {
  location.reload()
}

function lap() {
  if (timer_running) {
    create_dom_element(convert_secs('lap', current_lap_start))
  }
  current_lap_start = Date.now()
}

function toggle_play() {
  if (timer_running) {
    change_button('var(--dark0)')
    pause_total = elapsed_total * DAY_IN_MILS
    cur_total = cur_days * DAY_IN_MILS
  } else {
    change_button('var(--dark3)')
    timestamp_first_start = Date.now() - pause_total
    current_lap_start = Date.now() - cur_total
  }
  timer_running = !timer_running
}

function change_button(color) {
  document.getElementById('button-play').style['background-color'] = color
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
  let result
  if (t === 'total') {
    elapsed_total = Math.abs((Date.now() - x) / DAY_IN_MILS)
    result = form_str(elapsed_total)
  }
  if (t === 'lap') {
    cur_days = Math.abs((Date.now() - x) / DAY_IN_MILS)
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
    if (str[1] != '.') scale = (str.indexOf('.') - 1).toString(6)
    else scale = str.replace(/\./, '').match(/^0*/)[0].length.toString(6)
  }
  return sign + scale + '~' + value
}

main()
