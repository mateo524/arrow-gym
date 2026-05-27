import useStore from "../store/useStore.js";

const TABS = [
  { id: "home", label: "Inicio", icon: "⚡" },
  { id: "start", label: "Start", icon: "▶" },
  { id: "coach", label: "Coach", icon: "🧠" },
  { id: "map", label: "Mapa", icon: "◈" },
  { id: "history", label: "Historial", icon: "☰" },
  { id: "exercises", label: "Ejercicios", icon: "+" },
];

export default function Nav() {
  const currentPage = useStore((state) => state.currentPage);
  const setPage = useStore((state) => state.setPage);

  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${currentPage === tab.id ? "active" : ""}`}
          onClick={() => setPage(tab.id)}
          type="button"
          aria-label={tab.label}
        >
          <span>{tab.icon}</span>
          <small>{tab.label}</small>
        </button>
      ))}
    </nav>
  );
}
