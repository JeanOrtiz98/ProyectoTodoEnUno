import { useApp } from "../context/AppContext";
import { RefreshCw } from "lucide-react";

interface ApiStatusBadgeProps {
    size?: "sm" | "md";
}

export function ApiStatusBadge({ size = "md" }: ApiStatusBadgeProps) {
    const { apiStatus, checkApiStatus } = useApp();

    const config = {
        connected: { color: "#10B981", label: "API conectada", dot: "bg-emerald-400" },
        disconnected: { color: "#EF4444", label: "API no disponible", dot: "bg-red-400" },
        checking: { color: "#F97316", label: "Verificando...", dot: "bg-orange-400" },
    }[apiStatus];

    return (
        <button
            onClick={checkApiStatus}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-opacity hover:opacity-80 ${size === "sm" ? "text-xs" : "text-sm"}`}
            style={{ borderColor: config.color + "40", background: config.color + "15", color: config.color }}
            title="Haz clic para verificar el estado de la API"
        >
      <span
          className={`relative flex h-2 w-2 shrink-0`}
      >
        {apiStatus === "connected" && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`} />
      </span>
            <span className="font-medium whitespace-nowrap">{config.label}</span>
            <RefreshCw className={`${size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} ${apiStatus === "checking" ? "animate-spin" : ""}`} />
        </button>
    );
}
