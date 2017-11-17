// Walls: ┘ ┐ ┌ └ ┼ ─ ├ ┤ ┴ ┬ │

const maze = `
* * *│* * *
 ┌── │ ────
o│* *│* * *
 │ ──┼────
*│* *│* * o
 ├── │ ┌──
*│* * *│* *
 └───┬─┴─┐
* * *│* *│*
 ──┐ │ ┌─┘
* *│* *│* *
`

function isOpen (element) {
  const walls = ['┘', '┐', '┌', '└', '┼', '─', '├', '┤', '┴', '┬', '│', undefined]
  return !walls.includes(element)
}

function getMarkers (mazeArray) {
  const marker = 'o'
  return mazeArray.filter((row, r) => r % 2 === 0).reduce((markers, row, r) => markers.concat(
    row
      .filter((element, c) => c % 2 === 0)
      .map((element, column) => ({ element, column }))
      .filter(({ element }) => element === marker)
      .map(({ column }) => ({ row: r, column }))
  ), [])
}

function getMazeArray (maze) {
  const mazeLines = maze.split('\n')
  const width = mazeLines.reduce((max, line) => Math.max(max, line.length))
  return mazeLines
    .filter(line => line.length > 0)
    .map(line => Array.from(line.padEnd(width)))
}

function getDirectionMatrix (mazeArray) {
  const width = (mazeArray[0].length + 1) / 2
  const height = (mazeArray.length + 1) / 2
  const tree = Array(height).fill(Array(width).fill())
  return tree
    .map((row, r) => row.map((element, c) => {
      const r2 = 2 * r
      const c2 = 2 * c
      let connections = ''
      const previousRow = mazeArray[r2 - 1]
      const nextRow = mazeArray[r2 + 1]
      if (isOpen(previousRow && previousRow[c2])) connections += 'u'
      if (isOpen(nextRow && nextRow[c2])) connections += 'd'
      if (isOpen(mazeArray[r2][c2 - 1])) connections += 'l'
      if (isOpen(mazeArray[r2][c2 + 1])) connections += 'r'
      return connections
    }))
}

function findRoute (departure, arrival, mazeMatrix, previousMoves = '') {
  if (departure.row === arrival.row && departure.column === arrival.column) return previousMoves
  const previousMove = previousMoves.slice(-1)
  const forward = (move) =>
    (move === 'u' && previousMove !== 'd') ||
    (move === 'd' && previousMove !== 'u') ||
    (move === 'l' && previousMove !== 'r') ||
    (move === 'r' && previousMove !== 'l')

  const directions = {
    u: { row: -1, column: 0 },
    d: { row: 1, column: 0 },
    l: { row: 0, column: -1 },
    r: { row: 0, column: 1 }
  }

  const validMoves = Array.from(mazeMatrix[departure.row][departure.column]).filter(forward)
  if (validMoves.length === 0) return
  let route
  validMoves.some(move => {
    const direction = directions[move]
    let newPosition = {
      row: departure.row + direction.row,
      column: departure.column + direction.column
    }
    const subRoute = findRoute(newPosition, arrival, mazeMatrix, previousMoves + move)
    route = subRoute && (route || '') + subRoute
    return route !== undefined
  })

  return route
}

function zipRoute (route, previousDirection = '', occurrences = 1) {
  const direction = route[0]
  const remainingRoute = route.slice(1)
  if (direction === previousDirection) return zipRoute(remainingRoute, direction, occurrences + 1)
  return (occurrences > 1 ? occurrences : '') +
    previousDirection +
    (direction ? zipRoute(remainingRoute, direction) : '')
}

const mazeArray = getMazeArray(maze)
const mazeMatrix = getDirectionMatrix(mazeArray)
const route = findRoute({ row: 5, column: 1 }, { row: 5, column: 4 }, mazeMatrix)
console.log(mazeArray)
console.log(getMarkers(mazeArray))
console.log(mazeMatrix)
console.log(route)
console.log(zipRoute('luuuuurrdldrdrurrdddll'))
