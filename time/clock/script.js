function main() {
  build_data()
  setInterval(() => { build_data() }, 1000)
}

function build_data() {
  let days = -(new Date(0).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  let str = form_str(days)
  for (let i = 0; i < 3; i++) {
    document.getElementsByTagName('h1')[i].innerHTML = str.substring(i*3, i*3 + 3).replace(/0+$/, '')
  }
}

/* num = base 10 number */
/* return formatted base 6 number as a string */
function form_str(num) {
  let str = num.toString(6)
  let value = str
  .replace(/\./, '')
  .replace(/^0+/, '')
  .substring(0, 9)
  return value
}

main()
