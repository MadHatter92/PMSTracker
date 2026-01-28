import { TrendingUp, TrendingDown, ChevronRight, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface PMSCardProps {
  id?: number;
  name: string;
  sebiId?: string;
  aum?: number; // in crores
  totalClients?: number;
  return1m?: number;
  return1y?: number;
  benchmarkReturn1y?: number;
  netFlow?: number; // monthly net flow
  strategyCount?: number;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}

// Format AUM in crores/lakh crores
const formatAUM = (aum: number): string => {
  if (aum >= 100000) return `₹${(aum / 100000).toFixed(1)}L Cr`;
  if (aum >= 1000) return `₹${(aum / 1000).toFixed(1)}K Cr`;
  return `₹${aum.toFixed(0)} Cr`;
};

// Format return percentage
const formatReturn = (value?: number | null): string => {
  if (value === undefined || value === null) return '-';
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
};

// Format net flow
const formatNetFlow = (value?: number | null): string => {
  if (value === undefined || value === null) return '-';
  const prefix = value >= 0 ? '+' : '';
  if (Math.abs(value) >= 1000) return `${prefix}₹${(value / 1000).toFixed(1)}K Cr`;
  return `${prefix}₹${value.toFixed(0)} Cr`;
};

// Return color based on value
const getReturnColor = (value?: number | null): string => {
  if (value === undefined || value === null) return 'text-gray-400';
  return value >= 0 ? 'text-green-600' : 'text-red-600';
};

// Calculate alpha (excess return over benchmark)
const calculateAlpha = (return1y?: number | null, benchmarkReturn1y?: number | null): number | null => {
  if (return1y === undefined || return1y === null) return null;
  if (benchmarkReturn1y === undefined || benchmarkReturn1y === null) return null;
  return return1y - benchmarkReturn1y;
};

export default function PMSCard({
  name,
  sebiId,
  aum,
  totalClients,
  return1m,
  return1y,
  benchmarkReturn1y,
  netFlow,
  strategyCount,
  onClick,
  variant = 'default',
}: PMSCardProps) {
  const alpha = calculateAlpha(return1y, benchmarkReturn1y);

  return (
    <div
      onClick={onClick}
      className={`
        relative bg-white rounded-2xl border border-gray-100
        shadow-card hover:shadow-card-hover
        transition-all duration-300 ease-out
        cursor-pointer group
        ${variant === 'compact' ? 'p-4' : 'p-5'}
      `}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-900 via-navy-700 to-saffron-500 rounded-t-2xl" />

      {/* Header Section */}
      <div className="mb-4">
        {/* SEBI ID */}
        {sebiId && (
          <p className="text-xs font-medium text-saffron-600 uppercase tracking-wide mb-1">
            {sebiId}
          </p>
        )}

        {/* PMS Name */}
        <h3 className="text-base font-display font-semibold text-navy-900 leading-tight group-hover:text-navy-700 transition-colors">
          {name.length > 40 ? name.substring(0, 40) + '...' : name}
        </h3>

        {/* Strategy count badge */}
        {strategyCount !== undefined && strategyCount > 0 && (
          <span className="inline-flex items-center mt-2 px-2.5 py-1 rounded-full text-xs font-medium bg-navy-50 text-navy-700 border border-navy-200">
            {strategyCount} {strategyCount === 1 ? 'Strategy' : 'Strategies'}
          </span>
        )}
      </div>

      {/* Returns Section */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">1M Return</p>
          <p className={`text-lg font-bold ${getReturnColor(return1m)}`}>
            {formatReturn(return1m)}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">1Y Return</p>
          <p className={`text-lg font-bold ${getReturnColor(return1y)}`}>
            {formatReturn(return1y)}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Alpha</p>
          <p className={`text-lg font-bold ${getReturnColor(alpha)}`}>
            {formatReturn(alpha)}
          </p>
        </div>
      </div>

      {/* Net Flow Indicator */}
      {netFlow !== undefined && netFlow !== null && (
        <div className={`flex items-center gap-2 mb-4 p-2 rounded-lg ${
          netFlow >= 0 ? 'bg-green-50' : 'bg-red-50'
        }`}>
          {netFlow >= 0 ? (
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${netFlow >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {formatNetFlow(netFlow)} net flow
          </span>
        </div>
      )}

      {/* Bottom Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {/* AUM */}
          {aum !== undefined && (
            <div>
              <p className="text-[10px] font-medium text-gray-400 uppercase">AUM</p>
              <p className="text-sm font-semibold text-navy-800">{formatAUM(aum)}</p>
            </div>
          )}

          {/* Clients */}
          {totalClients !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-gray-400" />
              <div>
                <p className="text-[10px] font-medium text-gray-400 uppercase">Clients</p>
                <p className="text-sm font-semibold text-navy-800">{totalClients.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* View Details Arrow */}
        <div className="flex items-center text-saffron-500 group-hover:text-saffron-600 transition-colors">
          <span className="text-xs font-medium mr-1 hidden sm:inline">View Details</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-900/0 to-saffron-500/0 group-hover:from-navy-900/[0.02] group-hover:to-saffron-500/[0.02] transition-all duration-300 pointer-events-none" />
    </div>
  );
}

// Compact variant for lists/tables
export function PMSCardCompact({
  name,
  aum,
  return1y,
  onClick,
}: Pick<PMSCardProps, 'name' | 'aum' | 'return1y' | 'onClick'>) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
    >
      {/* Return indicator */}
      <div className={`
        w-12 h-12 rounded-xl flex items-center justify-center
        ${(return1y ?? 0) >= 0 ? 'bg-green-50' : 'bg-red-50'}
      `}>
        {(return1y ?? 0) >= 0
          ? <TrendingUp className="w-6 h-6 text-green-600" />
          : <TrendingDown className="w-6 h-6 text-red-600" />
        }
      </div>

      {/* PMS info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-display font-semibold text-navy-900 truncate">{name}</h4>
        <p className="text-xs text-gray-500">
          {aum !== undefined ? formatAUM(aum) : 'AUM N/A'}
        </p>
      </div>

      {/* Returns */}
      <div className="text-right">
        <p className={`text-lg font-bold ${getReturnColor(return1y)}`}>
          {formatReturn(return1y)}
        </p>
        <p className="text-[10px] text-gray-400 uppercase">1Y Return</p>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-saffron-500 group-hover:translate-x-1 transition-all" />
    </div>
  );
}

// Ranking variant with position
export function PMSCardRanking({
  rank,
  name,
  aum,
  return1y,
  benchmarkReturn1y,
  onClick,
}: PMSCardProps & { rank: number }) {
  const alpha = calculateAlpha(return1y, benchmarkReturn1y);

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
    >
      {/* Rank */}
      <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center">
        <span className="text-white font-bold text-sm">#{rank}</span>
      </div>

      {/* PMS info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-display font-semibold text-navy-900 truncate">{name}</h4>
        <p className="text-xs text-gray-500">
          {aum !== undefined ? formatAUM(aum) : 'AUM N/A'}
        </p>
      </div>

      {/* Returns */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={`text-base font-bold ${getReturnColor(return1y)}`}>
            {formatReturn(return1y)}
          </p>
          <p className="text-[10px] text-gray-400 uppercase">1Y Return</p>
        </div>
        <div className="text-right">
          <p className={`text-base font-bold ${getReturnColor(alpha)}`}>
            {formatReturn(alpha)}
          </p>
          <p className="text-[10px] text-gray-400 uppercase">Alpha</p>
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-saffron-500 group-hover:translate-x-1 transition-all" />
    </div>
  );
}
