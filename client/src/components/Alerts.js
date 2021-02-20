import { useAlertContext } from '../context/providers/alert';

const Alerts = () => {
  const { alerts } = useAlertContext();

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
