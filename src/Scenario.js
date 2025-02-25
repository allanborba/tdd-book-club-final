export default class Scenario {
  constructor({name, min, max, average, p95, successPercentage}) {
    this.name = name
    this.min = min
    this.max = max
    this.average = average
    this.p95 = p95
    this.successPercentage = successPercentage
  }
}
