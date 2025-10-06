// ===== COMPONENTES BASE =====
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
export { CollapsibleCard } from './CollapsibleCard';
export { Button } from './Button';
export { Badge } from './badge';
export { Input } from './input';
export { Label } from './label';
export { Textarea } from './textarea';
export { Switch } from './switch';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

// ===== COMPONENTES DE FEEDBACK =====
export { Modal, ModalHeader, ModalFooter } from './Modal';
export { Tooltip, SimpleTooltip } from './Tooltip';
export { Spinner, LoadingOverlay, LoadingButton, InlineSpinner } from './Spinner';

// ===== COMPONENTES DE ALERTA =====
// Componente básico de alerta
export { Alert, AlertDescription, AlertTitle } from './alert';
// Componente avançado de banner de alerta para dashboards
export { 
  AlertBanner, 
  MetricAlertBanner, 
  SuccessAlertBanner, 
  WarningAlertBanner, 
  ErrorAlertBanner 
} from './AlertBanner';

// ===== COMPONENTES DE PROGRESSO =====
// Componente básico de progresso
export { Progress } from './progress';
// Componente avançado de barra de progresso para dashboards
export { ProgressBar, CircularProgress } from './ProgressBar';

// ===== COMPONENTES DE MÉTRICAS E KPI =====
export { KPICard } from './KPICard';
export { 
  MetricCard, 
  CompactMetricCard, 
  FeaturedMetricCard 
} from './MetricCard';

// ===== COMPONENTES DE STATUS =====
export { 
  StatusIndicator, 
  ServiceStatus, 
  ConnectionStatus 
} from './StatusIndicator';

// ===== COMPONENTES DE DADOS =====
export { DataTable, type DataTableColumn, type DataTableProps } from './DataTable';
export { FilterPanel } from './FilterPanel';
export { SearchBox } from './SearchBox';
export { 
  Pagination, 
  SimplePagination 
} from './Pagination';
export { 
  ExportButton, 
  ExportCSVButton, 
  ExportExcelButton, 
  ExportPDFButton 
} from './ExportButton';