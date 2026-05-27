import useStore from "../store/useStore.js";
import { buildCoachReport } from "../lib/analytics.js";

export default function CoachPage() {
  const reports = useStore((state) => state.coachReports);
  const workouts = useStore((state) => state.workouts);
  const setPage = useStore((state) => state.setPage);
  const computed = reports.length ? reports : workouts.slice(0, 12).map((workout) => buildCoachReport(workout, workouts));
  const latest = computed[0];

  return (
    <section className="page coach-page">
      <div className="top-row">
        <div>
          <p className="eyebrow">Análisis post-entreno</p>
          <h1>Coach</h1>
        </div>
        <button className="ghost" onClick={() => setPage("home")}>Inicio</button>
      </div>

      {latest ? <FeaturedReport report={latest} /> : <p>No hay reportes todavía.</p>}

      <div className="coach-list">
        {computed.map((report) => (
          <CoachReportCard key={report.id} report={report} />
        ))}
      </div>
    </section>
  );
}

function FeaturedReport({ report }) {
  const alerts = report.alerts || (report.alert ? [{ msg: report.alert }] : []);
  const recommendations = report.recommendations || (report.recommendation ? [{ type: "maintain", msg: report.recommendation }] : []);
  return (
    <div className="coach-feature">
      <div className="coach-feature-head">
        <div className="arrow-logo">→</div>
        <div>
          <small>{report.sessionType || report.title} · {report.date}</small>
          <h2>{report.title || "Último análisis"}</h2>
        </div>
      </div>

      <div className="coach-status">
        <span>Estado general</span>
        <p>{report.status}</p>
      </div>

      {alerts.length > 0 && (
        <div className="coach-block warn">
          <span>Alertas</span>
          {alerts.slice(0, 3).map((alert, index) => <p key={index}>⚠️ {alert.msg || alert}</p>)}
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="coach-block rec">
          <span>Recomendaciones</span>
          {recommendations.slice(0, 4).map((rec, index) => (
            <p key={index}>{rec.type === "increase" ? "↑" : rec.type === "stabilize" ? "→" : "✓"} {rec.msg || rec}</p>
          ))}
        </div>
      )}

      <div className="coach-mini-stats">
        <MiniStat label="Volumen" value={`${report.totalVolume || 0} kg`} />
        <MiniStat label="Tipo" value={report.sessionType || "Workout"} />
        <MiniStat label="Fecha" value={String(report.date || "").slice(5)} />
      </div>

      <div className="notice compact">
        <b>Recordatorio</b>
        <p>El peso corporal no define todo: mirá fuerza, cintura, volumen y constancia semanal.</p>
      </div>
    </div>
  );
}

function CoachReportCard({ report }) {
  const alerts = report.alerts || (report.alert ? [{ msg: report.alert }] : []);
  const recommendations = report.recommendations || (report.recommendation ? [{ msg: report.recommendation }] : []);
  return (
    <div className="coach-card">
      <small>{report.date}</small>
      <h2>{report.title}</h2>
      <p>{report.status}</p>
      {alerts[0] && <p className="alert">⚠️ {alerts[0].msg}</p>}
      {recommendations[0] && <strong>{recommendations[0].msg}</strong>}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
