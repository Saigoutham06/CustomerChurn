import { useState } from 'react';
import { ChevronDown, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DebugInfo } from '../api';

interface DebugConsoleProps {
  debugInfo: DebugInfo;
}

export function DebugConsole({ debugInfo }: DebugConsoleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass rounded-2xl overflow-hidden mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-slate-400" />
          <span className="font-semibold text-slate-100">Developer Console</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10 overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Pipeline Selected
                </p>
                <div className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-cyan-300 break-words">
                  {debugInfo.pipeline_selected}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Input Columns ({debugInfo.columns.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {debugInfo.columns.map((column, index) => (
                    <div
                      key={index}
                      className="badge-secondary text-xs"
                    >
                      {column}
                    </div>
                  ))}
                </div>
                {debugInfo.columns.length === 0 && (
                  <p className="text-sm text-slate-400">No columns detected</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
