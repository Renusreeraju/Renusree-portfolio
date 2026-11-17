import { useMemo, useState } from 'react';
import { AlertCircle, Check, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';

export function SolarMLSandbox() {
  const [model, setModel] = useState<'linear' | 'rf' | 'xgboost'>('xgboost');
  const [tempC, setTempC] = useState(29);
  const [humidity, setHumidity] = useState(42);
  const [cloudPct, setCloudPct] = useState(18);

  const metrics = {
    linear: { name: 'Linear Regression', r2: '0.78', rmse: '94.2 W/m²', accuracy: '78%' },
    rf: { name: 'Random Forest', r2: '0.91', rmse: '51.6 W/m²', accuracy: '91%' },
    xgboost: { name: 'XGBoost (Final)', r2: '0.96', rmse: '28.4 W/m²', accuracy: '96%' },
  }[model];

  const predictedIrradiance = useMemo(() => {
    const base = 920 - cloudPct * 6.4 - humidity * 2.1 + (tempC - 20) * 9.5;
    const modelOffset = model === 'linear' ? -24 : model === 'rf' ? 8 : 0;
    return Math.max(85, Math.min(1050, Math.round(base + modelOffset)));
  }, [tempC, humidity, cloudPct, model]);

  const curvePoints = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = i + 6;
      const bell = Math.sin(((hour - 6) / 12) * Math.PI);
      const val = Math.round(bell * predictedIrradiance);
      return { hour: `${hour}:00`, val };
    });
  }, [predictedIrradiance]);

  const maxVal = Math.max(...curvePoints.map((p) => p.val), 100);

  return (
    <div className="space-y-5 rounded-xl border border-[#2e2f36] bg-[#201f24] p-5 text-[#f4f4f6]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2e2f36] pb-4">
        <div>
          <h4 className="font-display text-sm font-semibold text-[#f4f4f6]">
            Interactive Model Evaluation &amp; Irradiance Estimator
          </h4>
          <p className="text-xs text-[#a1a5b0]">
            Compare regression models and adjust meteorological inputs to inspect predicted output.
          </p>
        </div>

        <div role="tablist" aria-label="Select ML model" className="inline-flex rounded-lg bg-[#121215] p-1 border border-[#2e2f36]">
          {(['linear', 'rf', 'xgboost'] as const).map((key) => {
            const label = key === 'linear' ? 'Linear Reg.' : key === 'rf' ? 'Random Forest' : 'XGBoost';
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={model === key}
                onClick={() => setModel(key)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  model === key ? 'bg-[#f4b6c2] text-[#18181b]' : 'text-[#d1d4dc] hover:text-[#f4f4f6]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-[#2e2f36] bg-[#141418] p-3.5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">Model R² Score</div>
          <div className="mt-1 font-mono text-xl font-semibold text-[#f4f4f6] tabular-nums">{metrics.r2}</div>
        </div>
        <div className="rounded-lg border border-[#2e2f36] bg-[#141418] p-3.5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">Validation RMSE</div>
          <div className="mt-1 font-mono text-xl font-semibold text-[#f4f4f6] tabular-nums">{metrics.rmse}</div>
        </div>
        <div className="rounded-lg border border-[#2e2f36] bg-[#141418] p-3.5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">Predicted Peak Output</div>
          <div className="mt-1 font-mono text-xl font-semibold text-[#f4b6c2] tabular-nums">
            {predictedIrradiance} W/m²
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <label className="block space-y-1.5 text-xs font-medium text-[#d1d4dc]">
          <div className="flex justify-between">
            <span>Ambient Temp</span>
            <span className="font-mono text-[#f4f4f6] tabular-nums">{tempC} °C</span>
          </div>
          <input
            type="range"
            min={12}
            max={45}
            value={tempC}
            onChange={(e) => setTempC(Number(e.target.value))}
            className="w-full accent-[#f4b6c2] cursor-pointer"
          />
        </label>

        <label className="block space-y-1.5 text-xs font-medium text-[#d1d4dc]">
          <div className="flex justify-between">
            <span>Relative Humidity</span>
            <span className="font-mono text-[#f4f4f6] tabular-nums">{humidity}%</span>
          </div>
          <input
            type="range"
            min={15}
            max={95}
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="w-full accent-[#f4b6c2] cursor-pointer"
          />
        </label>

        <label className="block space-y-1.5 text-xs font-medium text-[#d1d4dc]">
          <div className="flex justify-between">
            <span>Cloud Cover</span>
            <span className="font-mono text-[#f4f4f6] tabular-nums">{cloudPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={90}
            value={cloudPct}
            onChange={(e) => setCloudPct(Number(e.target.value))}
            className="w-full accent-[#f4b6c2] cursor-pointer"
          />
        </label>
      </div>

      <div className="rounded-lg border border-[#2e2f36] bg-[#141418] p-4">
        <div className="mb-3 flex items-center justify-between text-xs text-[#a1a5b0]">
          <span>Simulated Diurnal Irradiance Profile ({metrics.name})</span>
          <span className="font-mono text-[#f4b6c2] tabular-nums">Accuracy: {metrics.accuracy}</span>
        </div>
        <div className="flex h-28 items-end gap-1.5">
          {curvePoints.map((pt) => (
            <div key={pt.hour} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-20 w-full items-end">
                <div
                  className="w-full rounded-t bg-[#f4b6c2]/85 transition-all duration-200"
                  style={{ height: `${Math.max(8, Math.round((pt.val / maxVal) * 100))}%` }}
                  title={`${pt.hour}: ${pt.val} W/m²`}
                />
              </div>
              <span className="font-mono text-[10px] text-[#a1a5b0] tabular-nums">
                {pt.hour.replace(':00', '')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SALES_DATA = [
  { region: 'North', q1: 142, q2: 168, q3: 155, q4: 194, margin: '24.2%' },
  { region: 'South', q1: 128, q2: 149, q3: 176, q4: 205, margin: '26.8%' },
  { region: 'East', q1: 96, q2: 112, q3: 129, q4: 158, margin: '21.5%' },
  { region: 'West', q1: 164, q2: 172, q3: 189, q4: 224, margin: '27.4%' },
];

export function PowerBISandbox() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedQuarter, setSelectedQuarter] = useState<'q1' | 'q2' | 'q3' | 'q4'>('q4');

  const filtered = useMemo(() => {
    return selectedRegion === 'All'
      ? SALES_DATA
      : SALES_DATA.filter((row) => row.region === selectedRegion);
  }, [selectedRegion]);

  const totalRevenue = useMemo(() => {
    return filtered.reduce((acc, row) => acc + row[selectedQuarter], 0);
  }, [filtered, selectedQuarter]);

  const quarterLabel = selectedQuarter.toUpperCase();

  return (
    <div className="space-y-5 rounded-xl border border-[#2e2f36] bg-[#201f24] p-5 text-[#f4f4f6]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2e2f36] pb-4">
        <div>
          <h4 className="font-display text-sm font-semibold text-[#f4f4f6]">
            Interactive Sales Drill-Down View
          </h4>
          <p className="text-xs text-[#a1a5b0]">
            Filter clean regional sales tables by territory and reporting period.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-[#2e2f36] bg-[#121215] p-1">
            {(['All', 'North', 'South', 'East', 'West'] as const).map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedRegion === region ? 'bg-[#f4b6c2] text-[#18181b]' : 'text-[#d1d4dc] hover:text-[#f4f4f6]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="inline-flex rounded-lg border border-[#2e2f36] bg-[#121215] p-1">
            {(['q1', 'q2', 'q3', 'q4'] as const).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setSelectedQuarter(q)}
                className={`rounded-md px-2 py-1 text-xs font-medium uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedQuarter === q ? 'bg-[#f4b6c2] text-[#18181b]' : 'text-[#d1d4dc] hover:text-[#f4f4f6]'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[#2e2f36] bg-[#141418] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">
            Selected Revenue ({selectedRegion} · {quarterLabel})
          </div>
          <div className="mt-2 font-mono text-3xl font-semibold text-[#f4b6c2] tabular-nums">
            ${totalRevenue}K
          </div>
        </div>
        <div className="rounded-lg border border-[#2e2f36] bg-[#141418] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">Active Regional Breakdown</div>
          <div className="mt-3 space-y-2.5">
            {filtered.map((row) => (
              <div key={row.region} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#f4f4f6]">{row.region}</span>
                  <span className="font-mono text-[#d1d4dc] tabular-nums">
                    ${row[selectedQuarter]}K · {row.margin} margin
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#2c2d35]">
                  <div
                    className="h-full rounded-full bg-[#f4b6c2] transition-all duration-200"
                    style={{ width: `${Math.round((row[selectedQuarter] / 240) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StudentRecord {
  id: string;
  name: string;
  course: string;
  score: number;
}

const INITIAL_STUDENTS: StudentRecord[] = [
  { id: 'CS101', name: 'Ananya Verma', course: 'Database Systems', score: 91 },
  { id: 'CS104', name: 'Karthik Reddy', course: 'Data Analytics', score: 86 },
  { id: 'CS109', name: 'Meera Nair', course: 'Web Engineering', score: 94 },
];

export function StudentCRUDSandbox() {
  const [records, setRecords] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [query, setQuery] = useState('');
  const [rollId, setRollId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [scoreInput, setScoreInput] = useState('');
  const [validationMsg, setValidationMsg] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.course.toLowerCase().includes(q),
    );
  }, [records, query]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const idTrim = rollId.trim().toUpperCase();
    const nameTrim = studentName.trim();
    const numScore = Number(scoreInput);

    if (!idTrim || !nameTrim || Number.isNaN(numScore) || numScore < 0 || numScore > 100) {
      setValidationMsg('Enter a valid ID, student name, and score between 0 and 100.');
      return;
    }
    if (records.some((r) => r.id === idTrim)) {
      setValidationMsg(`Record ${idTrim} already exists. Use a unique student ID.`);
      return;
    }

    setRecords((prev) => [{ id: idTrim, name: nameTrim, course: 'Information Technology', score: numScore }, ...prev]);
    setRollId('');
    setStudentName('');
    setScoreInput('');
    setValidationMsg('');
  };

  return (
    <div className="space-y-4 rounded-xl border border-[#2e2f36] bg-[#201f24] p-5 text-[#f4f4f6]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2e2f36] pb-3">
        <div>
          <h4 className="font-display text-sm font-semibold text-[#f4f4f6]">
            Live CRUD &amp; Validation Sandbox
          </h4>
          <p className="text-xs text-[#a1a5b0]">
            Test record validation, instant table filtering, and deletion operations.
          </p>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[#a1a5b0]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ID or name..."
            aria-label="Search student records"
            className="rounded-lg border border-[#2e2f36] bg-[#141418] py-1.5 pr-3 pl-8 text-xs text-[#f4f4f6] placeholder:text-[#6e717a]"
          />
        </div>
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 gap-2 sm:grid-cols-4">
        <input
          type="text"
          value={rollId}
          onChange={(e) => setRollId(e.target.value)}
          placeholder="ID (e.g. CS112)"
          aria-label="Student ID"
          className="rounded-lg border border-[#2e2f36] bg-[#141418] px-3 py-2 text-xs text-[#f4f4f6] placeholder:text-[#6e717a]"
        />
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name"
          aria-label="Student Name"
          className="rounded-lg border border-[#2e2f36] bg-[#141418] px-3 py-2 text-xs text-[#f4f4f6] placeholder:text-[#6e717a]"
        />
        <input
          type="number"
          min={0}
          max={100}
          value={scoreInput}
          onChange={(e) => setScoreInput(e.target.value)}
          placeholder="Score (0–100)"
          aria-label="Student Score"
          className="rounded-lg border border-[#2e2f36] bg-[#141418] px-3 py-2 text-xs text-[#f4f4f6] placeholder:text-[#6e717a]"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#f4b6c2] px-3 py-2 text-xs font-semibold text-[#18181b] hover:bg-[#f2cfd7] cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Record
        </button>
      </form>

      {validationMsg && (
        <div role="alert" className="flex items-center gap-2 rounded-lg border border-amber-400/40 bg-amber-950/50 px-3 py-2 text-xs text-amber-200">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{validationMsg}</span>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-[#2e2f36] bg-[#141418]">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#2e2f36] bg-[#121215] text-[#a1a5b0]">
            <tr>
              <th className="px-3 py-2 font-semibold">ID</th>
              <th className="px-3 py-2 font-semibold">Student</th>
              <th className="px-3 py-2 font-semibold">Subject</th>
              <th className="px-3 py-2 font-semibold">Score</th>
              <th className="px-3 py-2 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2c2d35]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-[#a1a5b0]">
                  No matching records found.
                </td>
              </tr>
            ) : (
              filtered.map((rec) => (
                <tr key={rec.id}>
                  <td className="px-3 py-2 font-mono text-[#d1d4dc] tabular-nums">{rec.id}</td>
                  <td className="px-3 py-2 font-medium text-[#f4f4f6]">{rec.name}</td>
                  <td className="px-3 py-2 text-[#a1a5b0]">{rec.course}</td>
                  <td className="px-3 py-2 font-mono font-semibold text-[#f4b6c2] tabular-nums">{rec.score}%</td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => setRecords((prev) => prev.filter((item) => item.id !== rec.id))}
                      aria-label={`Remove ${rec.name}`}
                      className="inline-flex items-center justify-center rounded p-1 text-[#a1a5b0] hover:bg-[#2c2d35] hover:text-[#f4f4f6] cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const CITY_WEATHER = {
  Tirupati: { temp: '31°C', condition: 'Partly Cloudy', humidity: '54%', wind: '14 km/h', forecast: ['32°C', '30°C', '29°C'] },
  Bengaluru: { temp: '24°C', condition: 'Light Breeze', humidity: '62%', wind: '18 km/h', forecast: ['25°C', '23°C', '24°C'] },
  Hyderabad: { temp: '29°C', condition: 'Clear Sky', humidity: '45%', wind: '12 km/h', forecast: ['30°C', '31°C', '28°C'] },
};

export function WeatherAPISandbox() {
  const [city, setCity] = useState<keyof typeof CITY_WEATHER>('Tirupati');
  const [networkState, setNetworkState] = useState<'ready' | 'loading' | 'error'>('ready');
  const data = CITY_WEATHER[city];

  return (
    <div className="space-y-4 rounded-xl border border-[#2e2f36] bg-[#201f24] p-5 text-[#f4f4f6]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2e2f36] pb-3">
        <div>
          <h4 className="font-display text-sm font-semibold text-[#f4f4f6]">
            Async Weather API &amp; Error Recovery Simulator
          </h4>
          <p className="text-xs text-[#a1a5b0]">
            Inspect city forecasts and verify loading/error state transitions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-[#2e2f36] bg-[#121215] p-1">
            {(Object.keys(CITY_WEATHER) as (keyof typeof CITY_WEATHER)[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCity(c);
                  setNetworkState('ready');
                }}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  city === c ? 'bg-[#f4b6c2] text-[#18181b]' : 'text-[#d1d4dc] hover:text-[#f4f4f6]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="inline-flex rounded-lg border border-[#2e2f36] bg-[#121215] p-1">
            {(['ready', 'loading', 'error'] as const).map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => setNetworkState(state)}
                className={`rounded-md px-2 py-1 text-xs font-medium capitalize transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  networkState === state ? 'bg-[#f4b6c2] text-[#18181b]' : 'text-[#d1d4dc] hover:text-[#f4f4f6]'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </div>

      {networkState === 'loading' && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-[#2e2f36] bg-[#141418] py-8 text-xs font-medium text-[#d1d4dc]">
          <RefreshCw className="h-4 w-4 animate-spin text-[#f4b6c2]" />
          Fetching meteorological telemetry for {city}...
        </div>
      )}

      {networkState === 'error' && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-400/40 bg-red-950/40 p-4 text-xs text-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Network timeout while contacting weather endpoint for {city}.</span>
          </div>
          <button
            type="button"
            onClick={() => setNetworkState('ready')}
            className="rounded-md border border-red-300/30 bg-[#141418] px-3 py-1.5 font-semibold text-[#f4f4f6] hover:bg-red-900/40 cursor-pointer"
          >
            Retry Request
          </button>
        </div>
      )}

      {networkState === 'ready' && (
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-[#2e2f36] bg-[#141418] p-4 sm:grid-cols-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">{city} Now</div>
            <div className="mt-1 font-mono text-2xl font-semibold text-[#f4b6c2] tabular-nums">{data.temp}</div>
            <div className="text-xs text-[#d1d4dc]">{data.condition}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">Humidity</div>
            <div className="mt-1 font-mono text-lg font-semibold text-[#f4f4f6] tabular-nums">{data.humidity}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">Wind Speed</div>
            <div className="mt-1 font-mono text-lg font-semibold text-[#f4f4f6] tabular-nums">{data.wind}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">3-Day Outlook</div>
            <div className="mt-1 font-mono text-sm font-medium text-[#f4b6c2] tabular-nums">
              {data.forecast.join(' · ')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PortfolioArchSandbox() {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const specs = {
    desktop: { cols: '3-Column Grid (1200px)', nav: 'Single-row horizontal bar', score: 'WCAG AA Verified' },
    tablet: { cols: '2-Column Grid (768px)', nav: 'Compact link alignment', score: 'WCAG AA Verified' },
    mobile: { cols: '1-Column Stack (375px)', nav: 'Collapsible drawer', score: 'Touch Targets >= 44px' },
  }[viewport];

  return (
    <div className="space-y-4 rounded-xl border border-[#2e2f36] bg-[#201f24] p-5 text-[#f4f4f6]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2e2f36] pb-3">
        <div>
          <h4 className="font-display text-sm font-semibold text-[#f4f4f6]">
            Responsive Layout &amp; Accessibility Inspector
          </h4>
          <p className="text-xs text-[#a1a5b0]">
            Inspect modular grid adaptation across desktop, tablet, and mobile breakpoints.
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-[#2e2f36] bg-[#121215] p-1">
          {(['desktop', 'tablet', 'mobile'] as const).map((bp) => (
            <button
              key={bp}
              type="button"
              onClick={() => setViewport(bp)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewport === bp ? 'bg-[#f4b6c2] text-[#18181b]' : 'text-[#d1d4dc] hover:text-[#f4f4f6]'
              }`}
            >
              {bp}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-[#2e2f36] bg-[#141418] p-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">Grid Structure</div>
          <div className="mt-1 text-xs font-semibold text-[#f4f4f6]">{specs.cols}</div>
        </div>
        <div className="rounded-lg border border-[#2e2f36] bg-[#141418] p-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">Navigation Pattern</div>
          <div className="mt-1 text-xs font-semibold text-[#f4f4f6]">{specs.nav}</div>
        </div>
        <div className="rounded-lg border border-[#2e2f36] bg-[#141418] p-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a5b0]">Accessibility Standard</div>
          <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#f4b6c2]">
            <Check className="h-3.5 w-3.5" />
            {specs.score}
          </div>
        </div>
      </div>
    </div>
  );
}
