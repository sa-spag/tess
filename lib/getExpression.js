module.exports = function (set, ...variables) {
  let selected = set
  if (Array.isArray(set)) {
    const random = Math.random()
    const evenWeight = 1 / set.length
    let weightSum = 0
    selected = set.find(value => {
      weightSum += value.p || evenWeight
      return weightSum > random
    }) || set[set.length - 1]
    selected = selected.value || selected
  }
  if (typeof selected === 'string') return selected
  if (typeof selected === 'function') return selected(...variables)
  throw new TypeError(`${set} cannot be reduced to a string nor a function`)
}
