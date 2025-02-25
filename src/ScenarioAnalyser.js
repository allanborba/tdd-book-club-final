import MetricsAnalyser from './MetricsAnalyser'
import Scenario from './Scenario'

export default class ScenarioAnalyser {
  constructor(requestMetrics) {
    this.requestMetrics = requestMetrics
  }

  getScenarios() {
    const scenariosByNames = this.getMetricsByScenario()
    const scenarios = []

    Object.keys(scenariosByNames).forEach(name => {
      const analyser = new MetricsAnalyser(scenariosByNames[name])
      const input = {
        name: name,
        min: analyser.calculateMin(),
        max: analyser.calculateMax(),
        average: analyser.calculateAverage(),
        p95: analyser.calculateP95(),
        successPercentage: analyser.calculateSuccessPercentage(),
      }

      scenarios.push(new Scenario(input))
    })

    return scenarios
  }

  getMetricsByScenario() {
    const scenariosByNames = {}

    for (const metric of this.requestMetrics) {
      if (!scenariosByNames[metric.scenarioName])  scenariosByNames[metric.scenarioName] = []
      
      scenariosByNames[metric.scenarioName].push(metric)
    }

    return scenariosByNames
  }
}