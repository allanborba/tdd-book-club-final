import MetricsAnalyser from '../src/MetricsAnalyser'
import RequestMetric from '../src/RequestMetric'

const requestMetrics = [
  new RequestMetric(30, true, 'a'),
  new RequestMetric(70, true, 'a'),
  new RequestMetric(50, false, 'a'),
  new RequestMetric(10, true, 'a'),
]
const analyser = new MetricsAnalyser(requestMetrics)

test('calculate min', () => {
  expect(analyser.calculateMin()).toBe(10)
})

test('calculate max', () => {
  expect(analyser.calculateMax()).toBe(70)
})

test('calculate average', () => {
  expect(analyser.calculateAverage()).toBe(40)
})

test('calculate p95', () => {
  expect(analyser.calculateP95()).toBe(67)
})

test('calculate success percentage', () => {
  expect(analyser.calculateSuccessPercentage()).toBe(75)
})

test('calculate success percentage with 2 decimal places', () => {
  const requestMetrics = [
    new RequestMetric(10, true),
    new RequestMetric(30, true),
    new RequestMetric(50, false),
  ]
  const analyser = new MetricsAnalyser(requestMetrics)

  expect(analyser.calculateSuccessPercentage()).toBe(66.67)
})
