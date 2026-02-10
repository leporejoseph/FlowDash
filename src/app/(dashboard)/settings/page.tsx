"use client";

import { useState } from "react";

type ApiSettings = {
  openaiKey: string;
  anthropicKey: string;
  googleKey: string;
  mcpServerUrl: string;
};

const storageKey = "flowdash.settings";

const defaults: ApiSettings = {
  openaiKey: "",
  anthropicKey: "",
  googleKey: "",
  mcpServerUrl: "http://localhost:3001/mcp",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<ApiSettings>(() => {
    if (typeof window === "undefined") {
      return defaults;
    }

    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return defaults;
    }

    try {
      const parsed = JSON.parse(raw) as ApiSettings;
      return { ...defaults, ...parsed };
    } catch {
      return defaults;
    }
  });
  const [saved, setSaved] = useState(false);

  const onFieldChange = (field: keyof ApiSettings, value: string) => {
    setSaved(false);
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const onSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
    setSaved(true);
  };

  return (
    <div className="page-stack">
      <header>
        <h1>Settings</h1>
        <p>Configure runtime settings and API keys for local orchestration and integrations.</p>
      </header>

      <section className="panel settings-form">
        <label>
          OpenAI API key
          <input
            value={settings.openaiKey}
            onChange={(event) => onFieldChange("openaiKey", event.target.value)}
            placeholder="sk-..."
            type="password"
          />
        </label>

        <label>
          Anthropic API key
          <input
            value={settings.anthropicKey}
            onChange={(event) => onFieldChange("anthropicKey", event.target.value)}
            placeholder="sk-ant-..."
            type="password"
          />
        </label>

        <label>
          Google API key
          <input
            value={settings.googleKey}
            onChange={(event) => onFieldChange("googleKey", event.target.value)}
            placeholder="AIza..."
            type="password"
          />
        </label>

        <label>
          MCP server URL
          <input
            value={settings.mcpServerUrl}
            onChange={(event) => onFieldChange("mcpServerUrl", event.target.value)}
            placeholder="http://localhost:3001/mcp"
            type="text"
          />
        </label>

        <button onClick={onSave} type="button" className="save-btn">Save settings</button>
        {saved && <p className="saved-message">Settings saved locally.</p>}
      </section>
    </div>
  );
}
