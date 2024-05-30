function main() {
  build_date()
  setInterval(() => {
    build_date()
  }, 1000)
}

function build_date() {
  let days = (Date.now() - new Date(0).getTime()) / (1000 * 60 * 60 * 24)
  let str = form_str(days)
  for (let i = 0; i < 3; i++) {
    document.getElementsByTagName('h1')[i].innerHTML = str
      .substring(i * 3, i * 3 + 3)
      .replace(/0+$/, '')
  }
}

/* num = base 10 number */
/* return formatted base 6 number as a string */
function form_str(num) {
  let str = num.toString(6)
  let value = str.replace(/\./, '').replace(/^0+/, '').substring(0, 9)
  return value
}

main()
