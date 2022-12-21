async function main() {
  const EVENTS = [
    {
      id: 'sun',
      length: 5829120000000,
      desc: 'Lucks to the sun',
    },
    {
      id: 'star',
      length: 40208000000000 * 39370,
      desc: 'Lucks to next nearest star',
    },
    {
      id: 'inch',
      length: 1,
      desc: 'Lucks in one inch',
    },
    {
      id: 'foot',
      length: 12,
      desc: 'Lucks in one foot',
    },
    {
      id: 'millimeter',
      length: 0.03937008,
      desc: 'Lucks in one millimeter',
    },
    {
      id: 'planck',
      length: 6.362401574 * 10 ** -34,
      desc: 'Lucks in one Planck length',
    },
    {
      id: 'universe',
      length: 10 ** 28 * 5280 * 12,
      desc: 'Radius of the known universe',
    },
    {
      id: 'trip',
      length: 2451 * 5280 * 12,
      desc: 'NY to LA',
    },
  ]

  EVENTS.forEach((e) => {
    create_dom_element(e)
    modify_element(e.id, e.length / 1.28, e.desc)
  })
}

function create_dom_element(e) {
  $('.container').append(
    $('<div class="wrapper"></div>').append(
      $('<h2 id="' + e.id + '"></h2>'),
      $('<p id="' + e.id + '-desc" class="info"></p>')
    )
  )
}

function modify_element(el_name, lucks, desc) {
  document.getElementById(el_name).innerHTML = form_str(lucks)
  document.getElementById(el_name + '-desc').innerHTML = desc
}

/* num = base 10 number */
/* return formatted base 12 number as a string */
function form_str(num) {
  let str = num.toString(12)
  let scale = str.length - 1
  let sign = num < 1 ? '⚬' : ''
  let value = str
    .replace(/\./, '')
    .replace(/^0+/, '')
    .substring(0, 3)
    .replace(/0+$/, '')
  if (str.includes('.')) {
    for (let i = 1; i < str.length; i++) {
      if ((str[i] = '.')) scale = i - 1
      if (str[0] != '0') break
      scale++
      if (str[i + 1] != '0') break
    }
  }
  scale = scale.toString(12)
  return sign + scale + '~' + value
}

main()
