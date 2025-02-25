import Scenario from '../src/Scenario'
import ScenarioAnalyser from '../src/ScenarioAnalyser'
import RequestMetric from '../src/RequestMetric'

const requestMetrics = [
  new RequestMetric(30, true, 'a'),
  new RequestMetric(70, true, 'a'),
  new RequestMetric(50, false, 'a'),
  new RequestMetric(10, true, 'a'),
]

test('calculate each scenario with only one scenario', () => {
  const scenarioAnalyser = new ScenarioAnalyser(requestMetrics)

  const expectedScenarios = [
    new Scenario({
      name: 'a',
      min: 10,
      max: 70,
      average: 40,
      p95: 67,
      successPercentage: 75,
    })
  ]

  expect(scenarioAnalyser.getScenarios()).toEqual(expectedScenarios)
})

test('calculate each scenario with multiple scenarios', () => {
  const requestMetrics = [
    new RequestMetric(50, false, 'a'),
    new RequestMetric(10, true, 'a'),
    new RequestMetric(70, true, 'a'),
    new RequestMetric(30, true, 'a'),

    new RequestMetric(10, true, 'b'),
    new RequestMetric(30, true, 'b'),

    new RequestMetric(10, true, 'y'),
    new RequestMetric(10, true, 'y'),
    new RequestMetric(10, false, 'y'),
  ]
  const scenarioAnalyser = new ScenarioAnalyser(requestMetrics)

  const expectedScenario1 = new Scenario({
    name: 'a',
    min: 10,
    max: 70,
    average: 40,
    p95: 67,
    successPercentage: 75,
  })

  const expectedScenario2 = new Scenario({
    name: 'b',
    min: 10,
    max: 30,
    average: 20,
    p95: 29,
    successPercentage: 100,
  })

  const expectedScenario3 = new Scenario({
    name: 'y',
    min: 10,
    max: 10,
    average: 10,
    p95: 10,
    successPercentage: 66.67,
  })

  expect(scenarioAnalyser.getScenarios()).toEqual([expectedScenario1, expectedScenario2, expectedScenario3])
})