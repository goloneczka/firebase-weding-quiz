import "./Spinner.css";

export const Spinner = ({ size = "medium" }) => {
  return (
    <div className={`spinner-container ${size}`}>
      <div className="spinner"></div>
    </div>
  );
};
