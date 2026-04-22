type AgentDebugLogPayload = {
  hypothesisId: string;
  location: string;
  message: string;
  data?: Record<string, unknown>;
  timestamp: number;
};

export const agentDebugLog = (payload: AgentDebugLogPayload): void => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!window.location.origin.startsWith('http')) {
    return;
  }

  try {
    void fetch('/__agent-debug-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch {
    // no-op: logging must never break story rendering
  }
};
