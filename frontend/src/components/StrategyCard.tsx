import { TrendingUp, TrendingDown, Target } from 'lucide-react';

export interface StrategyCardProps {
  id?: number;
  name: string;
  aum?: number | null; // in crores
  return1m?: number | null;
  return1y?: number | null;
  benchmark?: string | null;
  benchmarkReturn1m?: number | null;
  benchmarkReturn1y?: number | null;
  onClick?: () => void;
  isSelected?: boolean;
  variant?: 'default' | 'compact' | 'comparison';
}

// Format AUM in crores
const formatAUM = (aum: number): string => {
  if (aum >= 10000) return `₹${(aum / 1000).toFixed(1)}K Cr`;
  if (aum >= 1000) return `₹${(aum / 1000).toFixed(2)}K Cr`;
  return `₹${aum.toFixed(0)} Cr`;
};

// Format return percentage
const formatReturn = (value?: number | null): string => {
  if (value === undefined || value === null) return '-';
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
};

// Return color based on value
const getReturnColor = (value?: number | null): string => {
  if (value === undefined || value === null) return 'text-gray-400';
  return value >= 0 ? 'text-green-600' : 'text-red-600';
};

// Calculate alpha
const calculateAlpha = (strategyReturn?: number | null, benchmarkReturn?: number | null): number | null => {
  if (strategyReturn === undefined || strategyReturn === null) return null;
  if (benchmarkReturn === undefined || benchmarkReturn === null) return null;
  return strategyReturn - benchmarkReturn;
};

export default function StrategyCard({
  name,
  aum,
  return1m,
  return1y,
  benchmark,
  benchmarkReturn1m,
  benchmarkReturn1y,
  onClick,
  isSelected = false,
  variant = 'default',
}: StrategyCardProps) {
  const alpha1y = calculateAlpha(return1y, benchmarkReturn1y);
  const alpha1m = calculateAlpha(return1m, benchmarkReturn1m);

  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={`
          p-4 rounded-xl border transition-all duration-200 cursor-pointer
          ${isSelected
            ? 'border-saffron-500 bg-saffron-50'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
          }
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-navy-900 truncate">{name}</h4>
            {aum && (
              <p className="text-xs text-gray-500 mt-0.5">{formatAUM(aum)}</p>
            )}
          </div>
          <div className="text-right ml-4">
            <p className={`text-base font-bold ${getReturnColor(return1y)}`}>
              {formatReturn(return1y)}
            </p>
            <p className="text-[10px] text-gray-400 uppercase">1Y</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'comparison') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        {/* Strategy Name */}
        <h4 className="font-semibold text-navy-900 mb-3 truncate">{name}</h4>

        {/* Metrics Grid */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">AUM</span>
            <span className="text-sm font-medium text-navy-800">
              {aum ? formatAUM(aum) : '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">1M Return</span>
            <span className={`text-sm font-bold ${getReturnColor(return1m)}`}>
              {formatReturn(return1m)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">1Y Return</span>
            <span className={`text-sm font-bold ${getReturnColor(return1y)}`}>
              {formatReturn(return1y)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Alpha (1Y)</span>
            <span className={`text-sm font-bold ${getReturnColor(alpha1y)}`}>
              {formatReturn(alpha1y)}
            </span>
          </div>
          {benchmark && (
            <div className="pt-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase mb-1">Benchmark</p>
              <p className="text-xs text-gray-600 truncate">{benchmark}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      onClick={onClick}
      className={`
        relative bg-white rounded-xl border transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
        ${isSelected
          ? 'border-saffron-500 ring-2 ring-saffron-200'
          : 'border-gray-200'
        }
      `}
    >
      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-navy-900 leading-tight">
              {name.length > 35 ? name.substring(0, 35) + '...' : name}
            </h4>
            {benchmark && (
              <div className="flex items-center gap-1 mt-1">
                <Target className="w-3 h-3 text-gray-400" />
                <p className="text-xs text-gray-500 truncate">{benchmark}</p>
              </div>
            )}
          </div>
          {aum && (
            <div className="text-right ml-2">
              <p className="text-xs text-gray-400 uppercase">AUM</p>
              <p className="text-sm font-semibold text-navy-800">{formatAUM(aum)}</p>
            </div>
          )}
        </div>

        {/* Returns Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-[9px] font-medium text-gray-500 uppercase mb-0.5">1M</p>
            <p className={`text-sm font-bold ${getReturnColor(return1m)}`}>
              {formatReturn(return1m)}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-[9px] font-medium text-gray-500 uppercase mb-0.5">1Y</p>
            <p className={`text-sm font-bold ${getReturnColor(return1y)}`}>
              {formatReturn(return1y)}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-[9px] font-medium text-gray-500 uppercase mb-0.5">Alpha</p>
            <p className={`text-sm font-bold ${getReturnColor(alpha1y)}`}>
              {formatReturn(alpha1y)}
            </p>
          </div>
        </div>

        {/* Benchmark Comparison (if available) */}
        {(benchmarkReturn1m !== null || benchmarkReturn1y !== null) && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase mb-2">vs Benchmark</p>
            <div className="flex items-center gap-4">
              {alpha1m !== null && (
                <div className="flex items-center gap-1">
                  {alpha1m >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${getReturnColor(alpha1m)}`}>
                    {formatReturn(alpha1m)} (1M)
                  </span>
                </div>
              )}
              {alpha1y !== null && (
                <div className="flex items-center gap-1">
                  {alpha1y >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${getReturnColor(alpha1y)}`}>
                    {formatReturn(alpha1y)} (1Y)
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Mini card for quick selection
export function StrategyChip({
  name,
  return1y,
  isSelected,
  onClick,
}: {
  name: string;
  return1y?: number | null;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
        transition-all duration-200
        ${isSelected
          ? 'bg-saffron-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      <span className="truncate max-w-[150px]">{name}</span>
      {return1y !== undefined && return1y !== null && (
        <span className={`font-medium ${isSelected ? 'text-white' : getReturnColor(return1y)}`}>
          {formatReturn(return1y)}
        </span>
      )}
    </button>
  );
}
