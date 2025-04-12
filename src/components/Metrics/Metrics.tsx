

interface MetricsProps {
    averageTimeDifference: String,
    averageLowTimeDifference: String,
    averageMediumTimeDifference: String,
    averageHighTimeDifference: String,
}

function Metrics({averageTimeDifference, averageLowTimeDifference, averageMediumTimeDifference, averageHighTimeDifference}: MetricsProps) {
    return (
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p className="card-text">Average time to finish tasks:</p>
                <ul>
                  <li>{averageTimeDifference}</li>
                </ul>
              </div>
              <div className="col-md-6">
                <p className="card-text">Average time to finish task by priority:</p>
                <ul>
                  <li>Low: {averageLowTimeDifference}</li>
                  <li>Medium: {averageMediumTimeDifference}</li>
                  <li>High: {averageHighTimeDifference}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Metrics;