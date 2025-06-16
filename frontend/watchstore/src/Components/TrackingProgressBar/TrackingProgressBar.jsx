import "./TrackingProgressBar.css";

const TrackingProgressBar = ({ tracking }) => {
  // Define the available tracking steps
  const steps = ["Order Placed", "Packed", "Shipped", "Delivered"];

  // Find the last completed step index
  const completedStepIndex = tracking.length
    ? steps.indexOf(tracking[tracking.length - 1].step)
    : -1;

  return (
    <div className="tracking-container">
      <div className="tracking-steps">
        {steps.map((step, index) => (
          <div key={index} className="tracking-step">
            <div
              className={`tracking-circle ${
                index <= completedStepIndex ? "completed" : "pending"
              }`}
            >
              {index <= completedStepIndex ? (
                <i class="bx bx-check"></i>
              ) : (
                index + 1
              )}
            </div>

            <span className="tracking-label">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingProgressBar;
