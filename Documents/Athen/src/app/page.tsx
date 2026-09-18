"use client";

import React, { useState } from "react";
import {
  Webhook,
  Send,
  CheckCircle2,
  AlertTriangle,
  Key,
  ListFilter,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Layers,
  Sparkles,
  Lock,
} from "lucide-react";

export default function Dashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const [testForm, setTestForm] = useState({
    name: "John & Mary Smith",
    street: "123 Ocean Drive",
    city: "San Diego",
    state: "CA",
    zip: "92101",
    milestone: "Application",
  });

  const webhookUrl = typeof window !== "undefined"
    ? `${window.location.origin}/api/webhooks/ncino`
    : "https://your-domain.vercel.app/api/webhooks/ncino";

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/test-trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testForm),
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ error: err.message || "Failed to execute test trigger" });
    } finally {
      setTesting(false);
    }
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-8 w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-sky-400" />
            </div>
            <h1 className="text-xl font-semibold text-slate-100">Protected Dashboard</h1>
            <p className="text-sm text-slate-400">Enter passcode to access testing tools.</p>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (passcode === "athen2026") setUnlocked(true);
            else alert("Incorrect passcode");
          }} className="space-y-4">
            <input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-center text-slate-200 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm rounded-lg transition"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Vercel Serverless Ready
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            <Webhook className="w-8 h-8 text-sky-400" />
            nCino Mortgage → Thanks.io Bridge
          </h1>
          <p className="text-slate-400 mt-1">
            Event-driven webhook bridge automatically triggering print mailers on loan milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://developer.ncinomortgage.com/mortgage/docs/webhooks"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg flex items-center gap-2 transition"
          >
            nCino Docs <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://docs.thanks.io/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition shadow-lg shadow-sky-900/30"
          >
            Thanks.io Docs <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Webhook Callback Card */}
      <section className="glass-card p-6 border-sky-500/30 bg-gradient-to-r from-sky-950/20 to-slate-900/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              nCino Callback Webhook URL
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Paste this URL into nCino Mortgage under <b>Company Settings &gt; API Management &gt; Webhooks</b>
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <code className="bg-slate-950 border border-slate-800 text-sky-300 px-4 py-2.5 rounded-lg text-xs font-mono select-all flex-1 md:flex-none">
              {webhookUrl}
            </code>
            <button
              onClick={handleCopy}
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm flex items-center gap-1.5 transition shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* Configuration Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">HMAC Security</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-200">nCino Signature</h3>
          <p className="text-xs text-slate-400">
            Validates incoming requests using SHA-256 HMAC digest verification against <code className="text-sky-300">NCINO_WEBHOOK_SECRET</code>.
          </p>
        </div>

        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">Thanks.io API</span>
            <Key className="w-4 h-4 text-sky-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-200">Direct Delivery</h3>
          <p className="text-xs text-slate-400">
            Pushes contacts directly to Thanks.io <code className="text-sky-300">POST /v2/recipients</code> with full name and street address.
          </p>
        </div>

        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-semibold">Milestone Rules</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-200">Dynamic Mapping</h3>
          <p className="text-xs text-slate-400">
            Routes events like <i>Clear to Close</i> or <i>Funded</i> to specific Thanks.io Mailing List IDs via env or config.
          </p>
        </div>
      </div>

      {/* Main Content: Interactive Test Trigger + Setup Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Test Trigger Simulator */}
        <section className="lg:col-span-7 glass-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <Send className="w-5 h-5 text-sky-400" />
              Simulate nCino Webhook Event
            </h2>
            <span className="text-xs text-slate-400">Test bridge logic in real-time</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Borrower Full Name</label>
              <input
                type="text"
                value={testForm.name}
                onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Milestone Event</label>
              <select
                value={testForm.milestone}
                onChange={(e) => setTestForm({ ...testForm, milestone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="Application">Application</option>
                <option value="Processing">Processing</option>
                <option value="Underwriting">Underwriting</option>
                <option value="Approved With Conditions">Approved With Conditions</option>
                <option value="Final Approval">Final Approval</option>
                <option value="Closing Docs">Closing Docs</option>
                <option value="Settlement">Settlement</option>
                <option value="Unmapped Test Event">Unmapped Test Event</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Street Address</label>
              <input
                type="text"
                value={testForm.street}
                onChange={(e) => setTestForm({ ...testForm, street: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">City</label>
              <input
                type="text"
                value={testForm.city}
                onChange={(e) => setTestForm({ ...testForm, city: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">State</label>
                <input
                  type="text"
                  value={testForm.state}
                  onChange={(e) => setTestForm({ ...testForm, state: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Zip Code</label>
                <input
                  type="text"
                  value={testForm.zip}
                  onChange={(e) => setTestForm({ ...testForm, zip: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleRunTest}
            disabled={testing}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition"
          >
            {testing ? (
              <span>Executing Signed Test Payload...</span>
            ) : (
              <>
                <Send className="w-4 h-4" /> Send Signed Webhook Payload
              </>
            )}
          </button>

          {/* Test Response Window */}
          {testResult && (
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Execution Result</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-mono ${
                    testResult.receivedStatusCode === 201 || testResult.receivedStatusCode === 200
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  HTTP {testResult.receivedStatusCode || 500}
                </span>
              </div>
              <pre className="text-xs text-slate-300 overflow-x-auto p-2 bg-slate-900 rounded font-mono">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* Setup & Environment Variables Guide */}
        <section className="lg:col-span-5 glass-card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Key className="w-5 h-5 text-amber-400" /> Environment Setup
          </h2>

          <p className="text-xs text-slate-400">
            Configure these Environment Variables in your Vercel Project Settings:
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="text-amber-400 font-semibold mb-1">NCINO_WEBHOOK_SECRET</div>
              <p className="text-slate-400 font-sans text-xs">
                Secret string generated in nCino Mortgage when adding the webhook. Used to verify HMAC signatures.
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="text-sky-400 font-semibold mb-1">THANKS_IO_API_KEY</div>
              <p className="text-slate-400 font-sans text-xs">
                Your API Token from Thanks.io (Account Settings &gt; API Access).
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <div className="text-indigo-400 font-semibold mb-1">MILESTONE_MAPPING_JSON</div>
              <p className="text-slate-400 font-sans text-xs mb-2">
                Optional JSON string overriding milestone to Thanks.io mailing list ID mappings:
              </p>
              <code className="text-slate-300 block bg-slate-900 p-2 rounded">
                &#123;&quot;Clear to Close&quot;: &quot;98765&quot;, &quot;Funded&quot;: &quot;54321&quot;&#125;
              </code>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
