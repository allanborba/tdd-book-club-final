export default class MetricsAnalyser {
  constructor(requestMetrics) {
    this.requestMetrics = requestMetrics
    this.sortedRequestTimes = requestMetrics.map(metric => metric.time).sort((a, b) => a - b)
  }

  calculateMin() {
    return this.sortedRequestTimes[0]
  }

  calculateMax() {
    return this.sortedRequestTimes[this.sortedRequestTimes.length - 1]
  }

  calculateAverage() {
    const sum = this.sortedRequestTimes.reduce((acc, curr) => acc + curr, 0)
    return sum / this.sortedRequestTimes.length
  }

  calculateP95() {
    const n = this.sortedRequestTimes.length;
    const rank = 0.95 * (n - 1) + 1;
    const k = Math.floor(rank);
    const d = rank - k;
    
    return this.sortedRequestTimes[k - 1] + d * (this.sortedRequestTimes[k] - this.sortedRequestTimes[k - 1]);
  }

  calculateSuccessPercentage() {
    const successCount = this.requestMetrics.filter(metric => metric.success).length
    const percentage = (successCount / this.requestMetrics.length) * 100
    return parseFloat(percentage.toFixed(2))
  }
}