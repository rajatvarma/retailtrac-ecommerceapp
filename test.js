const dict = {
    name: 'rajat',
    age: 15,
    chungus: true
}

const list = Array(3).fill(dict)

const json = JSON.stringify({'list': list})

console.log(JSON.parse(json).list[0].name);