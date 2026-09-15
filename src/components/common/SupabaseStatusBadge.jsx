import React, { useState } from 'react';
import { Database, CheckCircle2, AlertTriangle, ExternalLink, Copy, Check, X, RefreshCw } from 'lucide-react';
import { useFoodRescue } from '../../context/FoodRescueContext';

export default function SupabaseStatusBadge({ isTransparent = false }) {
  const { isLiveDb, isSupabaseConfigured, dbLoading, refreshData, donations } = useFoodRescue();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copySchemaPath = () => {
    navigator.clipboard.writeText('supabase/schema.sql');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Pill Badge */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
          isTransparent
            ? isLiveDb
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30 backdrop-blur-md'
              : isSupabaseConfigured
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 hover:bg-amber-500/30 backdrop-blur-md'
              : 'bg-white/15 text-white border-white/20 hover:bg-white/25 backdrop-blur-md'
            : isLiveDb
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-sm'
            : isSupabaseConfigured
            ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
        }`}
        title="Supabase Database Connection Status (Click for details)"
      >
        <span className="relative flex h-2 w-2">
          {isLiveDb ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </>
          ) : (
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isSupabaseConfigured ? 'bg-amber-500' : 'bg-slate-400'}`}></span>
          )}
        </span>
        <Database className="w-3.5 h-3.5" />
        <span>
          {isLiveDb ? 'Supabase Live' : isSupabaseConfigured ? 'Connecting...' : 'Database: Local'}
        </span>
      </button>

      {/* Connection & Setup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden transition-all transform animate-scaleUp">
            {/* Header */}
            <div className={`p-5 flex items-center justify-between border-b ${isLiveDb ? 'bg-emerald-50/70 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isLiveDb ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-white'}`}>
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Supabase Database Connection</h3>
                  <p className="text-xs text-gray-500">
                    {isLiveDb
                      ? 'Connected & synchronized with PostgreSQL'
                      : 'Running with local demo storage'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-white/80 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm text-gray-600">
              {isLiveDb ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>PostgreSQL Database Active & Syncing</span>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Food listings, pickup claims, and impact metrics are directly reading from and writing to your Supabase cloud database with Realtime subscriptions enabled.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs text-emerald-900 font-medium">
                    <span>Live Donations in DB: <strong>{donations.length} items</strong></span>
                    <button
                      onClick={refreshData}
                      disabled={dbLoading}
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${dbLoading ? 'animate-spin' : ''}`} />
                      Refresh Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Supabase Not Connected Yet</span>
                  </div>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    The app is currently using local mock data and browser storage. Follow the 3 quick steps below to connect your real Supabase PostgreSQL database.
                  </p>
                </div>
              )}

              {/* Setup Instructions */}
              <div className="space-y-3 pt-1">
                <h4 className="font-semibold text-gray-900 text-xs tracking-wider uppercase">
                  Setup Steps to Connect Supabase:
                </h4>

                {/* Step 1 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#056b4e] text-white flex items-center justify-center text-xs font-bold">1</span>
                  <div className="text-xs">
                    <p className="font-medium text-gray-900">Get Supabase Credentials</p>
                    <p className="text-gray-500 mt-0.5">
                      Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#056b4e] font-semibold underline inline-flex items-center gap-0.5">supabase.com <ExternalLink className="w-2.5 h-2.5" /></a> and find your <strong>Project URL</strong> and <strong>anon public API key</strong> in <em>Project Settings &gt; API</em>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#056b4e] text-white flex items-center justify-center text-xs font-bold">2</span>
                  <div className="text-xs flex-1">
                    <p className="font-medium text-gray-900">Run the Database Schema & Seed SQL</p>
                    <p className="text-gray-500 mt-0.5">
                      Open your Supabase <strong>SQL Editor</strong>, copy the contents of <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">supabase/schema.sql</code>, and click <strong>Run</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={copySchemaPath}
                      className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-xs transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied File Path!' : 'Copy Schema File Path'}
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#056b4e] text-white flex items-center justify-center text-xs font-bold">3</span>
                  <div className="text-xs flex-1">
                    <p className="font-medium text-gray-900">Add Keys into <code className="bg-gray-200 px-1 py-0.5 rounded">.env</code></p>
                    <div className="mt-1.5 p-2.5 rounded bg-gray-900 text-gray-200 font-mono text-[11px] overflow-x-auto select-all">
                      VITE_SUPABASE_URL=https://your-project-ref.supabase.co<br />
                      VITE_SUPABASE_ANON_KEY=your-anon-public-key
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={refreshData}
                disabled={dbLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${dbLoading ? 'animate-spin' : ''}`} />
                Test / Refresh Connection
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#056b4e] hover:bg-[#04553e] rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
