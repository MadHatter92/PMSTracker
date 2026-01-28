import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  subtitle?: string;
  variant?: 'default' | 'highlight' | 'compact';
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  subtitle,
  variant = 'default',
}: StatCardProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-card">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-navy-50 rounded-lg">
            <Icon className="w-5 h-5 text-navy-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">{title}</p>
            <p className="text-lg font-bold text-navy-900">{value}</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'highlight') {
    return (
      <div className="relative bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-6 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-saffron-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <p className="text-navy-200 text-sm font-medium">{title}</p>
            <div className="p-2 bg-white/10 rounded-lg">
              <Icon className="w-5 h-5 text-saffron-400" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-2">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(trend).toFixed(1)}% {trendLabel || 'vs last month'}
              </span>
            </div>
          )}
          {subtitle && (
            <p className="text-navy-300 text-xs mt-2">{subtitle}</p>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-navy-900">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span className="font-medium">{Math.abs(trend).toFixed(1)}%</span>
              {trendLabel && <span className="text-gray-400 ml-1">{trendLabel}</span>}
            </div>
          )}
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-3 bg-navy-50 rounded-xl">
          <Icon className="w-6 h-6 text-navy-600" />
        </div>
      </div>
    </div>
  );
}

// Mini stat for inline display
export function StatBadge({
  label,
  value,
  trend,
}: {
  label: string;
  value: string | number;
  trend?: number;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-navy-900">{value}</span>
      {trend !== undefined && (
        <span className={`text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
        </span>
      )}
    </div>
  );
}
